import BoardView from './views/BoardView'
import Post from './models/Post'
import postStore from "./store/PostStore";

class app {

    constructor() {
        this.store = new postStore()
        this.store.posts = this.proxied(this.store.posts.map(d => {
            return this.proxied(d)
        }))
        this.boardView = new BoardView(this.store)
        this.boardView.addPostOnBoard = this.addPost.bind(this)
    }

    proxied(posts) {
        return new Proxy(posts, this.handler())
    }

    handler() {
        return {
            set: (target, prop, value) => {
                if (prop === 'length') {
                    this.boardView.render()
                }
                target[prop] = value;
                this.store.save()
                console.log({type: 'set', target, prop, value});
                return Reflect.set(target, prop, value);
            }
        }
    }

    addPost(top, height) {
        this.store.add(this.proxied(new Post(top, height, this.store.getLastOrder('order'))))
    }
}

export default new app()
