import $ from 'jquery'
import post from './post'
import posts from '../model/postList'

export default {
    $el: $('#menu-context'),
    post: {},
    position : {
        top: 0,
        left: 0,
    },
    init () {
        this.bindClickMenu()
    },
    show (x, y) {
        this.setX(x)
        this.setY(y)
        this.$el.show()
    },
    hide (){
        this.$el.hide()
    },
    setX (x) {
        this.$el.css('left', x)
    },
    setY (y) {
        this.$el.css('top', y)
    },
    bindClickMenu () {
        $('#change-bg-color', this.$el).change((e) => {
            this.changeBgColor(e)
        })

        $('#change-font-size', this.$el).change((e) => {
            this.changeFontSize(e)
        })

        $('#change-font-color', this.$el).change((e) => {
            this.changeFontColor(e)
        })
        const $btnExpandEl = $('#btn-expand', this.$el)
        $btnExpandEl.click((e) => {
            if (post.expand) {
                $btnExpandEl.html('접기')
            }
            else {
                $btnExpandEl.html('펼치기')
            }
        })

        $('#btn-remove', this.$el).click((e) => {
            posts.removePost(this.post)
        })
    },
    changeBgColor(e) {
        console.log(e.target.value)
    },
    changeFontSize (e) {
        console.log(e.target.value)
    },
    changeFontColor (e) {
        console.log(e.target.value)
    },
}