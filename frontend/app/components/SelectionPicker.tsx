import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { View } from './Themed'

export interface PickerOption {
  label: string
  value: string | number
}

export interface SelectionPickerProps {
  options: PickerOption[]
  selectedValue?: string | number
  onValueChange?: (value: string | number) => void
  isLoading?: boolean
  error?: Error | undefined
  placeholder?: string
}

export default function SelectionPicker({
  options,
  selectedValue,
  onValueChange,
  isLoading = false,
  error,
  placeholder = 'Select an option',
}: SelectionPickerProps) {
  if (isLoading) {
    return <View style={styles.container} />
  }

  if (error) {
    return <View style={styles.container} />
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[
          styles.picker,
          {
            color: '#fff',
          },
        ]}
        itemStyle={{ color: '#fff' }}
      >
        <Picker.Item label={placeholder} value="" />
        {options.map((option) => (
          <Picker.Item
            style={{ color: '#fff' }}
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  picker: {
    height: 200,
    color: '#fff',
  },
})
