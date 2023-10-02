// @flow
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {ActionBottomSheet, ModalView, Text} from '..';
import {Colors, Images, Metrics} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {LINK_CARD_VIEW_TYPE} from '../../constants';
import * as Animatable from 'react-native-animatable';
import util from '../../util';

function LinkCard(props) {
  const [isActionSheetVisible, setActionSheetVisible] = useState(() => false);
  const [isConfirmationAlertVisible, setConfirmationAlertVisible] = useState(
    () => false,
  );

  const [fadeAnim] = useState(() => new Animated.Value(0));

  const animationRef = useRef(null);

  const {
    id,
    cardViewType,
    heading,
    description,
    image,
    actionButtonText,
    actionButtonPress,
    editButtonPress,
    removeButtonPress,
    thumbnail,
    editMode,
    onDrag,
    loadingStart,
    loadingEnd,
    loadingLinkImageIds,
    linkHeight,
    onLongPressLink,
    linkIndex,
    isLinkAdded,
    setLinkAdded,
    isLinkLoading,
    linksLength,
    longPressLink,
  } = props;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      // useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!isLinkLoading && isLinkAdded) {
      setLinkAdded(false);
    }
  }, [isLinkLoading]);

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

  const rightImageLinkCard = () => (
    <View style={styles.rightImgContainer}>
      <View style={styles.rightImageView1}>
        <Text
          style={[styles.heading, {paddingRight: 6}]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {heading}
        </Text>
        <View>
          {/* {!loadingLinkImageIds.includes(id) && (
            <View style={styles.brokenImg}>
              <Image
                style={{
                  width: 64,
                  height: 64,
                  marginLeft: 16,
                  borderRadius: 8,
                }}
                source={Images.BrokenImage}
              />
            </View>
          )} */}
          <Image
            source={
              thumbnail && {uri: _.isPlainObject(image) ? image.image : image}
            }
            style={{width: 64, height: 64, marginLeft: 16, borderRadius: 8}}
            onLoadStart={() => {
              if (!loadingLinkImageIds.includes(id)) {
                loadingStart();
              }
            }}
            onLoadEnd={loadingEnd}
          />
          {loadingLinkImageIds.includes(id) && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={[styles.loader, {marginLeft: 16, borderRadius: 8}]}
            />
          )}
        </View>
      </View>

      <View style={styles.rightImageView2}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {description}
        </Text>
        {actionButtonText.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            disabled={editMode}
            onPress={navigateToUrl}>
            <Text style={styles.buttonText} numberOfLines={1}>
              {actionButtonText.length < 7
                ? `${actionButtonText}`
                : `${actionButtonText.substring(0, 6)}...`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const leftImageLinkCard = () => (
    <View style={styles.leftImgContainer}>
      <View style={[styles.leftImageView1, {marginRight: 16}]}>
        <View>
          {/* {!loadingLinkImageIds.includes(id) && (
            <View style={styles.brokenImg}>
              <Image
                style={{
                  width: 64,
                  height: 64,
                  marginRight: 16,
                  borderRadius: 8,
                }}
                source={Images.BrokenImage}
              />
            </View>
          )} */}
          <Image
            source={
              thumbnail && {uri: _.isPlainObject(image) ? image.image : image}
            }
            style={{width: 64, height: 64, marginRight: 16, borderRadius: 8}}
            onLoadStart={() => {
              if (!loadingLinkImageIds.includes(id)) {
                loadingStart();
              }
            }}
            onLoadEnd={loadingEnd}
          />

          {loadingLinkImageIds.includes(id) && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={[styles.loader, {marginRight: 16, borderRadius: 8}]}
            />
          )}
        </View>
        <Text
          style={[styles.heading, {paddingRight: 6}]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {heading}
        </Text>
      </View>

      <View style={[styles.leftImageView2, {paddingRight: 16}]}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {description}
        </Text>
        {actionButtonText.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            disabled={editMode}
            onPress={navigateToUrl}>
            <Text style={styles.buttonText}>
              {actionButtonText.length < 7
                ? `${actionButtonText}`
                : `${actionButtonText.substring(0, 6)}...`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const topImageLinkCard = () => (
    <View
      style={[
        styles.topImgBg,
        {
          height: linkHeight + 80,
          overflow: 'hidden',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      ]}>
      {/* {!loadingLinkImageIds.includes(id) && (
        <View style={styles.brokenImg}>
          <Image
            style={{
              width: '100%',
              height: linkHeight,
            }}
            source={Images.BrokenImage}
          />
        </View>
      )} */}
      <ImageBackground
        source={
          thumbnail && {uri: _.isPlainObject(image) ? image.image : image}
        }
        onLoadStart={() => {
          if (!loadingLinkImageIds.includes(id)) {
            loadingStart();
          }
        }}
        onLoadEnd={loadingEnd}
        imageStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          resizeMode: 'cover',
        }}
        style={{height: linkHeight}}>
        <LinearGradient
          colors={['rgba(0,0,0,.8)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,0)']}
          style={[styles.topImgContainer]}>
          <Text
            style={[styles.heading, {color: Colors.white, paddingRight: 6}]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {heading}
          </Text>
        </LinearGradient>
        {loadingLinkImageIds.includes(id) && (
          <ActivityIndicator
            size="small"
            color={Colors.white}
            style={[
              styles.loader,
              {borderTopLeftRadius: 16, borderTopRightRadius: 16},
            ]}
          />
        )}
      </ImageBackground>

      <View style={[styles.topImgView1]}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {description}
        </Text>
        {actionButtonText.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            disabled={editMode}
            onPress={navigateToUrl}>
            <Text style={styles.buttonText}>
              {actionButtonText.length < 7
                ? `${actionButtonText}`
                : `${actionButtonText.substring(0, 6)}...`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const bottomImageLinkCard = () => (
    <View
      style={[
        styles.topImgBg,
        {
          height: linkHeight + 96,
          overflow: 'hidden',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      ]}>
      <View style={[styles.bottomImgView1]}>
        <Text
          style={[styles.heading, {paddingRight: 6}]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {heading}
        </Text>
      </View>
      <View>
        {/* {!loadingLinkImageIds.includes(id) && (
          <View style={styles.brokenImg}>
            <Image
              style={{
                width: '100%',
                height: linkHeight,
              }}
              source={Images.BrokenImage}
            />
          </View>
        )} */}
        <ImageBackground
          source={
            thumbnail && {uri: _.isPlainObject(image) ? image.image : image}
          }
          onLoadStart={() => {
            if (!loadingLinkImageIds.includes(id)) {
              loadingStart();
            }
          }}
          onLoadEnd={loadingEnd}
          imageStyle={{borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}
          style={{height: linkHeight}}
          resizeMode={'cover'}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,0.8)']}
            style={styles.bottomImgContainer}>
            <Text
              style={[styles.description, {color: Colors.white}]}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {description}
            </Text>
            {actionButtonText.length > 0 && (
              <TouchableOpacity
                style={styles.button}
                disabled={editMode}
                onPress={navigateToUrl}>
                <Text style={styles.buttonText}>
                  {actionButtonText.length < 7
                    ? `${actionButtonText}`
                    : `${actionButtonText.substring(0, 6)}...`}
                </Text>
              </TouchableOpacity>
            )}
          </LinearGradient>

          {loadingLinkImageIds.includes(id) && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={[
                styles.loader,
                {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
              ]}
            />
          )}
        </ImageBackground>
      </View>
    </View>
  );

  const LinkCardWithoutThumbnail = () => (
    <TouchableOpacity
      onLongPress={longPressAction}
      onPressOut={pressOutAction}
      style={[styles.leftImgContainer, {paddingRight: Metrics.baseMargin}]}
      onPress={() => !editMode && navigateToUrl()}
      activeOpacity={editMode ? 1 : 0.9}>
      <View style={[styles.leftImageView1, {justifyContent: 'center'}]}>
        <Text
          style={[styles.heading, {paddingRight: 12}]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {heading}
        </Text>
      </View>

      <View style={styles.leftImageView2}>
        <Text style={styles.description} ellipsizeMode="tail" numberOfLines={2}>
          {description}
        </Text>
        {actionButtonText.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            disabled={editMode}
            onPress={navigateToUrl}>
            <Text style={styles.buttonText}>
              {actionButtonText.length < 7
                ? `${actionButtonText}`
                : `${actionButtonText.substring(0, 6)}...`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const editButton = () => (
    <TouchableOpacity
      style={[styles.editIcon]}
      onPress={() => setActionSheetVisible(true)}>
      <Image source={Images.EditLinkIcon} resizeMode={'contain'} />
    </TouchableOpacity>
  );

  const actionSheet = () => (
    <ActionBottomSheet
      firstBtnText={'Edit'}
      secondBtnText={'Remove'}
      firstBtnAction={() => {
        setActionSheetVisible(false);
        editButtonPress();
      }}
      secondBtnAction={() => {
        setActionSheetVisible(false);
        setConfirmationAlertVisible(true);
      }}
      cancelBtnAction={() => {
        setActionSheetVisible(false);
      }}
    />
  );

  const confirmationMesaageOfDel = () => (
    <ModalView
      mainText={'Are you sure?'}
      subMainText={'Removing this link will delete all of its contents.'}
      btnArrOfModal={[
        {
          text: 'Cancel',
          onPress: () => setConfirmationAlertVisible(false),
        },
        {
          text: 'Delete',
          onPress: () => {
            setConfirmationAlertVisible(false);
            removeButtonPress();
          },
        },
      ]}
      toggleModal={setConfirmationAlertVisible}
    />
  );

  const navigateToUrl = () => {
    util.openLink(actionButtonPress);
  };

  const longPressAction = () => {
    if (editMode) {
      linkIndex === 0 && onLongPressLink(true);
      onDrag();
    }
  };

  const pressOutAction = () => {
    if (editMode) {
      linkIndex === 0 && onLongPressLink(false);
    }
  };

  const getLinkAnimation = () => {
    if (util.isPlatformAndroid()) {
      if (linksLength === 1 && isLinkAdded) {
        return rowStyles;
      } else if (linksLength > 1 && linkIndex === 0 && isLinkAdded) {
        return rowStyles;
      }
    } else {
      return {};
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        {thumbnail && (
          <Animatable.View
            ref={animationRef}
            animation={editMode ? jiggle : null}
            duration={200}
            easing="ease-in-out-back"
            iterationCount={'infinite'}
            style={[{paddingHorizontal: 29}]}>
            <TouchableOpacity
              // style={util.isPlatformAndroid() && isLinkAdded && rowStyles}
              style={[getLinkAnimation()]}
              onLongPress={longPressAction}
              onPressOut={pressOutAction}
              onPress={() => !editMode && navigateToUrl()}
              activeOpacity={editMode ? 1 : 0.9}>
              {cardViewType === LINK_CARD_VIEW_TYPE.RIGHT && (
                <>
                  {editMode && editButton()}

                  {rightImageLinkCard(props)}
                </>
              )}
              {cardViewType === LINK_CARD_VIEW_TYPE.LEFT && (
                <>
                  {editMode && editButton()}

                  {leftImageLinkCard(props)}
                </>
              )}
              {cardViewType === LINK_CARD_VIEW_TYPE.TOP && (
                <>
                  {editMode && editButton()}

                  {topImageLinkCard(props)}
                </>
              )}
              {cardViewType === LINK_CARD_VIEW_TYPE.BOTTOM && (
                <>
                  {editMode && editButton()}

                  {bottomImageLinkCard(props)}
                </>
              )}
            </TouchableOpacity>
          </Animatable.View>
        )}

        {isActionSheetVisible && <>{actionSheet()}</>}

        {isConfirmationAlertVisible && <>{confirmationMesaageOfDel()}</>}
        {!thumbnail && (
          <Animatable.View
            ref={animationRef}
            animation={editMode ? jiggle : null}
            duration={200}
            easing="ease-in-out-back"
            iterationCount={'infinite'}
            style={[{paddingHorizontal: 29}, getLinkAnimation()]}>
            {editMode && (
              <View style={!util.isPlatformAndroid() && {zIndex: 1}}>
                {editButton()}
              </View>
            )}

            {LinkCardWithoutThumbnail()}
          </Animatable.View>
        )}
      </View>
    </>
  );
}

LinkCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.any,
  actionButtonText: PropTypes.string.isRequired,
  actionButtonPress: PropTypes.string.isRequired,
  cardViewType: PropTypes.string,
  editButtonPress: PropTypes.func,
  removeButtonPress: PropTypes.func,
  thumbnail: PropTypes.bool,
  editMode: PropTypes.bool,
  loadingStart: PropTypes.func,
  loadingEnd: PropTypes.func,
  loadingLinkImageIds: PropTypes.array,
  onDrag: PropTypes.func,
  linkHeight: PropTypes.number,
  onLongPressLink: PropTypes.func,
  longPressLink: PropTypes.bool,
  linkIndex: PropTypes.number,
  isLinkAdded: PropTypes.bool,
  setLinkAdded: PropTypes.func,
  isLinkLoading: PropTypes.bool,
  linksLength: PropTypes.number,
};

LinkCard.defaultProps = {
  image: '',
  cardViewType: 'right',
  editButtonPress: Function(),
  removeButtonPress: Function(),
  thumbnail: true,
  editMode: false,
  loadingStart: Function(),
  loadingEnd: Function(),
  loadingLinkImageIds: [],
  onDrag: Function(),
  linkHeight: 200,
  onLongPressLink: Function(),
  longPressLink: false,
  linkIndex: 0,
  isLinkAdded: false,
  setLinkAdded: Function(),
  isLinkLoading: false,
  linksLength: null,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(LinkCard);
