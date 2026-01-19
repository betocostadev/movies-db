import { useState } from 'react'
import ActionButton from './ActionButton'
import { Text, useThemeColor } from './Themed'
import { StyleSheet } from 'react-native'
import LabeledInput from './LabeledInput'
import { useRegisterUser } from '@/hooks/account/useAccount'

export default function RegisterForm() {
  const cardBackground = useThemeColor({}, 'cardBackground')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false)
  const { register, isPending, isError, error } = useRegisterUser()

  const handleChangePassword = (pass: string) => {
    setPasswordMatchError(false)
    setPassword(pass)
  }

  const handleChangeConfirmPassword = (pass: string) => {
    setPasswordMatchError(false)
    setConfirmPassword(pass)
  }

  const onRegister = async () => {
    setPasswordMatchError(false)
    if (password !== confirmPassword) {
      setPasswordMatchError(true)
      return
    }
    try {
      console.log('Register user form')
      await register({ name, email, password })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Text style={styles.title}>Register your new account</Text>
      <LabeledInput
        containerStyle={[
          styles.formInputContainer,
          { backgroundColor: cardBackground },
        ]}
        labelStyle={styles.formLabel}
        inputStyle={styles.formInput}
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Name"
        autoCapitalize="words"
      />
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
        onChangeText={handleChangePassword}
        placeholder="password"
        secureTextEntry
      />
      <LabeledInput
        containerStyle={[
          styles.formInputContainer,
          { backgroundColor: cardBackground },
        ]}
        labelStyle={styles.formLabel}
        inputStyle={styles.formInput}
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={handleChangeConfirmPassword}
        placeholder="same as password"
        secureTextEntry
      />
      {passwordMatchError && (
        <Text style={{ color: 'red' }}>Passwords don't match</Text>
      )}
      <ActionButton
        buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
        onPressHandler={onRegister}
        label={isPending ? 'Registering...' : 'Register'}
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
