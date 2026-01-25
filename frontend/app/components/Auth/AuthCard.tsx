import { StyleSheet } from 'react-native'
import { useThemeColor, View } from '../Themed'
import { AuthPrompt } from './AuthPrompt'

interface AuthCardProps {
  children: React.ReactNode
  onModeChange: (mode: 'login' | 'register') => void
  mode: 'login' | 'register'
}

export const AuthCard = ({ children, onModeChange, mode }: AuthCardProps) => {
  const cardBackground = useThemeColor({}, 'cardBackground')
  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: cardBackground }, styles.card]}>
        {children}
        <AuthPrompt
          onModeChange={onModeChange}
          currentMode={mode}
          cardBackground={cardBackground}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '94%',
    marginVertical: 8,
    marginHorizontal: 12,
    paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
})
