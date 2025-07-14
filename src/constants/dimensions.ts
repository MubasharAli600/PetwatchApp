import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const DIMENSIONS = {
  screenWidth: width,
  screenHeight: height,
  padding: 16,
  margin: 16,
  borderRadius: 8,
};