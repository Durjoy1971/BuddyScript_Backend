/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'
import User from '#models/user'
const CommentsController = () => import('#controllers/comments_controller')
const ReactionsController = () => import('#controllers/reactions_controller')
const PostsController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return { hello: 'world' }
})

router.post('/registerUser', [UsersController, 'store'])

router.post('/validateEmailUserName', [UsersController, 'validateEmailUserName'])

router.post('/loginUser', [UsersController, 'loginUser']).use(middleware.guest())

router.get('/getUser', [UsersController, 'getUser']).use(middleware.auth({guards: ['api']}))
router.get('/logoutUser', [UsersController, 'logoutUser']).use(middleware.auth())

router.get('/fetchAllUser', [UsersController, 'fetchAllUser'])
router.get('/fetchAllPost', [PostsController, 'fetchAllPost'])
router.post('/fetchReactionar', [ReactionsController, 'fetch'])

router.post('/fetchAllComment', [CommentsController, 'fetch'])

router.post('users/:id/tokens', async ({params}) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return token
})