import $ from 'jquery'

const defaultSettings = {}

class ContextMenu {

    constructor() {
        this.$el = $('#menu-context')
        this.bindChangeBgColor()
        this.bindChangeFontSize()
        this.bindChangeFontColor()
        this.bindRemovePost()
        this.bindExpandPost()

        this.$changeFontColorEL = $('#change-font-color', this.$el)
        this.$changeFontSizeEL = $('#change-font-size', this.$el)
        this.$changeFontBgEL = $('#change-bg-color', this.$el)
    }

    show(x, y, postView) {
        this.postView = postView
        this.post = postView.post
        this.$postEl = postView.$el
        this.setX(x)
        this.setY(y)
        this.$el.show()
        this.setBtnExpand()

        this.$changeFontColorEL.val(this.post.color)
        this.$changeFontSizeEL.val(this.post.fontSize)
        console.log(this.post.backgroundColor)
        this.$changeFontBgEL.val(this.post.backgroundColor)
    }

    hide() {
        this.$el.hide()
    }

    setX(x) {
        this.$el.css('left', x)
    }

    setY(y) {
        this.$el.css('top', y)
    }

    setBtnExpand() {
        const $btnExpandEl = $('#btn-expand', this.$el)
        this.post.expand ? $btnExpandEl.html('접기') : $btnExpandEl.html('펼치기')
    }

    bindChangeBgColor() {
        $('#change-bg-color', this.$el).change((e) => {
            this.post.backgroundColor = e.target.value
            this.$postEl.css('background-color', e.target.value)
            this.$el.hide()
        })
    }

    bindChangeFontSize() {
        $('#change-font-size', this.$el).change((e) => {
            this.post.fontSize = Number(e.target.value)
            const $textarea = $('textarea', this.$postEl)
            $textarea.css({
                'fontSize': Number(e.target.value)
            })
            this.$el.hide()
        })
    }

    bindChangeFontColor() {
        $('#change-font-color', this.$el).change((e) => {
            const $textarea = $('textarea', this.$postEl)
            this.post.color = e.target.value
            $textarea.css('color', e.target.value)
            this.$el.hide()
        })
    }

    bindRemovePost() {
        const $btnRemove = $('#btn-remove', this.$el)
        $btnRemove.on('mousedown', (e) => {
            this.postView.removePost(this.post)
            this.$el.hide()
        })
    }

    bindExpandPost() {
        const $btnExpandEl = $('#btn-expand', this.$el)
        $btnExpandEl.on('mousedown', (e) => {
            this.post.expand = !this.post.expand
            this.postView.ToggleTitleHandler()
            this.$el.hide()
        })
    }
}

export default new ContextMenu()