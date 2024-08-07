import { useCallback, useEffect, useRef, useState } from "react";
import { Categories } from "@/components/Categories";
import { ImagesGrid } from "@/components/ImagesGrid";
import { usefetchImages, ImageDataResponseI, ImageDataI } from "@/data/images";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";

const Home = () => {
  const searchInputRef = useRef<TextInput>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageDataI[]>([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, loading, error } = usefetchImages({ page, q: searchText, category: currentCategory || "" });

  const updateSearchText = (text: string) => {
    setSearchText(text);
    if (text.length > 2) {
      setImages([]);
    }
    if (text.length == 0) {
      setPage(1);
      setImages([]);
    }
  };

  const updateSearchTextDebounced = useCallback(debounce(updateSearchText, 400), []);

  const clearSearchTextAndInput = () => {
    searchInputRef?.current?.clear();
    setSearchText("");
  };

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
            onChangeText={updateSearchTextDebounced}
            ref={searchInputRef}
            style={{ outlineStyle: "none" } as any}
          />
          {searchText?.length > 0 && (
            <Pressable className="bg-neutral-300 p-1 rounded-md" onPress={clearSearchTextAndInput}>
              <Ionicons name="close" size={24} />
            </Pressable>
          )}
        </View>
        <View>
          <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        </View>
        <View>
          {!!images?.length && !loading && <ImagesGrid images={images} />}
          {!!loading && <ActivityIndicator size="large" />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
