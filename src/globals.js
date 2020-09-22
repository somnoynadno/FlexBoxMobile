import { Dimensions } from 'react-native';

export const FIELD_NUM = 20;
export const FIELD_SIZE = Math.floor(Dimensions.get('window').width / (FIELD_NUM + 1));
