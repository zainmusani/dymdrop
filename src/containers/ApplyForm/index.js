import React, {useCallback, useState} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect, useDispatch} from 'react-redux';
import styles from './styles';
import {
  AlertModal,
  CheckBox,
  KeyboardAwareScrollViewComponent,
  OnBoardingHeader,
  Text,
} from '../../components';
import InputFields from './InputFields';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import {ALERT_TIMER} from '../../constants';
import {userSignOutRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';

function ApplyForm({userData}) {
  const [isLoading, setLoading] = useState(() => false);
  const [alertModal, setAlertModal] = useState(() => false);
  const [hasError, setHasError] = useState(() => false);
  const [alertModalText, setAlertModalText] = useState(() => '');
  const [isMarketingCheckBox, setMarketingCheckBox] = useState(() => true);
  const dispatch = useDispatch(null);

  const secureDataSec = () => (
    <View
      style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
      <Image style={{width: 20, height: 20}} source={Images.SecureLockIcon} />
      <Text color={Colors.text.secondary} size={14}>
        Your information is secure
      </Text>
    </View>
  );

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setAlertModal(false);
      setHasError(false);
      setAlertModalText('');
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
    return alertModalText;
  };

  const marketingEmailsSec = () => (
    <View style={styles.termsAndPrivacyContainer}>
      <View style={styles.termsTextContainer}>
        <CheckBox
          onPressAction={() => {
            setMarketingCheckBox(!isMarketingCheckBox);
          }}
          isChecked={isMarketingCheckBox}
        />
        {termsAndPrivacyTextSec()}
      </View>
    </View>
  );

  const termsAndPrivacyTextSec = () => (
    <View style={styles.termsTextWrapper}>
      <Text
        size={16}
        numberOfLines={2}
        style={{textAlign: 'left'}}
        lineHeight={1}
        color={Colors.text.secondary}>
        I agree to receive personalised marketing emails.{' '}
      </Text>
    </View>
  );

  const signOutSec = () => (
    <TouchableOpacity style={styles.signOutStyle} onPress={signOutAction}>
      <Text type="semiBold" size={13}>
        {util.capitalizeString('sign out')}
      </Text>
    </TouchableOpacity>
  );

  const signOutAction = () => {
    Actions.reset('login', {isUserLoggedOutAlert: true});
    dispatch(userSignOutRequest(res => {}));
  };

  return (
    <>
      <SafeAreaView
        style={[
          {
            backgroundColor: Colors.background.primary,
            // paddingBottom: 40,
            flex: 1,
          },
        ]}
        edges={['top']}>
        {alertModal && alertSec()}
        <View style={{backgroundColor: Colors.background.primary, flex: 1}}>
          <View
            style={[styles.container]}
            onTouchMove={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollViewComponent
              scrollEnabled={true}
              style={{
                backgroundColor: Colors.background.primary,
              }}>
              <View
                style={{
                  paddingHorizontal: 30,
                  top: -30,
                }}>
                <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
                  {signOutSec()}

                  <OnBoardingHeader
                    headerText={'Apply'}
                    showIcon={false}
                    isImage={userData.isTeammate}
                    subText={
                      userData.isTeammate
                        ? 'Add your first and last name to make sure you are really you.'
                        : 'We’re excited to work with organizations like yours and would love to get to know you.'
                    }
                  />
                </View>
              </View>
              <View
                style={[
                  AppStyles.mBottom40,
                  {top: !util.isPlatformAndroid() ? -70 : -50},
                ]}>
                <InputFields
                  userData={userData}
                  isLoading={isLoading}
                  setLoading={setLoading}
                  alertModal={alertModal}
                  setAlertModal={setAlertModal}
                  setHasError={setHasError}
                  hasError={hasError}
                  alertModalText={alertModalText}
                  setAlertModalText={setAlertModalText}
                  marketingEmailsSec={marketingEmailsSec} // checkbox section after input fields
                />
                {secureDataSec()}
              </View>
            </KeyboardAwareScrollViewComponent>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

ApplyForm.propTypes = {};

ApplyForm.defaultProps = {};

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(ApplyForm);
