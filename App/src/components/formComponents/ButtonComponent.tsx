import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonProps {
  onClick: () => void;
  style: any,
  buttonTextStyle?: any,
  title: string
}

const ButtonComponent = (props: ButtonProps) => {
  const { onClick, style, buttonTextStyle, title } = props;
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={style}>
        <Text style={buttonTextStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({})