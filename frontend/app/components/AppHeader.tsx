import { StyleSheet, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { SearchInput, SearchInputProps } from './SearchInput'

export interface AppHeaderProps extends SearchInputProps {
  // Inherits all SearchInputProps (placeholder, onChangeText, value, onSubmit)
}

export const AppHeader = ({
  placeholder,
  onChangeText,
  value,
  onSubmit,
}: AppHeaderProps) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border || '#ccc',
        },
      ]}
      edges={['top']}
    >
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <SearchInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          onSubmit={onSubmit}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 12,
  },
  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
})
