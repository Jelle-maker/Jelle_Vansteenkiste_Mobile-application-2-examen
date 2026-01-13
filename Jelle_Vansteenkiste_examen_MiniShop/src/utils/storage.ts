import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key: string) => {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
};