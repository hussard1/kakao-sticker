import _ from 'lodash'

const defaults = {
    id: '',
    expand: true,
    position: {
        top: 0,
        left: 0
    },
    width: 240,
    height: 200,
    content: '',
    order: 0,
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fffb00'
}

export default class Post {

    constructor(top, left, order) {
        _.assignIn(this, defaults)
        this.create(top, left, order)
    }

    create(top = 0, left = 0, order = 0) {
        this.id = this.uniqueId()
        this.position = {
            top,
            left
        }
        this.order = order
    }

    uniqueId() {
        return Date.now() + Math.floor(Math.random() * 26)
    }
}