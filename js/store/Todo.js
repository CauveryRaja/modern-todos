class TodoStore extends EventTarget {
    constructor() {
        super();

        this.todos = [];
        this.#load();
    }

    #load() {
        const fromStorage = localStorage.getItem('todos');
        if(fromStorage) {
            this.todos = JSON.parse(fromStorage);
        }
        else {
            localStorage.setItem('todos', '[]')
        }

        this.dispatchEvent(new CustomEvent('load'));
    }

    #add(todo) {
        localStorage.setItem('todos', JSON.stringify(this.todos))
        
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
    }

    removeItem(todo) {
        this.todos = this.todos.filter(_ => _.id !== todo.id );
    }
}

export default TodoStore;