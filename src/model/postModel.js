import _ from 'lodash'
import posts from './postList'

export default {
    id: '',
    expand: true,
    $el: undefined,
    position : {
        left: 0,
        top: 0
    },
    width: 240,
    height: 200,
    content : '',
    order: 0,
    create (top=0, left=0) {
        this.id = _.uniqueId('post_')
        this.setPostPosition(top, left)
        const post = _.clone(this)
        posts.add(post)
        return post
    },
    setPostPosition(top, left) {
        this.position = {
            top,
            left
        }
    },
}