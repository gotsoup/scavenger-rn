import React from 'react';
import {
  Linking,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Header from '../components/Header';
import ImageModal from '../components/ImageModal';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  noImages: {
    fontFamily: 'Gram-Regular',
    fontSize: 40,
    textAlign: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingVertical: 5,
    marginBottom: 60
  },
  image: {
    height: width / 4 - 5,
    width: width / 4 - 5,
    marginBottom: 5,
    marginHorizontal: 2
  },
  galleryContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  galleryButton: {
    fontFamily: 'Gram-Regular',
    textTransform: 'uppercase',
    fontSize: 40,
    paddingVertical: 15,
    color: 'black'
  }
});

interface IProps {
  navigation: any;
}

interface IState {
  photos: any;
  modalVisible: boolean;
  selectedPhoto: Object;
}

class Gallery extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      photos: [],
      modalVisible: false,
      selectedPhoto: null
    };
  }
  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 100,
      groupName: 'Scavenger: Pacific Northwest'
    }).then(result => this.setState({ photos: result.edges }));
  };

  openScreen = (name: string) => {
    const { navigation } = this.props;
    navigation.navigate(name);
  };

  openImage = (photo: Object) => {
    this.setState({ selectedPhoto: photo }, () => {
      this.setState({ modalVisible: true });
    });
  };

  closeImage = () => {
    const { modalVisible } = this.state;
    console.log('close');
    this.setState({ modalVisible: !modalVisible });
  };

  openPhotoApp = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };

  renderPhotos = () => {
    const { photos } = this.state;
    return (
      <View style={styles.imageContainer}>
        {photos.map(photo => {
          return (
            <TouchableOpacity
              onPress={() => this.openImage(photo)}
              key={photo.node.image.uri}
            >
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: photo.node.image.uri }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    const { photos, modalVisible, selectedPhoto } = this.state;
    console.log(photos);
    return (
      <View style={styles.container}>
        <Header title="Gallery" openScreen={this.openScreen} />
        <ScrollView >
          {photos.length > 0 ? (
            this.renderPhotos()
          ) : (
            <View style={styles.innerContainer}>
              <Text style={styles.noImages}>You have no images yet!</Text>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.galleryContainer}
          onPress={this.openPhotoApp}
        >
          <Text style={styles.galleryButton}>Open Photos</Text>
        </TouchableOpacity>
        <ImageModal
          visible={modalVisible}
          image={selectedPhoto}
          close={this.closeImage}
        />
      </View>
    );
  }
}

export default Gallery;
