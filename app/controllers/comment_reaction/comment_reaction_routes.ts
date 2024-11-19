import router from '@adonisjs/core/services/router'
import { middleware } from '../../../start/kernel.js'
const CommentReactionController = () =>  import('./comment_reaction_controller.js')

// Grouped Comment Routes
router
  .group(() => {
    // router.post('comment-react', [CommentController, 'commentReaction'])
  })
  .middleware([middleware.auth()])