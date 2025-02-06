import { MaterialIcons } from '@/components/icons'

import { ScrollView, View, Text, TextInput, Button, Pressable } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'

export default function Home() {
  const [items, setItems] = React.useState<string[]>([])
  const bottomSheet1 = React.useRef<BottomSheet>(null)
  const bottomSheet2 = React.useRef<BottomSheet>(null)
  const bottomSheet3 = React.useRef<BottomSheet>(null)

  const [editIndex, setEditIndex] = React.useState<number | null>(null)

  const [firstItem, setFirstItem] = React.useState<string>('')
  const [secondItem, setSecondItem] = React.useState<string>('')
  const [thirdItem, setThirdItem] = React.useState<string>('')

  const sheets = React.useMemo(
    () => [bottomSheet1, bottomSheet2, bottomSheet3],
    [bottomSheet1, bottomSheet2, bottomSheet3]
  )

  React.useEffect(() => {
    bottomSheet1.current?.expand()
  }, [])

  React.useEffect(() => {
    if (editIndex !== null) {
      sheets.forEach((sheet, sheetIndex) => {
        if (sheetIndex !== editIndex) sheet.current?.close()
      })
      sheets[editIndex].current.expand()
    }
  }, [editIndex])

  return (
    <View className="flex flex-1 items-stretch">
      <GestureHandlerRootView className="flex-1 bg-gray-300">
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {items.map((item, itemIndex) => (
            <View key={item} className="p-4 flex-row items-center justify-between">
              <Text className="text-black">
                Item #{itemIndex + 1}: {item}
              </Text>
              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => {
                    setItems(items.filter((_, index) => index !== itemIndex))
                    sheets.forEach((sheet, sheetIndex) => {
                      if (sheetIndex !== itemIndex) sheet.current?.close()
                    })
                    sheets[itemIndex].current?.expand()
                  }}
                  testID="remove"
                >
                  <MaterialIcons name="close" size={24} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setEditIndex(itemIndex)
                  }}
                  testID="edit"
                >
                  <MaterialIcons name="pencil" size={24} />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
        <BottomSheetModalProvider>
          <BottomSheet ref={bottomSheet1} accessible={false}>
            <BottomSheetView className="flex-1 p-6 items-center">
              <TextInput
                placeholder="Enter first item"
                value={firstItem}
                onChangeText={setFirstItem}
                autoCorrect={false}
                selectTextOnFocus={editIndex === 0}
              />
              <View>
                <Button
                  title={editIndex === 0 ? 'Update' : 'Add'}
                  onPress={() => {
                    if (firstItem === '') return
                    bottomSheet1.current?.close()
                    if (editIndex === 0) {
                      setItems(items.map((item, index) => (index === 0 ? firstItem : item)))
                    } else {
                      setItems([...items, firstItem])
                      bottomSheet2.current?.expand()
                    }
                  }}
                />
              </View>
            </BottomSheetView>
          </BottomSheet>
          <BottomSheet index={-1} ref={bottomSheet2} accessible={false}>
            <BottomSheetView className="flex-1 p-6 items-center">
              <TextInput
                placeholder="Enter second item"
                value={secondItem}
                onChangeText={setSecondItem}
                autoCorrect={false}
                selectTextOnFocus={editIndex === 1}
              />
              <View>
                <Button
                  title={editIndex === 1 ? 'Update' : 'Add'}
                  onPress={() => {
                    if (secondItem === '') return
                    bottomSheet2.current?.close()
                    if (editIndex === 1) {
                      setItems(items.map((item, index) => (index === 1 ? secondItem : item)))
                    } else {
                      setItems([...items, secondItem])
                      bottomSheet3.current?.expand()
                    }
                  }}
                />
              </View>
            </BottomSheetView>
          </BottomSheet>
          <BottomSheet index={-1} ref={bottomSheet3} accessible={false}>
            <BottomSheetView className="flex-1 p-6 items-center">
              <TextInput
                placeholder="Enter third item"
                value={thirdItem}
                onChangeText={setThirdItem}
                autoCorrect={false}
                selectTextOnFocus={editIndex === 2}
              />
              <View>
                <Button
                  title={editIndex === 2 ? 'Update' : 'Add'}
                  onPress={() => {
                    if (thirdItem === '') return
                    bottomSheet3.current?.close()
                    if (editIndex === 2) {
                      setItems(items.map((item, index) => (index === 2 ? thirdItem : item)))
                    } else {
                      setItems([...items, thirdItem])
                    }
                  }}
                />
              </View>
            </BottomSheetView>
          </BottomSheet>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  )
}
