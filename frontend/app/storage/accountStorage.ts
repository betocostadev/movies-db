import AsyncStorage from '@react-native-async-storage/async-storage'

const JWT_KEY = 'jwt'

export const setJwt = async (token: string) => {
  await AsyncStorage.setItem(JWT_KEY, token)
}

export const getJwt = async (): Promise<String | null> => {
  return AsyncStorage.getItem(JWT_KEY)
}

export const removeJwt = async () => {
  await AsyncStorage.removeItem(JWT_KEY)
}
