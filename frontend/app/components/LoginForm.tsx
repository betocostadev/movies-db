import { useState } from 'react'
import ActionButton from './ActionButton'
import { Text, useThemeColor, View } from './Themed'
import { StyleSheet, TextInput } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import { useLogin } from '@/hooks/account/useAccount'

export default function LoginForm() {
  const cardBackground = useThemeColor({}, 'cardBackground')
  const { login, isPending, isError, error } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    try {
      await login({ email, password })
    } catch (e) {
      console.log(e)
      // error handled by isError and error
    }
  }

  return (
    <>
      <Text style={styles.title}>Login into your account</Text>
      <View
        style={[{ backgroundColor: cardBackground }, styles.formInputContainer]}
      >
        <Text style={[{ backgroundColor: cardBackground }, styles.formLabel]}>
          Email
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View
        style={[{ backgroundColor: cardBackground }, styles.formInputContainer]}
      >
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <ActionButton
        buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
        onPressHandler={onLogin}
        label={isPending ? 'Logging in...' : 'Login'}
      />
      {isError && <Text style={{ color: 'red' }}>{error?.message}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#b9b2b2',
    fontWeight: '700',
    paddingVertical: 12,
  },
  formInputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 2,
    width: '80%',
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: '#e4e4e4',
    width: '100%',
    padding: 8,
    borderRadius: 4,
  },
})
