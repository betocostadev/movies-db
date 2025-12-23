import ActionButton from '@/components/ActionButton'
import { Text, View } from '@/components/Themed'
import { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default function AccountScreen() {
  // TODO: After creating the user account query, check for credentials to decide
  // to show the Login Form or User Account Data
  const [mode, setMode] = useState<'register' | 'login'>('login')

  const onLogin = () => {
    return null
  }
  if (mode === 'register') {
    console.log(mode)
    return (
      <View>
        <Text style={styles.title}>Register a new account</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login into your account</Text>
        <View style={styles.formInputContainer}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput style={styles.formInput} placeholder="email" />
        </View>
        <View style={styles.formInputContainer}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput style={styles.formInput} placeholder="password" />
        </View>
        <ActionButton
          buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
          onPressHandler={onLogin}
          label="Login"
        />
        <Text>If you don't have an account, please: REGISTER HERE</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#b9b2b2',
    fontWeight: '700',
    paddingVertical: 12,
  },
  card: {
    width: '90%',
    backgroundColor: '#222d2a',
    marginVertical: 8,
    marginHorizontal: 12,
    paddingHorizontal: 2,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formInputContainer: {
    backgroundColor: '#222d2a',
    marginHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  formLabel: {
    backgroundColor: '#222d2a',
    fontSize: 16,
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: '#e4e4e4',
    width: '100%',
    padding: 6,
    borderRadius: 4,
  },
  actionButton: {
    backgroundColor: '#7bd695',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#060606',
    fontWeight: '600',
    fontSize: 14,
  },
})
