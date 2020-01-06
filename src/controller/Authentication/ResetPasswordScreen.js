import {Alert} from 'react-native';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class ResetPasswordScreenController extends Controller {
  constructor(view) {
    super(view, {email: '', isLoading: false});
    this.onChangeTextEmail = this.onChangeTextEmail.bind(this);
    this.onPressReset = this.onPressReset.bind(this);
  }

  /**
   * This event update the email state during onChangeText event.
   * @param {string} value TextInput value.
   */
  onChangeTextEmail(value) {
    this.state = {email: value};
  }

  /**
   * This event triggers when the reset button is pressed.
   */
  async onPressReset() {
    try {
      this.state = {isLoading: true};

      if (typeof this.state.email !== 'string' || this.state.email === '') {
        this.state = {isLoading: false};
        Alert.alert('Error', 'Email is empty.', [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
        return;
      }

      await UserManagement.resetPassword(this.state.email);
      this.state = {isLoading: false};

      Alert.alert('Success', 'An email have been sent to your email to reset your password.', [
        {
          text: 'OK',
          onPress: () => {
            this.state = {isLoading: false};
            this.navigate('Login');
          },
        },
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
