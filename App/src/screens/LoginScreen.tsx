import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputFeild from '../components/formComponents/TextInputFeild';
import ButtonComponent from '../components/formComponents/ButtonComponent';
import { loginApi } from '../../services/login';
import { setItem } from '../utils/storage';
import { replace } from '../utils/NavigationService';

const bgImage:HTMLImageElement = require('../assets/images/login.jpg') as string;

const LoginScreen = ({ navigation }:Navigation) => {
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try{
        if(username && password){
          const email = username.toLowerCase();
           const res = await loginApi({email:email,password:password});
           dispatch(loginSuccess(res?.data?.user));
           setItem('user',res?.data?.user)
           replace('BottomTabs')
        }else{
          console.error("Plaese enter all feilds");
        }
    }catch(e){
      console.error("Err in login");
      
    }
  }

  return (
    <ImageBackground source={bgImage} style={styles.container}>
       <StatusBar barStyle="light-content" hidden={false} backgroundColor="#007fe100" translucent={true} />
      <View style={styles.subContainer}>
      <TextInputFeild placeHolder='Username' value={username} setValue={setUsername} style={styles.textInput}/>
      <TextInputFeild placeHolder='Password' value={password} setValue={setPassword} style={styles.textInput} isPassword={true}/>
      <ButtonComponent title='Login' onClick={handleLogin} style={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle}/>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{flex:1},
  subContainer:{padding:15,alignItems:"center",justifyContent:"center",flex:1},
  textInput:{height:50,borderWidth:1,borderColor:"#d4d4d4",marginVertical:10,borderRadius:10,paddingHorizontal:10,width:"100%",backgroundColor:"#FFF"},
  buttonStyle:{height:50,marginVertical:10,backgroundColor:"#fff",borderRadius:10,alignItems:"center",justifyContent:"center",width:"100%"},
  buttonTextStyle:{fontSize:16,fontWeight:"700",color:"#000000",paddingHorizontal:15}
})
