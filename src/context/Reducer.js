export default function Reducer(state, action) {
  switch (action.type) {
    case 'SET_HEROeS':
      return { ...state, heroes: action.payload };
    case 'ADD_HERO':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };

    case 'EDIT_HERO':
      const updatedHero = action.payload;

      const updatedHeroes = state.heroes.map((hero) => {
        if (hero.id === updatedHero.id) {
          return updatedHero;
        }
        return hero;
      });

      return {
        ...state,
        heroes: updatedHeroes,
      };

    case 'REMOVE_HERO':
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };

    default:
      return state;
  }
}
