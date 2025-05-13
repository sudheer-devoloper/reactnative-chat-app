import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getItem } from '../helpers/storage';
import { replace } from '../helpers/NavigationService';

export default function withAuth(Component: React.JSX.IntrinsicAttributes | any) {
  return function AuthHOC(props: React.JSX.IntrinsicAttributes) {
    const [user, setUser] = useState<any>();

    useEffect(() => {
      getUserInfo();
    },[])
   
    const getUserInfo = async() => {
      const res = await getItem('user')
      setUser(res)
      if (!res || res == null) {
        replace('Login'); 
      }
    }

    if (!user) {
      return (
        <View>
          <Text>You must be logged in to view this page.</Text>
        </View>
      );
    }

    return <Component {...props} user={user}/>;
  };
}
