import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Button, Container, Form, Input, Item, Label, Text, Textarea, Content, View} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {CreateCliqueScreenController} from '../../controller/Clique/CreateCliqueScreen';
import {LoadingModalComponent} from '../Component/LoadingModal';
import CliqueManagement from '../../service/CliqueManagement';

export class CreateCliqueScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new CreateCliqueScreenController(this);

  }

  render() {
    return (
      <Container style={GlobalCss.bodyStyle}>
        <Content style={GlobalCss.p1}>
          <Form>
            <Label style={GlobalCss.pb1}>Clique Name:</Label>
            <Input

              style={GlobalCss.inputBoxStyle}
              placeholder="CliqueName..."
//              autoCorrect={false}
              onChangeText={this.controller.onChangeTextCliqueName}
              value={this.state.cliqueName}
            />
            <View padder />

            <Label style={GlobalCss.pb1}>Clique Synopsis:</Label>
            <Textarea rowSpan={5}
              style={GlobalCss.inputBoxStyle}
              placeholder="Enter Clique Synopsis here..."
//              autoCorrect={false}
              onChangeText={this.controller.onChangeTextCliqueSynopsis}
              value={this.state.cliqueSynopsis}
            />
            <View padder />
          </Form>
          <View padder />
          <Row size={-1}>
            <Col size={1} />
            <Col size={1}>
              <Button style={GlobalCss.buttonStyle} onPress = {()=>this.controller.onCreateClique(this.state.cliqueName,this.state.cliqueSynopsis)} >
                <Text style={GlobalCss.buttonTextStyle} >Create</Text>
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
