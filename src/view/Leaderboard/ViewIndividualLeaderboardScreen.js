import React, {Component} from 'react';
import {Container} from 'native-base';
import {ViewLeaderboardScreenView} from './ViewLeaderboardScreen';
import {ViewIndividualLeaderboardScreenController} from '../../controller/Leaderboard/ViewIndividualLeaderboardScreen';

export class ViewIndividualLeaderboardScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ViewIndividualLeaderboardScreenController(this);
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.controller.willFocus);
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
  }

  render() {
    return (
      <Container>
        <ViewLeaderboardScreenView data={this.state.leaderboard} />
      </Container>
    );
  }
}
