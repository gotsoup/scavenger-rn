import React from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRollExtended from 'react-native-store-photos-album';
import flashIcon from '../../assets/icons/flash.png';
import noFlashIcon from '../../assets/icons/no-flash.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    borderRadius: 50,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center'
  },
  captureButton: {
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignSelf: 'center',
    borderRadius: 35
  },
  captureContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  topRow: {
    marginTop: 45,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  flashButton: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
  exitButton: {
    alignSelf: 'center',
    fontFamily: 'Gram-Regular',
    fontSize: 40
  },
  button: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

interface IProps {
  navigation: any;
}

interface IState {
  flash: boolean;
}

class Camera extends React.PureComponent<IProps, IState> {
  private camera;

  constructor(props: IProps) {
    super(props);
    this.state = {
      flash: false
    };

    this.camera = React.createRef();
  }

  openScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('Checklist');
  };

  toggleFlash = () => {
    const { flash } = this.state;
    this.setState({ flash: !flash });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRollExtended.saveToCameraRoll(
        { uri: data.uri, album: 'Scavenger: Pacific Northwest' },
        'photo'
      );
    }
  };

  render() {
    const { flash } = this.state;
    return (
      <SafeAreaView style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={
              flash
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            captureAudio={false}
          />
          <View style={styles.topRow}>
            <TouchableOpacity onPress={this.openScreen} style={styles.button}>
              <Text style={styles.exitButton}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFlash} style={styles.button}>
              <Image
                source={flash ? flashIcon : noFlashIcon}
                style={styles.flashButton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
              <View style={styles.captureButton} />
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }
}

export default Camera;
