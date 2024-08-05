import { Categories } from "@/components/Categories";
import { ImagesGrid } from "@/components/ImagesGrid";
import { usefetchImages, ImageDataResponseI, ImageDataI } from "@/data/images";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageDataI[]>([]);
  const { data, loading, error } = usefetchImages();

  useEffect(() => {
    if (!data?.hits?.length || !!loading || !!error) return;
    setImages([...data.hits]);
  }, [data, loading, error]);

  return (
    <SafeAreaView className="flex-1 px-4 md:py-12">
      <View className="flex-row items-center justify-between  py-4">
        <Text className="font-bold text-2xl">Pixels</Text>
        <FontAwesome6 name="bars-staggered" size={22} />
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View className="flex-row justify-between items-center gap-1  border-gray-300 bg-white rounded-xl px-4 py-2">
          <Feather name="search" size={24} />
          <TextInput
            placeholder="Search..."
            className="flex-1 flex-row items-center px-4 py-2 rounded-sm shadow-none outline-none border-none focus:outline-none active:outline-none focus:border-none"
            onChangeText={(text) => setSearch(text)}
            ref={searchInputRef}
            style={{ outlineStyle: "none" } as any}
          />
          {search && (
            <Pressable className="bg-neutral-300 p-1 rounded-md">
              <Ionicons name="close" size={24} />
            </Pressable>
          )}
        </View>
        <View>
          <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        </View>
        <View>{!!images?.length && !loading && <ImagesGrid images={images} />}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
