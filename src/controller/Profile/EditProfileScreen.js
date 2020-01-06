import {Alert} from 'react-native';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class EditProfileScreenController extends Controller {
  constructor(view) {
    super(view, {user: null});
    this.onWillFocus = this.onWillFocus.bind(this);
    this.onValueChangedAge = this.onValueChangedAge.bind(this);
    this.onValueChangedCommuteMethod = this.onValueChangedCommuteMethod.bind(this);
    this.onPressUpdate = this.onPressUpdate.bind(this);
  }

  async onWillFocus() {
    const user = await UserManagement.getCurrentUserModel(false);
    let cliqueName = 'No clique';

    if (typeof user.cliqueId === 'string' && user.cliqueId !== '') {
      cliqueName = user.cliqueId;
    }

    this.state = {user: user, cliqueName: cliqueName};
  }

  /**
   * This event update the age state when the dropdown list has changed.
   * @param value Dropdown list value.
   */
  onValueChangedAge(value) {
    this.state = {age: value};
  }

  /**
   * This event update the commuteMethod state when the dropdown list has changed.
   * @param value Dropdown list value.
   */
  onValueChangedCommuteMethod(value) {
    this.state = {commuteMethod: value};
  }

  /**
   * This event triggers when update button is pressed.
   */
  async onPressUpdate() {
    try {
      this.state = {isLoading: true};

      let userModel = this.state.user;

      userModel.age = this.state.age;
      userModel.commuteMethod = this.state.commuteMethod;
      await userModel.updateDoc();

      Alert.alert('', 'Update success', [
        {
          text: 'OK',
          onPress: () => {
            this.state = {isLoading: false};
            this.navigate('ViewProfile');
          },
        },
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
