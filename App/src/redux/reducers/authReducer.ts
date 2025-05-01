const initialState = {
    user: null,
  };
  
  export default function authReducer(state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  }
  