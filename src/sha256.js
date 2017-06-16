import crypto from 'crypto'

const secret = ''
const _sha256 = crypto.createHmac('sha256', secret)

const sha256 = data => _sha256
  .update(data)
  .digest('hex')

export default sha256
