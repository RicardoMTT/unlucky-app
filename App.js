import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {PlayerProvider} from './src/context/providers/playerProvider';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <PlayerProvider>
        <RootNavigator />
      </PlayerProvider>
    </NavigationContainer>
  );
};

export default App;
