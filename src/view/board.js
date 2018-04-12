import $ from 'jquery'
import boardMenu from './boardMenu'
import contextMenu from './contextMenu'

export default {
    $el: $('#board'),
    init () {
        this.bindOnBoardClick()
        // this.bindOnBoardChange()
    },
    bindOnBoardClick () {
        this.$el.mousedown((e) => {
            if ( e.button === 2 ) {
                boardMenu.show(e.pageX, e.pageY)
            } else {
                boardMenu.hide()
                contextMenu.hide()
            }
        })
    },
    // bindOnBoardChange () {
    //     this.el.on('changeBoard', (e) => {
    //         console.log('changeBoard', e)
    //     })
    // }
}