import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Controller} from '../Controller';
import {Clique} from '../../model/Clique';
import UserManagement from '../../service/UserManagement';
import CliqueManagement from '../../service/CliqueManagement';

export class ViewCliqueProfileScreenController extends Controller {
  constructor(view) {
    super(view, {cliqueName: '', cliqueSynopsis: '', cliqueMembers: []});
    this.willFocus = this.willFocus.bind(this);
  }

  async willFocus() {
    const userModel = await UserManagement.getCurrentUserModel(true);
    const cliqueName = userModel.cliqueId;

    //query to get cliqueName
    const cliqueQuery = await firestore()
      .collection('cliques')
      .where('cliqueName', '==', cliqueName)
      .get();

    //map retrieve values and map to attributes
    const cliqueModel = new Clique();
    cliqueModel.deserializeFromFirestore(cliqueQuery.docs[0]);

    const cliqueMembers = [];

    //store name of each clique member to array
    cliqueModel.cliqueMembers.forEach(member => {
      cliqueMembers.push({profileName: member});
    });

    //set state
    this.state = {
      cliqueName: cliqueModel.cliqueName,
      cliqueSynopsis: cliqueModel.cliqueSynopsis,
      cliqueMembers: cliqueMembers,
      cliqueLeader: cliqueModel.cliqueLeader,
    };
  }

  //deleteCliqueDatabase function to call deleteClique function and navigate page
  async deleteCliqueDatabase() {
    try {
      let cliqueManagement = new CliqueManagement();
      await cliqueManagement.deleteClique();
      await UserManagement.getCurrentUserModel(true);
      this.navigate('ViewAvailableClique');
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK'}]);
    }
  }

  async onPressRemoveCliqueMember(getMember, getCliqueLeader, getCliqueName) {
    const userModel = await UserManagement.getCurrentUserModel(true);
    if (userModel.username == getCliqueLeader) {
      await CliqueManagement.removeMember(getMember, getCliqueName);

      const userModel = await UserManagement.getCurrentUserModel(true);
      const cliqueName = userModel.cliqueId;

      //query to get cliqueName
      const cliqueQuery = await firestore()
        .collection('cliques')
        .where('cliqueName', '==', cliqueName)
        .get();

      //map retrieve values and map to attributes
      const cliqueModel = new Clique();
      cliqueModel.deserializeFromFirestore(cliqueQuery.docs[0]);

      const cliqueMembers = [];

      //store name of each clique member to array
      cliqueModel.cliqueMembers.forEach(member => {
        cliqueMembers.push({profileName: member});
      });

      //set state
      this.state = {
        cliqueName: cliqueModel.cliqueName,
        cliqueSynopsis: cliqueModel.cliqueSynopsis,
        cliqueMembers: cliqueMembers,
        cliqueLeader: cliqueModel.cliqueLeader,
      };
    } else {
      Alert.alert('Error', 'You are not Clique Leader', [{text: 'OK'}]);
    }
  }
  async onPressLeaveClique(getCliqueLeader, getCliqueName) {
    const userModel = await UserManagement.getCurrentUserModel(true);

    if (userModel.username !== getCliqueLeader) {
      await CliqueManagement.leaveClique(userModel.username, getCliqueName);
      await UserManagement.getCurrentUserModel(true);
      this.navigate('Map');
    } else {
      Alert.alert('Error', 'Clique Leader cannot leave Clique', [{text: 'OK'}]);
    }
  }
}
