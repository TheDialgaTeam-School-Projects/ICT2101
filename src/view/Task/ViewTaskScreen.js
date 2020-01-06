/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Accordion, Container, Icon, Text, View} from 'native-base';
import {ProgressBarComponent} from '../Component/ProgressBar';
import {GlobalCss} from '../../css/GlobalCss';

export class ViewTaskScreenView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const header = (item, expanded) => {
      return (
        <Grid
          style={{
            backgroundColor: '#C7E2FF',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginBottom: expanded ? 0 : GlobalCss.mb1.marginBottom,
            ...GlobalCss.p1,
            ...GlobalCss.alignItemsCenter,
          }}>
          <Col size={3}>
            <Text style={GlobalCss.fontStyleBold}>{item.title}</Text>
          </Col>
          <Col size={2} style={GlobalCss.alignItemsCenter}>
            <Text style={GlobalCss.fontStyleBold}>Points:</Text>
            <Text>{item.target}</Text>
          </Col>
          <Col size={2}>
            <Row style={GlobalCss.alignItemsCenter}>
              <ProgressBarComponent currentValue={item.progress} totalValue={item.target} />
            </Row>
          </Col>
          <Col size={1} style={GlobalCss.alignItemsFlexEnd}>
            {expanded ? (
              <Icon type="FontAwesome5" name="arrow-circle-up" />
            ) : (
              <Icon type="FontAwesome5" name="arrow-circle-down" />
            )}
          </Col>
        </Grid>
      );
    };

    const content = item => {
      return (
        <View style={GlobalCss.p1}>
          <Text>{item.instruction}</Text>
        </View>
      );
    };

    return (
      <Container style={GlobalCss.bodyStyle}>
        <Accordion style={GlobalCss.pt1} dataArray={this.props.data} renderHeader={header} renderContent={content} />
      </Container>
    );
  }
}
