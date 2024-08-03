import { Categories } from '@/components/Categories';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <SafeAreaView className='flex-1 px-4'>
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='font-bold text-2xl'>
            Pixels
        </Text>
        <FontAwesome6 name='bars-staggered' size={22}/>
      </View>
      <ScrollView
        contentContainerStyle={{gap: 15}}
      >
        <View className='flex-row justify-between items-center  border-gray-300 bg-white rounded-xl px-4 py-2'>
            <Feather name='search' size={24} />
            <TextInput 
                placeholder='search...' 
                className='flex-1 flex-row items-center px-4 py-2 rounded-sm' 
                onChangeText={(text) => setSearch(text)}
                ref={searchInputRef}
            />
            {search &&     
                <Pressable className='bg-neutral-300 p- rounded-md'>
                    <Ionicons name='close' size={24}/>
                </Pressable>
            }
        </View>
        <View>
            <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home