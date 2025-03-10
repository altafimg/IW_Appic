import RNFS from 'react-native-fs';

const directoryPath = `${RNFS.DocumentDirectoryPath}/persistedState`;
const filePath = `${directoryPath}/persistedState.json`;

const ensureDirectoryExists = async () => {
  const directoryExists = await RNFS.exists(directoryPath);
  if (!directoryExists) {
    await RNFS.mkdir(directoryPath);
  }
};

const FileSystemStorage = {
  async getItem(key) {
    try {
      await ensureDirectoryExists();
      const exists = await RNFS.exists(filePath);
      if (!exists) return null;
      const json = await RNFS.readFile(filePath);
      const data = JSON.parse(json);
      return data[key] || null;
    } catch (e) {
      console.error('FileSystemStorage getItem error:', e);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      await ensureDirectoryExists();
      const exists = await RNFS.exists(filePath);
      const json = exists ? await RNFS.readFile(filePath) : '{}';
      const data = JSON.parse(json);
      data[key] = value;
      await RNFS.writeFile(filePath, JSON.stringify(data));
    } catch (e) {
      console.error('FileSystemStorage setItem error:', e);
    }
  },

  async removeItem(key) {
    try {
      await ensureDirectoryExists();
      const exists = await RNFS.exists(filePath);
      if (!exists) return;
      const json = await RNFS.readFile(filePath);
      const data = JSON.parse(json);
      delete data[key];
      await RNFS.writeFile(filePath, JSON.stringify(data));
    } catch (e) {
      console.error('FileSystemStorage removeItem error:', e);
    }
  },
};

export default FileSystemStorage;
