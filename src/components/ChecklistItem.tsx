import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import check from '../../assets/icons/check.png';

type ChecklistItemProps = {
  name: string;
  id: number;
  images: Array<string>;
  openModal: () => void;
  markComplete: (id: number, completed: boolean) => void;
  completed: boolean;
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.445,
    marginTop: 15,
    padding: 10
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  checkedContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(22, 128, 57, 0.45)',
    top: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkCircle: {
    backgroundColor: 'white',
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  check: {
    height: 20,
    width: 20
  },
  name: {
    fontFamily: 'Gram-Regular',
    fontSize: 21,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black'
  },
  image: {
    height: width * 0.3,
    width: width * 0.4,
    marginBottom: 10
  }
});

const ChecklistItem = ({
  id,
  completed,
  name,
  images,
  openModal,
  markComplete
}: ChecklistItemProps) => {
  return (
    <TouchableOpacity onPress={openModal} onLongPress={() => markComplete(id, !completed)}>
      <View style={[styles.container, styles.shadow]}>
        {completed ? (
          <View style={[styles.checkedContainer, styles.image]}>
            <View style={[styles.checkCircle, styles.shadow]}>
              <Image style={styles.check} source={check} resizeMode="contain" />
            </View>
          </View>
        ) : null}
        <Image
          source={{ uri: images[0] }}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChecklistItem;
