// @flow
import _ from 'lodash';
import {connect, useDispatch} from 'react-redux';
import React, {Component} from 'react';
import {View, Linking, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {Colors, Images} from '../../theme';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';
import {updateUserDataRequest} from '../../actions/UserActions';
import {addInvitedUser, confirmTeamInvitation} from '../../actions/teamAction';
import DataHandler from '../../services/DataHandler';
class Welcome extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  redirectToScreenSec = (isBlockedAlert, role, email, page, name) => {
    const {initialAppRun} = this.props;
    const userData = {...DataHandler.getStore().getState().user.data};
    SplashScreen.hide();
    if (!_.isEmpty(userData) && userData.isFormSubmitted) {
      if (!userData.isUserApproved) {
        Actions.reset('dashboard', {isBlockedAlert});
      } else {
        if (role) {
          // Actions.reset('dashboard', {
          //   isUserInvited: role === 'creator' || role === 'teammate',
          //   invitedPage: page,
          //   invitedName: name,
          // });
          DataHandler.getStore().dispatch(
            confirmTeamInvitation(page, res => {
              if (res.authorize && res.status) {
                DataHandler.getStore().dispatch(
                  addInvitedUser({
                    pageid: page,
                    pageowner: name,
                  }),
                );
              }
              Actions.reset('dashboard');
            }),
          );
        } else {
          Actions.reset('dashboard');
        }
      }
    } else if (!_.isEmpty(userData) && !userData.isFormSubmitted) {
      Actions.reset('applyForm');
    } else {
      if (role === 'invitee') {
        Actions.reset('signup', {
          isInvited: true,
          invitedPage: page,
          invitedOwner: name,
          emailAddress: email,
        });
      } else {
        if (initialAppRun) {
          Actions.reset('signup');
        } else {
          Actions.reset('tourScreens');
        }
      }
    }
  };

  deepLinkNavigation = url => {
    console.log('<<<<<<<<<<<<<< HELLO AAA >>>>>>>>>>>>>>>>>>>>>');
    const {initialAppRun, updateUserDataRequest} = this.props;
    const userData = {...DataHandler.getStore().getState().user.data};
    let userrole = null;
    let useremail = null;
    let username = null;
    let pageid = null;
    if (url) {
      let splitedurl = url?.toString().split('/');
      userrole = splitedurl[3];
      pageid = splitedurl[4];
      useremail = splitedurl[5];
      username = splitedurl[6];
    }
    let isBlockedAlert = true;
    if (!_.isEmpty(userData)) {
      updateUserDataRequest(res => {
        SplashScreen.hide();
        if (res.status) {
          isBlockedAlert = false;
        }
        this.redirectToScreenSec(
          isBlockedAlert,
          userrole,
          useremail,
          pageid,
          username,
        );
      });
    } else {
      if (initialAppRun) {
        SplashScreen.hide();
      }
      setTimeout(() => {
        this.redirectToScreenSec(true, userrole, useremail, pageid, username);
      }, 0);
    }
  };

  handleOpenUrl = event => {
    let {url} = event || {};
    this.deepLinkNavigation(url);
  };
  componentDidMount() {
    const userData = DataHandler.getStore().getState().user.data;

    Linking.addEventListener('url', this.handleOpenUrl);
    Linking.getInitialURL()
      .then(url => {
        this.handleOpenUrl({url});
      })
      .catch(console.error);
  }

  render() {
    const {initialAppRun} = this.props;
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: initialAppRun ? Colors.grey6 : Colors.black},
        ]}>
        <Image source={Images.logo} style={styles.image} />
        {/* <DoubleBounce size={15} color={Colors.blue2} /> */}
      </View>
    );
  }
}

Welcome.propTypes = {userData: PropTypes.object, initialAppRun: PropTypes.bool};
Welcome.defaultProps = {userData: {}, initialAppRun: false};

const mapStateToProps = ({user, general}) => ({
  userData: user.data,
  initialAppRun: general.initialAppRun,
});

const actions = {updateUserDataRequest};

export default connect(mapStateToProps, actions)(Welcome);
