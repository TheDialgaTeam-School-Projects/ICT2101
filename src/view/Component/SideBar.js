import React, {Component} from 'react';
import {Container, Text, List, ListItem} from 'native-base';
import {LoadingModalComponent} from './LoadingModal';
import {GlobalCss} from '../../css/GlobalCss';
import {SideBarController} from '../../controller/Component/SideBar';

export class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.controller = new SideBarController(this);
    this.currentActiveItemKey = '';
  }

  componentDidMount() {
    this.controller.componentDidMount();
  }

  async componentDidUpdate(prevProps) {
    await this.controller.componentDidUpdate(prevProps);
  }

  render() {
    return (
      <Container style={GlobalCss.sidebarStyle}>
        <LoadingModalComponent visible={this.state.isLoading} />
        <List
          dataArray={this.state.routes}
          renderItem={({item, index}) => {
            return (
              <ListItem
                button
                selected={this.props.navigation.state.index === index}
                onPress={() => this.controller.onPressItem(item)}>
                <Text>{item.title}</Text>
              </ListItem>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    );
  }
}
