import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {setupStripeAccount, addCardResponse} from '../../actions/PaymentAction';
import {SpinnerComponent} from '../../components';
import {Image, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {Images, Metrics, Colors} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';

function PaymentWebView(props) {
  const [loading, setLoading] = useState(true);
  const {incomingURL, fromPayment} = props;
  const dispatch = useDispatch();
  const handleNavigation = event => {
    const {loading} = event;
    if (!loading) {
      setLoading(false);
    }
    console.log('title', event);
    if (event?.url?.includes('type=success')) {
      setLoading(true);
      dispatch(
        setupStripeAccount({account_setup: true}, () => {
          setLoading(false);
          if (fromPayment) {
            dispatch(addCardResponse({type: 'success'}));
            Actions.pop();
          } else {
            Actions.reset('dashboard', {
              isAccountSetupAlert: true,
            });
          }
        }),
      );
    } else if (event?.url?.includes('type=fail')) {
      setLoading(true);
      dispatch(
        setupStripeAccount({account_setup: false}, res => {
          setLoading(false);
          if (fromPayment) {
            dispatch(addCardResponse({type: 'error', message: res.message}));
            Actions.pop();
          } else {
            Actions.reset('dashboard', {
              isQrCodeScannedError: true,
              QrCodeScannedError: res.message,
            });
          }
        }),
      );
    }
  };

  const onMessageEvent = event => {
    console.log('event', event);
    // if (
    //   util.areValuesEqual(event.nativeEvent.data, "accountCreationComplete")
    // ) {
    //   const payload = {
    //     stripeAccountId: stripeAccountId,
    //   };

    //   dispatch(
    //     withDrawAddCardRequest(payload, (res) => {
    //       if (res) {
    //         Actions.pop();
    //         dispatch(afterAddWithdrawCard(true));
    //       }
    //     })
    //   );
    // util.topAlert("Account added Successfully");
  };
  const backBtnSec = () => (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={[styles.backBtnStyle, {top: 60, left: 20}]}>
      <Image source={Images.BackButtonIcon} style={styles.backbtnIconStyle} />
    </TouchableOpacity>
  );
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={Colors.black} />
    </View>
  );

  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{height: Metrics.screenHeight, backgroundColor: 'white'}}>
        <SpinnerComponent isLoading={loading} />
        {!loading && backBtnSec()}
        <View style={{height: Metrics.screenHeight, marginTop: 30}}>
          <WebView
            originWhitelist={['*']}
            style={{flex: 1, marginTop: 25}}
            source={{uri: incomingURL}}
            startInLoadingState={true}
            renderLoading={Spinner}
            showsHorizontalScrollIndicator={false}
            scalesPageToFit
            onNavigationStateChange={handleNavigation}
            onMessage={event => onMessageEvent(event)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

PaymentWebView.propTypes = {
  incomingURL: PropTypes.string,
  fromPayment: PropTypes.bool,
};

PaymentWebView.defaultProps = {
  incomingURL: 'https://www.google.com',
  fromPayment: false,
};

export default PaymentWebView;
