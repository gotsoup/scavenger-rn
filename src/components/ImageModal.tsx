import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';
import closeImage from '../../assets/icons/close-button.png';

const { height, width } = Dimensions.get('window');
interface IProps {
  visible: boolean;
  image: Object;
  close: () => void;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: 'center',
    width: '75%'
  },
  closeButton: {
    height: 65,
    width: 65,
    marginTop: 20, 
  },
  image: {
    width: width * 0.9,
    height: height * 0.75,
    marginVertical: 15
  }
});

const ImageModal = ({ visible, image, close }: IProps) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={close}
      style={styles.modal}
    >
      <View style={styles.modal}>
        {image ? (
          <Image
            source={{ uri: image.node.image.uri }}
            resizeMode="contain"
            style={styles.image}
          />
        ) : null}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={close}>
            <Image
              source={closeImage}
              resizeMode="contain"
              style={styles.closeButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
