import React from 'react';
import { Dimensions, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
type TabButtonProps = {
  icon: any;
  onPress: (event: GestureResponderEvent) => void
};

const styles = ScaledSheet.create({
  iconContainer: {
    marginLeft: 10
  },
  icon: {
    height: '30@ms',
    width: '30@ms'
  }
});

const Header = ({ icon, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default Header;