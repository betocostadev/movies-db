import SelectionPicker, { PickerOption } from './SelectionPicker'
import { useMemo, useState } from 'react'
import { Text, View } from './Themed'
import { TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const SORT_OPTIONS: PickerOption[] = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Score', value: 'score' },
  { label: 'Release Date', value: 'release_date' },
  { label: 'Name', value: 'name' },
]

export interface PopularitySelectorProps {
  selectedSort?: string
  onSortChange?: (sort: string) => void
}

export default function PopularitySelector({
  selectedSort = 'popularity',
  onSortChange,
}: PopularitySelectorProps) {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [tempSort, setTempSort] = useState<string>(selectedSort)

  const selectedSortName = useMemo(() => {
    const option = SORT_OPTIONS.find((opt) => opt.value === selectedSort)
    return option ? option.label : 'Sort by Popularity'
  }, [selectedSort])

  const handleSortSelect = (value: string | number) => {
    setTempSort(value as string)
  }

  const handleDone = () => {
    onSortChange?.(tempSort)
    setModalVisible(false)
  }

  const handleOpenModal = () => {
    setTempSort(selectedSort)
    setModalVisible(true)
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.border || '#666' }]}
        onPress={handleOpenModal}
      >
        <Text style={styles.buttonText}>{selectedSortName}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={handleDone}>
                <Text style={styles.closeButton}>Done</Text>
              </TouchableOpacity>
            </View>
            <SelectionPicker
              options={SORT_OPTIONS}
              selectedValue={tempSort}
              onValueChange={handleSortSelect}
              placeholder="Select sorting"
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingTop: 16,
    height: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 16,
    color: '#007AFF',
  },
})
