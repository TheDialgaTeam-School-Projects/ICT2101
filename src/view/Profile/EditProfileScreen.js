import React, {Component} from 'react';
import {Col, Row} from 'react-native-easy-grid';
import {Button, Container, Content, List, ListItem, Picker, Text, View} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {EditProfileScreenController} from '../../controller/Profile/EditProfileScreen';

export class EditProfileScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new EditProfileScreenController(this);
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.controller.onWillFocus);
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
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
      {label: 'Car', value: 'car'},
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
        <Content>
          <List>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Profile Name: </Text>
              <Text>{this.state.user ? this.state.user.username : ''}</Text>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Gender: </Text>
              <Text>{this.state.user ? this.state.user.gender : ''}</Text>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Age: </Text>
              <Row style={GlobalCss.inputBoxStyle}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.age}
                  onValueChange={this.controller.onValueChangedAge}>
                  {ageDropdownItems}
                </Picker>
              </Row>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Commute Method: </Text>
              <Row style={GlobalCss.inputBoxStyle}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.commuteMethod}
                  onValueChange={this.controller.onValueChangedCommuteMethod}>
                  {commuteMethodItems}
                </Picker>
              </Row>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Point Earned: </Text>
              <Text>{this.state.user ? this.state.user.taskPoint : ''}</Text>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Overall Distance Walked: </Text>
              <Text>{this.state.user ? this.state.user.totalDistanceWalk : ''}</Text>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Belong To: </Text>
              <Text>{this.state.cliqueName ? this.state.cliqueName : ''}</Text>
            </ListItem>
          </List>
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
        </Content>
      </Container>
    );
  }
}
