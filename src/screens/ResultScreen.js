import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {PlayerContext, usePlayer} from '../context/providers/playerProvider';
import LottieView from 'lottie-react-native';

const ResultScreen = () => {
  const progress = useRef(new Animated.Value(0));

  const context = useContext(PlayerContext);
  useEffect(() => {
    Animated.timing(progress.current, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, []);
  const {resetPlay} = usePlayer();
  return (
    <>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/sad.json')}
          progress={progress.current}
        />
        <Text style={styles.name}> {context.result.name}</Text>
        <TouchableOpacity style={styles.button} onPress={resetPlay}>
          <Text style={styles.textcontent}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DB3EB1',
    marginTop: 20,
    width: 200,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 200,
    height: 200,
  },
  name: {
    marginTop: 330,
    fontSize: 25,
  },
  textcontent: {
    fontSize: 18,
    color: 'white',
  },
});
export default ResultScreen;
