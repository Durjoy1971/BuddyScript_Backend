import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import PostController from './post_controller.js'

router
  .group(() => {
    router.get('/fetchAllPost', [PostController, 'fetchAllPost'])
    router.post('/createPost', [PostController, 'createPost'])
    router.post('/deletePost', [PostController, 'deletePost'])
    router.post('/updatePost', [PostController, 'updatePost'])
    router.post('/addReaction', [PostController, 'reactionOnPost'])
  })
  .use([middleware.auth()])
