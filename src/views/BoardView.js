import $ from 'jquery'
import boardMenu from './BoardMenuView'
import contextMenu from './ContextMenuView'
import PostView from './PostView'

export default class BoardView {

    constructor(store) {
        this.store = store
        this.$el = $('#board')
        this.boardMenu = new boardMenu()
        this.boardMenu.bindAddPost(this.addPost.bind(this))
        this.boardMenu.bindClearPost(this.clearPost.bind(this))
        this.boardMenu.bindSortPost(this.sortPost.bind(this))
        this.disableBrowserContextMenu()
        this.bindClickBoard()
        this.render()
    }

    render() {
        this.clear()
        let postView
        this.store.posts.forEach(post => {
            postView = new PostView(post)
            this.$el.append(postView.$el)
            postView.bindClickTitle(this.store.getLastOrder.bind(this.store))
            postView.bindDragTitle(this.$el)
            postView.removePost = this.removePost.bind(this)
        })
    }

    addPost(top, left) {
        const boardWidth = this.$el.width()
        const boardHeight = this.$el.height()

        if (left + 250 >= boardWidth) {
            left = boardWidth - 250
        }

        if (top + 240 >= boardHeight) {
            top = boardHeight - 240
        }
        this.addPostOnBoard(top, left)
    }

    clear() {
        this.$el.html('')
    }

    clearPost() {
        this.store.clear()
        this.clear()
    }

    sortPost() {
        const $boardWidth = this.$el.width()
        const $boardHeight = this.$el.height()
        let marginLeft = 10, marginTop = 10,
            top = marginTop,
            left = marginLeft

        this.store.posts.forEach(post => {
            post.width = 250
            post.height = 240
            post.position = {
                top,
                left
            }
            left = left + post.width + marginLeft
            if ($boardWidth <= left + post.width) {
                left = marginLeft
                top = top + post.height
            }

            if (top + post.height > $boardHeight) {
                top = marginTop
                left = marginLeft
            }
        })
        this.render()
    }

    bindClickBoard() {
        this.$el.mousedown((e) => {
            if (e.button === 2) {
                this.boardMenu.show(e.pageX, e.pageY)
            } else {
                this.boardMenu.hide()
                contextMenu.hide()
            }
        })
    }

    removePost(post) {
        this.store.remove(post)
    }

    disableBrowserContextMenu() {
        $(document).bind('contextmenu', () => false)
    }
}