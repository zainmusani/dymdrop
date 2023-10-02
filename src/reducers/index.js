import {combineReducers} from 'redux';

import navigator from './navigator';
import team from './team';
import user from './user';
import pages from './pages';
import links from './links';
import passActivations from './passActivations';
import general from './general';
import payment from './payment';

export default combineReducers({
  route: navigator,
  user,
  team,
  payment,
  pages,
  links,
  passActivations,
  general,
});
