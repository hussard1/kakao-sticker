import _ from 'lodash'

class Posts {

  constructor () {
    this.posts = this.getPosts()
  }

  add (post) {
    this.posts.push(post)
  }

  update (posts) {
    this.posts = posts
  }

  remove (post) {
    this.posts.forEach((p, i) => {
      if (p.id === post.id) {
        this.posts.splice(i, 1)
      }
    })
  }

  getLastOrder () {
    if (this.isEmpty()) return 0
    else return _.maxBy(this.posts, p => p.order).order
  }

  savePosts () {
    localStorage.setItem('posts', JSON.stringify(this.posts))
  }

  getPosts () {
    const posts = localStorage.getItem('posts')
    return JSON.parse(posts) || []
  }

  clear () {
    this.posts.length = []
  }

  isEmpty () {
    return this.posts.length < 1
  }
}

export default Posts