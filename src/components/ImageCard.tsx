import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ImageDataI } from "@/data/images";
import { getImageSize } from "@/helpers/common";

interface Props {
  image: ImageDataI;
  index: number;
  columns: number;
}

export const ImageCard = ({ image, index, columns }: Props) => {
  const getImageHeight = () => {
    const { imageHeight, imageWidth } = image;
    return { height: getImageSize(imageWidth, imageHeight) };
  };
  return (
    <Pressable className="rounded-xl overflow-hidden m-1">
      <Image source={image.webformatURL} style={[styles.image, getImageHeight()]} transition={100} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
});
