import {Controller} from '../Controller';
import LeaderboardManagement from '../../service/LeaderboardManagement';

export class ViewIndividualLeaderboardScreenController extends Controller {
  constructor(view) {
    super(view, {leaderboard: []});
    this.willFocus = this.willFocus.bind(this);
  }

  async willFocus() {
    const leaderboardManagement = new LeaderboardManagement();
    const leaderboardUsers = await leaderboardManagement.leaderboardUsers();
    const leaderboardUsersState = [];

    leaderboardUsers.forEach(user => {
      leaderboardUsersState.push({profileName: user.username, points: user.taskPoint});
    });

    this.state = {leaderboard: leaderboardUsersState};
  }
}
