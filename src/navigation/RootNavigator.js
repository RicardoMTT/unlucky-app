import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import MyStack from './HomeNavigator';

const RootNavigator = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar translucent backgroundColor="transparent" />
      {<MyStack />}
    </View>
  );
};

export default RootNavigator;
