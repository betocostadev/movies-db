import { useState } from 'react'
import ActionButton from './ActionButton'
import { Text, useThemeColor } from './Themed'
import { StyleSheet } from 'react-native'
import { useLogin } from '@/hooks/account/useAccount'
import LabeledInput from './LabeledInput'

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
    }
  }

  return (
    <>
      <Text style={styles.title}>Login into your account</Text>
      <LabeledInput
        containerStyle={[
          styles.formInputContainer,
          { backgroundColor: cardBackground },
        ]}
        labelStyle={styles.formLabel}
        inputStyle={styles.formInput}
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <LabeledInput
        containerStyle={[
          styles.formInputContainer,
          { backgroundColor: cardBackground },
        ]}
        labelStyle={styles.formLabel}
        inputStyle={styles.formInput}
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
      />
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
