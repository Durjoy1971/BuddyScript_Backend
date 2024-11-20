import type { HttpContext } from '@adonisjs/core/http'
import UserService from './user_service.js'
import { createRegisterUserValidator } from './user_validator.js'

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async createRegisterUser({ response, request }: HttpContext) {
    console.log(request.all())
    try {
      const { userName, password, email, picURL } = request.all()      
      if (!userName || !password || !email || !picURL) {
        return response.status(400).send('Missing required fields')
      }


      const validateData = await createRegisterUserValidator.validate({
        userName,
        password,
        email,
        picURL,
      })
      const newUser = await this.userService.createRegisterUserService(
        validateData.userName,
        validateData.password,
        validateData.email,
        validateData.picURL
      )

      return response.status(newUser.status).send(newUser.success)
    } catch (error) {
      return response
        .status(500)
        .send(error.message || 'An unexpected error occurred while creating user')
    }
  }

  public async validateEmailUserName({ response, request }: HttpContext) {
    try {
      const { email, userName } = request.all()
      if (!email || !userName) {
        return response.status(400).send('Missing required fields')
      }
      const result = await this.userService.validateEmailUserNameService(email, userName)
      return response.status(result.status).send(result.message)
    } catch (error) {
      return response
        .status(500)
        .send(error.message || 'An unexpected error occurred while validating email and username')
    }
  }

  public async loginUser({ auth, response, request }: HttpContext) {
    try {
      const { email, password } = request.all()
      if (!email || !password) {
        return response.status(400).send('Missing required fields')
      }
      const user = await this.userService.loginUser(email, password)
      if (user.status === 202 && user.user) {
        await auth.use('web').login(user.user)
        return response
          .status(user.status)
          .send({ success: user.message, ...user.user.serialize() })
      }
      return response.status(user.status).send(user.message)
    } catch (error) {
      return response
        .status(500)
        .send(error.message || 'An unexpected error occurred while logging in user')
    }
  }

  public async logoutUser({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.status(200).send({ success: 'User logged out successfully' })
    } catch (error) {
      return response
        .status(500)
        .send(error.message || 'An unexpected error occurred while logging out user')
    }
  }

  public async getUser({ auth, response }: HttpContext) {
    try {
      return response.status(200).send(auth.use('web').user)
    } catch (error) {
      return response
        .status(500)
        .send(error.message || 'An unexpected error occurred while getting user')
    }
  }
}
