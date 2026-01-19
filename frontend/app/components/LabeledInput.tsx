import { Text, View } from './Themed'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'

interface LabeledInputProps extends TextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  containerStyle?: object
  labelStyle?: object
  inputStyle?: object
}

export default function LabeledInput({
  label,
  value,
  onChangeText,
  containerStyle,
  labelStyle,
  inputStyle,
  ...rest
}: LabeledInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e4e4e4',
    width: '100%',
    padding: 8,
    borderRadius: 4,
  },
})
