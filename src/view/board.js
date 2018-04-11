import $ from 'jquery'
import boardMenu from './boardMenu'

export default {
    el: $('#board'),
    init () {
        this.bindOnBoardClick()
    },
    bindOnBoardClick() {
        this.el.mousedown((e) => {
            if( e.button === 2 ) {
                boardMenu.show(e.pageX, e.pageY)
            } else {
                boardMenu.hide()
            }
        })
    }
}