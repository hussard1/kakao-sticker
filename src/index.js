import { disableBrowerContextMenu } from './view'
import board from './view/board'
import boardMenu from './view/boardMenu'
import contextMenu from './view/contextMenu'
import posts from './model/postList'

disableBrowerContextMenu()
board.init()
boardMenu.init()
posts.init()
contextMenu.init()

