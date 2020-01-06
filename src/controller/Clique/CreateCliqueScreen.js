import {Alert} from 'react-native';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';
import CliqueManagement from '../../service/CliqueManagement';

export class CreateCliqueScreenController extends Controller {
  constructor(view) {
    super(view);
    this.onChangeTextCliqueName = this.onChangeTextCliqueName.bind(this);
    this.onChangeTextCliqueSynopsis = this.onChangeTextCliqueSynopsis.bind(this);
  }

  onChangeTextCliqueName(value) {
    this.state = {cliqueName: value};
  }

  onChangeTextCliqueSynopsis(value) {
    this.state = {cliqueSynopsis: value};
  }

  async onCreateClique(getCliqueName, getInfo) {
    try {
      this.state = {isLoading: true};
      await CliqueManagement.createClique(getCliqueName, getInfo);
      await UserManagement.getCurrentUserModel(true);
      this.navigate('ViewCliqueProfile');
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }

  async onPressCreate() {
    try {
      this.state = {isLoading: true};

      Alert.alert('Create success', [
        {
          text: 'OK',
          onPress: () => {
            this.state = {isLoading: false};
            this.navigate('CreateClique');
          },
        },
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
