import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Permission
} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings
} from 'react-native-permissions';
import { updateItems, toggleCompleted } from '../reducers/items/actions';
import Header from '../components/Header';
import ChecklistItem from '../components/ChecklistItem';
import ItemModal from '../components/ItemModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    marginHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

interface IState {
  fontLoaded: boolean;
  modalVisible: boolean;
  selectedItem: {
    name: string;
    latinName: string;
    description: string;
    hints: string[];
    images: string[];
  };
}

interface IItem {
  id: number;
  name: string;
  description: string;
  item_id: string;
  latinName: string;
  images: string[];
  hints: string[];
  completed: boolean;
}

interface IProps {
  navigation: any;
  getItems: () => Promise<void>;
  toggleComplete: (id: number, completed: boolean) => void;
  items: Array<IItem>;
  completed: Object
}

class Checklist extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fontLoaded: false,
      modalVisible: false,
      selectedItem: {
        name: 'item name',
        latinName: 'latin name',
        description: 'item description',
        hints: [],
        images: []
      }
    };
  }

  async componentDidMount() {
    const { getItems } = this.props;
    getItems();
    this.checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      .then(() => this.checkPermission(PERMISSIONS.ANDROID.CAMERA))
      .catch(() => {
        throw new Error();
      });
  }

  componentWillUnmount() {
    this.setState({ modalVisible: false });
  }

  checkPermission = async (permission: Permission) => {
    if (Platform.OS === 'android') {
      const granted = await check(permission);
      if (granted === RESULTS.GRANTED) return true;
      return request(permission)
        .then(result => {
          console.log(result);
          if (result === RESULTS.GRANTED) return true;
          return false;
        })
        .catch(() => {
          return false;
        });
    }
  };

  openScreen = (name: string, props: Object) => {
    const { navigation } = this.props;
    if (name === 'Camera' && Platform.OS === 'android') {
      const results = [];
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          results.push(result);
          return check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        })
        .then(result => {
          results.push(result);
          if (
            results[0] !== RESULTS.GRANTED ||
            results[1] !== RESULTS.GRANTED
          ) {
            Alert.alert(
              'Required Permissions',
              'You must enable access to the camera and external storage to be able to use this functionality.',
              [
                { text: 'Open Settings', onPress: () => openSettings() },
                { text: 'Cancel', onPress: () => null }
              ],
              { cancelable: false }
            );
          } else {
            navigation.navigate(name, props);
          }
        });
    } else {
      navigation.navigate(name, props);
    }
  };

  openModal = (item: {
    name: string;
    latinName: string;
    description: string;
    hints: Array<string>;
    images: Array<string>;
  }) => {
    const { modalVisible } = this.state;
    this.setState({ selectedItem: item }, () => {
      this.setState({ modalVisible: !modalVisible });
    });
  };

  closeModal = () => {
    const { modalVisible } = this.state;
    console.log('close');
    this.setState({ modalVisible: !modalVisible });
  };

  markComplete = (id: number, completed: boolean) => {
    const { toggleComplete } = this.props;
    console.log('complete', id);
    toggleComplete(id, completed);
  };

  render() {
    const { fontLoaded, modalVisible, selectedItem } = this.state;
    const { items } = this.props;
    const plants : IItem[] = Object.keys(items).map(i => items[i]);
    return (
      <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Header title="Checklist" openScreen={this.openScreen} />
            <ScrollView contentContainerStyle={styles.list}>
              {plants.map(({ id, name, images, description, hints, latinName, completed}: IItem, index) => (
                <ChecklistItem
                  key={index}
                  name={name}
                  id={id}
                  images={images}
                  completed={completed}
                  markComplete={this.markComplete}
                  openModal={() =>
                    this.openModal({
                      name,
                      latinName,
                      description,
                      hints,
                      images
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        <ItemModal
          visible={modalVisible}
          item={selectedItem}
          close={this.closeModal}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: { itemReducer: { items: [] } }) => {
  return {
    items: state.itemReducer.items
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: () => dispatch(updateItems()),
    toggleComplete: (id: number, completed: boolean) => dispatch(toggleCompleted(id, completed))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
