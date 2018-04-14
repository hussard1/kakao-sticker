import $ from 'jquery'
import boardView from './BoardView'
import contextMenu from "./ContextMenuView";

export default class PostView {

    constructor(post) {
        this.post = post
      this.contextMenu = contextMenu
    }

    render () {
        this.$el =
            $(`<div id=${this.post.id} class="post">
                <div class="post-title">
                    <span class="text-title"></span>
                    <span class="right">
                        <span class="btn-expand">&#8679;</span>
                        <span class="btn-remove">X</span>
                    </span>
                </div>
                <div class="post-content">
                    <textarea class="post-textarea">${this.post.content}</textarea>
                </div>
            </div>`)

        this.setStyle()
        this.bindContextMenu()

        return this
    }

    setStyle () {
        this.$el.css({
            top: this.post.position.top,
            left: this.post.position.left,
            width: this.post.width,
            height: this.post.height,
            'z-index': this.post.order,
            'background-color': this.post.backgroundColor,
            color: this.post.fontColor,
        })
    }

    bindResize (handler) {
        this.$el.bind('mouseup',(e) => {
          handler(this.$el.width(), this.$el.height())
        });
    }

    bindClick (handler) {
        this.$el.on('mousedown', (e) => {
            handler()
        })
    }

    bindDragTitle(handler) {
        const $titleEl = $('.post-title', this.$el)
        let draggingEl,
            draggingPosition = {},
            top, left,
            postOffset

        this.$el.on('mousemove', (e) => {
            if (draggingEl) {
                top = e.pageY - draggingPosition.top
                left = e.pageX - draggingPosition.left
                if (this.isInsideScreen(top, left)) {
                    draggingEl.offset({
                        top,
                        left
                    })
                    postOffset = this.$el.offset()
                    handler(postOffset.top, postOffset.left)
                }
            }
        })

        $titleEl.mousedown((e) => {
            console.log(e)
            if( e.button === 1 || e.button === 0) {
                draggingEl = this.$el
                draggingPosition.top = e.pageY - this.$el.offset().top
                draggingPosition.left = e.pageX - this.$el.offset().left
            }
        })

        this.$el.on('mouseup', (e) => {
            draggingEl = null
        })
    }

    isInsideScreen (top, left) {
        const boardWidth =  boardView.$el.width()
        const boardHeight =  boardView.$el.height()
        return (top >= 0 && left >= 0 && left + this.$el.width()  <= boardWidth && top + this.$el.height() <= boardHeight)
    }

    bindToggleTitle (handler) {
        const $btnExpand = $('.post-title .btn-expand', this.$el);
        $btnExpand.click((e) => {
            this.post.expand = !this.post.expand
            handler(this.post.expand)
            this.ToggleTitleHandler()
        })
    }

    ToggleTitleHandler (e) {
        const $btnExpand = $('.post-title .btn-expand', this.$el);
        const $postContent = $('.post-content', this.$el);
        const $titleText = $('.text-title', this.$el);
        const $textarea = $('textarea', $postContent);
        const $btnExpandEl = $('#btn-expand', this.$el)

        if (this.post.expand) {
            $btnExpand.html(`&#8679`)
            this.$el.css('min-height', '30px');
            this.$el.height(240)
            this.$el.css('resize', 'both')
            $postContent.show()
            $titleText.html('')
            $btnExpandEl.html('접기')
        } else {
            $btnExpand.html(`&#8681`)
            this.$el.css('min-height', '15px');
            this.$el.height(0)
            this.$el.css('resize', 'none')
            $postContent.hide()
            $titleText.html($textarea.val().split('\n')[0])
            $btnExpandEl.html('펼치기')
        }

    }

    bindRemovePost () {
        const $btnClose = $('.post-title .btn-remove', this.$el);
        $btnClose.click((e) => {
            posts.removePost(this.post)
            this.$el.remove()
        })
    }

    bindChangeContents (handler) {
        const $textarea = $('.post-content textarea', this.$el);
        $textarea.bind('input propertychange', (e) => {
            this.post.content = e.target.value
            handler(this.post.content)
        })
    }

    bindContextMenu () {
        this.$el.mousedown((e) => {
            if( e.button === 2 ) {
                e.stopPropagation()
                // contextMenu.postView = this
                contextMenu.show(e.pageX, e.pageY)
            } else {
                contextMenu.hide()
            }
        })
    }
}