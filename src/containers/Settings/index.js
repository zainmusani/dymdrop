// @flow
import PropTypes from 'prop-types';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {clearPages} from '../../actions/PagesActions';
import {
  deactivateAccountRequest,
  userSignOutRequest,
  userSignOutSuccess,
} from '../../actions/UserActions';
import {
  AlertModal,
  ButtonView,
  KeyboardAwareScrollViewComponent,
  MainScreensHeader,
  ModalView,
  SelectImageComponent,
  SpinnerComponent,
  Text,
  TextInput,
} from '../../components';
import {ALERT_TIMER, PASSWORD_PLACEHOLDER} from '../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function Settings(props) {
  // const [editable, setEditAble] = useState(() => true);
  const {userDetails} = props;

  const [email, setEmail] = useState(() => userDetails.email);
  const [alertModal, setAlertModal] = useState(() => false);
  const [password, setpassword] = useState(() => 'abc123qwe');
  const [emailError, setEmailError] = useState(() => '');
  const [isUserApproved, setisUserApproved] = useState(
    !userDetails.isUserApproved,
  );
  const [showDeactivateModal, setDeactivateModal] = useState(() => false);
  const [isLogoutModal, setLogoutModal] = useState(() => false);
  const [firstName, setFirstName] = useState(() => 'Misbah');
  const [lastName, setLastName] = useState(() => 'Kas');
  const [firstNameError, setFirstNameError] = useState(() => '');
  const [lastNameError, setLastNameError] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] = useState(
    () => '',
  );
  const [hasError, setHasError] = useState(() => false);

  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const dispatch = useDispatch();

  const isButtonDisplay = email === '' || firstName === '' || lastName === '';

  const validation = () => {
    let validate = true;

    if (util.isOnlyWhiteSpace(lastName)) {
      setLastNameError('Invalid last name');
      lastNameRef?.current?.focus?.();
      validate = false;
    }

    if (util.isEmptyValue(lastName)) {
      setLastNameError('Last name is required');
      lastNameRef?.current?.focus?.();
      validate = false;
    }

    if (util.isOnlyWhiteSpace(firstName)) {
      setFirstNameError('Invalid first name');
      firstNameRef?.current?.focus?.();
      validate = false;
    }

    if (util.isEmptyValue(firstName)) {
      setFirstNameError('First name is required');
      firstNameRef?.current?.focus?.();
      validate = false;
    }

    if (!util.isEmailValid(email)) {
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

  const toggleSubmit = () => {
    Keyboard.dismiss();

    // if (editable) {
    submit();
    emailRef?.current?.blur?.();
    // } else {
    //   setEditAble(true);
    //   emailRef?.current?.focus?.();
    // }
  };

  const submit = () => {
    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    if (validation()) {
      setAlertModal(true);

      // setEditAble(false);
    }
  };

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
        hasWarning={isUserApproved}
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
    if (isUserApproved) {
      return 'Admin approval required';
    }
    return 'Password saved';
  };

  const toggleDeactivateModal = () => {
    setDeactivateModal(!showDeactivateModal);
  };

  const toggleCheckForUserLogout = () => {
    setLogoutModal(!isLogoutModal);
  };

  const saveUserOnDeActivateAccount = () => {
    Actions.reset('login', {isSaveUserDataAlert: true});
  };

  const permanentlyDeleteUser = () => {
    dispatch(clearPages());
    Actions.reset('login', {isDeleteUserDataAlert: true});
  };

  const onDeactivateAccountApiCall = (permanently_delete, onSuccessFunc) => {
    setIsLoading(true);
    const payload = {
      permanently_delete,
    };
    dispatch(
      deactivateAccountRequest(payload, res => {
        setIsLoading(false);

        if (res.status) {
          onSuccessFunc();
        } else {
          setHasError(true);
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  };

  const modalSecondBtnAction = () => {
    if (isLogoutModal) {
      dispatch(clearPages());
      Actions.reset('login', {isUserLoggedOutAlert: true});
      dispatch(userSignOutRequest(res => {}));
    } else {
      onDeactivateAccountApiCall(false, saveUserOnDeActivateAccount);
    }
  };

  const modalFirstBtnAction = () => {
    if (isLogoutModal) {
      setLogoutModal(false);
    } else {
      onDeactivateAccountApiCall(true, permanentlyDeleteUser);
    }
  };

  const resetBtnAction = () => {
    Actions.push('resetPassword', {
      fromSettingsScreen: true,
      hasBackBtn: true,
      setSettingsAlert: () => setAlertModal(true),
    });
  };

  const headerSec = () => (
    <MainScreensHeader
      headerText={'Settings'}
      borderWidth={'100%'}
      firstIcon={Images.BackButtonIcon}
      firstIconAction={() => {
        Actions.pop();
      }}
    />
  );

  const inputFormSec = () => (
    <View style={AppStyles.marginHorizontalBase}>
      <View style={AppStyles.mBottom25}>
        <Text size={18} type="bold">
          Account
        </Text>
      </View>
      <View>
        <TextInput
          editable={false}
          label={'Email'}
          autoCapitalize="none"
          keyboardType={'email-address'}
          labelColor={Colors.black}
          // rightIcon={util.isEmptyValue(email) ? null : Images.CrossIcon}
          // onPress={() => setEmail('')}
          onSubmitEditing={() => {
            emailRef?.current?.blur?.();
            setEmailError('');
            validation();
          }}
          labelType={'semiBold'}
          placeholder={'jane@example.com'}
          ref={emailRef}
          error={emailError}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
      </View>
      <View style={[AppStyles.mTop25, {position: 'relative'}]}>
        {/* {editable ? (
          resetBtnSec()
        ) : ( */}
        <TextInput
          editable={false}
          label={'Password'}
          labelColor={Colors.black}
          labelType={'semiBold'}
          isPassword
          secureTextEntry={true}
          // fontSize={util.isPlatformAndroid() ? 12 : 14}
          placeholder={PASSWORD_PLACEHOLDER}
          value={password}
        />
        <TouchableOpacity
          style={styles.hiddenTap}
          onPress={resetBtnAction}></TouchableOpacity>
        {/* )} */}
      </View>
      <View style={AppStyles.mTop15}>
        {settingsBtnSec('Sign out', toggleCheckForUserLogout, false)}
      </View>
      <View style={styles.bottomLineStyle} />
    </View>
  );

  const paymentSec = () => (
    <View style={AppStyles.marginHorizontalBase}>
      <View style={[AppStyles.mTop15]}>
        <Text size={18} type="bold">
          Payments
        </Text>
        <TouchableOpacity
          onPress={() => {
            isUserApproved ? setAlertModal(true) : Actions.push('payment');
          }}
          style={styles.paymentBtn}>
          <View style={AppStyles.mLeft10}>
            <Text type="semiBold" size={16} style={AppStyles.mBottom5}>
              Payment
            </Text>
            <Text type="medium" size={14} color="rgba(51, 50, 64, 0.7)">
              View and manage cash flow
            </Text>
          </View>
          <View style={AppStyles.centerInner}>
            <Image
              source={Images.ArrowIconBlack}
              style={styles.paymentIconStyle}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.bottomLineStyle} />
      </View>
    </View>
  );

  const resetBtnSec = () => (
    <View style>
      <Text color={Colors.black} size={16} type="semiBold">
        Password
      </Text>
      <TouchableOpacity
        style={styles.resetPasswordBtn}
        onPress={resetBtnAction}>
        <Text type="semiBold" size={14}>
          GO TO RESET PASSWORD
        </Text>
      </TouchableOpacity>
    </View>
  );

  const userIDSec = () => (
    <View style={[AppStyles.marginHorizontalBase]}>
      <View style={[AppStyles.mTop15, AppStyles.mBottom25]}>
        <Text size={18} type="bold">
          ID
        </Text>
      </View>

      <View
        style={[AppStyles.mBottom25, !util.isPlatformAndroid() && {zIndex: 1}]}>
        <View>
          <Text size={17} type="semiBold">
            Headshot
          </Text>
        </View>
        <View
          style={{
            marginBottom: 48,
          }}>
          <SelectImageComponent />
        </View>
      </View>

      <View>
        <TextInput
          // editable={editable}
          label={'First Name'}
          autoCapitalize="none"
          labelColor={Colors.black}
          rightIcon={util.isEmptyValue(firstName) ? null : Images.CrossIcon}
          onSubmitEditing={() => {
            lastNameRef?.current?.focus?.();
          }}
          onPress={() => setFirstName('')}
          labelType={'semiBold'}
          placeholder={'Enter'}
          ref={firstNameRef}
          error={firstNameError}
          value={firstName}
          onChangeText={val => {
            setFirstName(val);
          }}
        />
      </View>
      <View style={AppStyles.mTop25}>
        <TextInput
          // editable={editable}
          autoCapitalize="none"
          label={'Last Name'}
          labelColor={Colors.black}
          rightIcon={util.isEmptyValue(lastName) ? null : Images.CrossIcon}
          onSubmitEditing={() => {
            lastNameRef?.current?.blur?.();
            setLastNameError('');
            validation();
          }}
          onPress={() => setLastName('')}
          labelType={'semiBold'}
          placeholder={'Enter'}
          ref={lastNameRef}
          error={lastNameError}
          value={lastName}
          onChangeText={val => {
            setLastName(val);
          }}
        />
      </View>

      <View style={styles.bottomLineStyle} />
    </View>
  );

  const planSec = () => (
    <View style={AppStyles.marginHorizontalBase}>
      <View style={[AppStyles.mTop15, AppStyles.mBottom25]}>
        <Text size={18} type="bold">
          Plan
        </Text>
      </View>
      <TouchableOpacity
        // disabled={!editable}
        onPress={() => {
          Keyboard.dismiss();
          Actions.paymentPlan();
        }}
        style={styles.planSecContainer}>
        <View style={styles.planChildContainer}>
          <View
            style={[
              // editable && {opacity: 0.3},
              styles.planSectext,
            ]}>
            <Text
              size={16}
              type="semiBold"
              color={Colors.text.primary}
              style={AppStyles.mBottom5}>
              Free
            </Text>
            <Text size={14} color={Colors.text.quaternary}>
              Clean look, 3 pages
            </Text>
          </View>
          <View style={{top: 6}}>
            <Image
              source={Images.ArrowIconBlack}
              style={{width: 32, height: 32}}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomLineStyle} />
    </View>
  );

  const deactivateSec = () => (
    <View style={AppStyles.marginHorizontalBase}>
      <View style={[AppStyles.mTop15, AppStyles.mBottom20]}>
        <Text size={18} type="bold">
          Deactivate
        </Text>
      </View>
      <View>
        <Text color={Colors.text.secondary} size={16}>
          If you deactivate, all your account information, pages and insight
          data will no longer be available.
        </Text>
      </View>
      {settingsBtnSec('Deactivate', toggleDeactivateModal, true)}
    </View>
  );

  const settingsBtnSec = (text, func, isDeactiveBtn) => (
    <TouchableOpacity
      onPress={func}
      // disabled={!editable && isDeactiveBtn}
      style={[styles.btnStyle, isDeactiveBtn && AppStyles.mBottom50]}>
      <Text
        size={14}
        color={isDeactiveBtn ? Colors.text.error : Colors.text.primary}
        type={'semiBold'}
        style={{opacity: 1}}>
        {util.capitalizeString(text)}
      </Text>
    </TouchableOpacity>
  );

  const modalSec = useMemo(() => {
    return (
      <ModalView
        showModal={showDeactivateModal || isLogoutModal}
        toggleModal={
          isLogoutModal ? toggleCheckForUserLogout : toggleDeactivateModal
        }
        mainText={
          isLogoutModal
            ? 'Are you sure you want to sign out?'
            : 'Save account info or delete permanently?'
        }
        btnArrOfModal={
          isLogoutModal
            ? [
                {text: 'Cancel', onPress: () => modalFirstBtnAction()},
                {text: 'Yes', onPress: () => modalSecondBtnAction()},
              ]
            : [
                {
                  text: 'Delete Permanently',
                  onPress: () => modalFirstBtnAction(),
                },
                {text: 'Save', onPress: () => modalSecondBtnAction()},
                {text: 'Never mind', onPress: () => setDeactivateModal(false)},
              ]
        }
        hasThirdBtn={showDeactivateModal}
        isCloseAlertMsg={!isLogoutModal}
      />
    );
  }, [showDeactivateModal, isLogoutModal]);

  return (
    <SafeAreaView
      style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}
      edges={['top']}>
      {alertModal && alertSec()}
      <SpinnerComponent isLoading={isLoading} />
      <View style={styles.container}>
        <KeyboardAwareScrollViewComponent
          scrollEnabled={true}
          style={{
            backgroundColor: Colors.background.primary,
            paddingVertical: Metrics.baseMargin,
          }}>
          {headerSec()}
          {inputFormSec()}
          {/* {userIDSec()} */}
          {/* {planSec()} */}
          {!userDetails.isTeammate && paymentSec()}
          {deactivateSec()}

          {(showDeactivateModal || isLogoutModal) && modalSec}
        </KeyboardAwareScrollViewComponent>
      </View>
    </SafeAreaView>
  );
}

Settings.propTypes = {userDetails: PropTypes.object};

Settings.defaultProps = {userDetails: {}};

const mapStateToProps = ({user}) => ({
  userDetails: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(Settings);
