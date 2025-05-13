import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar, Animated, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/actions/authActions';
import TextInputFeild from '../components/formComponents/TextInputFeild';
import ButtonComponent from '../components/formComponents/ButtonComponent';
import { loginApi } from '../../services/login';
import { setItem } from '../helpers/storage';
import { replace } from '../helpers/NavigationService';
import LottieView from 'lottie-react-native';
import { deviceWidth } from '../helpers/constants';

const bgImage: HTMLImageElement = require('../assets/images/login.jpg') as string;

const LoginScreen = () => {
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();
  const dispatch = useDispatch();
  const fcmToken = useSelector((state: any) => state.fcm.token);
  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(witchAnim, {toValue: deviceWidth * 0.02,duration: 2000,useNativeDriver: true}),
          Animated.timing(scaleXAnim, {toValue: 1,duration: 0,useNativeDriver: true})
        ]),
        Animated.delay(3000),
        Animated.parallel([
          Animated.timing(witchAnim, {toValue: deviceWidth * 2,duration: 8000,useNativeDriver: true}),
          Animated.timing(scaleXAnim, {toValue: 1,duration: 0,useNativeDriver: true})
        ]),
        Animated.parallel([
          Animated.timing(witchAnim, {toValue: -deviceWidth * 0.05,duration: 3000,useNativeDriver: true}),
          Animated.timing(scaleXAnim, {toValue: -1,duration: 0,useNativeDriver: true})
        ]),
        Animated.delay(3000),
        Animated.parallel([
          Animated.timing(witchAnim, {toValue: -deviceWidth * 2,duration: 8000,useNativeDriver: true}),
          Animated.timing(scaleXAnim, {toValue: -1,duration: 0,useNativeDriver: true})
        ])
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);


  const handleLogin = async () => {
    try {
      if (username && password) {
        const email = username.toLowerCase();
        const res = await loginApi({ email: email, password: password, fcmToken: fcmToken });
        dispatch(loginSuccess(res?.data?.user));
        setItem('user', res?.data?.user)
        replace('Drawer')
      } else {
        console.error("Plaese enter all feilds");
      }
    } catch (e) {
      console.error("Err in login");

    }
  }

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#007fe100" translucent={true} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.subContainer}>
          <LottieView source={require('../assets/Animations/4c433def-ad6f-4232-9426-f8299cdb7055.json')} autoPlay loop style={{ height: 350, width: 300 }} />
          <TextInputFeild placeHolder='Username' value={username} setValue={setUsername} style={styles.textInput} />
          <TextInputFeild placeHolder='Password' value={password} setValue={setPassword} style={styles.textInput} isPassword={true} />
          <ButtonComponent title='Login' onClick={handleLogin} style={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} />

        </View>
        <Animated.View style={[
          styles.sub, {
            transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim },]
          }
        ]}>
          <LottieView source={require('../assets/Animations/6d921b28-d958-403b-bcc3-64413b55280d.json')} autoPlay loop style={{ width: 200, height: 200 }} />
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  sub: { position: "absolute", top: "95%", left: '24%' },
  subContainer: { padding: 15, alignItems: "center", flex: 1 },
  textInput: { height: 50, borderWidth: 1, borderColor: "#d4d4d4", marginVertical: 10, borderRadius: 10, paddingHorizontal: 10, width: "100%", backgroundColor: "#FFF" },
  buttonStyle: { height: 50, marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, alignItems: "center", justifyContent: "center", width: "100%" },
  buttonTextStyle: { fontSize: 16, fontWeight: "700", color: "#000000", paddingHorizontal: 15 }
})
