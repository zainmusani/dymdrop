import {fork} from 'redux-saga/effects';
import user from './user';
import init from './init';
import pages from './pages';
import links from './links';
import passActvation from './passactivation';
import qrcode from './qrcode';
import team from './team';
import payment from './payment';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(pages);
  yield fork(links);
  yield fork(passActvation);
  yield fork(qrcode);
  yield fork(team);
  yield fork(payment);
}
