import router from '@adonisjs/core/services/router'
import { middleware } from '../../../start/kernel.js'

const CommentController = () => import('#controllers/comment/comment_controller')

router
  .group(() => {
    router.post('/addCommentReaction', [CommentController, 'addReaction'])
    router.post('/createComment', [CommentController, 'addComment'])
    router.post('/createCommentReply', [CommentController, 'addCommentReply'])
  })
  .middleware([middleware.auth()])
