import React from 'react';

import {PlayerActions} from '../actions/playerAction';

export const initialState = {
  stage: 1,
  players: [],
  result: '',
  visible: false,
};

export const playerReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    case PlayerActions.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, payload],
      };

    case PlayerActions.SET_VISIBLE_START:
      return {
        ...state,
        visible: true,
      };

    case PlayerActions.SET_VISIBLE_START:
      return {
        ...state,
        visible: false,
      };

    case PlayerActions.NEXT_SCREEN:
      const playersTotal = state.players;
      const idPage = payload.id;
      //0.438383838 * 4 [{},{},{},{}]
      return {
        ...state,
        stage: idPage,
        result: playersTotal[Math.floor(Math.random() * playersTotal.length)], //Devuelve el maximo entero <= numero
      };

    case PlayerActions.REMOVE_PLAYER:
      const id = payload.id;
      let newPlayers = [];
      let players = state.players;
      players.forEach((player, index) => {
        if (index !== id) {
          newPlayers.push(player);
        }
      });
      return {
        ...state,
        players: newPlayers,
      };
    case PlayerActions.RESET:
      return initialState;
    default:
      return state;
  }
};
