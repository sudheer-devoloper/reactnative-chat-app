const initialState = {
    token: '',
  };
  
  const fcmReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_FCM_TOKEN':
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  
  export default fcmReducer;
  