import $ from 'jquery'
import posts from '../models/Posts'
import Post from '../models/Post'

export default class BoardMenuView {

  constructor () {
    this.$el = $('#menu-board')
    this.bindClickMenu()
  }

  show (x, y) {
    this.setX(x)
    this.setY(y)
    this.$el.show()
  }

  hide () {
    this.$el.hide()
  }

  setX (x) {
    this.$el.css('left', x)
  }

  setY (y) {
    this.$el.css('top', y)
  }

  bindAddPost (boardView) {
    $('#add-post', this.$el).click((e) => {
      boardView.addPost(e.pageY, e.pageX)
    })
  }

  bindClearPost (handler) {
    $('#clear-post', this.$el).click((e) => {
      handler()
    })
  }

  bindSortPost (handler) {
    $('#sort-post', this.$el).click((e) => {
      handler()
    })
  }

  bindClickMenu () {
    this.$el.click((e) => {
      this.$el.hide()
    })
  }
}