import $ from 'jquery'
import Post from '../model/postModel'
import posts from '../model/postList'
import board from './board'
import boardMenu from "./boardMenu";
import contextMenu from "./contextMenu";

export default {
    post: {},
    create (top = 0, left = 0) {
        this.post = new Post(top, left)
        this.render(this.post)
    },
    render (post) {
        this.post = post
        const $el =
            $(`<div id=${post.id} class="post">
                <div class="post-title">
                    <span class="text-title"></span>
                    <span class="right">
                        <span class="btn-expand">&#8679;</span>
                        <span class="btn-close">X</span>
                    </span>
                </div>
                <div class="post-content">
                    <textarea class="post-textarea">${post.content}</textarea>
                </div>
            </div>`)

        board.$el.append($el)

        $el.css({
            top: post.position.top,
            left: post.position.left,
            width: post.width,
            height: post.height,
        })

        this.bindResize($el)
        this.bindDragTitle($el)
        this.bindToggleTitle($el)
        this.bindRemovePost($el)
        this.bindChangeContents($el)
        this.bindContextMenu($el)
    },
    bindResize ($el) {
        $el.bind('mouseup',(e) => {
            this.post.width = $el.width()
            this.post.height = $el.height()
            posts.savePost(this.post)
        });
    },
    clearPost () {
        board.$el.html('')
    },
    bindDragTitle($el) {
        const $titleEl = $('.post-title', $el)
        let draggingEl,
            draggingPosition = {},
            top, left,
            postOffset

        board.$el.on('mousemove', (e) => {
            if (draggingEl) {
                top = e.pageY - draggingPosition.top
                left = e.pageX - draggingPosition.left
                if (this.isInsideScreen(top, left, $el)) {
                    draggingEl.offset({
                        top,
                        left
                    })
                    postOffset = $el.offset()
                    this.post.position = {
                        top: postOffset.top,
                        left: postOffset.left
                    }
                    posts.savePost(this.post)
                }
            }
        })

        $titleEl.on('mousedown', (e) => {
            draggingEl = $el
            draggingPosition.top = e.pageY - $el.offset().top
            draggingPosition.left = e.pageX - $el.offset().left
        })

        $titleEl.on('mouseup', (e) => {
            draggingEl = null
        })
    },
    isInsideScreen (top, left, $el) {
        const boardWidth =  board.$el.width()
        const boardHeight =  board.$el.height()
        return (top >= 0 && left >= 0 && left + $el.width()  <= boardWidth && top + $el.height() <= boardHeight)
    },
    bindToggleTitle ($el) {
        const $btnExpand = $('.post-title .btn-expand', $el);
        const $postContent = $('.post-content', $el);
        const $titleText = $('.text-title', $el);
        const $textarea = $('textarea', $postContent);

        $btnExpand.click((e) => {
            this.post.expand = !this.post.expand
            if (this.post.expand) {
                $btnExpand.html(`&#8679`)
                $el.css('min-height', '30px');
                $el.height(240)
                $el.css('resize', 'both')
                $postContent.show()
                $titleText.html('')
            } else {
                $btnExpand.html(`&#8681`)
                $el.css('min-height', '15px');
                $el.height(0)
                $el.css('resize', 'none')
                $postContent.hide()
                $titleText.html($textarea.val().split('\n')[0])
            }
        })
    },
    bindRemovePost ($el) {
        const $btnClose = $('.post-title .btn-close', $el);
        $btnClose.click((e) => {
            posts.removePost(this.post)
            $el.remove()
        })
    },
    bindChangeContents ($el) {
        const $textarea = $('.post-content textarea', $el);
        $textarea.bind('input propertychange', (e) => {
            this.post.content = e.target.value
            posts.savePost(this.post)
        })
    },
    bindContextMenu ($el) {
        $el.mousedown((e) => {
            if( e.button === 2 ) {
                e.stopPropagation()
                contextMenu.post = this.post
                contextMenu.show(e.pageX, e.pageY)
            } else {
                contextMenu.hide()
            }
        })
    }
}