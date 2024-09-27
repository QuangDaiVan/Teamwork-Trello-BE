const jwt = require('jsonwebtoken')
const asyncHanler = require('express-async-handler')
import { env } from '~/config/environment'

export const verifyAccessToken = asyncHanler(async (req, res, next) => {
  // access token sẽ bắt đầu bằng từ Bearer
  // cấu trúc của req như sau
  // req:{headers:{authoriation: Bearer token}}
  // cần lấy ra token để verify nên dùng string method để cắt Bearer đi
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).json({
        success: false,
        message: 'Invalid access token'
      })
      // console.log(decode)
      req.user = decode
      next()
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'require authentication!'
    })
  }
})
