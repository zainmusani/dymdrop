// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useCallback, useState, useRef} from 'react';
import {View, LayoutAnimation} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {
  getActivationsRequest,
  addActivations,
  activateActivations,
  activateNewActivations,
  discardActivations,
  updateActivations,
  updateNewActivations,
  publishActivationsRequest,
} from '../../actions/PassActivationActions';
import {
  KeyboardAwareScrollViewComponent,
  MainScreensHeader,
  ModalView,
  // FlatlistComponent,
  SpinnerComponent,
  Text,
  ActivationItemComponent,
  AlertModal,
} from '../../components';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {ALERT_TIMER} from '../../constants';
import Spinner from 'react-native-spinkit';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import Modal from 'react-native-modal';
import ActivationForm from './form';
import util from '../../util';
import styles from './styles';

function ManageActivation({
  incomingPageDetails,
  activations,
  newactivations,
  deletedactivations,
  toggle,
  saveAct,
  paymentDetails,
}) {
  const animationRef = useRef(null);
  const [isOpenView, setOpenView] = useState(true);
  const [getDataCall, setGetDataCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [isBackBtn, setIsBackBtn] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);
  const [isActivationLoading, setActivationLoading] = useState(false);
  const [isAnimated, setisAnimated] = useState(false);
  const [isUpdateModal, setUpdatelModal] = useState(false);
  const [isAddView, setAddView] = useState(false);
  const [selectedData, setselectedData] = useState(null);
  const [alertModal, setAlertModal] = useState(false);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] =
    useState('');
  const dispatch = useDispatch();

  const jiggle = {
    0: {
      rotate: '-0.75deg',
    },

    0.25: {
      rotate: '-0.5deg',
    },

    0.5: {
      rotate: '0deg',
    },

    0.75: {
      rotate: '0.5deg',
    },

    1: {
      rotate: '0.75deg',
    },
  };
  const setisAnimatedToggle = () => {
    setisAnimated(false);
  };
  const updateModalToggle = () => {
    setUpdatelModal(!isUpdateModal);
  };

  const updateModalSelectedToggle = data => {
    setselectedData(data);
    setUpdatelModal(!isUpdateModal);
  };

  const EditActicationToggle = () => {
    if (isEditable) {
      setIsDiscardChanges(true);
    } else {
      setIsEditable(true);
    }
  };

  const cancelBtnAction = () => {
    setIsDiscardChanges(!isDiscardChanges);
  };
  const childDeleteAction = error => {
    setResponseMessageFromApiCall(error);
    setAlertModal(true);
  };

  const ActivationSelectToggle = (data, index) => {
    setIsSaveable(true);
    let checkData = util.cloneDeepItem(data);
    checkData['activationPublished'] =
      data.activationPublished === 0
        ? 1
        : data.activationPublished === 1
        ? 0
        : 0;
    if (data.id) {
      dispatch(activateActivations(checkData));
    } else {
      dispatch(activateNewActivations({id: index, values: checkData}));
    }
  };
  const confirmBtnAction = () => {
    setIsEditable(false);
    setIsDiscardChanges(!isDiscardChanges);
    dispatch(discardActivations());
    toggle();
    setGetDataCall(!getDataCall);
    if (isBackBtn) {
      setIsBackBtn(!isBackBtn);
    }
  };

  const addViewToggle = () => {
    setAddView(!isAddView);
  };

  const createActivation = data => {
    if (
      activations?.find(x => x.activationName === data.activationName) ||
      newactivations?.find(x => x.activationName === data.activationName)
    ) {
      setResponseMessageFromApiCall('Activation already exsist');
      setAlertModal(true);
      return;
    }
    addViewToggle();
    setActivationLoading(true);
    setTimeout(() => {
      setActivationLoading(false);
      setIsSaveable(true);
      dispatch(addActivations(data));
      setisAnimated(true);
    }, 2000);
  };
  const updateActivation = (data, index) => {
    updateModalToggle();
    setIsSaveable(true);
    if (data.id) {
      dispatch(updateActivations(data));
    } else {
      dispatch(updateNewActivations({id: index, values: data}));
    }
  };
  const publishActivation = () => {
    if (
      newactivations.length === 0 &&
      activations.length === 0 &&
      deletedactivations.length === 0
    ) {
      setResponseMessageFromApiCall('No Activations Found');
      setAlertModal(true);
      return;
    }
    if (newactivations.length === 0 && activations.length === 0) {
      setResponseMessageFromApiCall('Minimum 1 activation is required');
      setAlertModal(true);
      return;
    }
    const publishedActivations = [...newactivations, ...activations].filter(
      x => x.activationPublished === 1,
    ).length;
    if (!paymentDetails.status && publishedActivations >= 1) {
      setResponseMessageFromApiCall('Payment setup required');
      setAlertModal(true);
      return;
    }
    if (!isSaveable) {
      setIsEditable(false);
      return;
    }
    setIsLoading(true);
    let payload = {
      pageId: incomingPageDetails.id,
      create: newactivations,
      update: activations,
      delete: deletedactivations,
    };
    dispatch(
      publishActivationsRequest(payload, res => {
        setIsLoading(false);
        if (!res.status) {
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        } else {
          setIsSaveable(false);
          setIsEditable(false);
          toggle();
          saveAct();
        }
      }),
    );
  };
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getActivationsRequest(incomingPageDetails?.id, res => {
        setIsLoading(false);
        if (!res.status) {
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  }, [getDataCall]);

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setAlertModal(false);
      setResponseMessageFromApiCall('');
    }, ALERT_TIMER);

    return (
      <AlertModal
        getAlertText={getAlertText}
        hasError={!util.isEmptyValue(responseMessageFromApiCall)}
        styleSpacingFromTopofScreen={{
          top: util.isPlatformAndroid()
            ? Metrics.screenHeight / 6.5
            : Metrics.screenHeight / 9,
        }}
      />
    );
  }, [alertModal]);

  const getAlertText = () => {
    if (!util.isEmptyValue(responseMessageFromApiCall)) {
      return responseMessageFromApiCall;
    } else {
      return 'Activation Saved';
    }
  };
  const discardChangesModalSec = useMemo(() => {
    return (
      <ModalView
        showModal={isDiscardChanges}
        toggleModal={cancelBtnAction}
        mainText={'Discard changes?'}
        subMainText={
          'All the changes you have made to this draft will be lost. This cannot be undone.'
        }
        btnArrOfModal={[
          {text: 'Keep', onPress: () => cancelBtnAction()},
          {text: 'Discard', onPress: () => confirmBtnAction()},
        ]}
        isCloseAlertMsg={!isDiscardChanges}
      />
    );
  }, [isDiscardChanges]);

  const activationLoaderSec = () => {
    return (
      isActivationLoading && (
        <View
          style={[
            {
              marginTop: 30,
              marginBottom: 40,
            },
          ]}>
          <Spinner
            style={[{alignSelf: 'center'}]}
            isVisible={isActivationLoading}
            size={30}
            type={'FadingCircleAlt'}
            color={Colors.black}
          />
        </View>
      )
    );
  };
  const headerSec = () => (
    <MainScreensHeader
      borderWidth={'100%'}
      headerAlign="center"
      headerSize={28}
      headerText={'Manage Activations'}
      firstIcon={isEditable ? Images.AddIcon : Images.BackButtonIcon}
      secondIcon={isEditable ? Images.DiscardIcon : Images.EditIcon}
      thirdIconText="SAVE"
      isThirdIconButton
      thirdIconStyle={[
        AppStyles.mLeft10,
        {
          backgroundColor:
            isEditable || isSaveable
              ? Colors.button.primary
              : Colors.progressBar.secondary,
        },
      ]}
      firstIconAction={() => {
        !isEditable ? toggle() : addViewToggle();
      }}
      secondIconAction={() => {
        EditActicationToggle();
      }}
      thirdIconAction={() => {
        if (isEditable || isSaveable) {
          publishActivation();
        }
      }}
    />
  );
  const descriptionSec = () => (
    <View style={[AppStyles.marginHorizontalBase, AppStyles.mTop5]}>
      <Text
        color={Colors.text.secondary}
        size={18}
        style={{textAlign: 'center'}}>
        Select or edit the vouchers you {'\n'}
        want to offer your fans.
      </Text>
    </View>
  );
  const plansSec = () => (
    <View style={styles.planSecStyle}>
      {/* {activationLoaderSec()}
      {[...newactivations, ...activations].map((item, index) => (
        // <ScaleDecorator activeScale={1.05}>
        <View
          style={{
            marginTop: 18,
            marginBottom:
              index === [...newactivations, ...activations].length - 1 ? 10 : 0,
          }}>
          <Animatable.View
            ref={animationRef}
            animation={isEditable ? jiggle : null}
            duration={200}
            easing="ease-in-out-back"
            iterationCount={'infinite'}>
            <ActivationItemComponent
              key={index}
              isAnimated={isAnimated}
              animatedToggle={setisAnimatedToggle}
              isEditable={isEditable}
              updateToggle={updateModalSelectedToggle}
              isActive={!!item.activationPublished}
              index={index}
              data={item}
              deletePress={childDeleteAction}
              onItemPress={() => {
                ActivationSelectToggle(item, index);
              }}
            />
          </Animatable.View>
        </View>
        // </ScaleDecorator>
      ))} */}
      <DraggableFlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        activationDistance={10}
        style={styles.list}
        // nestedScrollEnabled={tr}
        scrollEnabled={true}
        // contentInsetAdjustmentBehavior="scrollableAxes"
        ListHeaderComponent={
          <>
            {isDiscardChanges && discardChangesModalSec}
            {headerSec()}
            {descriptionSec()}
            {activationLoaderSec()}
          </>
        }
        keyExtractor={(item, index) => {
          return [...newactivations, ...activations].length - index;
        }}
        data={[...newactivations, ...activations]}
        renderItem={({item, index}) => {
          return (
            <ScaleDecorator activeScale={1.05}>
              <View
                style={{
                  marginTop: 18,
                  marginBottom:
                    index === [...newactivations, ...activations].length - 1
                      ? 50
                      : 0,
                }}>
                <Animatable.View
                  ref={animationRef}
                  animation={isEditable ? jiggle : null}
                  duration={200}
                  easing="ease-in-out-back"
                  iterationCount={'infinite'}>
                  <ActivationItemComponent
                    key={index}
                    isAnimated={isAnimated}
                    animatedToggle={setisAnimatedToggle}
                    isEditable={isEditable}
                    updateToggle={updateModalSelectedToggle}
                    isActive={!!item.activationPublished}
                    setSaveable={() => {
                      setIsSaveable(true);
                    }}
                    index={index}
                    data={item}
                    deletePress={childDeleteAction}
                    onItemPress={() => {
                      ActivationSelectToggle(item, index);
                    }}
                  />
                </Animatable.View>
              </View>
            </ScaleDecorator>
          );
        }}
      />
    </View>
  );
  const overlay = () => (
    <View
      style={{
        backgroundColor: Colors.background.overlay,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        // zIndex: 99,
      }}></View>
  );
  const mainContent = () => (
    <>
      {/* {overlay()} */}
      {/* <SafeAreaView
        style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}
        edges={['top']}> */}
      {/* <DraggableFlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // scrollEnabled={true}
        activationDistance={10}
        style={styles.list}
        // nestedScrollEnabled={true}
        keyExtractor={item => {
          return [0].length - item;
        }}
        data={[0]}
        renderItem={({item}) => {
          return (
            <React.Fragment key={item}> */}
      {alertModal && alertSec()}
      <SpinnerComponent isLoading={isLoading} />
      <View
        style={[
          styles.container,
          {
            paddingVertical: Metrics.baseMargin,
            // paddingBottom: 0,
            flex: 1,
            // height: Metrics.screenHeight,
            // [...newactivations, ...activations].length > 3 ? '105%' : '100%',
          },
        ]}>
        {/* <KeyboardAwareScrollViewComponent
            scrollEnabled={true}
            style={{
              backgroundColor: Colors.background.primary,
              paddingVertical: Metrics.baseMargin,
            }}> */}
        {plansSec()}
        {/* </KeyboardAwareScrollViewComponent> */}
      </View>
      {/* </SafeAreaView> */}
      {(isAddView || isUpdateModal) && overlay()}
      {/* </React.Fragment>
          );
        }}
      /> */}
      {isAddView && (
        <ActivationForm
          toggle={addViewToggle}
          title="Create Activation"
          type="create"
          onSubmit={createActivation}
        />
      )}
      {isUpdateModal && (
        <ActivationForm
          toggle={updateModalToggle}
          title="Update Activation"
          type="update"
          data={selectedData.data}
          dataindex={selectedData.id}
          onSubmit={updateActivation}
        />
      )}
    </>
  );
  return (
    <Modal
      isVisible={isOpenView}
      onBackButtonPress={() => {
        if (isEditable || isSaveable) {
          setIsBackBtn(true);
          setIsDiscardChanges(true);
        } else {
          setOpenView(false);
          toggle();
        }
      }}
      animationIn={'zoomInUp'}
      animationOut={'zoomOut'}
      animationInTiming={2}
      animationOutTiming={150}
      style={styles.modalStyle}>
      {util.isPlatformAndroid() ? (
        <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
          {mainContent()}
        </GestureHandlerRootView>
      ) : (
        mainContent()
      )}
    </Modal>
  );
}

ManageActivation.propTypes = {
  activations: PropTypes.array,
  newactivations: PropTypes.array,
  deletedactivations: PropTypes.array,
  toggle: PropTypes.func,
  saveAct: PropTypes.func,
};

ManageActivation.defaultProps = {
  activations: [],
  newactivations: [],
  deletedactivations: [],
  toggle: Function(),
  saveAct: Function(),
};

const mapStateToProps = ({pages, passActivations, payment}) => ({
  incomingPageDetails: pages.freePageDetails,
  activations: passActivations.activations,
  newactivations: passActivations.newActivations,
  deletedactivations: passActivations.deletedActivations,
  paymentDetails: payment.details,
});

const actions = {};

export default connect(mapStateToProps, actions)(ManageActivation);
