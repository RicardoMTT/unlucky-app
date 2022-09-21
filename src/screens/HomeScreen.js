import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Input, Button, Text} from 'react-native-elements';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {PlayerContext, usePlayer} from '../context/providers/playerProvider';
import {useContext} from 'react';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const {addPlayer, removePlayer, getNextHandler, visible} = usePlayer();
  const context = useContext(PlayerContext);
  const [hasLiked, setHasLiked] = useState(false);
  const progress = useRef(new Animated.Value(0));

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <Formik
        initialValues={{player: ''}}
        validationSchema={Yup.object({
          player: Yup.string()
            .min(3, 'Musth be more 3 letters')
            .max(15, 'must be less than 15 letters'),
        })}
        onSubmit={(values, {resetForm}) => {
          //Keyboard.dismiss();
          console.log('Eee');
          addPlayer(values.player);
          resetForm();
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <Input
              placeholder="Add names here"
              inputContainerStyle={{
                marginHorizontal: 50,
                marginTop: 50,
              }}
              renderErrorMessage={errors.player && touched.player}
              errorMessage={errors.player}
              errorStyle={{
                marginHorizontal: 50,
              }}
              onChangeText={handleChange('player')}
              onBlur={handleBlur('player')}
              value={values.player}
            />
            <Button
              buttonStyle={styles.button}
              title="Add player"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <View>
        {context.players && context.players.length > 0 ? (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'flex-start',
                marginHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <Text style={styles.title}>List of players </Text>
              <Text style={styles.subtitle}>(min 2 players)</Text>
            </View>

            <ScrollView>
              {context.players.map((player, idx) => (
                <TouchableOpacity onPress={() => removePlayer(idx)} key={idx}>
                  <Text style={styles.item}>{player.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {context.players && context.players.length >= 2 ? (
              <Button
                buttonStyle={{
                  alignSelf: 'center',
                  width: 200,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                title="Get losser"
                onPress={() => {
                  const newValue = 1;
                  console.log('pro', progress.current);
                  progress.current = new Animated.Value(0);
                  Animated.timing(progress.current, {
                    toValue: newValue,
                    duration: 5000,
                    useNativeDriver: true,
                  }).start();
                  setHasLiked(!hasLiked);
                  getNextHandler();
                }}
              />
            ) : null}
          </>
        ) : null}
      </View>
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={require('../assets/loading.json')}
            progress={progress.current}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DB3EB1',
    marginTop: 20,
    width: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  subtitle: {
    fontSize: 15,
  },
  item: {
    marginTop: 10,
    fontSize: 20,
    backgroundColor: '#70E09B',
    padding: 20,
    marginHorizontal: 20,
    color: 'white',
  },
});

export default HomeScreen;
