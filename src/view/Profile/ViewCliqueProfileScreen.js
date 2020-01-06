import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Container, Content, Button, Icon, Text, ListItem, List} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import {ViewCliqueProfileScreenController} from '../../controller/Clique/ViewCliqueProfileScreen';
import {ViewRequestScreenController} from '../../controller/Profile/ViewCliqueProfileScreen';
import TaskManagement from '../../service/TaskManagement';
import CliqueManagement from '../../service/CliqueManagement';

export class ViewCliqueProfileScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ViewCliqueProfileScreenController(this);
    this.controller2 = new ViewRequestScreenController(this);
    this.willFocusEvent = this.props.navigation.addListener('willFocus', this.controller.willFocus);
  }

  componentWillUnmount() {
    this.willFocusEvent.remove();
    //CliqueManagement.removeMember(item.profileName,this.state.cliqueName)
  }

  render() {
    return (
      <Container style={GlobalCss.bodyStyle}>
        <Content>
          <Grid style={GlobalCss.py1}>
            <Row style={{paddingTop: 10}}>
              <Col/>
              <Col style={GlobalCss.pr1}>
                <Button style={GlobalCss.buttonStyle} onPress={this.controller2.onPressViewRequest}>
                  <Text style={GlobalCss.buttonTextStyle}>View Request</Text>
                </Button>
              </Col>
              <Col>
                <Button style={GlobalCss.buttonStyle} onPress={() => {this.controller.deleteCliqueDatabase();}}>
                  <Text style={GlobalCss.buttonTextStyle}>Remove Clique</Text>
                </Button>
              </Col>
              <Col />
            </Row>
            <Row style={{...GlobalCss.justifyContentCenter, ...GlobalCss.alignItemsCenter, ...GlobalCss.py2}}>
              <Text style={GlobalCss.justifyContentCenter}>Clique Name: </Text>
              <Text>{this.state.cliqueName}</Text>
            </Row>
            <Row style={{borderWidth: 1, marginHorizontal: 25, ...GlobalCss.p1}}>
              <Text>{this.state.cliqueSynopsis}</Text>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col size={2}>
                <Text style={{width: '100%', textAlign: 'center'}}>Member List</Text>
              </Col>
              <Col>
                <Text style={{width: '100%', textAlign: 'center'}}>{this.state.cliqueMembers ? this.state.cliqueMembers.length : 0}/6</Text>
              </Col>
              <Col />
            </Row>
            <Row>
              <List
                dataArray={this.state.cliqueMembers ? this.state.cliqueMembers : []}
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
                      <Col size={2}>
                        <Text>{item.profileName}</Text>
                      </Col>
                      <Col size={1}>
                      </Col>
                      <Col size={1} style={GlobalCss.alignItemsFlexEnd}>
                        <Button small transparent onPress = {() => this.controller.onPressRemoveCliqueMember(item.profileName,this.state.cliqueLeader,this.state.cliqueName)}>
                          <Icon type="FontAwesome5" name="trash-alt" />
                        </Button>
                      </Col>
                    </Grid>
                  </ListItem>
                )}
                keyExtractor={item => item.profileName}
                style={GlobalCss.pt1}
              />
            </Row>
            <Row>
              <Col>
              </Col>
              <Col>
                <Button style={GlobalCss.buttonStyle} onPress={()=>this.controller.onPressLeaveClique(this.state.cliqueLeader,this.state.cliqueName)}>
                  <Text style={GlobalCss.buttonTextStyle}>Leave</Text>
                </Button>
              </Col>
              <Col>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
