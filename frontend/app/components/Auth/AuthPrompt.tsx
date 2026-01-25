import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../Themed'

interface AuthPromptProps {
  onModeChange: (mode: 'login' | 'register') => void
  currentMode: 'login' | 'register'
  cardBackground: string
}

export const AuthPrompt = ({
  onModeChange,
  currentMode,
  cardBackground,
}: AuthPromptProps) => {
  const isLogin = currentMode === 'login'

  return (
    <View style={[{ backgroundColor: cardBackground }, styles.container]}>
      <Text style={styles.text}>
        {isLogin ? "If you still don't have an account" : 'Have an account?'}
      </Text>
      <View style={[{ backgroundColor: cardBackground }, styles.row]}>
        <Text style={styles.text}>Please </Text>
        <TouchableOpacity
          onPress={() => onModeChange(isLogin ? 'register' : 'login')}
        >
          <Text style={styles.link}>
            {isLogin ? 'REGISTER HERE' : 'LOGIN HERE'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    color: '#b9b2b2',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  link: {
    color: '#7bd695',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
  },
})
