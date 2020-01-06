import React, {Component} from 'react';
import {Col, Row} from 'react-native-easy-grid';
import {Button, Container, Content, Form, Input, Label, Picker, Radio, Text, View} from 'native-base';
import {LoadingModalComponent} from '../Component/LoadingModal';
import {GlobalCss} from '../../css/GlobalCss';
import {RegisterScreenController} from '../../controller/Authentication/RegisterScreen';

export class RegisterScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new RegisterScreenController(this);
  }

  render() {
    const ageDropdownItems = [];
    const commuteMethodItems = [];

    const ages = [
      {label: '13 - 18', value: '13-18'},
      {label: '19 - 24', value: '19-24'},
      {label: '25 - 39', value: '25-39'},
      {label: '40 - 59', value: '40-59'},
      {label: '60 years and above', value: '60 years and above'},
    ];

    const commuteMethods = [
      {label: 'Walk', value: 'walk'},
      {label: 'Bus', value: 'bus'},
      {label: 'Train', value: 'train'},
      {label: 'Private Car', value: 'private car'},
    ];

    for (let i = 0; i < ages.length; i++) {
      ageDropdownItems.push(<Picker.Item key={ages[i].value} label={ages[i].label} value={ages[i].value} />);
    }

    for (let i = 0; i < commuteMethods.length; i++) {
      commuteMethodItems.push(
        <Picker.Item key={commuteMethods[i].value} label={commuteMethods[i].label} value={commuteMethods[i].value} />,
      );
    }

    return (
      <Container style={GlobalCss.bodyStyle}>
        <LoadingModalComponent visible={this.state.isLoading} />
        <Content style={GlobalCss.p1}>
          <Form>
            <Label style={GlobalCss.pb1}>Username:</Label>
            <Input
              style={GlobalCss.inputBoxStyle}
              placeholder="Username..."
              autoCorrect={false}
              onChangeText={this.controller.onChangeTextUsername}
              value={this.state.username}
            />
            <View padder />
            <Row>
              <Label style={GlobalCss.pr1}>Gender:</Label>
              <Radio selected={this.state.genderMale} onPress={this.controller.onPressGenderMale} />
              <Label style={GlobalCss.px1}>Male</Label>
              <Radio selected={this.state.genderFemale} onPress={this.controller.onPressGenderFemale} />
              <Label style={GlobalCss.pl1}>Female</Label>
            </Row>
            <View padder />
            <Row style={GlobalCss.alignItemsCenter}>
              <Label style={GlobalCss.pr1}>Age:</Label>
              <Row style={GlobalCss.inputBoxStyle}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.age}
                  onValueChange={this.controller.onValueChangedAge}>
                  {ageDropdownItems}
                </Picker>
              </Row>
            </Row>
            <View padder />
            <Label style={GlobalCss.pb1}>Email:</Label>
            <Input
              style={GlobalCss.inputBoxStyle}
              placeholder="Email..."
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={this.controller.onChangeTextEmail}
              value={this.state.email}
            />
            <View padder />
            <Label style={GlobalCss.pb1}>Password:</Label>
            <Input
              style={GlobalCss.inputBoxStyle}
              placeholder="Password..."
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={this.controller.onChangeTextPassword}
              value={this.state.password}
            />
            <View padder />
            <Label style={GlobalCss.pb1}>Confirm Password:</Label>
            <Input
              style={GlobalCss.inputBoxStyle}
              placeholder="Confirm Password..."
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={this.controller.onChangeTextConfirmPassword}
              value={this.state.confirmPassword}
            />
            <View padder />
            <Label style={GlobalCss.pb1}>Commute Method:</Label>
            <Row style={GlobalCss.inputBoxStyle}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.commuteMethod}
                onValueChange={this.controller.onValueChangedCommuteMethod}>
                {commuteMethodItems}
              </Picker>
            </Row>
          </Form>
          <View padder />
          <Row size={-1}>
            <Col size={1} />
            <Col size={1}>
              <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressRegister}>
                <Text style={GlobalCss.buttonTextStyle}>Submit</Text>
              </Button>
            </Col>
            <Col size={1} />
          </Row>
          <View padder />
        </Content>
      </Container>
    );
  }
}
