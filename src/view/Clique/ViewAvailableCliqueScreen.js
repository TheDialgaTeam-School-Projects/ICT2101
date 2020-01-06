/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Accordion, Container, Button, Icon, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalCss} from '../../css/GlobalCss';
import {ViewAvailableCliqueScreenController} from '../../controller/Clique/ViewAvailableCliqueScreen';
import CliqueManagement from '../../service/CliqueManagement';
import UserManagement from '../../service/UserManagement';


export class ViewAvailableCliqueScreenView extends Component {
  constructor(props) {
    super(props);
    this.controller = new ViewAvailableCliqueScreenController(this);

    // this.getData = extractData();
    //let extraData = [];
    //getAllCliqueArray = this.getClique.getAllCliques;
    //console.log(getAllCliqueArray);
    //console.log("Testing");
  }
  

  async componentDidMount(){
    let getAllCliqueArray = await CliqueManagement.getAllCliques();
    //console.log(getAllCliqueArray[0].docId);
    let result = [];
    for(var i=0;i<getAllCliqueArray.length;i++){
      result.push({docID:getAllCliqueArray[i].docId,cliqueName:getAllCliqueArray[i].cliqueName,cliqueSynopsis:getAllCliqueArray[i].cliqueSynopsis,members:getAllCliqueArray[i].cliqueMembers.length,});
    }
    const userModel = await UserManagement.getCurrentUserModel(true);
    this.setState({arrayData: getAllCliqueArray,getUserName: userModel.username});


  }

  render() {
      this.state.arrayData ? this.state.arrayData: [];
      this.state.getUserName ? this.state.getUserName: "";
      //console.log(this.state.getUserName);
      //console.log(this.state.arrayData);
      const cliqueData = this.state.arrayData;



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
            <Text style={GlobalCss.fontStyleBold}>{item.cliqueName}</Text>
          </Col>
          <Col size={2}>
            <Row style={GlobalCss.alignItemsCenter}>
              <Text style={GlobalCss.fontStyleBold}>Members: </Text>
              <Text>{item.cliqueMembers.length}/6</Text>
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
        <Grid style={{backgroundColor: '#F2F8FF', ...GlobalCss.p1, ...GlobalCss.mb1}}>
          <Row style={GlobalCss.py1}>
            <Text>{item.cliqueSynopsis}</Text>
          </Row>
          <Row>
            <Col />
            <Col>
              <Button style={GlobalCss.buttonStyle} onPress= {() => CliqueManagement.joinClique(this.state.getUserName,item.cliqueName)}>
                <Text style={GlobalCss.buttonTextStyle} >Apply</Text>
              </Button>
            </Col>
            <Col />
          </Row>
        </Grid>
      );
    };

    return (
      <Container style={GlobalCss.bodyStyle}>
        <Grid style={GlobalCss.py1}>
          <Row>
            <Col/>
            <Col>
              <Button style={GlobalCss.buttonStyle} onPress={this.controller.onPressCreateClique}>
                <Text style={GlobalCss.buttonTextStyle}>Create Clique</Text>
              </Button>
            </Col>
            <Col />
          </Row>
          <Row size={10}>
            <Accordion style={GlobalCss.pt1} dataArray={cliqueData} renderHeader={header} renderContent={content} />
          </Row>
        </Grid>
      </Container>
    );
  }
}
