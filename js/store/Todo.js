class TodoStore {
    constructor() {
        super();

        this.todos = [];
    }
    
    addItem(todo) {
        this.todos.push(todo);
    }

    removeItem(todo) {
        this.todos = this.todos.filter(_ => _.id !== todo.id );
    }
}