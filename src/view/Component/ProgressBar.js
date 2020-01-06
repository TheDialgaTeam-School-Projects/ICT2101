/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';

export class ProgressBarComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{borderWidth: 1, width: '100%', ...GlobalCss.justifyContentCenter}}>
        <View
          style={{
            width: (this.props.currentValue / this.props.totalValue) * 100 + '%',
            height: '100%',
            backgroundColor: '#FF708D',
          }}>
          <View />
        </View>
        <Text style={{position: 'absolute', zIndex: 1, alignSelf: 'center', ...GlobalCss.fontStyleBold}}>
          {this.props.currentValue}/{this.props.totalValue}
        </Text>
      </View>
    );
  }
}
