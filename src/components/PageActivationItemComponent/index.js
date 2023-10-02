// @flow
import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Text as TextRN,
} from 'react-native';
import {Text, ActivatationDetailComponent} from '../';
import styles from './styles';
import {Colors, Images} from '../../theme';
import {connect} from 'react-redux';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';

function PageActivationItemComponent(props) {
  const {
    data,
    isActive,
    hasSelectBtn,
    onItemPress,
    hasRemoveBtn,
    hasOwnActivation,
  } = props;

  const [isModal, setModal] = useState(() => false);
  const frequency = data?.activationFrequency.toString().toLowerCase() ?? '';
  const activationModalView = () => (
    <View style={styles.modalContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.modalContentContainer}>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}
            style={styles.modalImageIconStyle}>
            <Image source={Images.CrossCloseIcon} />
          </TouchableOpacity>
          <View>
            <View style={{marginBottom: 24}}>
              <Text size={20} type="semiBold">
                {data.activationName}
              </Text>
              <Text size={16} type="semiBold">
                ${data.activationPrice}
                {frequency === 'annual'
                  ? ' / yr'
                  : frequency === 'monthly'
                  ? ' / mth'
                  : ''}
              </Text>
            </View>
            <Text>{data.activationDescription}</Text>
          </View>
        </View>
      </ScrollView>
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

  const modalSec = useMemo(
    () =>
      isModal && (
        <ActivatationDetailComponent
          isModalVisible={true}
          modalView={activationModalView}
          isDetailModalVisible={isModal}
          seDetailModalVisibility={setModal}
        />
      ),
    [isModal],
  );

  const iconSec = () =>
    hasSelectBtn ? (
      <>
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
            <Image source={Images.TickIcon} style={{top: 6, left: 3}} />
          )}
        </View>
      </>
    ) : (
      hasRemoveBtn && (
        <TouchableOpacity
          style={styles.selectAndRemoveIconStyle}
          onPress={onItemPress}>
          <Image source={Images.SelectionRemoveIcon} />
        </TouchableOpacity>
      )
    );

  const contentSec = () => (
    <>
      {hasOwnActivation && <View style={styles.bottomLineStyle} />}
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            paddingRight: hasOwnActivation ? 30 : 0,
            height: 112,
          },
        ]}>
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
              ${data.activationPrice}
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
                util.isPlatformAndroid() && {top: -6},
                {display: 'flex', justifyContent: 'flex-start'},
              ]}>
              {data.activationDescription}
            </Text>
            <TouchableOpacity
              style={styles.moreTextContainer}
              onPress={() => {
                setModal(!isModal);
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
    </>
  );

  const activationItemSec = () => (
    <>
      {iconSec()}
      {contentSec()}
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => {
        if (hasRemoveBtn) return;
        onItemPress(data);
      }}
      style={[
        styles.container,
        isActive && styles.activeItemStyle,
        {paddingRight: hasOwnActivation ? 20 : 50},
      ]}>
      {activationItemSec()}
      {modalSec}
    </TouchableOpacity>
  );
}

PageActivationItemComponent.propTypes = {
  isActive: PropTypes.bool,
  hasSelectBtn: PropTypes.bool,
  onItemPress: PropTypes.func,
  hasRemoveBtn: PropTypes.bool,
  isDetail: PropTypes.bool,
  hasOwnActivation: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  fromPass: PropTypes.bool,
};

PageActivationItemComponent.defaultProps = {
  isActive: false,
  hasSelectBtn: false,
  onItemPress: Function(),
  isDetail: false,
  hasRemoveBtn: false,
  hasOwnActivation: false,
  isSubscribed: false,
  fromPass: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(PageActivationItemComponent);
