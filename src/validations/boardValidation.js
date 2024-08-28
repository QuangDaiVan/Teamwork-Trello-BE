import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  // mặc định phía BE ko cần phải custom message vì trước đó phía FE đã tự validate và custom message phía FE cho đẹp
  // BE chỉ cần validate đảm bảo dữ liệu chuẩn xác và trả về message mặc định từ thư viện là được
  // quan trọng: việc validate dư liệu là bắt buộc phải có ở phía BE vì đây là điểm cuối để lưu trữ dữ liệu và Database
  // và trong thực tế thì điều tốt nhất cho hệ thống là luôn validate dữ liệu ở cả FE và BE

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (QuangDaiVan)',
      'sring.empty': 'Title is not allowed to be empty (QuangDaiVan)',
      'sring.min': 'Title is min 3 chars (QuangDaiVan)',
      'sring.max': 'Title is max 50 chars (QuangDaiVan)',
      'sring.trim': 'Title must not have leading or trailing whitespace (QuangDaiVan)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log('req.body: ', req.body)

    // chỉ định thêm abortEarly:false - để hiển thị ra tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board' })
  } catch (error) {
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }

}
export const boardValidation = { createNew }