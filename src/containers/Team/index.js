// @flow
import PropTypes from 'prop-types';
import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {
  getCreatorDetail,
  addTeamMember,
  deleteNewTeamMember,
  deleteTeamMember,
  getTeamMembersRequest,
  saveTeamMembersRequest,
} from '../../actions/teamAction';
import Spinner from 'react-native-spinkit';
import {
  AlertModal,
  KeyboardAwareScrollViewComponent,
  MainScreensHeader,
  SpinnerComponent,
  DestructiveActionBottomSheet,
  Text,
  ModalView,
  TextInput,
} from '../../components';
import {ALERT_TIMER} from '../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

function Team(props) {
  const {toggle, pageid = 43, members, newMembers, deletedMembers} = props;
  const [email, setEmail] = useState('');
  const [alertModal, setAlertModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdited, setEdited] = useState(false);
  const [discardConfirmationAlertVisible, setDiscardConfirmationAlertVisible] =
    useState(false);
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const [isUserLoading, setUserLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] = useState(
    () => '',
  );
  const [hasError, setHasError] = useState(false);
  const emailRef = useRef(null);
  const ActionSheetRef = useRef(null);

  const dispatch = useDispatch();

  const toggleRemoveUserModal = () => {
    setRemoveUserModal(!removeUserModal);
  };
  const handleRemoveUser = data => {
    setSelectedUser(data);
    setTimeout(() => {
      ActionSheetRef?.current.show();
    }, 100);
  };
  useEffect(() => {
    setDataLoading(true);
    dispatch(
      getTeamMembersRequest(pageid, res => {
        setDataLoading(false);
      }),
    );
  }, []);

  const removeTeamUser = () => {
    setRemoveUserModal(false);
    if (selectedUser.invitation_id) {
      dispatch(deleteTeamMember(selectedUser.invitation_id));
    } else {
      dispatch(deleteNewTeamMember(selectedUser.email));
    }
    setEdited(true);
    setSelectedUser(null);
  };
  const removeUserModalSec = useMemo(
    () => (
      <ModalView
        showModal={removeUserModal}
        toggleModal={toggleRemoveUserModal}
        mainText={'Remove from team?'}
        subMainText={
          'Are you sure you want to remove this user from the team? If you remove, they will no longer be able to access this page.'
        }
        btnArrOfModal={[
          {text: 'Cancel', onPress: () => toggleRemoveUserModal()},
          {text: 'Delete', onPress: () => removeTeamUser()},
        ]}
      />
    ),
    [removeUserModal],
  );
  const validation = () => {
    let validate = true;

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

  const submit = () => {
    Keyboard.dismiss();
    setEmailError('');
    if (validation()) {
      if (
        [...members, ...newMembers].find(
          x => x.email === email || x.invite_email === email,
        )
      ) {
        setEmailError('Member already exsist');
        return;
      }
      setUserLoading(true);
      dispatch(
        getCreatorDetail({email: email}, res => {
          setUserLoading(false);
          if (!res.fan) {
            const data = {
              email: email,
              accepted: false,
              page_id: pageid,
              user: res.user,
            };
            if (res.status) {
              data['user_id'] = res.data.id;
            }
            dispatch(addTeamMember(data));
            setEdited(true);
            setEmail('');
          } else {
            setHasError(true);
            setResponseMessageFromApiCall(res.message);
            setAlertModal(true);
          }
        }),
      );
    }
  };
  const saveTeamMembers = () => {
    setLoading(true);
    const payload = {
      create: [...newMembers, ...members],
      delete: deletedMembers,
    };
    dispatch(
      saveTeamMembersRequest(payload, pageid, res => {
        setLoading(false);
        setAlertModal(true);
        if (!res.status) {
          setHasError(true);
          setResponseMessageFromApiCall(res.message);
        } else {
          setEdited(false);
          setTimeout(() => {
            toggle();
          }, 1000);
        }
      }),
    );
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
    return 'Invitations Saved';
  };

  const headerSec = () => (
    <MainScreensHeader
      headerText={'Team'}
      firstIcon={Images.BackButtonIcon}
      isSecondIconButton
      secondIconText="SAVE"
      secondIconTextColor={isEdited ? Colors.text.primary : '#c2c2c2'}
      secondIconAction={() => {
        if (isEdited) {
          saveTeamMembers();
        }
      }}
      firstIconAction={() => {
        if (isEdited) {
          setDiscardConfirmationAlertVisible(true);
        } else {
          toggle();
        }
      }}
    />
  );

  const inputFormSec = () => (
    <View style={AppStyles.marginHorizontalBase}>
      <View style={AppStyles.mBottom25}>
        <Text size={18} type="bold">
          Members
        </Text>
      </View>
      <View style={[AppStyles.flexRow, {justifyContent: 'center'}]}>
        <View style={{width: '85%'}}>
          <TextInput
            label={'Invite Via Email'}
            autoCapitalize="none"
            keyboardType={'email-address'}
            placeholderTextColor="rgba(51, 50, 64, 0.5)"
            labelColor={Colors.black}
            onSubmitEditing={() => {
              emailRef?.current?.blur?.();
              setEmailError('');
              validation();
            }}
            labelType={'semiBold'}
            placeholder="jane@example.com"
            ref={emailRef}
            error={emailError}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
          />
        </View>
        <TouchableOpacity
          disabled={isUserLoading}
          onPress={submit}
          style={{
            width: '15%',
            alignItems: 'flex-end',
            paddingBottom: 4,
            justifyContent: 'flex-end',
          }}>
          <View
            style={[
              AppStyles.centerInner,
              {
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: Colors.button.primary,
              },
            ]}>
            {isUserLoading ? (
              <Spinner
                style={[{alignSelf: 'center', marginBottom: 5, marginRight: 4}]}
                isVisible={true}
                size={15}
                type={'FadingCircleAlt'}
                color={Colors.white}
              />
            ) : (
              <Image source={Images.AddIcon} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const teamListSec = () => (
    <View style={[AppStyles.marginHorizontalBase, AppStyles.mTop40]}>
      <Spinner
        style={[{alignSelf: 'center', marginBottom: 40}]}
        isVisible={isDataLoading}
        size={20}
        type={'FadingCircleAlt'}
        color={Colors.black}
      />
      {!isDataLoading && (
        <>
          {[...members, ...newMembers].length >= 1 ? (
            [...members, ...newMembers].map(item => teamListSecItem(item))
          ) : (
            <View
              style={[
                AppStyles.centerInner,
                AppStyles.mTop40,
                AppStyles.pTop30,
              ]}>
              {!isUserLoading && (
                <Text type="light" size={20} style={{marginTop: 40}}>
                  No Team Members found
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );

  const teamListSecItem = item => (
    <View
      style={[
        AppStyles.mBottom20,
        AppStyles.flexRow,
        AppStyles.alignItemsCenter,
      ]}>
      <View
        style={[
          (item.owner || item.accepted) && {
            backgroundColor: item.color,
            borderRadius: 50,
          },
          styles.userThumb,
        ]}>
        {item.owner || item.accepted ? (
          <Text
            type="bold"
            color={Colors.white}
            size={24}
            textTransform="uppercase">
            {item.email?.charAt(0)}
          </Text>
        ) : (
          <Image
            source={
              item.thumb
                ? {
                    uri: item.thumb,
                  }
                : Images.UserIconLight
            }
            style={{
              width: 48,
              height: 48,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        )}
      </View>
      <View style={styles.userDetail}>
        <Text
          size={16}
          type="bold"
          color={Colors.text.secondary}
          numberOfLines={1}>
          {item.owner ? 'Owner' : !item.accepted ? 'Invited' : 'Joined'}
        </Text>
        <Text size={14} style={{marginTop: 3}} color={Colors.text.secondary}>
          {item.email ?? item?.invite_email}
        </Text>
      </View>
      {!item?.owner && (
        <TouchableOpacity
          style={styles.userOpt}
          onPress={() => {
            handleRemoveUser(item);
          }}>
          <Image
            source={Images.BrowseIconCircle}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const handleConfirmationMesaageOfDiscard = () => (
    <ModalView
      mainText={'Discard changes?'}
      subMainText={
        'All the changes you have made will be lost. This cannot be undone.'
      }
      btnArrOfModal={[
        {
          text: 'Keep',
          onPress: () => setDiscardConfirmationAlertVisible(false),
        },
        {
          text: 'Discard',
          onPress: () => {
            setDiscardConfirmationAlertVisible(false);
            toggle();
          },
        },
      ]}
    />
  );

  const mainContent = () => (
    <SafeAreaView
      style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}
      edges={['top']}>
      {alertModal && alertSec()}
      {removeUserModal && (
        <View style={{position: 'absolute'}}>{removeUserModalSec}</View>
      )}
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
          {teamListSec()}
        </KeyboardAwareScrollViewComponent>
        {discardConfirmationAlertVisible &&
          handleConfirmationMesaageOfDiscard()}
      </View>

      <DestructiveActionBottomSheet
        ActionSheetRef={ActionSheetRef}
        options={['Remove ', 'Cancel']}
        cancelBtnIndex={1}
        destructiveBtnIndex={0}
        firstOptionToggle={() => {
          toggleRemoveUserModal();
        }}
      />
    </SafeAreaView>
  );
  return (
    <Modal
      isVisible={true}
      animationIn={'zoomInUp'}
      animationOut={'zoomOut'}
      animationInTiming={2}
      animationOutTiming={150}
      onBackButtonPress={() => {
        if (isEdited) {
          setDiscardConfirmationAlertVisible(true);
        } else {
          toggle();
        }
      }}
      style={styles.modalStyle}>
      {mainContent()}
    </Modal>
  );
}

Team.propTypes = {userDetails: PropTypes.object};

Team.defaultProps = {userDetails: {}};

const mapStateToProps = ({user, team}) => ({
  userDetails: user.data,
  members: team.users,
  newMembers: team.newUsers,
  deletedMembers: team.deletedUsers,
});

const actions = {};

export default connect(mapStateToProps, actions)(Team);
