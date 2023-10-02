import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {
  forgotPasswordRequest,
  updateUserDataSuccess,
  userForgotPasswordOtpRequest,
  userResendOtpRequest,
  userSignupConfirmOtpRequest,
} from '../../actions/UserActions';
import {
  AlertModal,
  KeyboardAwareScrollViewComponent,
  ModalView,
  OnBoardingHeader,
  SpinnerComponent,
  Text,
} from '../../components';
import {ALERT_TIMER, RESEND_CODE_TIMER} from '../../constants';
import {Colors, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function VerificationCode(props) {
  const {
    fromForgotPassword,
    fromSignUp,
    userData,
    headerText,
    incomingEmail,
    isApplyModal,
    isInvited,
  } = props;
  const isAlertModal = false;

  const [verificationCode, setVerificationCode] = useState(() => '');
  const [isResendOTP, setResendOTP] = useState(true);
  const [resetCountdownId, setResetCountdownId] = useState(Math.random());
  const [alertModal, setAlertModal] = useState(() => isAlertModal);
  const [alertModalText, setAlertModalText] = useState(() => '');
  const [showApplyModal, setShowApplyModal] = useState(() => isApplyModal);

  const [isLoading, setIsLoading] = useState(() => false);

  const [hasError, setHasError] = useState(() => false);

  const verificationValue = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {}, [verificationCode]);

  const onSubmitPress = otp => {
    setIsLoading(true);

    const payload = {
      email: incomingEmail,
      otp,
    };

    if (fromForgotPassword) {
      dispatch(
        userForgotPasswordOtpRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            Actions.replace('resetPassword', {
              otp,
              email: incomingEmail,
              token: res.data.forget_password_token,
            });
          } else {
            setHasError(true);

            setAlertModalText(res.message);
            setAlertModal(true);
          }
          verificationValue?.current?.clear?.();
        }),
      );
    } else {
      dispatch(
        userSignupConfirmOtpRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            if (isInvited) {
              // Actions.reset('loaderScreen');
              dispatch(updateUserDataSuccess({isApplyForm: true}));
              Actions.reset('applyForm');
            } else {
              setShowApplyModal(true);
            }
          } else {
            setHasError(true);

            setAlertModalText(res.message);
            setAlertModal(true);
          }
          verificationValue?.current?.clear?.();
        }),
      );
    }
  };

  const applyNowModalSec = useMemo(() => {
    return (
      <View style={{position: 'absolute'}}>
        <ModalView
          mainText={'Thanks for your interest.'}
          subMainText={`We’re excited to work with organizations like yours and would love to get to know you.`}
          btnArrOfModal={[
            {
              text: 'Apply to join',
              onPress: () => {
                dispatch(updateUserDataSuccess({isApplyForm: true}));

                Actions.reset('applyForm');
                setShowApplyModal(false);
              },
            },
          ]}
          cancelable={false}
        />
      </View>
    );
  }, [showApplyModal]);

  const handleResendOTP = () => {
    const payload = {
      email: incomingEmail,
    };
    setResendOTP(true);

    if (fromForgotPassword) {
      dispatch(
        forgotPasswordRequest(payload, res => {
          if (res.status) {
            setVerificationCode('');

            setTimeout(() => {
              setResetCountdownId(Math.random());
            }, 2000);
          } else {
            setResendOTP(false);
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
          verificationValue?.current?.clear?.();
        }),
      );
    } else {
      dispatch(
        userResendOtpRequest(payload, res => {
          if (res.status) {
            setVerificationCode('');
            setTimeout(() => {
              setResetCountdownId(Math.random());
            }, 2000);
          } else {
            setResendOTP(false);
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
          verificationValue?.current?.clear?.();
        }),
      );
    }
  };

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setAlertModal(false);
      setHasError(false);
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

  const getAlertText = useCallback(() => {
    return alertModalText;
  }, [alertModalText]);

  const codeInputView = () => (
    <CodeInput
      activeColor="rgba(0,0,0,1)"
      inactiveColor="rgba(0,0,0,0.4)"
      ref={verificationValue}
      autoFocus={true}
      ignoreCase={true}
      codeLength={4}
      containerStyle={{marginTop: 6, marginBottom: 45}}
      inputPosition="left"
      keyboardType="numeric"
      codeInputStyle={styles.codeInputStyle}
      onFulfill={code => {
        setVerificationCode(code);
        onSubmitPress(code);
      }}
    />
  );

  const codeSentMsgSec = () => (
    <View style={styles.codeSentMsgContainer}>
      <Text
        style={{textAlign: 'center'}}
        size={16}
        color={Colors.text.secondary}>
        {`A code was sent to ${incomingEmail}`}
      </Text>
    </View>
  );

  const enterCodeSec = () => (
    <View style={styles.enterCodeContainer}>
      <Text size={16} type="semiBold">
        Enter Code
      </Text>
      {codeInputView()}
    </View>
  );

  const didNotReceiveCodeSec = () => (
    <View style={styles.didNotReceiveCodeContainer}>
      <Text size={16} color={Colors.text.secondary}>
        {`Didn't receive code? `}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleResendOTP();
        }}
        disabled={isResendOTP}>
        <Text
          size={16}
          color={Colors.text.reca}
          style={[isResendOTP && {opacity: 0.3}]}>
          Resend code
        </Text>
      </TouchableOpacity>
    </View>
  );

  const countDownSec = () => (
    <CountDown
      id={resetCountdownId}
      until={showApplyModal ? 0 : RESEND_CODE_TIMER}
      timeToShow={['M', 'S']}
      onFinish={() => setResendOTP(false)}
      digitStyle={{width: 30}}
      digitTxtStyle={{color: Colors.text.primary}}
      timeLabels={{m: null, s: null}}
      separatorStyle={{color: Colors.text.primary, marginTop: -2}}
      showSeparator
      size={20}
    />
  );

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
        <SpinnerComponent isLoading={isLoading} loaderColor={Colors.white} />
        <View style={styles.container}>
          <KeyboardAwareScrollViewComponent scrollEnabled={true}>
            <View style={[{top: !util.isPlatformAndroid() ? -80 : -30}]}>
              <OnBoardingHeader headerText={headerText} hasBackBtn={true} />
            </View>
            <View style={[{top: !util.isPlatformAndroid() ? -80 : -30}]}>
              {codeSentMsgSec()}
              {enterCodeSec()}
              {didNotReceiveCodeSec()}
              {countDownSec()}
            </View>
          </KeyboardAwareScrollViewComponent>
        </View>
        {showApplyModal && applyNowModalSec}
      </SafeAreaView>
    </>
  );
}

VerificationCode.propTypes = {
  fromSignUp: PropTypes.bool,
  fromForgotPassword: PropTypes.bool,
  headerText: PropTypes.string,
  incomingEmail: PropTypes.string,
  isApplyModal: PropTypes.bool,
  isInvited: PropTypes.bool,
};

VerificationCode.defaultProps = {
  fromSignUp: false,
  fromForgotPassword: false,
  headerText: '',
  incomingEmail: '',
  isApplyModal: false,
  isInvited: false,
};

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(VerificationCode);
