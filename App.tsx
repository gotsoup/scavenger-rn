import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import configureStore from './src/utils/store';
import Camera from './src/screens/Camera';
import Checklist from './src/screens/Checklist';
import Gallery from './src/screens/Gallery';
import ItemModal from './src/components/ItemModal';


const MainNavigator = createStackNavigator(
  {
    Checklist: { screen: Checklist },
    Gallery: { screen: Gallery },
    Camera: { screen: Camera }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator
    },
    ItemModal: {
      screen: ItemModal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

const store = configureStore();

const AppStack = createAppContainer(RootStack);

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <AppStack />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
