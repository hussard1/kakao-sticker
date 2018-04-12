import { disableBrowerContextMenu } from './view'
import board from './view/board'
import boardMenu from './view/boardMenu'
import posts from './model/postList'

disableBrowerContextMenu()
board.init()
boardMenu.init()
posts.init()

