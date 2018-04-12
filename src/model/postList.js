import post from '../view/post'
import board from '../view/board'

export default {
    posts: [],
    init () {
        this.posts = this.getPosts()
        this.render()
    },
    add (post) {
        this.posts.push(post)
        this.savePosts()
    },
    getOrder() {
    },
    getLength () {
        return this.posts.length
    },
    savePost (post = {}) {
        this.posts.forEach(p => {
            if (p.id === post.id) {
                p = post
            }
        })
        this.savePosts()
    },
    savePosts (posts = this.posts) {
        localStorage.setItem('posts', JSON.stringify(posts))
    },
    getPosts() {
        const posts = localStorage.getItem('posts');
        return JSON.parse(posts) || []
    },
    removePost (post) {
        this.posts.forEach((p, i) => {
            if (p.id === post.id) {
                this.posts.splice(i, 1)
            }
        })
        this.savePosts()
    },
    clearPosts () {
        this.posts = []
        this.savePosts()
        post.clearPost()
    },
    render () {
        this.posts.forEach(p =>
            post.render(p)
        )
    },
    sort () {
        const $boardWidth = board.el.width()
        let top = 10, left = 20, maxHeight = top;
        this.posts.forEach(p => {
            p.position = {
                left,
                top
            }
            left = left + p.width + 20
            maxHeight = Math.max(maxHeight, p.height)
            if ($boardWidth <= left + p.width) {
                left = 20
                top = maxHeight + 20
            }
        })
        post.clearPost()
        this.savePosts()
        this.render()
    }
}