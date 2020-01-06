import React, {Component} from 'react';
import {Container} from 'native-base';
import {ViewTaskScreenView} from './ViewTaskScreen';
import UserManagement from '../../service/UserManagement';
import {Clique} from '../../model/Clique';
import firestore from '@react-native-firebase/firestore';

export class ViewCliqueTaskScreenView extends Component {
  constructor(props) {
    super(props);
    this.state = {cliqueTaskArray: []};
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.willFocus.bind(this));
  }

  async willFocus() {
    const getUserLogIn = await UserManagement.getCurrentUserModel(true);
    //console.log(getUserLogIn.docData.Daily1);
    if (getUserLogIn.cliqueId !== '') {
      try {
        const querySnap = await firestore()
          .collection('cliques')
          .where('cliqueName', '==', getUserLogIn.cliqueId)
          .get();
        let result;
        querySnap.forEach(documentSnapshot => {
          const cliqueModel = new Clique();
          cliqueModel.deserializeFromFirestore(documentSnapshot);
          result = cliqueModel;
        });
        //console.log(result);
        let cliqueArray = [];
        cliqueArray.push(result.docData.cliqueTask1);
        cliqueArray.push(result.docData.cliqueTask2);
        cliqueArray.push(result.docData.cliqueTask3);
        this.setState({cliqueTaskArray: cliqueArray});
      } catch (e) {
        console.log({title: 'Error', message: e.message});
      }
    }
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
  }

  render() {
    // TODO: This is a hardcoded data and should not be used as the final product.
    const testData = this.state.cliqueTaskArray;
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
