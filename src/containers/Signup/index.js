import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {userSignupRequest} from '../../actions/UserActions';
import {addInvitedUser} from '../../actions/teamAction';
import {
  AlertModal,
  ButtonComponent,
  CheckBox,
  KeyboardAwareScrollViewComponent,
  OnBoardingHeader,
  Text,
  TextInput,
} from '../../components';
import {ALERT_TIMER, PASSWORD_PLACEHOLDER} from '../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import _ from 'lodash';

function Signup({isInvited, invitedPage, invitedOwner, emailAddress}) {
  const [isPasswordVisible, setPasswordVisibility] = useState(() => false);
  const [password, setPassword] = useState(() => '');
  const [email, setEmail] = useState(() => emailAddress ?? '');
  const [emailError, setEmailError] = useState(() => '');
  const [passwordError, setPasswordError] = useState(() => '');
  const [isTermsPrivacy, setTermsPrivacy] = useState(() => false);
  const [isTermsPrivacyError, setTermsPrivacyError] = useState(() => false);
  const [alertModal, setAlertModal] = useState(() => false);
  const [alertModalText, setAlertModalText] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasError, setHasError] = useState(() => false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const isButtonDisable = email === '' || password === '';

  const onSubmitPress = () => {
    setEmail(_.trim(email));

    setEmailError('');
    setPasswordError('');
    setTermsPrivacyError(false);

    if (validation()) {
      setIsLoading(true);
      Keyboard.dismiss();
      const useremail = email.toString().toLowerCase();
      const payload = {
        email: _.trim(useremail),
        password,
        invited: isInvited ?? false,
      };

      dispatch(
        userSignupRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            if (isInvited) {
              dispatch(
                addInvitedUser({
                  pageid: invitedPage,
                  pageowner: invitedOwner,
                }),
              );
            }
            Actions.verificationCode({
              fromSignUp: true,
              isInvited: isInvited,
              headerText: 'Verify Account',
              incomingEmail: payload.email,
            });
          } else {
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
        }),
      );
    }
  };

  const validation = () => {
    let validate = true;

    if (!isTermsPrivacy) {
      passwordRef?.current?.blur?.();

      setTermsPrivacyError(true);
      validate = false;
    }

    if (!util.isPasswordValid(password)) {
      setPasswordError('Password cannot be less than 6 characters');

      passwordRef?.current?.focus?.();
      validate = false;
    }

    if (util.isOnlyWhiteSpace(password)) {
      setPasswordError('Password cannot be only whitespaces');
      passwordRef?.current?.focus?.();
      validate = false;
    }

    if (util.isEmptyValue(password)) {
      setPasswordError('Password is required');
      passwordRef?.current?.focus?.();
      validate = false;
    }

    if (!util.isEmailValid(_.trim(email))) {
      setEmailError('Invalid email');

      emailRef?.current?.focus?.();

      validate = false;
    }

    if (util.isEmptyValue(email)) {
      setEmailError('Email is required');
      emailRef?.current?.focus?.();
      validate = false;
    }

    return validate;
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

  const inputFormsAndForgotPassSection = () => (
    <View style={styles.inputSectionContainer}>
      <View>
        <TextInput
          disabled={isInvited}
          autoFocus={!isInvited}
          label={'Email'}
          autoCapitalize="none"
          keyboardType={'email-address'}
          labelColor={Colors.black}
          rightIcon={
            util.isEmptyValue(email) || isInvited ? null : Images.CrossIcon
          }
          onPress={() => setEmail('')}
          labelType={'semiBold'}
          placeholder={'jane@example.com'}
          onSubmitEditing={() => {
            passwordRef?.current?.focus?.();
          }}
          ref={emailRef}
          error={emailError}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
      </View>

      <View style={AppStyles.mTop25}>
        <TextInput
          label={'Password'}
          autoFocus={isInvited}
          isPassword
          labelColor={Colors.black}
          labelType={'semiBold'}
          rightIcon={isPasswordVisible ? Images.CrossedEyeIcon : Images.EyeIcon}
          onPress={() => setPasswordVisibility(!isPasswordVisible)}
          secureTextEntry={isPasswordVisible ? false : true}
          // fontSize={util.isPlatformAndroid() ? 12 : 14}
          placeholder={PASSWORD_PLACEHOLDER}
          onSubmitEditing={() => {
            onSubmitPress();
          }}
          ref={passwordRef}
          error={passwordError}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
      </View>
    </View>
  );

  const termsAndPrivacyCheck = () => (
    <View style={styles.termsAndPrivacyContainer}>
      <View style={styles.termsTextContainer}>
        <CheckBox
          onPressAction={() => {
            setTermsPrivacy(!isTermsPrivacy);
            setTermsPrivacyError(false);
          }}
          isChecked={isTermsPrivacy}
          isError={isTermsPrivacyError}
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
        style={{textAlign: 'center'}}
        lineHeight={1}
        color={Colors.text.secondary}>
        I agree to{' '}
      </Text>
      <TouchableOpacity
        onPress={() =>
          Actions.push('webContainer', {
            incomingURL: 'https://dymedrop-a57895.webflow.io/privacy-policy',
          })
        }
        style={{top: 0}}>
        <Text size={16} color={Colors.text.reca}>
          Privacy
        </Text>
      </TouchableOpacity>
      <Text size={16} color={Colors.text.secondary}>
        {' '}
        and{' '}
      </Text>
      <TouchableOpacity
        onPress={() =>
          Actions.push('webContainer', {
            incomingURL: 'https://dymedrop-a57895.webflow.io/terms-of-service',
          })
        }
        style={{top: 0}}>
        <Text size={16} color={Colors.text.reca}>
          Terms
        </Text>
      </TouchableOpacity>
    </View>
  );

  const buttonRender = () => (
    <ButtonComponent
      text={'Join'}
      hasExtraText={true}
      // extraText={'Completely Free'}
      action={() => onSubmitPress()}
      isBtnDisabled={isButtonDisable || isLoading}
      isLoading={isLoading}
    />
  );

  const haveAccountSection = () => (
    <View style={styles.haveAccountContainer}>
      <Text size={16} color={Colors.text.secondary}>
        Already have an account?{' '}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          Actions.reset('login');
        }}>
        <Text size={16} color={Colors.text.reca}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
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

        <View style={{backgroundColor: Colors.background.primary, flex: 1}}>
          <KeyboardAwareScrollViewComponent
            scrollEnabled={true}
            style={{backgroundColor: Colors.background.primary}}>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              <OnBoardingHeader headerText={'Join'} />
            </View>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              {inputFormsAndForgotPassSection()}
              {termsAndPrivacyCheck()}
              {buttonRender()}
              {haveAccountSection()}
            </View>
          </KeyboardAwareScrollViewComponent>
        </View>
      </SafeAreaView>
    </>
  );
}
const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Signup);
