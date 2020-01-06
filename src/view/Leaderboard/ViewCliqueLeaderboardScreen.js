import React, {Component} from 'react';
import {Container} from 'native-base';
import {ViewLeaderboardScreenView} from './ViewLeaderboardScreen';
import {ViewCliqueLeaderboardScreenController} from '../../controller/Leaderboard/ViewCliqueLeaderboardScreen';

export class ViewCliqueLeaderboardScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ViewCliqueLeaderboardScreenController(this);
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
