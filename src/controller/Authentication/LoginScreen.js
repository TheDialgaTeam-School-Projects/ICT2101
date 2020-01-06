import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class LoginScreenController extends Controller {
  constructor(view) {
    super(view, {email: '', password: '', isLoading: false});
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeTextEmail = this.onChangeTextEmail.bind(this);
    this.onChangeTextPassword = this.onChangeTextPassword.bind(this);
    this.onPressForgetPassword = this.onPressForgetPassword.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  /**
   * This event triggers during componentDidMount event.
   */
  async componentDidMount() {
    const email = (await AsyncStorage.getItem('email')) ?? '';
    const password = (await AsyncStorage.getItem('password')) ?? '';

    if (!this.props.isUnmount) {
      this.state = {email: email, password: password};
    }
  }

  /**
   * This event update the email state during onChangeText event.
   * @param {string} value TextInput value.
   */
  onChangeTextEmail(value) {
    this.state = {email: value};
  }

  /**
   * This event update the password state during onChangeText event.
   * @param {string} value TextInput value.
   */
  onChangeTextPassword(value) {
    this.state = {password: value};
  }

  /**
   * This event triggers when the forget password button is pressed.
   */
  onPressForgetPassword() {
    this.navigate('ResetPassword');
  }

  /**
   * This event triggers when login button is pressed.
   * @returns {Promise<void>}
   */
  async onPressLogin() {
    try {
      this.state = {isLoading: true};

      await UserManagement.login(this.state.email, this.state.password);

      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('password', this.state.password);

      this.state = {isLoading: false};
      this.navigate('Home');
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }

  /**
   * This event triggers when register button is pressed.
   */
  onPressRegister() {
    this.navigate('Register');
  }
}
