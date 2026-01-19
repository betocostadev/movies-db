import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native'
import { Text } from './Themed'
import { FontSizes } from '@/constants/ThemeValues'
import { useThemeColor } from './Themed'

type ActionButtonProps = {
  buttonStyles?: StyleProp<ViewStyle>
  label: string
  onPressHandler: () => void
  textStyles?: StyleProp<TextStyle>
  iconRight?: React.ReactNode
  backgroundColorOverride?: string
}

export default function ActionButton({
  buttonStyles,
  label,
  onPressHandler,
  textStyles,
  iconRight,
  backgroundColorOverride,
}: ActionButtonProps) {
  const defaultBackgroundColor = useThemeColor({}, 'btnPrimaryBackground')
  const textColor = useThemeColor({}, 'btnPrimaryText')

  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        { backgroundColor: backgroundColorOverride || defaultBackgroundColor },
        buttonStyles,
      ]}
      onPress={onPressHandler}
    >
      <View style={styles.contentRow}>
        <Text
          style={[
            styles.actionText,
            { color: textColor, fontSize: FontSizes.small },
            textStyles,
          ]}
        >
          {label}
        </Text>
        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 6,
  },
})
