import TodoStore from './store/Todo.js'

const Todos = new TodoStore()

const App = {
    $: {
        formSection: document.querySelector('[data-todo="new"]'),
        list: document.querySelector('[data-todo="list"]'),
        form: document.querySelector('form'),
    },
    showForm(show) {
        this.$.formSection.style.display = show ? 'block' : 'none';
    },
    showList(show) {
        App.$.list.style.display = show ? 'block' : 'none';
    },
    switchTabs() {
        if(window.location.hash === '#add') {
            App.showForm(true);
            App.showList(false);
        }
        else {
            App.showList(true);
            App.showForm(false);
        }
    },
    render() {
        const list = Todos.todos.reduce((acc, todo) => {
            const listItem = document.createElement('li');

            const todoElm = document.createElement('div');
            todoElm.classList.add('todo');

            const heading = document.createElement('h3');
            heading.classList.add('todo-title');
            heading.textContent = todo.title;

            todoElm.appendChild(heading);
            listItem.appendChild(todoElm);

            acc.push(listItem);
            return acc;
        }, []);

        App.$.list.replaceChildren(...list);
        // this.showList(true);
    },
    added(event) {
        const { todo } = event.detail;
        const item = `<li>
                        <div class="todo">
                            <h3 class="todo-title">${todo.title}</h3>
                        </div>
                    </li>`;

        App.$.list.insertAdjacentHTML('beforeend', item);
    },
    bindEvents() {
        this.$.form.addEventListener('submit', (event) => {
            const formData = new FormData(this.$.form);

            Todos.addItem(formData.get('title'));
            event.preventDefault();
        });
        window.addEventListener('hashchange', App.switchTabs);

        Todos.addEventListener('add', App.added);
        Todos.addEventListener('load', App.render);
    },
    init() {
        console.log('init...')
        App.bindEvents();
        App.render();
        App.switchTabs();
    }
}

console.log('hello', App)
App.init()