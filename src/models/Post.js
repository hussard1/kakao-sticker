import _ from 'lodash'
import posts from './Posts'

const defaults = {
    id: '',
    expand: true,
    position: {
        top : 0,
        left : 0
    },
    width: 240,
    height: 200,
    content: '',
    order: 0,
    color: 'black',
    fontSize: 12,
    backgroundColor: 'yellow'
}

export default class Post {

    constructor (top, left) {
        _.assignIn(this, defaults)
        this.create(top, left)
    }

    create (top = 0, left = 0) {
        this.id = this.uniqueId()
        this.position = {
            top,
            left
        }
        // this.order = posts.getLastOrder() + 1
    }

    uniqueId () {
        return Date.now() + Math.floor(Math.random() * 26)
    }
}