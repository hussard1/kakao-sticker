import $ from 'jquery'
import boardMenu from './BoardMenuView'
import contextMenu from './ContextMenuView'

export default class BoardView {

    constructor () {
        this.$el = $('#board')
        this.boardMenu = new boardMenu()
        this.contextMenu = new contextMenu()
        this.disableBrowserContextMenu()
        this.bindClickBoard()
    }

    render (postView) {
      this.$el.append(postView.render().$el)
    }
    clear () {
        this.$el.html('')
    }
    sort (posts) {
        const $boardWidth = this.$el.width()
        let top = 10, left = 20, maxHeight = top;
        posts.forEach(post => {
            post.position = {
                left,
                top
            }
            left = left + post.width + 20
            maxHeight = Math.max(maxHeight, post.height)
            if ($boardWidth <= left + post.width) {
                left = 20
                top = maxHeight + 20
            }
        })
        this.clear()
    }

    bindClickBoard () {
        this.$el.mousedown((e) => {
            if ( e.button === 2 ) {
                this.boardMenu.show(e.pageX, e.pageY)
            } else {
                this.boardMenu.hide()
                this.contextMenu.hide()
            }
        })
    }

    disableBrowserContextMenu () {
        $(document).bind("contextmenu", () => false)
    }
}