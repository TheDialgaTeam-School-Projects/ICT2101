import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {Button, Icon, Text} from 'native-base';
import {SideBarComponent} from './src/view/Component/SideBar';
import {GlobalCss} from './src/css/GlobalCss';
import {initRouteApi} from './src/service/RouteApiManagement';
import {LoginScreenView} from './src/view/Authentication/LoginScreen';
import {RegisterScreenView} from './src/view/Authentication/RegisterScreen';
import {ResetPasswordScreenView} from './src/view/Authentication/ResetPasswordScreen';
import MapScreenView from './src/view/Map/MapView';
import NavigationView from './src/view/Map/NavigationView';
import {ViewProfileScreenView} from './src/view/Profile/ViewProfileScreen';
import {EditProfileScreenView} from './src/view/Profile/EditProfileScreen';
import {ViewDailyTaskScreenView} from './src/view/Task/ViewDailyTaskScreen';
import {ViewWeeklyTaskScreenView} from './src/view/Task/ViewWeeklyTaskScreen';
import {ViewCliqueTaskScreenView} from './src/view/Task/ViewCliqueTaskScreen';
import {ViewIndividualLeaderboardScreenView} from './src/view/Leaderboard/ViewIndividualLeaderboardScreen';
import {ViewCliqueLeaderboardScreenView} from './src/view/Leaderboard/ViewCliqueLeaderboardScreen';
import {ViewAvailableCliqueScreenView} from './src/view/Clique/ViewAvailableCliqueScreen';
import {CreateCliqueScreenView} from './src/view/Clique/CreateCliqueScreen';
import {ViewCliqueProfileScreenView} from './src/view/Profile/ViewCliqueProfileScreen';
import {EditCliqueProfileScreenView} from './src/view/Profile/EditCliqueProfileScreen';
import {ViewRequestScreenView} from './src/view/Clique/ViewRequestScreen';

const createStackNavigatorWithoutSideBar = route => {
  return createStackNavigator(route, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      headerStyle: GlobalCss.headerStyle,
    }),
  });
};

const createStackNavigatorWithSideBar = (route, options = {}) => {
  return createStackNavigator(route, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: GlobalCss.headerStyle,
      headerLeft: (
        <Button transparent onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" />
        </Button>
      ),
      ...options,
    }),
  });
};

const createTabNavigator = route => {
  return createMaterialTopTabNavigator(route, {
    lazy: true,
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: '#94CBFF',
      },
      labelStyle: {
        color: '#000000',
        ...GlobalCss.fontStyleBold,
      },
      indicatorStyle: {
        backgroundColor: '#000000',
      },
    },
    defaultNavigationOptions: () => ({
      swipeEnabled: false,
    }),
  });
};

const defineScreen = (view, options) => {
  return {
    screen: view,
    navigationOptions: options,
  };
};

const routes = createSwitchNavigator({
  Authentication: createStackNavigatorWithoutSideBar({
    Login: defineScreen(LoginScreenView, () => ({headerShown: false})),
    Register: defineScreen(RegisterScreenView, () => ({title: 'Registration'})),
    ResetPassword: defineScreen(ResetPasswordScreenView, () => ({title: 'Reset Password'})),
  }),
  Home: createDrawerNavigator(
    {
      MapSection: createStackNavigatorWithSideBar({
        Map: defineScreen(MapScreenView, () => ({title: 'ScrambledTasks'})),
        NavigationView: defineScreen(NavigationView, () => ({title: 'NavigationView'})),
      }),

      ProfileSection: createStackNavigatorWithSideBar({
        ViewProfile: defineScreen(ViewProfileScreenView, ({navigation}) => ({
          title: "View User's Profile",
          headerRight: (
            <Button transparent onPress={() => navigation.navigate('EditProfile')}>
              <Text>Edit</Text>
            </Button>
          ),
        })),
        EditProfile: defineScreen(EditProfileScreenView, () => ({
          title: "Edit User's Profile",
          headerLeft: undefined,
        })),
      }),
      TaskSection: createStackNavigatorWithSideBar(
        {
          TaskTab: createTabNavigator({
            ViewDailyTask: defineScreen(ViewDailyTaskScreenView, () => ({title: 'Daily'})),
            ViewWeeklyTask: defineScreen(ViewWeeklyTaskScreenView, () => ({title: 'Weekly'})),
            ViewCliqueTask: defineScreen(ViewCliqueTaskScreenView, () => ({title: 'Clique'})),
          }),
        },
        {
          title: 'View Tasks',
        },
      ),
      ViewAvailableCliqueSection: createStackNavigatorWithSideBar({
        ViewAvailableClique: defineScreen(ViewAvailableCliqueScreenView, () => ({title: 'View Available Clique'})),
        CreateClique: defineScreen(CreateCliqueScreenView, () => ({
          title: 'Create Clique',
          headerLeft: undefined,
        })),
      }),
      ViewCliqueSection: createStackNavigatorWithSideBar({
        ViewCliqueProfile: defineScreen(ViewCliqueProfileScreenView, ({navigation}) => ({
          title: "View Clique's Profile",
          headerRight: (
            <Button transparent onPress={() => navigation.navigate('EditCliqueProfile')}>
              <Text>Edit</Text>
            </Button>
          ),
        })),
        EditCliqueProfile: defineScreen(EditCliqueProfileScreenView, () => ({
          title: 'Edit Clique Profile',
          headerLeft: undefined,
        })),

        ViewRequest: defineScreen(ViewRequestScreenView, () => ({
          title: 'View Request',
          headerLeft: undefined,
        })),
      }),
      LeaderboardSection: createStackNavigatorWithSideBar(
        {
          LeaderboardTab: createTabNavigator({
            ViewIndividualLeaderboard: defineScreen(ViewIndividualLeaderboardScreenView, () => ({title: 'Individual'})),
            ViewCliqueLeaderboard: defineScreen(ViewCliqueLeaderboardScreenView, () => ({title: 'Clique'})),
          }),
        },
        {
          title: 'View Leaderboard',
        },
      ),
    },
    {
      contentComponent: props => <SideBarComponent {...props} />,
    },
  ),
});

const AppContainer = createAppContainer(routes);

class App extends Component {
  constructor(props) {
    super(props);
    initRouteApi();
    YellowBox.ignoreWarnings(['VirtualizedLists']);
  }

  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('ScrambledTasks', () => App);
