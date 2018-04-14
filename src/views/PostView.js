import $ from 'jquery'
import contextMenu from "./ContextMenuView";

export default class PostView {

    constructor(post) {
        this.post = post
        this.render()
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
        this.bindResize ()
        this.bindContextMenu()
        this.bindToggleTitle()
        this.bindChangeContents()
        this.ToggleTitleHandler()
    }

    setStyle () {
      const $textarea = $('textarea', this.$el);

      this.$el.css({
            top: this.post.position.top,
            left: this.post.position.left,
            width: this.post.width,
            height: this.post.height,
            'z-index': this.post.order,
            'background-color': this.post.backgroundColor
        })

      $textarea.css({
        fontSize: Number(this.post.fontSize),
        color: this.post.fontColor
      })

    }

    bindResize () {
        this.$el.bind('mouseup',(e) => {
          this.post.width = this.$el.width()
          this.post.height = this.$el.height()
        });
    }

    bindClickTitle (lastOrder) {
        this.$el.on('mousedown', (e) => {
          let last = lastOrder()
          if (last > this.post.order) {
            this.post.order = last + 1
            this.$el.css('z-index', this.post.order)
          }
        })
    }

    bindDragTitle($boardViewEl) {
        const $titleEl = $('.post-title', this.$el)
        let draggingEl,
            draggingPosition = {},
            top, left,
            postOffset

        $boardViewEl.on('mousemove', (e) => {
            if (draggingEl) {
                top = e.pageY - draggingPosition.top
                left = e.pageX - draggingPosition.left
                if (this.isInsideScreen(top, left, $boardViewEl)) {
                    draggingEl.offset({
                        top,
                        left
                    })
                    postOffset = this.$el.offset()
                    this.post.position = {
                        top: postOffset.top,
                        left: postOffset.left
                    }
                }
            }
        })

        $titleEl.mousedown((e) => {
            if( e.button === 1 || e.button === 0) {
                draggingEl = this.$el
                draggingPosition.top = e.pageY - this.$el.offset().top
                draggingPosition.left = e.pageX - this.$el.offset().left
            }
        })

        $boardViewEl.on('mouseup', (e) => {
            draggingEl = null
        })
    }

    isInsideScreen (top, left, $boardViewEl) {
        const boardWidth =  $boardViewEl.width()
        const boardHeight =  $boardViewEl.height()
        return (top >= 0 && left >= 0 && left + this.$el.width()  <= boardWidth && top + this.$el.height() <= boardHeight)
    }

    bindToggleTitle () {
        const $btnExpand = $('.post-title .btn-expand', this.$el);
        $btnExpand.click((e) => {
            this.post.expand = !this.post.expand
            this.ToggleTitleHandler()
        })
    }

    ToggleTitleHandler (e) {
        const $btnExpand = $('.post-title .btn-expand', this.$el);
        const $postContent = $('.post-content', this.$el);
        const $titleText = $('.text-title', this.$el);
        const $btnExpandEl = $('#btn-expand', this.$el)
        const $textarea = $('textarea', this.$el)

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

    bindRemovePost (handler) {
        const $btnClose = $('.post-title .btn-remove', this.$el);
        $btnClose.click((e) => {
          handler(this.post)
        })
    }

    bindChangeContents () {
        const $textarea = $('.post-content textarea', this.$el);
        $textarea.bind('input propertychange', (e) => {
            this.post.content = e.target.value
        })
    }

    bindContextMenu () {
        this.$el.mousedown((e) => {
            if( e.button === 2 ) {
                e.stopPropagation()
                contextMenu.bindChangeBgColor(this.changeColor.bind(this))
                contextMenu.bindChangeFontSize(this.changeFontSize.bind(this))
                contextMenu.bindChangeFontColor(this.changeFontColor.bind(this))
                contextMenu.bindRemovePost(this.removePost.bind(this))
                contextMenu.bindExpandPost(this.expandPost.bind(this))
                contextMenu.show(e.pageX, e.pageY, this.post)
            } else {
              contextMenu.hide()
            }
        })
    }

  changeColor (color) {
    this.post.backgroundColor = color
    this.$el.css('background-color', color)
  }

  changeFontSize(size) {
    this.post.fontSize = Number(size)
    const $textarea = $('textarea', this.$el);
    $textarea.css({
      'fontSize': Number(size)
    })
  }

  changeFontColor(color) {
    const $textarea = $('textarea', this.$el);
    this.post.fontcolor = color
    $textarea.css('color', color)
  }

  removePost() {
    this.posts.remove(this.post)
  }

  expandPost() {
    this.ToggleTitleHandler()
  }
}