import $ from 'jquery'
import postModel from '../model/postModel'
import posts from '../model/postList'
import board from './board'
import boardMenu from "./boardMenu";
import contextMenu from "./contextMenu";

export default {
    postOffset: {},
    draggingEl: null,
    draggingPosition: {},
    createPost (top, left) {
        const post = postModel.create(top, left)
        this.render(post)
    },
    render (post) {
        const html = `        
        <div id=${post.id} class="post">
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
        </div>`
        board.el.append(html)

        post.$el = $(`#${post.id}`)

        post.$el.offset({
            top: post.position.top,
            left: post.position.left
        })

        post.$el.width(post.width)
        post.$el.height(post.height)

        this.bindTitleDrag(post)
        this.bindToggleTitle(post)
        this.bindChangeContents(post)
        this.bindContextMenu(post)

        return post.$el
    },
    clearPost () {
        board.el.html('')
    },
    bindTitleDrag(post) {
        const el = post.$el
        let top, left
        board.el.on('mousemove', (e) => {
            if (this.draggingEl) {
                top = e.pageY - this.draggingPosition.top
                left = e.pageX - this.draggingPosition.left
                if (this.isInsideScreen(top, left, post)) {
                    this.postOffset = post.$el.offset()
                    this.draggingEl.offset({
                        top,
                        left
                    })
                    post.position = this.postOffset
                    posts.savePost(post)
                }
            }
        })
        $('.post-title', el).on('mousedown', (e) => {
            this.draggingEl = el
            this.draggingPosition.top = e.pageY - el.offset().top
            this.draggingPosition.left = e.pageX - el.offset().left
        })

        $('.post-title', el).on('mouseup', (e) => {
            this.draggingEl = null
        })
    },
    isInsideScreen (top, left, post) {
        const boardWidth =  board.el.width()
        const boardHeight =  board.el.height()
        return (top >= 0 && left >= 0 && left + post.$el.width()  <= boardWidth && top + post.$el.height() <= boardHeight)
    },
    bindToggleTitle (post) {
        const $el = post.$el
        const $btnExpand = $('.post-title .btn-expand', $el);
        const $btnClose = $('.post-title .btn-close', $el);
        const $postContent = $('.post-content', $el);
        const $titleText = $('.text-title', $el);
        const $textarea = $('textarea', $postContent);

        $btnExpand.click((e) => {
            post.expand = !post.expand
            if (post.expand) {
                $btnExpand.html(`&#8679`)
                $el.css('min-height', '30px');
                $el.height(240)
                $postContent.show()
                $titleText.html('')
            } else {
                $btnExpand.html(`&#8681`)
                $el.css('min-height', '15px');
                $el.height(0)
                $postContent.hide()
                $titleText.html($textarea.val().split('\n')[0])
            }
        })

        $btnClose.click((e) => {
            this.closePost(post)
            posts.removePost(post)
        })
    },
    bindChangeContents (post) {
        const $el = post.$el
        const $textarea = $('.post-content textarea', $el);
        $textarea.bind('input propertychange', (e) => {
            post.content = e.target.value
            posts.savePost(post)
        })
    },
    closePost (post) {
        const $el = post.$el
        $el.remove()
    },
    bindContextMenu (post) {
        const el = post.$el
        el.mousedown((e) => {
            if( e.button === 2 ) {
                e.stopPropagation()
                contextMenu.show(e.pageX, e.pageY)
            } else {
                contextMenu.hide()
            }
        })
    }
}