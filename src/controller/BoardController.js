import Post from '../models/Post'
import PostView from '../views/PostView'
import postController from './PostController'

export default class BoardController {

  constructor (model, view) {
    this.model = model
    this.view = view

    view.boardMenu.bindAddPost(this.addPost.bind(this))
    view.boardMenu.bindClearPost(this.clearPost.bind(this))
    view.boardMenu.bindSortPost(this.sortPost.bind(this))

    this.render()
  }

  addPost (top, left) {
    this.model.add(new Post(top, left))
    this.render()
  }

  render () {
    let postView;
    this.model.posts.forEach(post => {
      postView = new PostView(post).render()
      postController.set(postView, post)
      this.view.render(postView)
    })
  }

  clearPost () {
    this.model.clear()
    this.view.clear()
  }

  sortPost () {
    this.view.sort(this.model.posts)
    this.render()
    this.model.update()
  }
}