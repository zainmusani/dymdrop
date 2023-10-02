import PropTypes from 'prop-types';
import React from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import util from '../../util';

function FlatlistComponent(props) {
  const {
    scrollEnabled,
    horizontal,
    itemsList,
    renderItemView,
    flatListRef,
    nestedScrollEnabled,
    style,
    ...rest
  } = props;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        // ref={ref => {
        //   myRef = ref;
        // }}
        scrollEnabled={scrollEnabled}
        style={style}
        nestedScrollEnabled={nestedScrollEnabled}
        horizontal={horizontal}
        data={itemsList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return renderItemView(item, index);
        }}
        {...rest}
      />
    </View>
  );
}

FlatlistComponent.propTypes = {
  itemsList: PropTypes.array,
  scrollEnabled: PropTypes.bool,
  horizontal: PropTypes.bool,
  flatListRef: PropTypes.any,
  nestedScrollEnabled: PropTypes.bool,
  style: PropTypes.object,
};

FlatlistComponent.defaultProps = {
  itemsList: [],
  scrollEnabled: false,
  horizontal: false,
  flatListRef: null,
  nestedScrollEnabled: false,
  style: {},
};

const mapStateToProps = ({}) => ({});

const actions = {};
export default connect(mapStateToProps, actions)(FlatlistComponent);
