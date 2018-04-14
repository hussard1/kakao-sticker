import posts from '../models/Posts'

export default class PostController {

  constructor (model, view) {
    this.model = model
    this.view = view

    view.bindResize(this.resize.bind(this))
    view.bindClick(this.clickPost.bind(this))
    view.bindDragTitle(this.dragTitle.bind(this))
    view.bindToggleTitle(this.toggleTitle.bind(this))
    view.bindRemovePost(this.removePost.bind(this))
    view.bindChangeContents(this.changeContents.bind(this))

    view.contextMenu.bindChangeBgColor(this.changeBgColor.bind(this))
    view.contextMenu.bindChangeFontSize(this.changeFontSize.bind(this))
    view.contextMenu.bindChangeFontColor(this.changeFontColor.bind(this))
  }

  resize (width, height) {
    if (width === this.model.width && height === this.model.height) return
    this.model.width = width
    this.model.height = height
    posts.update()
  }

  clickPost() {
    const order = posts.getLastOrder()
    if (order > this.model.order) {
      this.model.order = order + 1
    }
    posts.update()
  }

  dragTitle (top, left) {
    this.model.top = top
    this.model.left = left
    posts.update()
  }

  toggleTitle (expand) {
    this.model.expand = expand
    posts.update()
  }

  removePost () {
    this.model = null
    posts.update()
  }

  changeContents (contents) {
    this.model.content = contents
    posts.update()
  }

  changeBgColor(color) {
    this.model.backgroundColor = color
    posts.update()
  }

  changeFontSize(size) {
    this.model.fontSize = size
  }

  changeFontColor (color) {
    this.model.fontcolor = color
  }
}

