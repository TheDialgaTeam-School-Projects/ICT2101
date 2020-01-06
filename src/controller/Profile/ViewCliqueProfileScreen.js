import {Controller} from '../Controller';
import {Alert} from 'react-native';

export class ViewRequestScreenController extends Controller {
  constructor(view) {
    super(view);
    this.onPressViewRequest = this.onPressViewRequest.bind(this);
  }

  onPressViewRequest() {
    this.navigate('ViewRequest');
  }

  onPressRemoveClique() {
    try {
      Alert.alert('', 'Do you wish to delete this clique?', [
        {
          text: 'Yes',
          onPress: async () => {
            this.state = {isLoading: true};
            await UserManagement.logout();
            this.state = {isLoading: false};
            //               this.navigate('ViewAvailableClique');
          },
        },
        {text: 'No'},
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }

  onPressLeave() {
    try {
      Alert.alert('', 'Do you wish to leave this clique?', [
        {
          text: 'Yes',
          onPress: async () => {
            this.state = {isLoading: true};
            await UserManagement.logout();
            this.state = {isLoading: false};
            //               this.navigate('ViewAvailableClique');
          },
        },
        {text: 'No'},
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
