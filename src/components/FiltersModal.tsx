import { View, Text, StyleSheet } from "react-native";
import React, { Dispatch, forwardRef, SetStateAction, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { data, FiltersKeyType } from "@/constants/data";
import { CommonFilterRow } from "./FiltersView";

interface Props {
  innerRef?: React.Ref<BottomSheetModal>;
  filters: Record<FiltersKeyType, string>;
  setFilters: Dispatch<SetStateAction<Record<FiltersKeyType, string>>>;
}

export const FiltersModal = forwardRef<BottomSheetModal, Props>(({ innerRef, filters, setFilters }, ref) => {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer} className="px-4">
        <View className="flex-1 gap-6 w-full">
          <Text className="text-2xl font-semibold">Filters</Text>
          <View className="px-2">
            {Object.keys(data.filters).map((filterName, index) => (
              <CommonFilterRow
                key={`${filterName}-${index}`}
                title={filterName}
                filterValues={data.filters[filterName as FiltersKeyType]}
                setFilters={setFilters}
                filters={filters}
              />
            ))}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const sections = {
  order: (props = {}) => <OrderView {...props} />,
  orientation: (props = {}) => <SectionView {...props} />,
  type: (props = {}) => <SectionView {...props} />,
  colors: (props = {}) => <SectionView {...props} />,
};

type SectionsKey = keyof typeof sections;

const OrderView = () => {
  return <View></View>;
};

const SectionView = () => {
  return <View></View>;
};

const CustomBackdrop = ({ animatedIndex, style }: { animatedIndex: SharedValue<number>; style?: any }) => {
  const containerAnimatedStyles = useAnimatedStyle(() => {
    let opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP);
    return {
      opacity,
    };
  });
  const containerStyles = [StyleSheet.absoluteFill, style, styles.overlay, containerAnimatedStyles];
  return (
    <Animated.View style={containerStyles}>
      <BlurView style={StyleSheet.absoluteFillObject} tint="dark" intensity={25}></BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
