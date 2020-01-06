import React, {Component} from 'react';
import {Col, Row} from 'react-native-easy-grid';
import {Button, Container, Content, List, ListItem, Text, Textarea, Input, View, Form, Label} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {EditCliqueProfileScreenController} from '../../controller/Profile/EditCliqueProfileScreen';

export class EditCliqueProfileScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new EditCliqueProfileScreenController(this);
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.controller.onWillFocus);
  }

  componentWillUnmount() {
      this.willFocusEvent.remove();
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
             onChangeText={this.controller.onChangeTextCliqueName}
              value={this.state.CliqueName}
            />
            <View padder />

            <Label style={GlobalCss.pb1}>Clique Synopsis:</Label>
            <Textarea rowSpan={5}
              style={GlobalCss.inputBoxStyle}
              placeholder="Enter Clique Synopsis here..."
              onChangeText={this.controller.onChangeTextCliqueSynopsis}
              value={this.state.CliqueSynopsis}
            />
            <View padder />
          </Form>
          <View padder />
          <Row size={-1}>
            <Col size={1} />
            <Col size={1}>
              <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressUpdate}>
                <Text style={GlobalCss.buttonTextStyle}>Update</Text>
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
