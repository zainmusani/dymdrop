// @flow
import PropTypes from 'prop-types';
import React, {useCallback, useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {ISOToFormat} from '../../helpers/DateTimeHelpers';
import moment from 'moment';
import {
  viewStripeAccount,
  addCardDetails,
  removeCardResponse,
  getPaymentDetailRequest,
  payoutStripeAmount,
} from '../../actions/PaymentAction';
import {AlertModal, MainScreensHeader, Button, Text} from '../../components';
import {
  ALERT_TIMER,
  TIME_FORMAT1,
  DATE_FORMAT1,
  DATE_FORMAT2,
} from '../../constants';
import Spinner from 'react-native-spinkit';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function Payment(props) {
  const {paymentDetails, paymentResponse} = props;
  const [alertModal, setAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewLoading, setViewLoading] = useState(false);
  const [isPayoutViewLoading, setPayoutViewLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isPayoutLoading, setPayoutLoading] = useState(false);
  const [isMoreData, setMoreData] = useState(false);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] = useState(
    () => '',
  );
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();

  const addCardDetailHandler = () => {
    setPaymentLoading(true);
    dispatch(
      addCardDetails(res => {
        setPaymentLoading(false);
        if (res.status) {
          console.log('ress', res.data);
          Actions.push('paymentWebContainer', {
            incomingURL: res.data.url,
            fromPayment: true,
          });
        } else {
          setHasError(true);
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  };

  const getPaymentDetailRequestHandler = () => {
    dispatch(
      getPaymentDetailRequest(() => {
        setIsLoading(false);
      }),
    );
    dispatch(removeCardResponse());
  };

  const viewStripeAccountHandler = isStripePayout => {
    if (isStripePayout) {
      setPayoutViewLoading(true);
    } else {
      setViewLoading(true);
    }
    dispatch(
      viewStripeAccount(res => {
        if (isStripePayout) {
          setPayoutViewLoading(false);
        } else {
          setViewLoading(false);
        }
        if (res.status) {
          Actions.push('webContainer', {incomingURL: res.data.url});
        } else {
          setHasError(true);
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
        console.log('res', res);
      }),
    );
  };

  const payoutStripeAmountHandler = () => {
    // if (paymentDetails.availableBalance >= paymentDetails.stripeBalance) {
    //   setHasError(true);
    //   setResponseMessageFromApiCall('App is facing some technical issues');
    //   setAlertModal(true);
    //   return;
    // }
    let payload = {
      available_amount: paymentDetails.availableBalance,
    };
    setPayoutLoading(true);
    dispatch(
      payoutStripeAmount(payload, res => {
        setPayoutLoading(false);
        if (res.status) {
          getPaymentDetailRequestHandler();
        } else {
          setHasError(true);
        }
        setResponseMessageFromApiCall(res.message);
        setAlertModal(true);
      }),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getPaymentDetailRequestHandler();
  }, []);
  useEffect(() => {
    if (paymentResponse) {
      setAlertModal(true);
      setResponseMessageFromApiCall(paymentResponse.message);
      if (paymentResponse.type === 'error') setHasError(true);
      getPaymentDetailRequestHandler();
    }
  }, [paymentResponse]);

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setHasError(false);
      setAlertModal(false);
      setResponseMessageFromApiCall('');
    }, ALERT_TIMER);
    return (
      <AlertModal
        getAlertText={getAlertText}
        hasError={hasError}
        styleSpacingFromTopofScreen={{
          top: util.isPlatformAndroid()
            ? Metrics.screenHeight / 9.8
            : Metrics.screenHeight / 19,
        }}
      />
    );
  }, [alertModal]);

  const getAlertText = () => {
    if (!util.isEmptyValue(responseMessageFromApiCall)) {
      return responseMessageFromApiCall;
    }
    return 'Account Setup Successfully';
  };

  //  HEADER SEC
  const headerSec = () => (
    <View
      style={{
        paddingTop: Metrics.baseMargin,
      }}>
      <MainScreensHeader
        headerText={'Payment'}
        borderWidth={paymentDetails.status ? 0 : null}
        headerAlign="center"
        firstIcon={Images.BackButtonIcon}
        hasCustomMargin={true}
        firstIconAction={() => {
          Actions.pop();
        }}
      />
    </View>
  );

  //  ADD PAYMENT SEC
  const addPaymentSec = () => (
    <View style={styles.paymentBox}>
      <Text size={16} color={Colors.text.neka} type="regular">
        We use Stripe to make sure you get paid on time and to keep your
        personal bank and details secure. Click Save and continue to set up your
        payments on Stripe.
      </Text>

      <TouchableOpacity
        onPress={() => {
          addCardDetailHandler();
        }}
        style={[
          AppStyles.flexRow,
          styles.setupPaymentBtn,
          {alignItems: 'center'},
        ]}>
        <View style={{paddingLeft: 6}}>
          <Text type="semiBold" size={16} style={{marginBottom: 4}}>
            Set Up Payment
          </Text>
          <Text type="medium" size={14} color="rgba(51, 50, 64, 0.7)">
            Continue on Stripe
          </Text>
        </View>
        <View style={AppStyles.centerInner}>
          {paymentLoading ? (
            <Spinner
              style={{right: 15}}
              isVisible={paymentLoading}
              size={18}
              type={'FadingCircleAlt'}
              color={Colors.black}
            />
          ) : (
            <Image
              source={Images.ArrowIconBlack}
              style={{width: 32, height: 32}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  //  EARNING SECS
  const earningSec = () => (
    <View style={styles.earningBox}>
      {earningTitleSec()}
      {earningBalanceSec()}
      {earningPayoutSec()}
      <View style={styles.bottomLine} />
      <Text type="bold" size={18}>
        Recent Sales
      </Text>
      {paymentDetails.recentSales.length >= 1 ? (
        recentSalesSec(paymentDetails.recentSales)
      ) : (
        <Text type="light" size={16} style={AppStyles.mTop25}>
          No data to display yet.
        </Text>
      )}
    </View>
  );

  const earningTitleSec = () => (
    <View style={AppStyles.mBottom40}>
      <Text size={24} type="bold">
        Earnings
      </Text>
      <TouchableOpacity
        disabled={isViewLoading}
        onPress={viewStripeAccountHandler}
        style={{
          marginTop: 6,
          justifyContent: 'center',
        }}>
        <Text size={14} color={Colors.text.blue} type="medium">
          View Stripe account
        </Text>
        <Spinner
          style={{position: 'absolute', right: 0, bottom: 2}}
          isVisible={isViewLoading}
          size={15}
          type={'FadingCircleAlt'}
          color={Colors.black}
        />
      </TouchableOpacity>
    </View>
  );

  const earningBalanceSec = () => (
    <View>
      <View style={AppStyles.flexRow}>
        <View style={styles.weekAct}>
          <Text size={17} type="semiBold">
            {/* Total */}
            This week
          </Text>
          <Text size={26} type="bold">
            {paymentDetails.soldActivations}
          </Text>
          <Text
            size={16}
            type="medium"
            color={Colors.text.secondary}
            style={{marginTop: 3}}>
            Activations
          </Text>
        </View>
        <View style={styles.balance}>
          <Text size={17} type="semiBold">
            {/* Total */}
            Your Balance
          </Text>
          <Text size={26} type="bold" numberOfLines={1}>
            ${paymentDetails.balance}
          </Text>
          <Text
            size={16}
            type="medium"
            color={Colors.text.secondary}
            style={{marginTop: 3}}>
            {/* Balance */}${paymentDetails.availableBalance} available
          </Text>
        </View>
      </View>
    </View>
  );

  const earningPayoutSec = () => (
    <View style={AppStyles.mTop25}>
      <Button
        isLoading={isPayoutLoading}
        disabled={isPayoutLoading || paymentDetails.availableBalance < 1}
        size={15}
        style={{
          backgroundColor: Colors.text.blue,
        }}
        onPress={payoutStripeAmountHandler}
        textStyle={{
          textTransform: 'uppercase',
        }}>
        Pay Out Now
      </Button>
      <TouchableOpacity
        style={[AppStyles.mTop15, AppStyles.centerInner]}
        onPress={() => {
          viewStripeAccountHandler(true);
        }}>
        <Text
          size={14}
          color={Colors.text.blue}
          type="medium"
          style={{opacity: isPayoutViewLoading ? 0.3 : 1}}>
          View payouts on Stripe
        </Text>
        {isPayoutViewLoading && (
          <Spinner
            style={{position: 'absolute'}}
            isVisible={isPayoutViewLoading}
            size={15}
            type={'FadingCircleAlt'}
            color={Colors.black}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // EARNING RECENT SALES
  const recentSalesSec = item => {
    let recentSales = util.cloneDeepItem(item ?? []);
    let recentSalesAfterSlice = [];
    let showBtnForMoreLinks = true;

    if (item.length < 4) {
      showBtnForMoreLinks = false;
    } else {
      recentSalesAfterSlice = recentSales.slice(0, 3);
    }
    let allSales = util.cloneDeepItem(item ?? []);
    return (
      <View style={AppStyles.mTop25}>
        {!isMoreData && showBtnForMoreLinks
          ? recentSalesAfterSlice.map((item, index) =>
              recentSaleSecItem(item, index),
            )
          : allSales.map((item, index) => recentSaleSecItem(item, index))}

        {showBtnForMoreLinks && recentSalesSecBtn()}
      </View>
    );
  };

  const recentSaleSecItem = item => (
    <View style={[styles.saleItemContainer]}>
      <View
        style={[
          AppStyles.mBottom15,
          AppStyles.flexRow,
          AppStyles.alignItemsCenter,
          // {justifyContent: 'space-between'},
        ]}>
        <View style={styles.saleThumb}>
          <Image
            source={
              item.thumb
                ? {
                    uri: item.thumb,
                  }
                : Images.UserIcon
            }
            style={{
              width: item.thumb ? 48 : 24,
              height: item.thumb ? 48 : 24,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={styles.saleDetail}>
          <Text
            size={16}
            type="bold"
            color={Colors.text.neka}
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text size={14} style={{marginTop: 3}} color={Colors.text.neka}>
            {getDateFormat(item.time)} at {getDateFormat(item.time, true)}
          </Text>
        </View>
        <View style={styles.saleAmount}>
          <Text size={16} color={Colors.text.secondary}>
            ${item.amount}
          </Text>
        </View>
      </View>
    </View>
  );

  const recentSalesSecBtn = () => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        borderColor: Colors.border.quaternary,
        borderWidth: 1,
      }}
      onPress={() => {
        setMoreData(!isMoreData);
      }}>
      <Text size={14} color={Colors.text.primary} type="semiBold">
        {util.capitalizeString(isMoreData ? 'Less' : 'More')}
      </Text>
    </TouchableOpacity>
  );

  const getDateFormat = (date, timeFormat = false) => {
    const today = new Date();
    const createdDate = moment(date);
    if (Math.round(createdDate.diff(today, 'days', true)) <= -2) {
      return ISOToFormat(
        date,
        timeFormat
          ? TIME_FORMAT1
          : createdDate.add(1, 'weeks').isBefore(today)
          ? DATE_FORMAT2
          : DATE_FORMAT1,
      );
    } else {
      return timeFormat
        ? ISOToFormat(date, TIME_FORMAT1)
        : Math.round(createdDate.diff(today, 'days', true)) <= -1
        ? 'Yesterday'
        : 'Today';
    }
  };
  return (
    <SafeAreaView
      style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}
      edges={['top']}>
      {alertModal && alertSec()}
      <ScrollView style={[styles.container, {paddingVertical: 6}]}>
        {headerSec()}
        {isLoading ? (
          <View
            style={{
              height: Metrics.screenHeight / 1.8,
              justifyContent: 'center',
            }}>
            <Spinner
              style={[{alignSelf: 'center'}]}
              isVisible={isLoading}
              size={35}
              type={'FadingCircleAlt'}
              color={Colors.black}
            />
          </View>
        ) : paymentDetails.status ? (
          earningSec()
        ) : (
          addPaymentSec()
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

Payment.propTypes = {userDetails: PropTypes.object};

Payment.defaultProps = {userDetails: {}};

const mapStateToProps = ({user, payment}) => ({
  userDetails: user.data,
  paymentDetails: payment.details,
  paymentResponse: payment.message,
});

const actions = {};

export default connect(mapStateToProps, actions)(Payment);
