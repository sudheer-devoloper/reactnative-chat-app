export const loginSuccess = (user:any) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  