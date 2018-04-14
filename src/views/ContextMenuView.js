import $ from 'jquery'
import posts from '../models/Posts'

export default class ContextMenu{

    constructor () {
        this.$el = $('#menu-context')
        this.bindRemovePost()
        this.bindExpandPost()
    }

    show (x, y) {
        this.setX(x)
        this.setY(y)
        this.$el.show()
        this.setBtnExpand()
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
    setBtnExpand () {
        const $btnExpandEl = $('#btn-expand', this.$el)
        this.postView.post.expand ? $btnExpandEl.html('접기') : $btnExpandEl.html('펼치기')
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
    bindRemovePost () {
        const $btnRemove = $('#btn-remove', this.$el);
        $btnRemove.click((e) => {
            // posts.removePost(this.postView.post)
            this.$el.hide()
        })
    }
    bindExpandPost () {
        const $btnExpandEl = $('#btn-expand', this.$el)
        $btnExpandEl.click((e) => {
            // this.postView.ToggleTitleHandler()
            this.$el.hide()
        })
    }
}