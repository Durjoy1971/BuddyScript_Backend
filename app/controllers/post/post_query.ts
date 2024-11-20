import Post from '#models/post'

export class PostQueries {
  public static async fetchAllPost() {
    return await Post.query()
      .select('id', 'content', 'image_url', 'createdAt', 'userId')
      .orderBy('id', 'desc')
      .preload('user', (userQuery) => {
        userQuery.select('id', 'userName', 'picURL')
      })
      .preload('reactions', (reactionQuery) => {
        reactionQuery.select('id', 'reaction', 'userId')
      })
      .preload('comments', (commentQuery) => {
        commentQuery
          .select('id', 'content', 'createdAt', 'userId')
          .preload('commentedBy', (userQuery) => {
            userQuery.select('id', 'userName', 'picURL')
          })
          .preload('reactions', (reactionQuery) => {
            reactionQuery.select('id', 'reaction', 'userId')
          })
          .withCount('reactions')
          .preload('replies', (replyQuery) => {
            replyQuery
              .select('id', 'content', 'createdAt', 'userId')
              .withCount('commentedOn')
              .preload('user', (userQuery) => {
                userQuery.select('id', 'userName', 'picURL')
              })
          })
      })
      .withCount('reactions')
      .withCount('comments')
  }

  public static async createPost(userId: number, content: string, imgURL: string) {
    return await Post.create({
      userId,
      content,
      imageURL:imgURL
    })
  }

  public static async postExistOrNot(postId: number) {
    return await Post.query().where('id', postId)
    .preload('user', (userQuery) => {
      userQuery.select('id')
    })
    .first()
  }

  public static async deletePost(post:Post) {
    return await post.delete()
  }
}
