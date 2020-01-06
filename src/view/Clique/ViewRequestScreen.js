import React, {Component} from 'react';
import {Col, Grid} from 'react-native-easy-grid';
import {Container, List, ListItem, Text,Button} from 'native-base';
import {GlobalCss} from '../../css/GlobalCss';
import CliqueManagement from '../../service/CliqueManagement';
import UserManagement from '../../service/UserManagement';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export class ViewRequestScreenView extends Component {
  constructor(props) {
    super(props);
    this.state = {cliqueRequestList: [],cliqueName: "",cliqueLeader:""};
  }

  async componentDidMount(){
      const userModel = await UserManagement.getCurrentUserModel(true);
      let cliqueData = await CliqueManagement.getOneClique(userModel.cliqueId);
      let memberArray = [];
      //console.log(cliqueData.cliqueRequest);
      for(var i=0;i<cliqueData.cliqueRequest.length;i++){
          memberArray.push({requestName:cliqueData.cliqueRequest[i]})
      }
      this.setState({cliqueRequestList:memberArray,cliqueName: cliqueData.cliqueName,cliqueLeader:cliqueData.cliqueLeader});
      //console.log(this.state.cliqueRequest);
  }
  /*
  create the function
    call the accept method
    than reinput the setState
  */
    async onAcceptMember(getRequestMember,cliqueName){
        const userModel = await UserManagement.getCurrentUserModel(true);
        if(userModel.username == this.state.cliqueLeader){

            await CliqueManagement.acceptCliqueMember(getRequestMember,cliqueName);
            const userModel = await UserManagement.getCurrentUserModel(true);
            let cliqueData = await CliqueManagement.getOneClique(userModel.cliqueId);
            let memberArray = [];
            for(var i=0;i<cliqueData.cliqueRequest.length;i++){
                memberArray.push({requestName:cliqueData.cliqueRequest[i]})
            }
            this.setState({cliqueRequestList:memberArray,cliqueName: cliqueData.cliqueName});


        }else{
          Alert.alert('Error', 'You are not clique leader', [
            {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
          ]);
        }

    }//end of accept member
    async onRejectMember(getRequestMember,cliqueName){
        const userModel = await UserManagement.getCurrentUserModel(true);
        if(userModel.username == this.state.cliqueLeader){
            await CliqueManagement.rejectRequestMember(getRequestMember,cliqueName)
            const userModel = await UserManagement.getCurrentUserModel(true);
            let cliqueData = await CliqueManagement.getOneClique(userModel.cliqueId);
            let memberArray = [];
            for(var i=0;i<cliqueData.cliqueRequest.length;i++){
                memberArray.push({requestName:cliqueData.cliqueRequest[i]})
            }
            this.setState({cliqueRequestList:memberArray,cliqueName: cliqueData.cliqueName});


        }else{
          Alert.alert('Error', 'You are not clique leader', [
            {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
          ]);
        }

    }


  render() {

    // TODO: This is a hardcoded data and should not be used as the final product.
      const testData = this.state.cliqueRequestList;

    return (
      <Container style={GlobalCss.bodyStyle}>
        <List
          dataArray={testData}
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
                  <Text>{index + 1}.</Text>
                </Col>
                <Col size={1}>
                  <Text>{item.requestName}</Text>
                </Col>
                <Col>
                </Col>
                <Col size={2}>
                <Button small style={GlobalCss.buttonStyle} onPress={()=>this.onAcceptMember(item.requestName,this.state.cliqueName)}>
                  <Text style={GlobalCss.buttonTextStyle}>Accept</Text>
                </Button>
                </Col>
                <Col size={2}>
                <Button small style={GlobalCss.buttonStyle} onPress={()=>this.onRejectMember(item.requestName,this.state.cliqueName)}>
                  <Text style={GlobalCss.buttonTextStyle}>Reject</Text>
                </Button>
                </Col>
              </Grid>
            </ListItem>
          )}
          keyExtractor={item => item.requestName}
          style={GlobalCss.pt1}
        />
      </Container>
    );
  }
}
