import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Button, Container, Form, Input, Item, Label, Text, View} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {LoadingModalComponent} from '../Component/LoadingModal';
import {ResetPasswordScreenController} from '../../controller/Authentication/ResetPasswordScreen';

export class ResetPasswordScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ResetPasswordScreenController(this);
  }

  render() {
    return (
      <Container style={GlobalCss.bodyStyle}>
        <LoadingModalComponent visible={this.state.isLoading} />
        <Grid>
          <Col style={GlobalCss.p1}>
            <Form>
              <Label style={GlobalCss.pb1}>Email Address:</Label>
              <Item regular>
                <Input
                  style={GlobalCss.inputBoxStyle}
                  placeholder="Email..."
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={this.controller.onChangeTextEmail}
                  value={this.state.email}
                />
              </Item>
            </Form>
            <View padder />
            <Row size={-1}>
              <Col size={1} />
              <Col size={1}>
                <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressReset}>
                  <Text style={GlobalCss.buttonTextStyle}>Reset</Text>
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
