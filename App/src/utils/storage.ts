import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const getItem = async (key: string) => {
    let data: any = await AsyncStorage.getItem(key);
    if (data != null) {
        return JSON.parse(data)
    } else {
        return null
    }
}

export const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key)
}

export const clearStorage = async () => {
    await AsyncStorage.clear()
} 