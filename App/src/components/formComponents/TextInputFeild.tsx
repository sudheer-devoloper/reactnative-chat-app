import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface TextInputProps { value: string | number | any, setValue: (val: string | number | any) => void, placeHolder: string, style: any, isPassword?: boolean, ktype?: any }

const TextInputFeild = (props: TextInputProps) => {
    const { value, setValue, placeHolder, style, isPassword, ktype } = props;
    return (
        <TextInput value={value}
            keyboardType={ktype ? ktype : "default"}
            onChangeText={(text) => setValue(text)}
            placeholder={placeHolder}
            style={style}
            secureTextEntry={isPassword}
        />
    )
}

export default TextInputFeild

const styles = StyleSheet.create({})