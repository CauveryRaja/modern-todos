const Todos = new TodoStore()

const App = {
    $: {
        input: document.querySelector('[data-todo="new"]'),
        list: document.querySelector('[data-todo="list"]'),
    },
    showInput(show) {
        this.$.input.style.display = show ? 'block' : 'none';
    },
    showList(show) {
        App.$.list.style.display = show ? 'block' : 'none';
    },
    render() {
        Todos.forEach(todo => {
            const tempStr = `<li>
                <div class="todo">
                    <h3 class="todo-title">${todo.title}</h3>
                </div>
            </li>`;

            $.listElm.insertAdjacentHTML('beforeEnd', tempStr);
        });

        this.showList(true);
    },
    init() {
        App.render();
    }
}

console.log('hello', App)
App.init()