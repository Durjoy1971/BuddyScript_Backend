# API Documentation

---

## Create Register User

**Endpoint**: `POST /users/register`

**Description**: Registers a new user.

**Request Body**:
- `userName` (string): The username of the user (required).
- `password` (string): The password of the user (required).
- `email` (string): The email address of the user (required).
- `picURL` (string): The profile picture URL of the user (required).

**Response**:
- **201 Created**: Returns success message and user details.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while creating the user.

---

## Validate Email and Username

**Endpoint**: `POST /users/validate`

**Description**: Validates if the provided email and username already exist.

**Request Body**:
- `email` (string): The email address to be validated (required).
- `userName` (string): The username to be validated (required).

**Response**:
- **200 OK**: Returns validation result.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while validating email and username.

---

## Login User

**Endpoint**: `POST /users/login`

**Description**: Logs in the user.

**Request Body**:
- `email` (string): The email address of the user (required).
- `password` (string): The password of the user (required).

**Response**:
- **202 Accepted**: User logged in successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while logging in the user.

---

## Logout User

**Endpoint**: `POST /users/logout`

**Description**: Logs out the current user.

**Response**:
- **200 OK**: User logged out successfully.
- **500 Internal Server Error**: An unexpected error occurred while logging out the user.

---

## Get User

**Endpoint**: `GET /users/me`

**Description**: Retrieves the currently logged-in user's information.

**Response**:
- **200 OK**: Returns the user's information.
- **500 Internal Server Error**: An unexpected error occurred while getting user.

## Example Usage in Code

<details>
    <summary>Click to expand User Controller code example</summary>

```javascript
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
```

</details>

## Fetch All Posts

**Endpoint**: `GET /posts`

**Description**: Fetches all posts.

**Response**:
- **200 OK**: Returns a list of posts.
- **500 Internal Server Error**: An unexpected error occurred while fetching posts.

---

## Create Post

**Endpoint**: `POST /posts`

**Description**: Creates a new post.

