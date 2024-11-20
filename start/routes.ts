/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '../app/controllers/comment/comment_routes.js'
import '../app/controllers/post/post_routes.js'
import '../app/controllers/user/user_routes.js'

router.get('/', async () => {
  return { hello: 'world' }
})
