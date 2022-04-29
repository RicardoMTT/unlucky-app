import React from 'react';
import {createContext, useContext, useReducer} from 'react';
import {Alert} from 'react-native';
import {PlayerActions} from '../actions/playerAction';
import {initialState, playerReducer} from '../reducers/playerReducer';
import {useNavigation} from '@react-navigation/native';

export const PlayerContext = createContext(initialState);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('PlayerContext must be an PlayerProvider');
  return context;
};

export const PlayerProvider = ({children}) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const navigation = useNavigation();
  const addPlayer = name => {
    dispatch({
      type: PlayerActions.ADD_PLAYER,
      payload: {
        name: name,
      },
    });
  };

  const removePlayer = id => {
    console.log('id', id);
    dispatch({
      type: PlayerActions.REMOVE_PLAYER,
      payload: {
        id,
      },
    });
  };

  const getNextHandler = () => {
    const players = state.players;
    if (players.length < 2) {
      Alert.alert('You need at least 2 players');
    } else {
      dispatch({
        type: PlayerActions.SET_VISIBLE_START,
      });
      setTimeout(() => {
        dispatch({
          type: PlayerActions.NEXT_SCREEN,
          payload: {
            id: 2, //Este id representa la vista 2 que se usa en el
          },
        });
        navigation.navigate('ResultScreen');
      }, 5000);
    }
  };

  const resetPlay = () => {
    dispatch({
      type: PlayerActions.RESET,
    });
    navigation.navigate('HomeScreen');
  };

  return (
    <PlayerContext.Provider
      value={{...state, addPlayer, removePlayer, getNextHandler, resetPlay}}>
      {children}
    </PlayerContext.Provider>
  );
};
