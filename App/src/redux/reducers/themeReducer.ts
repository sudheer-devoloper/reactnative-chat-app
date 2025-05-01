import { FONTS } from "../../utils/fonts";

const initialState = {
    font: FONTS.REGULAR,
    gradient: {
      colors: ["#d900ee", "#6200ee", "#0015ee"],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  };
  
  const themeReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_FONT':
        return { ...state, font: action.payload };
      case 'SET_GRADIENT':
        return { ...state, gradient: action.payload };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  