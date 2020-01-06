import React, {Component} from 'react';
import {Container} from 'native-base';
import {ViewTaskScreenView} from './ViewTaskScreen';
import UserManagement from '../../service/UserManagement';

export class ViewWeeklyTaskScreenView extends Component {
  constructor(props) {
    super(props);
    this.state = {weeklyTaskArray: []};
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.willFocus.bind(this));
  }

  async willFocus() {
    const getUserLogIn = await UserManagement.getCurrentUserModel(true);
    //console.log(getUserLogIn.docData.Daily1);
    let storeWeekly = [];
    storeWeekly.push(getUserLogIn.docData.Weekly1);
    storeWeekly.push(getUserLogIn.docData.Weekly2);
    storeWeekly.push(getUserLogIn.docData.Weekly3);
    this.setState({weeklyTaskArray: storeWeekly});
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
  }

  render() {
    // TODO: This is a hardcoded data and should not be used as the final product.
    const testData = this.state.weeklyTaskArray;
    // [
    //   {
    //     title: 'Walk 500m',
    //     points: 500,
    //     description: 'You have to walk 500m in order to complete this task.',
    //   },
    //   {
    //     title: 'Walk 1km',
    //     points: 500,
    //     description: 'You have to walk 1km in order to complete this task.',
    //   },
    // ];

    return (
      <Container>
        <ViewTaskScreenView data={testData} />
      </Container>
    );
  }
}
