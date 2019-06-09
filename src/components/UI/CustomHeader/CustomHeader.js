import React from 'react';
import { View, Text } from 'react-native';
import styles from './customHeaderStyles.js';

const CustomHeader = props => {
  const headerInner = (
    <View style={ [styles.headerView, {height: (props.height) ? props.height : styles.headerView.height}] }>
      <View style={styles.leftBlock}>
        {props.leftBlock}
      </View>
      <View style={styles.centerBlock}>
        {props.centerBlock}
      </View>
      <View style={styles.rightBlock}>
        {props.rightBlock}
      </View>
    </View>
  );
  return (
      <View style={styles.background}>
        <View style={ styles.topBorder }></View>
        {headerInner}
      </View>
  );
}

export default CustomHeader;
