import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'

const ENCRYPTION_ALGORITHM = 'aes-256-cbc'
const ENCRYPTION_KEY_LENGTH = 32
const IV_LENGTH = 16

export class CryptoService {
  private static ENCRYPTION_KEY: Buffer

  static async initializeEncryptionKey(password: string): Promise<void> {
    const salt = randomBytes(16)

    return new Promise((resolve, reject) => {
      scrypt(password, salt, ENCRYPTION_KEY_LENGTH, (err, derivedKey) => {
        if (err) {
          reject(err)
        } else {
          CryptoService.ENCRYPTION_KEY = derivedKey
          resolve()
        }
      })
    })
  }

  static encrypt(data: string): string {
    const iv = randomBytes(IV_LENGTH)
    const cipher = createCipheriv(ENCRYPTION_ALGORITHM, CryptoService.ENCRYPTION_KEY, iv)

    const encryptedData = Buffer.concat([iv, cipher.update(data, 'utf-8'), cipher.final()])
    return encryptedData.toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  }

  static decrypt(encryptedData: string): string {
    const base64Data = encryptedData.replace(/_/g, '/').replace(/-/g, '+')
    const encryptedBuffer = Buffer.from(base64Data, 'base64')
    const iv = encryptedBuffer.slice(0, IV_LENGTH)
    const encryptedText = encryptedBuffer.slice(IV_LENGTH)

    const decipher = createDecipheriv(ENCRYPTION_ALGORITHM, CryptoService.ENCRYPTION_KEY, iv)
    const decryptedData = Buffer.concat([decipher.update(encryptedText), decipher.final()])

    return decryptedData.toString('utf-8')
  }
}
