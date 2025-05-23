import { Dimensions } from "react-native";

export const deviceWidth = Dimensions.get('window').width;

export const deviceHeight = Dimensions.get('window').height;

export const start = { x: 0, y: 0 }

export const end = { x: 1, y: 0 }

export const DUMMY_API_DATA = Array.from({ length: 5000 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));
  