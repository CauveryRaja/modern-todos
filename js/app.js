import TodoStore from './store/Todo.js'

const Todos = new TodoStore()

const App = {
    $: {
        formSection: document.querySelector('[data-todo="new"]'),
        list: document.querySelector('[data-todo="list"]'),
        form: document.querySelector('form'),
    },
    showInput(show) {
        this.$.input.style.display = show ? 'block' : 'none';
    },
    showList(show) {
        App.$.list.style.display = show ? 'block' : 'none';
    },
    render() {
        Todos.todos.forEach(todo => {
            const tempStr = `<li>
                <div class="todo">
                    <h3 class="todo-title">${todo.title}</h3>
                </div>
            </li>`;

            App.$.list.insertAdjacentHTML('beforeEnd', tempStr);
        });

        this.showList(true);
    },
    bindEvents() {
        this.$.form.addEventListener('submit', (event) => {
            const formData = new FormData(this.$.form);

            Todos.addItem(formData.get('title'));
            event.preventDefault();
        });

        Todos.addEventListener('save', App.render)
    },
    init() {
        console.log('init...')
        App.bindEvents();
        App.render();
    }
}

console.log('hello', App)
App.init()