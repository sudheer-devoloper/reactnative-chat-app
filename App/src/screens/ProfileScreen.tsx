import React, { useEffect, useState } from 'react';
import { View, Text, Button, StatusBar, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import ButtonComponent from '../components/formComponents/ButtonComponent';
import TextInputFeild from '../components/formComponents/TextInputFeild';
import { FONTS } from '../utils/fonts';

const ProfileScreen = ({ navigation, user }: any) => {
  const dispatch = useDispatch();
  const gradient = useSelector((state: any) => state.theme.gradient);
  const font = useSelector((state: any) => state.theme.font);

  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "")
  const [mobile, setMobile] = useState<string>(user?.mobile || "")
  const [editId, setEditId] = useState<string>(user?.id || "")


  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const updateUser = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#007fe100" translucent />
      <Header />
      <View style={styles.formContainer}>
        <TextInputFeild value={name} setValue={setName} placeHolder='Enter name' style={[styles.textInput, { fontFamily: font }]} />
        <TextInputFeild value={email} ktype="email-address" setValue={setEmail} placeHolder='Enter email' style={[styles.textInput, { fontFamily: font }]} />
        <TextInputFeild value={mobile.toString()} ktype="number-pad" setValue={setMobile} placeHolder='Enter mobile number ( Ex:[0-9] )' style={[styles.textInput, { fontFamily: font }]} />
        <ButtonComponent title='UPDATE' onClick={updateUser} style={[styles.button, { backgroundColor: gradient?.colors[0] }]} buttonTextStyle={[styles.btn, { fontFamily: font }]} />
      </View>
    </View>
  );
}

export default ProfileScreen  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    // paddingTop: StatusBar.currentHeight || 20,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: 22,
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    textDecorationLine: 'underline',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 45,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:20,
    marginTop: 15,
  },
  btn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

