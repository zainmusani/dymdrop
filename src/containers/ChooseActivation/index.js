// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getPageActivationsRequest} from '../../actions/PassActivationActions';
import {Image, ScrollView, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import Spinner from 'react-native-spinkit';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import {
  MainScreensHeader,
  FlatlistComponent,
  Text,
  AlertModal,
  PageActivationItemComponent,
} from '../../components';
import {ALERT_TIMER} from '../../constants';
import util from '../../util';

function ChooseActivation(props) {
  const {chooseActivationClose, pageid, pageThumb, activations} = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] =
    useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getPageActivationsRequest(pageid, res => {
        setIsLoading(false);
        if (!res.status) {
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  }, [pageid]);

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
      return 'Activations';
    }
  };
  const headerSec = () => (
    <MainScreensHeader
      headerText="Choose Activation"
      headerAlign="center"
      // headerTextStyle={{alignSelf: 'center'}}
      headerTextFontSize={26}
      borderWidth={'100%'}
      secondIcon={Images.CrossCloseIcon}
      secondIconAction={() => {
        // Actions.pop();
        chooseActivationClose();
      }}
    />
  );

  const activationDescSec = () => (
    <View style={{alignItems: 'center', paddingHorizontal: 64}}>
      <Text
        color={Colors.text.neka}
        type="bold"
        size={18}
        style={{marginBottom: 8}}>
        Build your own package!
      </Text>
      <Text
        color={Colors.text.secondary}
        size={16}
        style={{textAlign: 'center'}}>
        Grab your tickets now without committing to specific dates.
      </Text>
    </View>
  );

  const plansSec = () => (
    <View style={styles.planSecStyle}>
      <FlatlistComponent
        itemsList={activations}
        emptyComponent={
          <View style={styles.emptyComponentStyle}>
            <Text size={26} color={Colors.text.secondary}>
              No Activations Found
            </Text>
          </View>
        }
        renderItemView={(item, index) => {
          return (
            <View style={{marginBottom: 16}}>
              <PageActivationItemComponent
                data={item}
                hasSelectBtn={true}
                isActive={activeItemIndex === index}
                onItemPress={() => {
                  selectActiveItem(index);
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );

  const passesLoaderSec = () => {
    return (
      <View
        style={{
          marginTop: 50,
        }}>
        <Spinner
          style={[{alignSelf: 'center'}]}
          isVisible={isLoading}
          size={34}
          type={'FadingCircleAlt'}
          color={Colors.black}
        />
      </View>
    );
  };

  const selectActiveItem = index => {
    if (util.areValuesEqual(activeItemIndex, index)) {
    } else {
      setActiveItemIndex(index);
    }
  };

  return (
    <SafeAreaView
      style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}
      edges={['top']}>
      {alertModal && alertSec()}
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: Colors.background.primary,
          }}>
          {headerSec()}
          <View style={styles.images}>
            <Image
              source={pageThumb}
              style={{
                marginRight: 41,
                width: 105,
                height: 105,
                borderRadius: 100,
              }}
            />
            <Image source={Images.ring} />
          </View>
          {activationDescSec()}

          {isLoading ? passesLoaderSec() : plansSec()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

ChooseActivation.propTypes = {
  activations: PropTypes.array,
};

ChooseActivation.defaultProps = {
  activations: [],
};

const mapStateToProps = ({passActivations}) => ({
  activations: passActivations.pageActivations,
});

const actions = {};

export default connect(mapStateToProps, actions)(ChooseActivation);
