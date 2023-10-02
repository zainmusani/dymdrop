import React, {useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text} from '../../components';
import {IMAGES_OPTIONS} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';
import {useCallback} from 'react';
import ProgressBarComponent from '../ProgressBarComponent';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';

function SelectImageComponent(props) {
  const {
    getImage,
    setOptionDropDown,
    isChoseImageClickable,
    selectedImageObj,
    isPlaceholderImage,
    imageForShow,
    isThumbnailLoading,
    isPermissionGranted,
    setPermissionGranted,
    loadingLinkImageIds,
    itemId,
    setWereLinksShuffled,
    showThumbnailOfLinkSec,
    shouldImageOptionsRemainVisible,
    setImageOptionsRemainVisible,
    isOptionDropDown,
    setEnableView,
  } = props;

  const [isImageOptionVisible, setImageOptionVisibility] = useState(
    () => false,
  );
  const [imageObj, setImageObj] = useState(() => selectedImageObj);
  const [isImageLoading, setImageLoading] = useState(() => false);
  const [isImageLoaded, setImageLoaded] = useState(() => false);
  const [imageErrorVisible, setImageErrorVisible] = useState(() => false);
  const [showPlaceholderImage, setShowPlaceholderImage] = useState(
    () => isPlaceholderImage,
  );

  useEffect(() => {
    if (!shouldImageOptionsRemainVisible) {
      setImageOptionsRemainVisible(true);
      setImageErrorVisible(false);
      setImageOptionVisibility(false);
      setOptionDropDown(false);
    }
  }, [shouldImageOptionsRemainVisible]);

  useEffect(() => {
    if (!showThumbnailOfLinkSec) {
      setImageOptionVisibility(false);
    }
  }, [showThumbnailOfLinkSec]);

  const toggleImageOptions = () => {
    setImageErrorVisible(false);
    setImageOptionVisibility(!isImageOptionVisible);
    setOptionDropDown(!isOptionDropDown);
  };

  const onSelectImage = imgObj => {
    toggleImageOptions();
    setImageObj(imgObj);
    setImageLoaded(false);
    if (
      imgObj?.type.includes('jpeg') ||
      imgObj?.type.includes('jpg') ||
      imgObj?.type.includes('png')
    ) {
      setEnableView(false);
      setShowPlaceholderImage(false);
      setImageLoading(true);
    }
  };

  const setImageinChooseImageBox = useCallback(() => {
    return (
      !util.isArrayOrObjEmpty(imageObj) &&
      (imageObj?.type.includes('jpeg') ||
        imageObj?.type.includes('jpg') ||
        imageObj?.type.includes('png')) &&
      (isImageLoaded ||
        (!util.isArrayOrObjEmpty(selectedImageObj) && !isImageLoading))
    );
  }, [imageObj, isImageLoaded, selectedImageObj, isImageLoading]);

  useEffect(() => {
    if (isImageLoading) {
      setImageOptionVisibility(false);
    }
  }, [isImageLoading]);

  function onImageUploadComplete() {
    if (isImageLoading) {
      const imgPromise = uploadImageToServer(imageObj?.image);
      imgPromise
        .then(data => {
          getImage({image: data, type: imageObj?.type});
          setImageLoading(false);
          setImageLoaded(true);
          setEnableView(true);
        })
        .catch(() => {
          setImageErrorVisible(true);
          setImageLoading(false);
        });
    }
  }

  const chooseImageBtnSec = () => (
    <TouchableOpacity
      disabled={isChoseImageClickable}
      onPress={toggleImageOptions}
      style={[
        styles.chooseImgContainer,
        isChoseImageClickable && {borderColor: Colors.border.hica},
      ]}>
      <Text
        size={14}
        type="semiBold"
        style={[isChoseImageClickable && {opacity: 0.4}]}>
        {util.capitalizeString('Choose Image')}
      </Text>
    </TouchableOpacity>
  );

  const imageOptionsSec = () => (
    <View style={[styles.imageOptionsContainer]}>
      {IMAGES_OPTIONS.map((item, index) => {
        const isFirstItem = index === 0;
        if (util.isPlatformAndroid() && item.id === 3) {
          // removing browse option in android
          return null;
        }
        return (
          <TouchableOpacity
            onPress={() => askPermissionToRead(item?.onPress, item?.id)}
            style={[
              styles.optionContainer,
              isFirstItem && styles.noBorderBottomStyling,
              // IMAGES_OPTIONS.length !== item.id && styles.borderBottomStyling,
            ]}>
            <Text size={17}>{item.title}</Text>
            <Image
              source={item.img}
              style={[styles.iconStyling]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  async function askPermissionToRead(onPress, id) {
    //ID 1 is gallery and 2 is camera
    if (util.isPlatformAndroid()) {
      if (!isPermissionGranted) {
        return onPress(onSelectImage, setPermissionGranted);
      }

      let permissionType = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE; //default
      if (id === 1) {
        permissionType = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      } else if (id === 2) {
        permissionType = PermissionsAndroid.PERMISSIONS.CAMERA;
      }
      const granted = await PermissionsAndroid.request(permissionType);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // getPhotos();
        onPress(onSelectImage, Function);
      } else {
        onPress(onSelectImage, setPermissionGranted);
      }
    } else {
      onPress(onSelectImage, setPermissionGranted);
    }
  }

  const progressBarSec = useCallback(() => {
    if (isImageLoading) {
      setWereLinksShuffled(false);
      return (
        <>
          <View style={{width: '82%', marginRight: 9}}>
            <View style={styles.chooseImgContainer}>
              <Text size={14} type="semiBold">
                {util.capitalizeString('Uploading...')}
              </Text>
              <View style={{width: '100%', top: -30}}>
                <ProgressBarComponent
                  onProgressCompleteAction={onImageUploadComplete}
                  incomingStyle={styles.progressBarStyle}
                />
              </View>
            </View>
          </View>
        </>
      );
    }
  }, [isImageLoading]);

  const imageBoxSec = () => (
    <View style={AppStyles.flex}>
      <View
        style={[
          styles.imgViewContainer,
          isChoseImageClickable && {opacity: 0.4},
        ]}>
        {setImageinChooseImageBox() || showPlaceholderImage ? (
          <Image
            source={
              showPlaceholderImage
                ? {uri: imageForShow}
                : {uri: imageObj?.image}
            }
            style={styles.boxImageStyle}
          />
        ) : (
          <View style={styles.imgView} />
        )}
      </View>
      {loadingLinkImageIds.includes(itemId) && (
        <ActivityIndicator
          size="small"
          color={Colors.black}
          style={[styles.thumbnailLoader]}
        />
      )}
    </View>
  );

  const imageErrorSec = () => (
    <View style={[AppStyles.mTop5, {marginLeft: 3}]}>
      <Text color={Colors.text.error} type="medium" size={15}>
        Error occurred, please try again.
      </Text>
    </View>
  );

  return (
    <>
      <View style={[styles.container]}>
        <View style={[AppStyles.flex]}>
          <View style={[AppStyles.flexRow]}>
            {!isImageLoading && chooseImageBtnSec()}
            {progressBarSec()}
            {imageBoxSec()}
          </View>
          {imageErrorVisible && imageErrorSec()}
        </View>
        {isImageOptionVisible && imageOptionsSec()}
      </View>
    </>
  );
}

SelectImageComponent.propTypes = {
  getImage: PropTypes.func,
  isChoseImageClickable: PropTypes.bool,
  isPlaceholderImage: PropTypes.bool,
  setOptionDropDown: PropTypes.func,
  selectedImageObj: PropTypes.object,
  imageForShow: PropTypes.any,
  isThumbnailLoading: PropTypes.bool,
  isPermissionGranted: PropTypes.bool,
  setPermissionGranted: PropTypes.func,
  loadingLinkImageIds: PropTypes.array,
  itemId: PropTypes.number,
  setWereLinksShuffled: PropTypes.func,
  showThumbnailOfLinkSec: PropTypes.bool,
  shouldImageOptionsRemainVisible: PropTypes.bool,
  setImageOptionsRemainVisible: PropTypes.func,
  isOptionDropDown: PropTypes.bool,
  setEnableView: PropTypes.func,
};

SelectImageComponent.defaultProps = {
  getImage: Function(),
  isChoseImageClickable: false,
  isPlaceholderImage: false,
  setOptionDropDown: Function(),
  selectedImageObj: {},
  isThumbnailLoading: false,
  isPermissionGranted: true,
  setPermissionGranted: Function(),
  loadingLinkImageIds: [],
  itemId: null,
  setWereLinksShuffled: Function(),
  showThumbnailOfLinkSec: true,
  shouldImageOptionsRemainVisible: true,
  setImageOptionsRemainVisible: Function(),
  isOptionDropDown: false,
  setEnableView: Function(),
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SelectImageComponent);
