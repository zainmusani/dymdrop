import React from 'react';
import {Image, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {ProgressBarComponent, Text} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import styles from './styles';

function LoaderScreen(props) {
  const {userData} = props;
  return (
    <View style={[styles.container]}>
      <View style={[AppStyles.mBottom30, AppStyles.mLeft15]}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={Images.DymeDropIcon}
              style={styles.imageDimensionStyle}
            />
          </View>

          <View style={styles.progressBarContainer} />
          <ProgressBarComponent
            onProgressCompleteAction={() => {
              // Actions.reset('dashboard', {isAccountCreatedAlert: true})
              if (!userData.isUserApproved) {
                Actions.reset('dashboard', {isBlockedAlert: true});
              } else {
                Actions.reset('dashboard', {isAccountCreatedAlert: true});
              }
            }}
            incomingStyle={styles.progressBarStyle}
            progressBarDuration={200}
          />
        </View>
        <View style={[AppStyles.mTop10, {right: 10}]}>
          <Text size={15} color={Colors.text.neka}>
            Creating account...
          </Text>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(LoaderScreen);
