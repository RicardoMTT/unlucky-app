import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {PlayerProvider} from './src/context/providers/playerProvider';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import RNBootSplash from 'react-native-bootsplash';
const App = () => {
  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await RNBootSplash.hide({fade: true});
  //     console.log('Bootsplash has been hidden successfully');
  //   });
  // }, []);
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <PlayerProvider>
        <RootNavigator />
      </PlayerProvider>
    </NavigationContainer>
  );
};

export default App;
