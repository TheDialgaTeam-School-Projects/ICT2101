/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Col, Grid} from 'react-native-easy-grid';
import {Container, List, ListItem, Text} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';

export class ViewLeaderboardScreenView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={GlobalCss.bodyStyle}>
        <List
          dataArray={this.props.data}
          renderItem={({item, index}) => (
            <ListItem
              noIndent
              style={{
                backgroundColor: '#C7E2FF',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#000000',
                ...GlobalCss.mb1,
              }}>
              <Grid>
                <Col size={1}>
                  <Text style={{color: index < 3 ? 'red' : '#000000'}}>{index + 1}.</Text>
                </Col>
                <Col size={2}>
                  <Text style={{color: index < 3 ? 'red' : '#000000'}}>{item.profileName}</Text>
                </Col>
                <Col size={1}>
                  <Text style={{color: index < 3 ? 'red' : '#000000'}}>{item.points}</Text>
                </Col>
              </Grid>
            </ListItem>
          )}
          keyExtractor={item => item.profileName}
          style={GlobalCss.pt1}
        />
      </Container>
    );
  }
}
