import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Image, Keyboard, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {Actions} from 'react-native-router-flux';
import {ButtonComponent, Text, TextInput} from '../../components';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import {FANBASE_SIZE_LIST, STATE_LIST} from '../../constants';
import util from '../../util';
import {applyFormRequest} from '../../actions/UserActions';
import styles from './styles';

function InputFields(props) {
  const {
    userData,
    isLoading,
    setLoading,
    alertModal,
    setAlertModal,
    hasError,
    setHasError,
    alertModalText,
    setAlertModalText,
    marketingEmailsSec,
  } = props;

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [orgName, setOrgName] = useState('');
  const [orgNameError, setOrgNameError] = useState('');

  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleError, setJobTitleError] = useState('');

  const [fanBaseSize, setFanBaseSize] = useState('');
  const [fanBaseSizeError, setFanBaseSizeError] = useState('');

  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const orgNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const fanBaseSizeRef = useRef(null);
  const locationRef = useRef(null);

  const dispatch = useDispatch(null);

  // const isButtonDisplay =
  //   firstName === '' ||
  //   lastName === '' ||
  //   phone === '' ||
  //   orgName === '' ||
  //   jobTitle === '' ||
  //   fanBaseSize === '' ||
  //   location === '';

  let INPUT_FIELDS = [
    {
      label: 'First Name',
      hasDropDown: false,
      teammate: true,
      ref: firstNameRef,
      error: firstNameError,
      type: 'default',
      onChangeAction: setFirstName,
      value: firstName,
      placeholder: 'Enter',
    },
    {
      label: 'Last Name',
      hasDropDown: false,
      teammate: true,
      ref: lastNameRef,
      error: lastNameError,
      type: 'default',
      onChangeAction: setLastName,
      value: lastName,
      placeholder: 'Enter',
    },

    {
      label: 'Phone Number',
      hasDropDown: false,
      teammate: false,
      ref: phoneRef,
      error: phoneError,
      type: 'phone-pad',
      onChangeAction: setPhone,
      value: phone,
      placeholder: 'Enter',
    },

    {
      label: 'Organization Name',
      hasDropDown: false,
      teammate: false,
      ref: orgNameRef,
      error: orgNameError,
      type: 'default',
      onChangeAction: setOrgName,
      value: orgName,
      placeholder: 'Enter',
    },

    {
      label: 'Job Title',
      hasDropDown: false,
      teammate: false,
      ref: jobTitleRef,
      error: jobTitleError,
      type: 'default',
      onChangeAction: setJobTitle,
      value: jobTitle,
      placeholder: 'Enter',
    },
    {
      label: 'Size of Support Base',
      hasDropDown: true,
      ref: fanBaseSizeRef,
      type: 'url',
      error: fanBaseSizeError,
      teammate: false,
      onChangeAction: setFanBaseSize,
      value: fanBaseSize,
      placeholder: 'Enter',
      dropDownList: FANBASE_SIZE_LIST,
    },
    {
      label: 'Location',
      hasDropDown: true,
      teammate: false,
      ref: locationRef,
      type: 'url',
      error: locationError,
      onChangeAction: setLocation,
      value: location,
      placeholder: 'Enter',
      dropDownList: STATE_LIST,
    },
  ];

  const inputFieldsList = () => (
    <View style={{marginHorizontal: 26, marginBottom: 0}}>
      {INPUT_FIELDS.map((item, index) => {
        if (!userData.isTeammate) {
          return item?.hasDropDown
            ? dropDownRender(item, index)
            : inputFieldRender(item, index);
        } else {
          return item.teammate
            ? item?.hasDropDown
              ? dropDownRender(item, index)
              : inputFieldRender(item, index)
            : null;
        }
      })}
    </View>
  );

  const inputFieldRender = (item, index) => (
    <View style={[AppStyles.mBottom25]}>
      <TextInput
        label={item.label}
        placeholder={item.placeholder}
        autoCapitalize="none"
        labelColor={Colors.black}
        labelType={'semiBold'}
        value={item.value}
        ref={item.ref}
        keyboardType={item.type}
        onSubmitEditing={() => {
          if (!INPUT_FIELDS[index + 1]?.hasDropDown) {
            INPUT_FIELDS[index + 1]?.ref?.current?.focus?.();
          }
        }}
        error={item.error}
        onChangeText={val => {
          item.onChangeAction(val);
        }}
        onBlur={() => {
          item.ref?.current?.blur?.();
        }}
      />
    </View>
  );

  const dropDownRender = (itemObj, index) => (
    <View style={[{flex: 1, marginBottom: 8}]}>
      <Text style={{marginBottom: 7}} size={16} type="semiBold">
        {itemObj.label}
      </Text>
      <SelectDropdown
        dropdownStyle={{borderRadius: 8}}
        statusBarTranslucent={true}
        disableAutoScroll={false}
        data={itemObj.dropDownList}
        rowStyle={{width: '100%'}}
        buttonStyle={[
          styles.dropDownBtnStyle,
          itemObj.error && {borderColor: Colors.error.primary, borderWidth: 2},
        ]}
        buttonTextStyle={{
          textAlign: 'left',
          fontSize: 16,
        }}
        defaultButtonText="Select"
        dropdownIconPosition="right"
        renderDropdownIcon={() => (
          <Image
            source={Images.ArrowIconBlack2}
            style={[{width: 24, height: 24}]}
          />
        )}
        onSelect={(selectedItem, index) => {
          itemObj.onChangeAction(selectedItem);
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View
              style={[
                styles.dropDownRowStyle,
                !util.isEmptyValue(item) &&
                  itemObj.value === item && {
                    backgroundColor: Colors.background.tertiary,
                  },
              ]}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      <View>
        <Text
          color={Colors.error.primary}
          size="small"
          style={{top: -1, left: 3, fontSize: 12}}>
          {itemObj.error}
        </Text>
      </View>
    </View>
  );

  const validation = () => {
    let validate = true;
    if (!userData.isTeammate) {
      if (util.isEmptyValue(location)) {
        setLocationError('Location is required');
        validate = false;
      }

      if (util.isEmptyValue(fanBaseSize)) {
        setFanBaseSizeError('Size of Fanbase is required');
        validate = false;
      }

      if (util.isOnlyWhiteSpace(jobTitle)) {
        setJobTitleError('Invalid job title');
        jobTitleRef?.current?.focus?.();
        validate = false;
      }

      if (util.isEmptyValue(jobTitle)) {
        setJobTitleError('Job title is required');
        jobTitleRef?.current?.focus?.();
        validate = false;
      }

      if (util.isOnlyWhiteSpace(orgName)) {
        setOrgNameError('Invalid organization name');
        orgNameRef?.current?.focus?.();
        validate = false;
      }

      if (util.isEmptyValue(orgName)) {
        setOrgNameError('Organization name is required');
        orgNameRef?.current?.focus?.();
        validate = false;
      }

      if (!util.isNumber(phone)) {
        setPhoneError('Invalid phone number');
        phoneRef?.current?.focus?.();
        validate = false;
      }

      if (util.isOnlyWhiteSpace(phone)) {
        setPhoneError('Invalid phone number');
        phoneRef?.current?.focus?.();
        validate = false;
      }
      if (util.isEmptyValue(phone)) {
        setPhoneError('Phone number is required');
        phoneRef?.current?.focus?.();
        validate = false;
      }
    }
    if (util.isOnlyWhiteSpace(lastName) && !util.isEmptyValue(lastName)) {
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

    return validate;
  };

  const submit = () => {
    setFirstNameError('');
    setLastNameError('');
    setPhoneError('');
    setOrgNameError('');
    setJobTitleError('');
    setFanBaseSizeError('');
    setLocationError('');
    Keyboard.dismiss();
    if (validation()) {
      setLoading(true);
      const payload = {
        first_name: firstName,
        last_name: lastName,
      };
      if (!userData.isTeammate) {
        payload['phone_number'] = phone;
        payload['organization'] = orgName;
        payload['job_title'] = jobTitle;
        payload['fanbase_size'] = fanBaseSize;
        payload['location'] = location;
      }

      dispatch(
        applyFormRequest(payload, res => {
          setLoading(false);
          if (res.status) {
            Actions.reset('loaderScreen');
          } else {
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
        }),
      );
    }
  };

  const buttonRender = () => (
    <ButtonComponent
      text={userData.isTeammate ? 'Save' : 'Apply'}
      action={() => submit()}
      top={userData.isTeammate ? 5 : null}
      isLoading={isLoading}
      // isBtnDisabled={isButtonDisplay || isLoading}
      isBtnDisabled={isLoading}
    />
  );

  return (
    <View style={{flex: 1}}>
      {inputFieldsList()}
      {!userData.isTeammate && marketingEmailsSec()}
      {buttonRender()}
    </View>
  );
}

InputFields.propTypes = {
  isLoading: PropTypes.bool,
  setLoading: PropTypes.func,
  alertModal: PropTypes.bool,
  setAlertModal: PropTypes.func,
  hasError: PropTypes.bool,
  setHasError: PropTypes.func,
  alertModalText: PropTypes.string,
  setAlertModalText: PropTypes.func,
  marketingEmailsSec: PropTypes.func,
};

InputFields.defaultProps = {
  isLoading: false,
  setLoading: Function(),
  alertModal: false,
  setAlertModal: Function(),
  hasError: false,
  setHasError: Function(),
  alertModalText: '',
  setAlertModalText: Function(),
  marketingEmailsSec: Function(),
};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(InputFields);
