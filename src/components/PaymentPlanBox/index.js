import PropTypes from 'prop-types';
import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import CheckBox from '../CheckBox';
import styles from './styles';

const offeredItemsFreeList = [
  {id: 1, title: 'Bio'},
  {id: 1, title: 'Click Analytics'},

  {id: 1, title: 'Rich Links'},
  {id: 1, title: 'Link Editor'},
  {id: 1, title: 'Link Editor'},
  {id: 1, title: 'Share Everywhere'},

  {id: 1, title: 'Analytics'},
  {id: 1, title: 'Encode Chip'},
];

const offeredItemsProList = [
  {id: 1, title: 'Animations'},
  {id: 1, title: 'Fonts'},

  {id: 1, title: 'Backgrounds'},
  {id: 1, title: 'Remove our logo'},
  {id: 1, title: 'Colors'},
  {id: 1, title: 'Shadows'},

  {id: 1, title: 'Corners'},
  {id: 1, title: 'Borders'},
];

function PaymentPlanBox(props) {
  const {isFree, showCheckBox} = props;

  const pricingSec = () => {
    return (
      <View>
        {selectPlanSec()}
        {offeredItemsSec()}
      </View>
    );
  };

  const selectPlanSec = () => (
    <View style={styles.selectPlanContainer}>
      <View>
        <View style={styles.selectPlanFirstText}>
          <Text size={24} type="bold">
            {isFree ? 'Free' : 'Pro — coming soon'}
          </Text>
          {isFree && (
            <Text
              size={14}
              style={styles.selectPlanFirstTextChild}
              color={Colors.text.secondary}>
              {isFree ? '/forever' : '/yr'}
            </Text>
          )}
        </View>
        <Text size={14} style={AppStyles.mTop10} color={Colors.text.secondary}>
          {isFree ? 'Clean look, 3 pages' : 'Fully Branded, Unlimited pages'}
        </Text>
      </View>
      {showCheckBox && (
        <View>
          <CheckBox isChecked={true} isDisabled={true} />
        </View>
      )}
    </View>
  );

  const offeredItemsSec = () => {
    return (
      <View style={styles.offeredItemsSecContainer}>
        <View>
          <Text size={14} type="semiBold">
            Style
          </Text>
          <Text size={24} type="bold">
            {isFree ? 'Basic' : 'Custom'}
          </Text>
        </View>
        <View style={[AppStyles.mRight30, {width: 110}]}>
          <Text size={14} type="semiBold">
            Pages
          </Text>
          <Text size={24} type="bold">
            {isFree ? '3' : 'Unlimited'}
          </Text>
        </View>
      </View>
    );
  };

  const buildYourBrandSec = () => {
    return (
      <View>
        <View>
          <Text size={18} type="bold">
            {isFree ? 'You Get:' : 'Build Your Brand:'}
          </Text>
          {!isFree && (
            <Text
              size={14}
              style={{marginTop: 7}}
              color={Colors.text.secondary}>
              Everything in Free Plan, plus:
            </Text>
          )}
          <View style={{marginLeft: 2, marginRight: -12, marginTop: 5}}>
            <FlatList
              numColumns={2}
              columnWrapperStyle={styles.buildYouBrandSecItemsColumn}
              scrollEnabled={false}
              data={isFree ? offeredItemsFreeList : offeredItemsProList}
              renderItem={({item}) => (
                <View style={styles.buildYourSecItemContainer}>
                  <View style={styles.buildYourSecItemImageContainer}>
                    <Image
                      source={Images.TickIcon}
                      style={styles.buildYourSecItemImage}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.buildYourSecItemTextContainer}>
                    <Text
                      numberOfLines={2}
                      size={14}
                      color={Colors.text.secondary}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[
        styles.paymentBoxContainer,
        showCheckBox && {borderColor: Colors.border.hepta, borderWidth: 2},
      ]}>
      {pricingSec()}
      <View style={styles.borderLineStyle} />

      {buildYourBrandSec()}
    </View>
  );
}

PaymentPlanBox.propTypes = {
  isFree: PropTypes.bool,
  showCheckBox: PropTypes.bool,
};

PaymentPlanBox.defaultProps = {isFree: false, showCheckBox: true};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(PaymentPlanBox);
