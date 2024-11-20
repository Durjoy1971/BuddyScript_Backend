import hash from '@adonisjs/core/services/hash'
import { UserQueries } from './user_query.js'

export default class UserService {
  public async createRegisterUserService(
    userName: string,
    password: string,
    email: string,
    picURL: string
  ) {
    userName = userName.trim().toUpperCase()
    email = email.trim().toLowerCase()
    picURL = picURL.trim()
    password = await hash.make(password)

    const user = await this.validateEmailUserNameService(email, userName)

    if (user.status === 200) {
      throw new Error(user.message)
    }

    const newUser = await UserQueries.createUser(userName, password, email, picURL)

    if (!newUser) {
      throw new Error('An unexpected error occurred while creating user')
    } else {
      return {
        success: 'user created successfully',
        status: 201,
      }
    }
  }

  public async validateEmailUserNameService(email: string, userName: string) {
    email = email.trim().toLowerCase()
    userName = userName.trim().toUpperCase()
    const copyEmail = await UserQueries.EmailAlreadyExistOrNot(email)
    const copyUserName = await UserQueries.UserNameAlreadyExistOrNot(userName)

    if (copyEmail) {
      return {
        status: 200,
        message: 'Email already exists',
      }
    } else if (copyUserName) {
      return {
        status: 200,
        message: 'Username already exists',
      }
    } else {
      return {
        status: 202,
        message: 'true',
      }
    }
  }

  public async loginUser(email: string, password: string) {
    email = email.trim().toLowerCase()
    const user = await UserQueries.findUserByEmail(email)

    if (!user) {
      return {
        status: 200,
        message: 'Invalid Email Address',
      }
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return {
        status: 200,
        message: 'Invalid Password',
      }
    }

    return {
      status: 202,
      message: 'true',
      user:user,
    }
  }
}
