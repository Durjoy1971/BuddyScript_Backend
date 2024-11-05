import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async store({ response, request }: HttpContext) {
    const { userName, password, email, picURL } = request.all()
    console.log(userName, password, email, picURL)
    if (!userName || !password || !email || !picURL) {
      return response.status(400).send('Missing required fields')
    }

    const payload = await createUserValidator.validate({ userName, password, email, picURL })

    const hashedPassword = await hash.make(payload.password)

    User.create({
      userName: payload.userName,
      picURL: payload.picURL,
      password: hashedPassword,
      email: payload.email,
    })

    return response.status(201).send({ success: true })
  }

  async validateEmailUserName({ response, request }: HttpContext) {
    const { email, userName } = request.all()

    console.log(email, userName)

    if (!email || !userName) {
      return response.status(400).send('Missing required fields')
    }

    const copyEmail = await User.query().select('email').where('email', email).first()
    const copyUserName = await User.query().select('userName').where('userName', userName).first()

    console.log(copyEmail?.serialize(), copyUserName?.serialize())

    if (copyEmail) {
      return response.status(200).send('Email already exists')
    } else if (copyUserName) {
      return response.status(200).send('Username already exists')
    }

    return response.status(202).send('true')
  }

  async loginUser({ response, request, auth }: HttpContext) {
    const { email, password } = request.all()
    if (!email || !password) {
      return response.status(400).send('Missing required fields')
    }
    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(200).send('Invalid Email')
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.status(200).send('Invalid Password')
    }

    await auth.use('web').login(user)

    return response.status(202).send(user)
  }

  async getUser({ response, auth }: HttpContext) {
    // return await auth.authenticate()
    return response.status(200).send(auth.use('web').user)
  }

  async logoutUser({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.status(200).send('Logged out')
  }

  async fetchAllUser({ response }: HttpContext) {
    const users = await User.query()
      .select('id', 'userName', 'picURL')
      .preload('reactions', (reactionQuery) => {
        reactionQuery.select('id', 'reaction', 'postId')
      })
      .preload('posts', (postQuery) => {
        postQuery.select('id', 'content', 'imageURL', 'createdAt')
      })

    return response.status(200).send(users)
  }
}
