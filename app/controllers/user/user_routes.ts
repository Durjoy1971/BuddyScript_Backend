import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user/user_controller')

router
  .group(() => {
    router.get('/logoutUser', [UserController, 'logoutUser'])
    router.get('/getUser', [UserController, 'getUser'])
  })
  .use(middleware.auth())

router.post('/loginUser', [UserController, 'loginUser']).use(middleware.guest())
router.post('/registerUser', [UserController, 'createRegisterUser'])
router.post('/validateEmailUserName', [UserController, 'validateEmailUserName'])
