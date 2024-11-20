import type { HttpContext } from '@adonisjs/core/http'
import PostService from './post_service.js'
import { createPostvalidator, deletePostValidator, reactionOnPostValidator, updatePostValidator } from './post_validator.js'

export default class PostController {
  private postService: PostService

  constructor() {
    this.postService = new PostService()
  }

  public async fetchAllPost({ response }: HttpContext) {
    try {
      const posts = await this.postService.getFetchAllPostService()

      return response.status(200).send(posts)
    } catch (error) {
      return response.status(500).send('An unexpected error occurred while fetching posts')
    }
  }

  public async createPost({ auth, request, response }: HttpContext) {
    const { content, imgURL } = request.all()
    if (!content || !imgURL) {
      return response.status(400).send('Missing required fields')
    }

    const currentUserId = auth.use('web').user?.serialize().id
    const validateData = await createPostvalidator.validate({content, imgURL, currentUserId})

    const newPost = await this.postService.getCreatePostService(validateData.currentUserId, validateData.content, validateData.imgURL)

    return response.status(201).send(newPost)
  }

  public async deletePost({ request, response, auth }: HttpContext) {
    const { postId } = request.all()

    if (!postId) {
      return response.status(400).send('Missing required fields')
    }

    const validateData = await deletePostValidator.validate({ postId })

    const currentUserId = auth.use('web').user?.serialize().id;

    const post = await this.postService.getDeletePostService(validateData.postId, currentUserId)

    return response.status(post.status).send(post)
  }
  
  public async updatePost({ request, response, auth }: HttpContext) {
    const { postId, content } = request.all()
    if (!postId || !content) {
      return response.status(400).send('Missing required fields')
    }

    const currentUserId = auth.use('web').user?.serialize().id

    const validateData = await updatePostValidator.validate({ postId, content })

    const post = await this.postService.getUpdatePostService(validateData.postId, currentUserId, validateData.content)

    return response.status(post.status).send(post)
  }

  public async reactionOnPost({request, response, auth}: HttpContext) {
    const { postId } = request.all()
    if (!postId) {
      return response.status(400).send('Missing required fields')
    }

    const currentUserId = auth.use('web').user?.serialize().id

    const validateData = await reactionOnPostValidator.validate({ postId, currentUserId })

    const reaction = await this.postService.getReactionOnPostService(validateData.postId, validateData.currentUserId)

    return response.status(reaction.status).send(reaction)
  }
}
