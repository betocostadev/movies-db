import SelectionPicker, { PickerOption } from './SelectionPicker'
import { useGenres } from '@/hooks/movies/useMovies'
import { TGenre } from '@/types/genres'
import { useMemo, useState } from 'react'
import { Text, View } from './Themed'
import { TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

export interface GenreSelectorProps {
  selectedGenre?: number | null
  onGenreChange?: (genreId: number | null) => void
}

export default function GenreSelector({
  selectedGenre,
  onGenreChange,
}: GenreSelectorProps) {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [tempGenre, setTempGenre] = useState<number | null>(
    selectedGenre || null,
  )
  const { genres, isLoading, error } = useGenres({
    autoload: true,
  })

  const genreOptions: PickerOption[] = useMemo(() => {
    if (!genres) return []
    return genres.map((genre: TGenre) => ({
      label: genre.name,
      value: genre.id,
    }))
  }, [genres])

  const selectedGenreName = useMemo(() => {
    if (!selectedGenre || !genres) return 'Filter By Genre'
    const genre = genres.find((g: TGenre) => g.id === selectedGenre)
    return genre ? genre.name : 'Filter By Genre'
  }, [selectedGenre, genres])

  const handleGenreSelect = (value: string | number) => {
    setTempGenre(value ? (value as number) : null)
  }

  const handleDone = () => {
    onGenreChange?.(tempGenre)
    setModalVisible(false)
  }

  const handleOpenModal = () => {
    setTempGenre(selectedGenre || null)
    setModalVisible(true)
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.border || '#666' }]}
        onPress={handleOpenModal}
      >
        <Text style={styles.buttonText}>{selectedGenreName}</Text>
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
              <Text style={styles.modalTitle}>Select Genre</Text>
              <TouchableOpacity onPress={handleDone}>
                <Text style={styles.closeButton}>Done</Text>
              </TouchableOpacity>
            </View>
            <SelectionPicker
              options={genreOptions}
              selectedValue={tempGenre || ''}
              onValueChange={handleGenreSelect}
              isLoading={isLoading}
              error={error}
              placeholder="Select a genre"
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
    height: '80%',
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
