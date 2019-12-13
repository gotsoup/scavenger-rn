import React from 'react';
import { StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';

type TabButtonProps = {
  icon: any;
  onPress: (event: GestureResponderEvent) => void
};

const styles = StyleSheet.create({
    icon: {
      height: 30,
      width: 30
    }
});

const Header = ({ icon, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default Header;