**Request Body**:
- `content` (string): The content of the post (required).
- `imgURL` (string): The image URL of the post (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **201 Created**: Returns the created post.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while creating the post.

---

## Delete Post

**Endpoint**: `DELETE /posts`

**Description**: Deletes a post.

**Request Body**:
- `postId` (number): The ID of the post to be deleted (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **200 OK**: Post deleted successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while deleting the post.

---

## Update Post

**Endpoint**: `PUT /posts`

**Description**: Updates a post.

**Request Body**:
- `postId` (number): The ID of the post to be updated (required).
- `content` (string): The updated content of the post (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **200 OK**: Post updated successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while updating the post.

---

## React to Post

**Endpoint**: `POST /posts/reaction`

**Description**: Adds a reaction to a post.

**Request Body**:
- `postId` (number): The ID of the post to react to (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **200 OK**: Reaction added successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while reacting to the post.

## Example Usage in Code
<details>
    <summary>Click to expand Post Controller code example</summary>

```javascript
import type { HttpContext } from '@adonisjs/core/http';
import PostService from './post_service.js';
import { createPostvalidator, deletePostValidator, reactionOnPostValidator, updatePostValidator } from './post_validator.js';

export default class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public async fetchAllPost({ response }: HttpContext) {
    try {
      const posts = await this.postService.getFetchAllPostService();
      return response.status(200).send(posts);
    } catch (error) {
      return response.status(500).send('An unexpected error occurred while fetching posts');
    }
  }

  public async createPost({ auth, request, response }: HttpContext) {
    const { content, imgURL } = request.all();
    if (!content || !imgURL) {
      return response.status(400).send('Missing required fields');
    }

    const currentUserId = auth.use('web').user?.serialize().id;
    const validateData = await createPostvalidator.validate({ content, imgURL, currentUserId });

    const newPost = await this.postService.getCreatePostService(validateData.currentUserId, validateData.content, validateData.imgURL);

    return response.status(201).send(newPost);
  }

  public async deletePost({ request, response, auth }: HttpContext) {
    const { postId } = request.all();

    if (!postId) {
      return response.status(400).send('Missing required fields');
    }

    const validateData = await deletePostValidator.validate({ postId });

    const currentUserId = auth.use('web').user?.serialize().id;

    const post = await this.postService.getDeletePostService(validateData.postId, currentUserId);

    return response.status(post.status).send(post);
  }

  public async updatePost({ request, response, auth }: HttpContext) {
    const { postId, content } = request.all();
    if (!postId || !content) {
      return response.status(400).send('Missing required fields');
    }

    const currentUserId = auth.use('web').user?.serialize().id;

    const validateData = await updatePostValidator.validate({ postId, content });

    const post = await this.postService.getUpdatePostService(validateData.postId, currentUserId, validateData.content);

    return response.status(post.status).send(post);
  }

  public async reactionOnPost({ request, response, auth }: HttpContext) {
    const { postId } = request.all();
    if (!postId) {
      return response.status(400).send('Missing required fields');
    }

    const currentUserId = auth.use('web').user?.serialize().id;

    const validateData = await reactionOnPostValidator.validate({ postId, currentUserId });

    const reaction = await this.postService.getReactionOnPostService(validateData.postId, validateData.currentUserId);

    return response.status(reaction.status).send(reaction);
  }
}
```

</details>

## Add Reaction

**Endpoint**: `POST /comments/reaction`

**Description**: Adds a reaction to a comment.

**Request Body**:
- `commentId` (number): The ID of the comment to react to (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **200 OK**: Reaction added successfully.
- **201 Created**: Reaction created successfully.
- **400 Bad Request**: Missing required fields.
- **404 Not Found**: Comment not found.
- **500 Internal Server Error**: An unexpected error occurred while adding the reaction.

---

## Add Comment

**Endpoint**: `POST /comments`

**Description**: Adds a comment to a post.

**Request Body**:
- `postId` (number): The ID of the post to comment on (required).
- `content` (string): The content of the comment (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **201 Created**: Comment added successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while adding the comment.

---

## Add Comment Reply

**Endpoint**: `POST /comments/reply`

**Description**: Adds a reply to a comment.

**Request Body**:
- `commentId` (number): The ID of the comment to reply to (required).
- `content` (string): The content of the reply (required).

**Headers**:
- `Authorization`: Bearer token for authenticated users.

**Response**:
- **201 Created**: Reply added successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: An unexpected error occurred while adding the reply.

## Example Usage in Code
<details>
    <summary>Click to expand Comment Controller code example</summary>

```javascript
import type { HttpContext } from '@adonisjs/core/http'
import { addCommentValidator, addReactionValidator, createCommentReplyValidator } from './comment_validator.js'
import CommentService from './comment_service.js'

//* new CommentController
export default class CommentController {
  private commentService: CommentService

  constructor() {
    this.commentService = new CommentService()
  }

  public async addReaction({ auth, request, response }: HttpContext) {
    try {
      const { commentId } = request.all()

      if (!commentId) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateData = await addReactionValidator.validate({ currentUserId, commentId })

      const reactions = await this.commentService.getAddReactionService(
        validateData.currentUserId,
        validateData.commentId
      )
      
      if (reactions.status === 404) {
        return response.status(404).send(reactions.error)
      } else if (reactions.status === 200) {
        const { status, ...reactionData } = reactions
        return response.status(200).send(reactionData)
      } else {
        const { status, ...reactionData } = reactions
        return response.status(201).send(reactionData)
      }
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding reaction')
    }
  }

  public async addComment({ auth, request, response }: HttpContext) {
    try {
      const { postId, content } = request.all()
      if (!postId || !content) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateDate = await addCommentValidator.validate({ currentUserId, postId, content })

      const newComment = await this.commentService.getAddCommentService(
        validateDate.currentUserId,
        validateDate.postId,
        validateDate.content
      )

      return response.status(201).send({ ...newComment })
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding comment')
    }
  }

  public async addCommentReply({ auth, request, response }: HttpContext) {
    try {
      const { commentId, content } = request.all()
      if (!commentId || !content) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateData = await createCommentReplyValidator.validate({
        commentId,
        userId: currentUserId,
        content
      })

      const newCommentReply = await this.commentService.getAddCommentReplyService(
        validateData.commentId,
        validateData.userId,
        validateData.content
      )

      return response.status(201).send({ ...newCommentReply })
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding comment reply')
    }
  }
}
```
</details>