import {Controller} from '../Controller';
import LeaderboardManagement from '../../service/LeaderboardManagement';

export class ViewCliqueLeaderboardScreenController extends Controller {
  constructor(view) {
    super(view, {leaderboard: []});
    this.willFocus = this.willFocus.bind(this);
  }

  async willFocus() {
    const leaderboardManagement = new LeaderboardManagement();
    const leaderboardCliques = await leaderboardManagement.leaderboardCliques();
    const leaderboardCliquesState = [];

    leaderboardCliques.forEach(clique => {
      leaderboardCliquesState.push({profileName: clique.cliqueName, points: clique.cliqueTaskPoint});
    });

    this.state = {leaderboard: leaderboardCliquesState};
  }
}
