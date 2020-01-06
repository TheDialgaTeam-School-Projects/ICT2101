import {Alert} from 'react-native';
import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class SideBarController extends Controller {
  constructor(view) {
    super(view, {isLoading: false});
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.onPressLogout = this.onPressLogout.bind(this);
  }

  componentDidMount() {
    this.state = {
      routes: [
        {
          title: 'Map',
          route: 'Map',
        },
        {
          title: "View User's Profile",
          route: 'ViewProfile',
        },
        {
          title: 'View Tasks',
          route: 'ViewDailyTask',
        },
        {
          title: 'View Available Clique',
          route: 'ViewAvailableClique',
        },
        {
          title: 'View Leaderboard',
          route: 'ViewIndividualLeaderboard',
        },
        {
          title: 'Logout',
          action: this.onPressLogout,
        },
      ],
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.view.currentActiveItemKey !== prevProps.activeItemKey) {
      this.view.currentActiveItemKey = prevProps.activeItemKey;

      const userModel = await UserManagement.getCurrentUserModel(false);

      if (typeof userModel.cliqueId !== 'string' || userModel.cliqueId === '') {
        if (this.state.routes[2].title === "View Clique's Profile") {
          this.state.routes.splice(2, 1);
        }

        if (this.state.routes[3].title !== 'View Available Clique') {
          this.state.routes.splice(3, 0, {
            title: 'View Available Clique',
            route: 'ViewAvailableClique',
          });
        }
      } else {
        if (this.state.routes[3].title === 'View Available Clique') {
          this.state.routes.splice(3, 1);
        }

        if (this.state.routes[2].title !== "View Clique's Profile") {
          this.state.routes.splice(2, 0, {
            title: "View Clique's Profile",
            route: 'ViewCliqueProfile',
          });
        }
      }

      this.state = {routes: this.state.routes};
    }
  }

  /**
   * This event triggers when the sidebar button is pressed.
   * @param {Object} item Current button.
   */
  onPressItem(item) {
    if (typeof item.action === 'function') {
      item.action();
    } else {
      this.navigate(item.route);
    }
  }

  /**
   * This event triggers when the logout button is pressed.
   * @returns {Promise<void>}
   */
  async onPressLogout() {
    try {
      Alert.alert('', 'Do you wish to logout?', [
        {
          text: 'Yes',
          onPress: async () => {
            this.state = {isLoading: true};
            await UserManagement.logout();
            this.state = {isLoading: false};
            this.navigate('Login');
          },
        },
        {text: 'No'},
      ]);
    } catch (e) {
      Alert.alert(e.title, e.message, [{text: 'OK', onPress: () => (this.state = {isLoading: false})}]);
    }
  }
}
