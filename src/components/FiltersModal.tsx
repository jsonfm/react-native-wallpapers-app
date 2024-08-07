import { View, Text, StyleSheet } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { BlurView } from "expo-blur";

interface Props {
  innerRef?: React.Ref<BottomSheetModal>;
}

export const FiltersModal = forwardRef<BottomSheetModal, Props>(({ innerRef }, ref) => {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="flex-1 gap-6 w-full">
          <Text className="text-2xl font-semibold">Filters</Text>
          <Text>Sections here</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

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
