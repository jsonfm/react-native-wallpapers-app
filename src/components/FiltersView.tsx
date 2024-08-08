import { FiltersKeyType } from "@/constants/data";
import { Dispatch, SetStateAction } from "react";
import { View, Text, Pressable } from "react-native";

interface CommonFilterRowProps {
  title: string;
  filterValues: string[];
  filters: Record<FiltersKeyType, string>;
  setFilters: Dispatch<SetStateAction<Record<FiltersKeyType, string>>>;
}

export const CommonFilterRow = ({ title, filterValues, filters, setFilters }: CommonFilterRowProps) => {
  const toggleFilter = (filter: string) => {
    const currentFilter = filters?.[title as FiltersKeyType];

    if (currentFilter !== filter) {
      const newFilter = { [title]: filter };
      setFilters({ ...filters, ...newFilter });
    } else {
      const copy = { ...filters };
      delete copy[title as FiltersKeyType];
      setFilters(copy);
    }
  };
  return (
    <View>
      <Text className="font-semibold capitalize text-xl">{title}</Text>
      <View className="flex flex-row gap-2 flex-wrap py-2">
        {filterValues.map((filter, index) => {
          const selectedFilter = filters?.[title as FiltersKeyType];
          const isActive = filter == selectedFilter;
          const activeClassName = `${isActive ? `bg-neutral-500` : ""}`;
          return (
            <Pressable
              key={`${title}-${filter}-${index}`}
              className={`${activeClassName} px-4 py-2 border border-neutral-500 rounded-md active:bg-neutral-300`}
              onPress={() => toggleFilter(filter)}
            >
              <Text className={isActive ? "text-white" : ""}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
