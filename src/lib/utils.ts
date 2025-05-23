import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import CryptoJS from 'crypto-js'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const required = (value) => (value ? undefined : 'required')

const SECRET_KEY = 'moataz_secret_test' // Keep this secret and secure!

type SecureUserData = {
  token: string
  isSuperAdmin?: boolean
  isAdmin?: boolean
}

// Encrypt + save to localStorage
export const saveUserSecureData = (data: SecureUserData, secureUserName: string) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  localStorage.setItem(secureUserName, encrypted)
}

// Decrypt + read from localStorage
export const getUserSecureData = (secureUserName: string): SecureUserData | null => {
  try {
    const encrypted = localStorage.getItem(secureUserName)
    if (!encrypted) return null

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Failed to decrypt secure user data', error)
    return null
  }
}
