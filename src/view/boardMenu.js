import $ from 'jquery'

export default {
    el: $('#menu-board'),
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
        this.el.click((e) => {
            if (e.target.id === 'create-post' ) this.createPostHandler()
            else if (e.target.id === 'sort-post' ) this.sortPostHandler()
            else if (e.target.id === 'clear-post' ) this.clearPostHandler()
        })
    },
    createPostHandler() {
        console.log('createPostHandler')
    },
    sortPostHandler () {
        console.log('sortPostHandler')
    },
    clearPostHandler () {
        console.log('clearPostHandler')
    }
}