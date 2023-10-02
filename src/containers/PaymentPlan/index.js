import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  KeyboardAwareScrollViewComponent,
  OnBoardingHeader,
  PaymentPlanBox,
  Text,
} from '../../components';
import {AppStyles, Colors, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function PaymentPlan(props) {
  const timePeriodSec = () => {
    return (
      <View style={styles.timePeriodSecContainer}>
        <View style={AppStyles.flexRow}>
          <TouchableOpacity style={[styles.selectedPlanStyles, {right: -10}]}>
            <Text type="semiBold" size={14}>
              {util.capitalizeString('Yearly')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unSelectedPlanStyles,
              //  {left: -8, top: -1}
            ]}>
            <Text type="semiBold" size={14}>
              {util.capitalizeString('Monthly')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: Colors.background.primary,
          // paddingBottom: 40,
          flex: 1,
        },
      ]}
      edges={['top']}>
      <View style={styles.container}>
        <KeyboardAwareScrollViewComponent scrollEnabled={true}>
          <View style={[{top: !util.isPlatformAndroid() ? -75 : -30}]}>
            <OnBoardingHeader
              headerText={'Pick A Plan'}
              hasBackBtn={true}
              showBottomBorder={false}
            />
          </View>
          {/* {timePeriodSec()} */}
          <View
            style={[
              AppStyles.mBottom40,

              {top: !util.isPlatformAndroid() ? -75 : -30},
            ]}>
            <PaymentPlanBox isFree={true} />
            <PaymentPlanBox showCheckBox={false} />
          </View>
        </KeyboardAwareScrollViewComponent>
      </View>
    </SafeAreaView>
  );
}

PaymentPlan.propTypes = {};

PaymentPlan.defaultProps = {};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(PaymentPlan);
