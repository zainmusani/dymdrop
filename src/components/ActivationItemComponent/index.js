// @flow
import React, {useMemo, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {
  Text,
  ActivatationDetailComponent,
  ModalView,
  DestructiveActionBottomSheet,
} from '../';
import {
  deleteActivations,
  deleteNewActivations,
} from '../../actions/PassActivationActions';
import styles from './styles';
import {Colors, Images} from '../../theme';
import {connect, useDispatch} from 'react-redux';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';

function ActivationItemComponent(props) {
  const {
    isActive,
    onItemPress,
    isAnimated,
    animatedToggle,
    isEditable,
    updateToggle,
    deletePress,
    data,
    index,
    activations,
    newactivations,
    setSaveable,
  } = props;

  const frequency = data.activationFrequency.toString().toLowerCase();
  const [isDetailModal, seDetailModal] = useState(() => false);
  const [isDeleteModal, seDeletelModal] = useState(() => false);
  const [isActivationInUse, setActivationInUse] = useState(false);
  const [isActUnpublish, setActUnpublish] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const ActionSheetRef = useRef(null);

  const rowStyles = [
    {opacity: fadeAnim},
    {
      transform: [
        {
          scale: fadeAnim.interpolate({
            inputRange: [0, 0.3, 0.6, 1],
            outputRange: [0, 0.3, 0.6, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  ];

  const getLinkAnimation = () => {
    if (isAnimated && index === 0) {
      return rowStyles;
    } else {
      return {};
    }
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
    }).start();
    setTimeout(() => {
      if (isAnimated && index === 0) {
        animatedToggle();
      }
    }, 1000);
  }, [isAnimated]);
  const deleteModalToggle = () => {
    let allActivations = [...activations, ...newactivations];
    if (allActivations.length <= 1) {
      deletePress('Minimum 1 activation is required');
      return;
    }
    seDeletelModal(!isDeleteModal);
  };
  const onItemPressToggle = () => {
    if (isEditable) {
      if (data.activationPublished === 1 && data.isPurchased) {
        setActUnpublish(true);
      } else {
        onItemPress();
      }
    }
  };
  const cancelBtnAction = () => {
    seDeletelModal(!isDeleteModal);
  };
  const inUseCancelBtnAction = () => {
    setActivationInUse(!isActivationInUse);
  };
  const unpublishCancelBtnAction = () => {
    setActUnpublish(false);
  };

  const unpublishConfirmBtnAction = () => {
    setActUnpublish(false);
    onItemPress();
  };
  const confirmBtnAction = () => {
    seDeletelModal(!isDeleteModal);
    setSaveable(true);
    if (data.id) {
      dispatch(deleteActivations(data.id));
    } else {
      dispatch(deleteNewActivations(index));
    }
  };
  const updateToggleAction = () => {
    if (data.isPurchased) {
      setActivationInUse(true);
    } else {
      updateToggle({data: data, id: index.toString()});
    }
  };
  const EditBtnToggle = () => {
    ActionSheetRef?.current.show();
  };
  const activationModalView = () => (
    <View style={styles.modalContainer}>
      <View
        style={[
          styles.modalContentContainer,
          {
            paddingBottom:
              data.activationDescription.toString().length <= 200 ? 50 : 10,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            seDetailModal(false);
          }}
          style={styles.modalImageIconStyle}>
          <Image source={Images.CrossCloseIcon} />
        </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View>
            {/* <View> */}
            <View style={{marginBottom: 24}}>
              <Text size={20} type="semiBold">
                {data.activationName}
              </Text>
              <Text size={16} type="semiBold">
                ${data.activationPrice.toString().charAt(0) === '.' && '0'}
                {data.activationPrice}
                {frequency === 'annual'
                  ? ' / yr'
                  : frequency === 'monthly'
                  ? ' / mth'
                  : ''}
              </Text>
            </View>
            <View>
              <Text>{data.activationDescription}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={[
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, .5)',
        ]}
        style={styles.modalLinearGradient}
      />
    </View>
  );

  const detailModalSec = useMemo(() => {
    return (
      <>
        {isDetailModal && (
          <ActivatationDetailComponent
            isModalVisible={true}
            modalView={activationModalView}
            isDetailModalVisible={isDetailModal}
            seDetailModalVisibility={seDetailModal}
          />
        )}
      </>
    );
  }, [isDetailModal]);

  const deleteModalSec = useMemo(() => {
    return (
      <ModalView
        showModal={isDeleteModal}
        toggleModal={deleteModalToggle}
        mainText={
          data.isPurchased
            ? 'Are you sure?'
            : 'Are you sure you want to delete this activation?'
        }
        subMainText={
          data.isPurchased
            ? 'If you remove, passes will no longer be available for sale. All current passholders can continue with valid use of remaining vouchers.'
            : ''
        }
        btnArrOfModal={[
          {text: 'Cancel', onPress: () => cancelBtnAction()},
          {text: 'Yes', onPress: () => confirmBtnAction()},
        ]}
        isCloseAlertMsg={!isDeleteModal}
      />
    );
  }, [isDeleteModal]);

  const inUseModalSec = useMemo(() => {
    return (
      <ModalView
        showModal={isActivationInUse}
        toggleModal={inUseCancelBtnAction}
        mainText={'Activation in use'}
        subMainText="This activation is already in use by passholders and therefore the details cannot be edited."
        btnArrOfModal={[{text: 'Okay', onPress: () => inUseCancelBtnAction()}]}
        isCloseAlertMsg={!isActivationInUse}
      />
    );
  }, [isActivationInUse]);

  const unPublishModalSec = useMemo(() => {
    return (
      <ModalView
        showModal={isActUnpublish}
        toggleModal={inUseCancelBtnAction}
        mainText={'Are you sure?'}
        subMainText="If you unpublish, passes will no longer be available for sale. All current passholders can continue with valid use of remaining vouchers."
        btnArrOfModal={[
          {text: 'Cancel', onPress: () => unpublishCancelBtnAction()},
          {text: 'Yes', onPress: () => unpublishConfirmBtnAction()},
        ]}
        isCloseAlertMsg={!isActUnpublish}
      />
    );
  }, [isActUnpublish]);

  const iconSec = () => (
    <View
      style={[
        styles.selectAndRemoveIconStyle,
        isActive
          ? {
              backgroundColor: Colors.button.primary,
            }
          : {
              backgroundColor: Colors.button.reca,
              borderColor: Colors.border.quaternary,
              borderWidth: 2,
            },
      ]}>
      {isActive && (
        <Image source={Images.TickIcon} style={{top: 6, left: 5, width: 15}} />
      )}
    </View>
  );

  const contentSec = () => (
    <View style={[{flex: 1, flexDirection: 'row'}]}>
      <View style={styles.voucherCountStyle}>
        <Image source={Images.QRIcon} style={styles.qrIconStyle} />
        {data.activationScanlimit === 'unlimited' ? (
          <Image source={Images.Infinity} style={styles.infinityStyle} />
        ) : (
          <Text size={24} type="semiBold">
            {data.activationScanlimit}
          </Text>
        )}
      </View>
      <View style={{flex: 2, marginLeft: 16}}>
        <View style={{marginBottom: 16, marginTop: 7}}>
          <Text size={20} type="semiBold" numberOfLines={1}>
            {data.activationName}
          </Text>
          <Text size={16} type="semiBold">
            ${data.activationPrice.toString().charAt(0) === '.' && '0'}
            {data.activationPrice}
            {frequency === 'annual'
              ? ' / yr'
              : frequency === 'monthly'
              ? ' / mth'
              : ''}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            size={16}
            color={Colors.text.secondary}
            numberOfLines={2}
            style={[
              styles.activationDescription,
              util.isPlatformAndroid() && {top: -6},
            ]}>
            {data.activationDescription}
          </Text>
          <TouchableOpacity
            style={styles.moreTextContainer}
            onPress={() => {
              seDetailModal(!isDetailModal);
            }}>
            {data.activationDescription.length >= 36 && (
              <Text
                size={16}
                color={Colors.text.reca}
                style={{top: util.isPlatformAndroid() ? 2 : 8}}>
                More
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const activationItemSec = () => (
    <>
      {iconSec()}
      {contentSec()}
    </>
  );
  const editItemSec = () => (
    <TouchableOpacity style={styles.editItemBtn} onPress={EditBtnToggle}>
      <Image source={Images.EditActivation} style={styles.editItemBtnImg} />
    </TouchableOpacity>
  );
  return (
    <Animated.View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onItemPressToggle}
        style={[
          getLinkAnimation(),
          styles.container,
          isActive && styles.activeItemStyle,
        ]}>
        {isEditable && editItemSec()}
        {activationItemSec()}
        <View>
          {isDetailModal && detailModalSec}
          {isDeleteModal && deleteModalSec}
          {isActivationInUse && inUseModalSec}
          {isActUnpublish && unPublishModalSec}
          <DestructiveActionBottomSheet
            ActionSheetRef={ActionSheetRef}
            options={['Edit', 'Delete', 'Cancel']}
            cancelBtnIndex={2}
            destructiveBtnIndex={1}
            firstOptionToggle={updateToggleAction}
            secondOptionToggle={deleteModalToggle}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

ActivationItemComponent.propTypes = {
  activations: PropTypes.array,
  newactivations: PropTypes.array,
  isActive: PropTypes.bool,
  hasSelectBtn: PropTypes.bool,
  onItemPress: PropTypes.func,
  hasRemoveBtn: PropTypes.bool,
};

ActivationItemComponent.defaultProps = {
  activations: [],
  newactivations: [],
  isActive: false,
  hasSelectBtn: false,
  onItemPress: Function(),
  hasRemoveBtn: false,
};

const mapStateToProps = ({passActivations}) => ({
  activations: passActivations.activations,
  newactivations: passActivations.newActivations,
});

const actions = {};

export default connect(mapStateToProps, actions)(ActivationItemComponent);
