import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TextInput, Modal, StyleSheet, Text, SafeAreaView, View, FlatList} from 'react-native';
import CliqueManagement from '../../service/CliqueManagement';
import UpdateProfileManagement from '../../service/UpdateProfileManagement';
import { Container, Button, Icon, Header, Content, Card, CardItem, Body } from "native-base";

export default class CliqueProfile extends Component {
  constructor(props) {
    super(props);

    this.controller = new UpdateProfileManagement();
    this.controller2 = new CliqueManagement();
    this.state = {
    cliqueSelected: this.props.navigation.state.params,
    isVisible: false
    };
  }

  handlerAcceptMember = (request)=>{
    this.controller2.acceptCliqueMember(request,this.state.cliqueSelected.cliqueName).then(()=>{
      this.forceUpdate();
    });
  }

   render() {
        return(
          <Container>
            <Content padder>
            <Card>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Clique Name</Text>
                            <Text style={{fontSize: 16}}>{this.state.cliqueSelected.cliqueName}</Text>
                            <Text></Text>
                        </View>
                        <View>
                            <Modal
                              animationType = {"fade"}
                              transparent = {false}
                              visible = {this.state.isVisible}>
                                <View style={{width: "80%", height: "50%", margin: 30, alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={{fontSize: 28}}>Clique Name: </Text>
                                  <TextInput style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, width: '80%' }}
                                    placeholder="New Clique Name"
                                    onChangeText={(value) => this.setState({cliqueName: value})}/>
                                  <Button onPress= {() => {
                                      this.setState({ isVisible:!this.state.isVisible});
                                      this.controller.updateCliqueName(this.state.cliqueName);
                                      let updates = this.state.cliqueSelected;
                                      updates.cliqueName = this.state.cliqueName;
                                      this.setState({cliqueSelected: updates});
                                      }}
                                      style= {{justifyContent: 'center', width: '50%'}}>
                                  <Text style={{color: 'white', alignItems: 'center', justifyContent: 'center'}}>Update</Text>
                                  </Button>
                                </View>
                            </Modal>
                            <Button
                                transparent
                                onPress={() => {this.setState({ isVisible: true})}}>
                                <Icon type="FontAwesome5" name="pencil-alt" />
                            </Button>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Clique Information</Text>
                             <Text style={{fontSize: 16}}>{this.state.cliqueSelected.cliqueInformation}</Text>
                            <Text></Text>
                        </View>
                        <View>
                            <Modal
                              animationType = {"fade"}
                              transparent = {false}
                              visible = {this.state.isVisible}>
                                <View style={{width: "80%", height: "50%", margin: 30, alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={{fontSize: 28}}>Clique Information: </Text>
                                  <TextInput style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, width: '80%' }}
                                    placeholder="New Clique Information"
                                    onChangeText={(value) => this.setState({cliqueInformation: value})}/>
                                  <Button onPress= {() => {
                                      this.setState({ isVisible:!this.state.isVisible});
                                      this.controller.updateCliqueInfo(this.state.cliqueInformation);
                                      let updateInfo = this.state.cliqueSelected;
                                      updateInfo.cliqueInformation = this.state.cliqueInformation;
                                      this.setState({cliqueSelected: updateInfo});
                                      }}
                                      style= {{justifyContent: 'center', width: '50%'}}>
                                  <Text style={{color: 'white', alignItems: 'center', justifyContent: 'center'}}>Update</Text>
                                  </Button>
                                </View>
                            </Modal>
                            <Button
                                transparent
                                onPress={() => {this.setState({ isVisible: true})}}>
                                <Icon type="FontAwesome5" name="pencil-alt" />
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Clique Task Points</Text>
                        <Text style={{fontSize: 16}}>{this.state.cliqueSelected.cliqueTaskPoint}</Text>
                        <Text></Text>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Clique Leader</Text>
                        <Text style={{fontSize: 16}}>{this.state.cliqueSelected.cliqueLeader}</Text>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, borderBottomWidth: 3, width: "40%", borderColor: 'gainsboro'}}>Clique Members</Text>
                    {this.state.cliqueSelected.cliqueMembers.map((member, index) => (
                        <View key={index} style={{ width: "40%", borderBottomWidth: 3, borderColor: 'gainsboro', padding: 10 }}>
                            <Text style={{fontSize: 16}}>{member}</Text>
                            <Button bordered onPress={()=>this.controller2.removeMember(member,this.state.cliqueSelected.cliqueName)}>
                                <Text>Remove</Text>
                            </Button>
                        </View>
                    )
                    )}
                </View>
                <View style={{padding: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, borderBottomWidth: 3, width: "40%", borderColor: 'gainsboro'}}>Clique Request</Text>
                    {this.state.cliqueSelected.cliqueRequest.map((request, index) => (
                        <View key={index} style={{ width: "40%", borderBottomWidth: 3, borderColor: 'gainsboro', padding: 10 }}>
                            <Text style={{fontSize: 16}}>{request}</Text>
                            <Button bordered onPress={()=>this.handlerAcceptMember(request)}>
                                <Text>Accept</Text>
                            </Button>
                            <Button bordered onPress={()=>this.controller2.rejectRequestMember(request,this.state.cliqueSelected.cliqueNam)}>
                                <Text>Reject</Text>
                            </Button>
                        </View>
                    )
                    )}
                </View>
            </Card>
            </Content>
            </Container>
        );
   }


}
