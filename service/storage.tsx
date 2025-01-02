import { MMKV } from 'react-native-mmkv'

export const tokenStorage = new MMKV({
  id: `token-storage`,
  encryptionKey: 'babu-first-mobile-app'
})

export const storage = new MMKV({
  id: `my-app-storage`,
  encryptionKey: 'babu-first-mobile-app'
})

export const mkvStorage = {
  setItem: (key: string, value: string) => {
    storage.setItem(key, value)
  },
  getItem: (key: string, value: string) => {
    const value = storage.getItem(key)
    return value ?? null
  },
  removeItem: (key: string) => {
    storage.delete(key)
  }
}
