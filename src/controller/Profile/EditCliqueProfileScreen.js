import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Controller} from '../Controller';
import {Clique} from '../../model/Clique';
import UserManagement from '../../service/UserManagement';
import CliqueManagement from '../../service/CliqueManagement';

export class EditCliqueProfileScreenController extends Controller {
  constructor(view) {
    super(view, {clique: null});
    this.onWillFocus = this.onWillFocus.bind(this);
    this.onChangeTextCliqueName = this.onChangeTextCliqueName.bind(this);
    this.onChangeTextCliqueSynopsis = this.onChangeTextCliqueSynopsis.bind(this);
    this.onPressUpdate = this.onPressUpdate.bind(this);
  }

  async onWillFocus() {
    await UserManagement.getCurrentUserModel(true);
  }

  //set cliqueName state
  onChangeTextCliqueName(value) {
    this.state = {cliqueName: value};
  }

  //set cliqueSynopsis state
  onChangeTextCliqueSynopsis(value) {
    this.state = {cliqueSynopsis: value};
  }

  async getCliqueNameSynopsis() {
    //get current user and map its attributes
    const userModel = await UserManagement.getCurrentUserModel(false);
    const username = userModel.username;

    const cliqueQuery = await firestore()
      .collection('cliques')
      .where('cliqueLeader', '==', username)
      .get();

    this.state = {cliqueName: cliqueQuery.cliqueName, cliqueSynopsis: cliqueQuery.cliqueSynopsis};
  }

  async onPressUpdate() {
    try {
      this.state = {isLoading: true};

      //get all cliques
      let cliques = await CliqueManagement.getAllCliques();
      let isRepeated = false;

      //check if input cliqueName exist in database
      cliques.forEach(clique => {
        if (clique.cliqueName === this.state.cliqueName) {
          isRepeated = true;
        }
      });

      //prompt error if cliqueName exist in database
      if (isRepeated) {
        Alert.alert('Error:', 'Clique name is in use.', [
          {text: 'OK', onPress: () => (this.state = {isLoading: false})},
        ]);
        return;
      }

      //get current user and map its attributes
      const userModel = await UserManagement.getCurrentUserModel(false);
      const username = userModel.username;

      const cliqueQuery = await firestore()
        .collection('cliques')
        .where('cliqueLeader', '==', username)
        .get();

      //get cliques if user is cliqueLeader
      if (cliqueQuery.size > 0) {
        const cliqueModel = new Clique();
        cliqueModel.deserializeFromFirestore(cliqueQuery.docs[0]);

        //get users where the cliqueName in users and cliques matches
        const userQuery = await firestore()
          .collection('users')
          .where('cliqueId', '==', cliqueModel.cliqueName)
          .get();
        //ensure cliqueName is not empty
        if (typeof this.state.cliqueName !== 'string' || this.state.cliqueName === '') {
          Alert.alert('Error:', 'Clique name should not be empty.', [
            {text: 'OK', onPress: () => (this.state = {isLoading: false})},
          ]);
          return;
        } else {
          //update each users clique to new clique name
          userQuery.forEach(async doc => {
            await firestore()
              .collection('users')
              .doc(doc.id)
              .update({cliqueId: this.state.cliqueName});
          });

          //updating to new values of attributes
          cliqueModel.cliqueName = this.state.cliqueName;
          cliqueModel.cliqueSynopsis = this.state.cliqueSynopsis;
          await cliqueModel.updateDoc();

          //prompt success message and redirect to ViewCliqueProfile page
          Alert.alert('Update success', '', [
            {
              text: 'OK',
              onPress: () => {
                this.state = {isLoading: false};
                this.navigate('ViewCliqueProfile');
              },
            },
          ]);
        }
      } else {
        // prompt failure alert message
        Alert.alert('Error:', 'You are not the Clique Leader.', [
          {text: 'OK', onPress: () => (this.state = {isLoading: false})},
        ]);
      }
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
