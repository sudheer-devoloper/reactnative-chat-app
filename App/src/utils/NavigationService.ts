import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function goBack(){
  navigationRef.current?.goBack()
}
