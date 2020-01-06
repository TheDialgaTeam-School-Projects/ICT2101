import {Controller} from '../Controller';

export class ViewAvailableCliqueScreenController extends Controller {
  constructor(view) {
    super(view);
    this.onPressCreateClique = this.onPressCreateClique.bind(this);
  }

  onPressCreateClique() {
    this.navigate('CreateClique');
  }
}
