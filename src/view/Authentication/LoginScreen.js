import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Button, Container, Form, Input, Item, Label, Text, View} from 'native-base';
import {Image} from 'react-native';
import {LoadingModalComponent} from '../Component/LoadingModal';
import {GlobalCss} from '../../css/GlobalCss';
import {LoginScreenController} from '../../controller/Authentication/LoginScreen';

export class LoginScreenView extends Component {
  constructor(props) {
    super(props);
    this.isUnmount = false;
    this.controller = new LoginScreenController(this);
  }

  async componentDidMount() {
    await this.controller.componentDidMount();
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  render() {
    return (
      <Container style={GlobalCss.bodyStyle}>
        <LoadingModalComponent visible={this.state.isLoading} />
        <Grid>
          <Col style={{...GlobalCss.justifyContentCenter, ...GlobalCss.p1}}>
          <Image
            style ={GlobalCss.pb2}
            source={require('../../../src/assets/logo.jpg')}
          />
            <Form>
              <Label style={GlobalCss.pt2}>Email Address:</Label>
              <Item regular>
                <Input
                  style={GlobalCss.inputBoxStyle}
                  placeholder="Email..."
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  onChangeText={this.controller.onChangeTextEmail}
                  value={this.state.email}
                />
              </Item>
              <View padder />
              <Label style={GlobalCss.pb1}>Password:</Label>
              <Item regular>
                <Input
                  style={GlobalCss.inputBoxStyle}
                  placeholder="Password..."
                  autoCorrect={false}
                  autoCompleteType="password"
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={this.controller.onChangeTextPassword}
                  value={this.state.password}
                />
              </Item>
            </Form>
            <View style={GlobalCss.pt1} />
            <Row size={-1} style={GlobalCss.justifyContentFlexEnd} onPress={this.controller.onPressForgetPassword}>
              <Col size={1} />
              <Col size={-1}>
                <Text style={GlobalCss.fontStyleUnderline}>Forget Password?</Text>
              </Col>
            </Row>
            <View padder />
            <Row size={-1}>
              <Col size={1} />
              <Col size={1}>
                <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressLogin}>
                  <Text style={GlobalCss.buttonTextStyle}>Login</Text>
                </Button>
              </Col>
              <Col size={1} />
            </Row>
            <View padder />
            <Row size={-1}>
              <Col size={1} />
              <Col size={1}>
                <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressRegister}>
                  <Text style={GlobalCss.buttonTextStyle}>Register</Text>
                </Button>
              </Col>
              <Col size={1} />
            </Row>
          </Col>
        </Grid>
      </Container>
    );
  }
}
