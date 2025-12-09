import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'

export const CustomLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#23272f',
    card: '#2d313a',
    text: '#fff',
    border: '#444',
    primary: '#2f95dc',
    notification: '#ff9800',
  },
}

export const CustomDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121111ff',
    card: '#141313ff',
    text: '#fff',
    border: '#222',
    primary: '#fff',
    notification: '#ff9800',
  },
}
