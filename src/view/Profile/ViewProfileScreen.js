import React, {Component} from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {ViewProfileScreenController} from '../../controller/Profile/ViewProfileScreen';

export class ViewProfileScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ViewProfileScreenController(this);
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.controller.onWillFocus);
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
  }

  render() {
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
              <Text>{this.state.user ? this.state.user.age : ''}</Text>
            </ListItem>
            <ListItem>
              <Text style={GlobalCss.fontStyleBold}>Commute Method: </Text>
              <Text>{this.state.user ? this.state.user.commuteMethod : ''}</Text>
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
        </Content>
      </Container>
    );
  }
}
