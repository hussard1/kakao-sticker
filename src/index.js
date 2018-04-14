import BoardController from './controller/BoardController';
import BoardView from './views/BoardView'
import Posts from './models/Posts'

new BoardController(new Posts(), new BoardView())

