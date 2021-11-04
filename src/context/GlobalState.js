import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const initialState = {
  heroes: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addHero = (hero) => {
    dispatch({
      type: 'ADD_HERO',
      payload: hero,
    });
  };

  const editHero = (hero) => {
    dispatch({
      type: 'EDIT_HERO',
      payload: hero,
    });
  };

  const removeHero = (id) => {
    dispatch({
      type: 'REMOVE_HERO',
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        heroes: state.heroes,
        dispatch,
        addHero,
        editHero,
        removeHero,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
