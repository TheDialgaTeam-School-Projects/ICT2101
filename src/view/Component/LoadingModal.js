/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Modal} from 'react-native';
import {Spinner, View} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';

export class LoadingModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.visible}>
        <View
          style={{
            flex: 1,
            ...GlobalCss.justifyContentCenter,
            ...GlobalCss.alignItemsCenter,
            backgroundColor: 'rgba(0,0,0,0.50)',
          }}>
          <Spinner color="blue" />
        </View>
      </Modal>
    );
  }
}
