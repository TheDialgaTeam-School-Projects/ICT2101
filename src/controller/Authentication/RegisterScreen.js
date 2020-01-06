import {Alert} from 'react-native';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class RegisterScreenController extends Controller {
  constructor(view) {
    super(view, {
      username: '',
      genderMale: true,
      genderFemale: false,
      age: '13-18',
      email: '',
      password: '',
      confirmPassword: '',
      commuteMethod: 'walk',
      isLoading: false,
    });
    this.onChangeTextUsername = this.onChangeTextUsername.bind(this);
    this.onPressGenderMale = this.onPressGenderMale.bind(this);
    this.onPressGenderFemale = this.onPressGenderFemale.bind(this);
    this.onValueChangedAge = this.onValueChangedAge.bind(this);
    this.onChangeTextEmail = this.onChangeTextEmail.bind(this);
    this.onChangeTextPassword = this.onChangeTextPassword.bind(this);
    this.onChangeTextConfirmPassword = this.onChangeTextConfirmPassword.bind(this);
    this.onValueChangedCommuteMethod = this.onValueChangedCommuteMethod.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  /**
   * This event update the username state during onChangeText event.
   * @param value TextInput value.
   */
  onChangeTextUsername(value) {
    this.state = {username: value};
  }

  /**
   * This event update the genderMale state when the male radio button is pressed.
   */
  onPressGenderMale() {
    this.state = {genderMale: true, genderFemale: false};
  }

  /**
   * This event update the genderMale state when the male radio button is pressed.
   */
  onPressGenderFemale() {
    this.state = {genderMale: false, genderFemale: true};
  }

  /**
   * This event update the age state when the dropdown list has changed.
   * @param value Dropdown list value.
   */
  onValueChangedAge(value) {
    this.state = {age: value};
  }

  /**
   * This event update the email state during onChangeText event.
   * @param value TextInput value.
   */
  onChangeTextEmail(value) {
    this.state = {email: value};
  }

  /**
   * This event update the password state during onChangeText event.
   * @param value TextInput value.
   */
  onChangeTextPassword(value) {
    this.state = {password: value};
  }

  /**
   * This event update the confirm password state during onChangeText event.
   * @param value TextInput value.
   */
  onChangeTextConfirmPassword(value) {
    this.state = {confirmPassword: value};
  }

  /**
   * This event update the commuteMethod state when the dropdown list has changed.
   * @param value Dropdown list value.
   */
  onValueChangedCommuteMethod(value) {
    this.state = {commuteMethod: value};
  }

  /**
   * This event triggers when register button is pressed.
   */
  async onPressRegister() {
    try {
      this.state = {isLoading: true};

      if (this.state.password !== this.state.confirmPassword) {
        Alert.alert('Error', 'Password does not match.', [
          {text: 'OK', onPress: () => (this.state = {isLoading: false})},
        ]);
        return;
      }

      await UserManagement.register(this.state.email, this.state.password, {
        username: this.state.username,
        gender: this.state.genderMale ? 'male' : 'female',
        age: this.state.age,
        commuteMethod: this.state.commuteMethod,
      });

      Alert.alert(
        'Register success',
        'A verification email has been sent. Please follow the link in your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.state = {isLoading: false};
              this.navigate('Login');
            },
          },
        ],
      );
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
