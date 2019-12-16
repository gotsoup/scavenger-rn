import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import closeImage from '../../assets/icons/close-button.png';

type ChecklistItemProps = {
  visible: boolean,
  item: { name: string, latinName: string, description: string, images: Array<string>, hints: Array<string> }
  close: () => void
};

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 15,
    borderRadius: 5,
    padding: 15
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Gram-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 40,
    color: '#000'
  },
  latinName: {
    fontFamily: 'Gram-Regular',
    fontSize: 35,
    color: '#0A4D0E',
    textAlign: 'center'
  },
  normalText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#000'
  },
  hintTitle: {
    fontFamily: 'Gram-Regular',
    fontSize: 25,
    textTransform: 'uppercase',
    color: '#000',
    marginTop: 15
  },
  image: {
    width: width * 0.9,
    height: height * 0.35,
    marginVertical: 15
  },
  closeButton: {
    height: 65,
    width: 65,
    marginTop: 20,
  },
  closeText: {
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    fontSize: 60,
    backgroundColor: 'red'
  }
})

const ItemModal = ({
  visible,
  item,
  close
}: ChecklistItemProps) => {
  const { name, latinName, description, images, hints } = item;
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={close}
      style={styles.modal}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.latinName}>{latinName}</Text>
        <Image source={{ uri: images[0] }} resizeMode="cover" style={styles.image} />
        <Text style={styles.normalText}>{description}</Text>
        <Text style={styles.hintTitle}>FIND ME IN</Text>
        <Text style={styles.normalText}>{hints.join(', ')}</Text>
        </View>
        <TouchableOpacity onPress={close}>
          <Image source={closeImage} resizeMode="contain" style={styles.closeButton} />
        </TouchableOpacity>
      </View>
    </Modal>

  );
};

export default ItemModal;
