import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { authRoute } from './authRoute'

const Router = express.Router()

// check APIs v1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// Board APIs
Router.use('/boards', boardRoute)

// Column APIs
Router.use('/columns', columnRoute)

// Card APIs
Router.use('/cards', cardRoute)

Router.use('/auth', authRoute)

export const APIs_V1 = Router
// console.log(router)