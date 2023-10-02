// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';

import styles from './styles';
import {Colors} from '../theme';
import {BASE_URL} from '../config/WebService';
import {
  ApplyForm,
  Dashboard,
  ForgotPassword,
  LoaderScreen,
  Login,
  Page,
  PaymentPlan,
  ResetPassword,
  Settings,
  Signup,
  VerificationCode,
  WebViewContainer,
  PaymentWebView,
  Welcome,
  TourScreens,
  ManageActivation,
  QrCodeScanner,
  Payment,
  Team,
} from '../containers';

function onBackPress() {
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Scene key="welcome" component={Welcome} hideNavBar initial />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="signup" component={Signup} hideNavBar />
    <Scene key="loaderScreen" component={LoaderScreen} hideNavBar />
    <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />
    <Scene key="verificationCode" component={VerificationCode} hideNavBar />
    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
    <Scene key="dashboard" component={Dashboard} hideNavBar />
    <Scene key="page" component={Page} hideNavBar />
    <Scene key="settings" component={Settings} hideNavBar />
    <Scene key="paymentPlan" component={PaymentPlan} hideNavBar />
    <Scene key="applyForm" component={ApplyForm} hideNavBar />
    <Scene key="webContainer" component={WebViewContainer} hideNavBar />
    <Scene key="paymentWebContainer" component={PaymentWebView} hideNavBar />
    <Scene key="tourScreens" component={TourScreens} hideNavBar />
    <Scene key="manageactivation" component={ManageActivation} hideNavBar />
    <Scene key="qrcodescanner" component={QrCodeScanner} hideNavBar />
    <Scene key="payment" component={Payment} hideNavBar />
    <Scene key="team" component={Team} hideNavBar />
  </Stack>,
);

export default () => {
  const linking = {
    prefixes: [BASE_URL, ''],
  };
  return (
    <AppNavigator
      linking={linking}
      navigator={navigator}
      backAndroidHandler={onBackPress}
    />
  );
};

const AppNavigator = connect()(Router);
