import { useTheme } from '@react-navigation/native'
import { useThemeColor, View } from './Themed'
import { TextInput, StyleSheet } from 'react-native'

export interface SearchInputProps {
  placeholder?: string
  onChangeText?: (text: string) => void
  value?: string
  onSubmit?: () => void
}

export const SearchInput = ({
  placeholder = 'Search movies...',
  onChangeText,
  value,
  onSubmit,
}: SearchInputProps) => {
  const { colors } = useTheme()
  const cardBackground = useThemeColor({}, 'cardBackground')

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border || '#ccc',
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={'#ccc'}
        onChangeText={onChangeText}
        value={value}
        editable={true}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#fff',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    fontFamily: 'OpenSans',
  },
})
