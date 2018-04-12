import _ from 'lodash'
import posts from './postList'

const defaultState = {
    id: '',
    expand: true,
    position: {
        top : 0,
        left : 0
    },
    width: 240,
    height: 200,
    content: '',
    order: 0
}

export default class Post {
    constructor (top, left) {
        _.assignIn(this, defaultState)
        this.create(top, left)
    }

    create (top, left) {
        this.id = this.uniqueId()
        this.setPostPosition(top, left)
        posts.add(this)
    }

    setPostPosition (top = 0, left = 0) {
        this.position = {
            top,
            left
        }
    }

    uniqueId () {
        return Date.now() + Math.floor(Math.random() * 26)
    }
}