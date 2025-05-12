import { Alert, Platform, ToastAndroid } from "react-native"

export const showResponce = (message: any) => {
   if(Platform.OS == "ios"){
    Alert.alert("Message",message)
   }else{
    ToastAndroid.show(message,ToastAndroid.SHORT);
   }
}