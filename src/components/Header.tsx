import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import TabButton from './TabButton';
import { standardMargin } from '../styles/global';
import checklist from '../../assets/icons/checklist.png';
import book from '../../assets/icons/book.png';
import camera from '../../assets/icons/camera.png';

type HeaderProps = {
  title: string;
  openScreen: (name: string, props: Object) => void
};

const { height } = Dimensions.get('window');
const buttons = [
  { image: checklist, screen: 'Checklist' },
  { image: book, screen: 'Gallery' },
  { image: camera, screen: 'Camera' }
];

const styles = StyleSheet.create({
  container: {
    height: height * 0.15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: standardMargin,
    flexDirection: "column",
    justifyContent: 'flex-end',
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gram-Regular',
    fontSize: 50,
    color: '#000'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%'
  }
});

const Header = ({ title, openScreen }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonRow}>
          {buttons.map((button, index) => (
            <TabButton key={index} icon={button.image} onPress={() => openScreen(button.screen)} />
          ))}
        </View>
      </View>

    </View>
  );
};

export default Header;
