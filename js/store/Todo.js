class TodoStore extends EventTarget {
    constructor() {
        super();

        this.todos = [];
    }

    #save() {
        this.dispatchEvent(new CustomEvent('save'));
    }
    
    addItem(title) {
        this.todos.push({
            title,
            completed: false,
            id: 'id_' + Date.now()
        });

        this.#save();
    }

    removeItem(todo) {
        this.todos = this.todos.filter(_ => _.id !== todo.id );
    }
}

export default TodoStore;