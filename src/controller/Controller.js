import posts from '../store/Posts'
import BoardView from '../views/BoardView'
import Post from '../models/Post'

export default class Controller {

  constructor () {
    this.ps = new posts()
    this.ps.posts = this.proxied(this.ps.posts.map(post => {
      return this.proxied(post)
    }))
    this.boardView = new BoardView(this.ps)
    this.boardView.addPostOnBoard = this.addPost.bind(this)
  }

  proxied (posts) {
    return new Proxy(posts, this.handler())
  }

  handler () {
    return {
      set: (target, prop, value) => {
        if (prop === 'length') {
          this.boardView.render()
        }
        target[prop] = value;
        this.ps.save()
        console.log({type: 'set', target, prop, value});
        return Reflect.set(target, prop, value);
      }
    }
  }

  addPost(top, height) {
    this.ps.add(this.proxied(new Post(top, height, this.ps.getLastOrder())))
  }
}