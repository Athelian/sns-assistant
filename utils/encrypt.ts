import crypto from 'crypto'

const key = crypto
  .createHash('sha512')
  .update('secretKey')
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update('secretIV')
  .digest('hex')
  .substring(0, 16)

export function encryptData(data: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64')
}

export function decryptData(encryptedData: string) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}
