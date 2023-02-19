class TodoStore extends EventTarget {
    constructor() {
        super();

        this.todos = [];
    }

    #save() {
        this.dispatchEvent(new CustomEvent('save'));
    }

    #add(todo) {
        this.dispatchEvent(new CustomEvent('add', {
            detail: { todo }
        }));
    }
    
    addItem(title) {
        const toAdd = {
            title,
            completed: false,
            id: 'id_' + Date.now()
        };
        this.todos.push(toAdd);

        this.#add(toAdd);
        // this.#save();
    }

    removeItem(todo) {
        this.todos = this.todos.filter(_ => _.id !== todo.id );
    }
}

export default TodoStore;