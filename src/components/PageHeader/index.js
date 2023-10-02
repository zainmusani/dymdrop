import React, {useEffect, useState} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppStyles, Colors, Images} from '../../theme';
import styles from './styles';
import {ModalView, Text} from '..';
import util from '../../util';

function PageHeader(props) {
  const {
    isEdit,
    isCreation,
    submitBtnAction,
    deleteBtnAction,
    editBtnAction,
    startEditingBtnAction,
    isPagePublished,
    isActive,
    shareBtnAction,
    isPageInitiallyPublished,
    linkBtnAction,
    isStartEditing,
    backBtnAction,
    discardBtnAction,
    isLinkLoading,
    removeBottomSheet,
    isBottomSheet,
    discardConfirmationAlertVisible,
    setDiscardConfirmationAlertVisible,
    onPressNFCWrite,
    isNFC,
    isInvited,
  } = props;

  const [isKeyboardOpen, setKeyboardOpen] = useState(() => false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const viewPageHeader = () => {
    return (
      <View style={styles.pageHeaderStyle}>
        <TouchableOpacity onPress={backBtnAction}>
          <Image
            source={Images.BackButtonDotted}
            style={styles.iconWidthHeight}
          />
        </TouchableOpacity>
        <View style={[AppStyles.flexRow]}>
          {isPageInitiallyPublished && !isInvited ? (
            // {false && (
            <TouchableOpacity
              onPress={onPressNFCWrite}
              disabled={isNFC}
              activeOpacity={isNFC ? 1 : 0}>
              <Image
                source={Images.NFCIcon}
                style={[
                  styles.iconWidthHeight,
                  AppStyles.mLeft15,
                  isNFC && {opacity: 0.4},
                ]}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity onPress={editBtnAction}>
            <Image
              source={Images.EditIcon}
              style={[styles.iconWidthHeight, AppStyles.mLeft15]}
            />
          </TouchableOpacity>
          {!isInvited && (
            <>
              <TouchableOpacity onPress={deleteBtnAction}>
                <Image
                  source={Images.DeleteIcon}
                  style={[styles.iconWidthHeight, AppStyles.mLeft15]}
                />
              </TouchableOpacity>
              {isPageInitiallyPublished && (
                <TouchableOpacity onPress={shareBtnAction}>
                  <Image
                    source={Images.ShareIcon}
                    style={[styles.iconWidthHeight, AppStyles.mLeft15]}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  const editModePageHeader = () => {
    return (
      <View style={[styles.pageHeaderStyle, AppStyles.alignItemsCenter]}>
        {/* <TouchableOpacity>
          <Image source={Images.AddIcon} style={styles.iconWidthHeight} />
        </TouchableOpacity> */}

        {(isEdit || (isCreation && isStartEditing)) && (
          <TouchableOpacity onPress={linkBtnAction} disabled={isLinkLoading}>
            <Image
              source={Images.AttachmentIconBlue}
              style={[
                styles.iconWidthHeight,
                isLinkLoading && styles.disabledBtn,
              ]}
            />
          </TouchableOpacity>
        )}

        {isCreation && !isStartEditing && (
          <TouchableOpacity onPress={backBtnAction}>
            <Image
              source={Images.BackButtonDotted}
              style={styles.iconWidthHeight}
            />
          </TouchableOpacity>
        )}

        {isCreation && !isStartEditing && (
          <TouchableOpacity
            onPress={startEditingBtnAction}
            style={{
              width: '43%',
              backgroundColor: Colors.background.tertiary,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text size={15} type="semiBold">
              {util.capitalizeString('start editing')}
            </Text>
          </TouchableOpacity>
        )}

        {(isEdit || (isCreation && isStartEditing)) && (
          <View style={AppStyles.flexRow}>
            <TouchableOpacity
              style={[styles.discardIcon]}
              onPress={() => setDiscardConfirmationAlertVisible(true)}>
              <Image source={Images.DiscardIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, isLinkLoading && styles.disabledBtn]}
              onPress={submitBtnAction}
              disabled={isLinkLoading}>
              <Text color={Colors.text.tertiary} type="semiBold" size={14}>
                {util.capitalizeString('Done')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const handleConfirmationMesaageOfDiscard = () => (
    <ModalView
      mainText={'Discard changes?'}
      subMainText={
        'All the changes you have made to this draft will be lost. This cannot be undone.'
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
            discardBtnAction();
          },
        },
      ]}
    />
  );

  const checkForBottomSheet = () => {
    if (isKeyboardOpen) {
      Keyboard.dismiss();
    } else {
      removeBottomSheet();
    }
  };

  return (
    <>
      {isBottomSheet && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.closeBottomSheetContainerStyle}
          onPress={() => checkForBottomSheet()}>
          <View />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        {!isEdit && !isCreation && viewPageHeader()}
        {(isEdit || isCreation) && editModePageHeader()}
        {discardConfirmationAlertVisible &&
          handleConfirmationMesaageOfDiscard()}
      </View>
    </>
  );
}

PageHeader.propTypes = {
  isEdit: PropTypes.bool,
  isCreation: PropTypes.bool,
  editBtnAction: PropTypes.func,
  isActive: PropTypes.bool,
  deleteBtnAction: PropTypes.func,
  submitBtnAction: PropTypes.func,
  isPagePublished: PropTypes.bool,
  shareBtnAction: PropTypes.func,
  isPageInitiallyPublished: PropTypes.bool,
  linkBtnAction: PropTypes.func,
  isStartEditing: PropTypes.bool,
  startEditingBtnAction: PropTypes.func,
  backBtnAction: PropTypes.func,
  discardBtnAction: PropTypes.func,
  isLinkLoading: PropTypes.bool,
  removeBottomSheet: PropTypes.func,
  isBottomSheet: PropTypes.bool,
  onPressNFCWrite: PropTypes.func,
  isNFC: PropTypes.bool,
};

PageHeader.defaultProps = {
  isEdit: false,
  isCreation: false,
  editBtnAction: Function(),
  isActive: false,
  deleteBtnAction: Function(),
  submitBtnAction: Function(),
  removeBottomSheet: Function(),
  isPagePublished: false,
  shareBtnAction: Function(),
  isPageInitiallyPublished: false,
  linkBtnAction: Function(),
  isStartEditing: false,
  startEditingBtnAction: Function(),
  backBtnAction: Function(),
  discardBtnAction: Function(),
  isLinkLoading: false,
  isBottomSheet: false,
  onPressNFCWrite: Function(),
  isNFC: false,
  isInvited: false,
};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(PageHeader);
