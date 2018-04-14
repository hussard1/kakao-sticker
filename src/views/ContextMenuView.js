import $ from 'jquery'
import posts from '../models/Posts'

class ContextMenu {

    constructor () {
        this.$el = $('#menu-context')
    }

    show (x, y, post) {
        this.setX(x)
        this.setY(y)
        this.$el.show()
        this.setBtnExpand(post)
    }
    hide (){
        this.$el.hide()
    }
    setX (x) {
        this.$el.css('left', x)
    }
    setY (y) {
        this.$el.css('top', y)
    }
    setBtnExpand (post) {
        const $btnExpandEl = $('#btn-expand', this.$el)
        post.expand ? $btnExpandEl.html('접기') : $btnExpandEl.html('펼치기')
    }
    bindChangeBgColor(handler) {
      $('#change-bg-color', this.$el).change((e) => {
        handler(e.target.value)
      })
    }
    bindChangeFontSize (handler) {
      $('#change-font-size', this.$el).change((e) => {
        handler(e.target.value)
      })
    }
    bindChangeFontColor (handler) {
      $('#change-font-color', this.$el).change((e) => {
        handler(e.target.value)
      })
    }
    bindRemovePost (handler, post) {
        const $btnRemove = $('#btn-remove', this.$el);
        $btnRemove.click((e) => {
            handler(post)
            this.$el.hide()
        })
    }
    bindExpandPost (handler) {
        const $btnExpandEl = $('#btn-expand', this.$el)
        $btnExpandEl.click((e) => {
            handler()
            this.$el.hide()
        })
    }
}

export default new ContextMenu()