import $ from 'jquery'
import post from './post'
import posts from '../model/postList'

export default {
    el: $('#menu-context'),
    position : {
        top: 0,
        left: 0,
    },
    init () {
        this.bindClickMenu()
    },
    show (x, y) {
        this.setX(x)
        this.setY(y)
        this.el.show()
    },
    hide (){
        this.el.hide()
    },
    setX (x) {
        this.el.css('left', x)
    },
    setY (y) {
        this.el.css('top', y)
    },
    bindClickMenu () {
        this.el.mousedown((e) => {
            if (e.target.id === 'create-post' ) this.createPostHandler(e)
            else if (e.target.id === 'sort-post' ) this.sortPostHandler()
            else if (e.target.id === 'clear-post' ) this.clearPostHandler()
            this.el.hide()
        })
    },
    createPostHandler(e) {
        post.createPost(e.pageY, e.pageX)
    },
    sortPostHandler () {
        posts.sort()
    },
    clearPostHandler () {
        console.log('clearPostHandler')
        posts.clearPosts()
    }
}