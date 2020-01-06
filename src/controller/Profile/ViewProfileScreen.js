import {Controller} from '../Controller';
import UserManagement from '../../service/UserManagement';

export class ViewProfileScreenController extends Controller {
  constructor(view) {
    super(view, {user: null});
    this.onWillFocus = this.onWillFocus.bind(this);
  }

  async onWillFocus() {
    let user = await UserManagement.getCurrentUserModel(true);

    let cliqueName = 'No clique';

    if (typeof user.cliqueId === 'string' && user.cliqueId !== '') {
      cliqueName = user.cliqueId;
    }

    this.state = {user: user, cliqueName: cliqueName};
  }
}
