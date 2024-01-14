class Todo {
	#id;
	#status;
	#text;
	constructor(text, status = 'todo') {
		this.#id = this.uuidv4();
		this.#text = text;
		this.#status = status;
	}
	get status() {
		return this.#status;
	}
	set status(newStatus) {
		let validStatuses = ['todo', 'done', 'hold', 'inProgress'];
		if (validStatuses.includes(newStatus)) this.#status = newStatus;
	}
	get text() {
		return this.#text;
	}
	set text(text) {
		if (text.length > 0) this.#text = text;
	}
	get id() {
		return this.#id;
	}
	set id(newId) {
		this.#id = newId;
	}
	uuidv4() {
		return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		);
	}
}

class HtmlWorker {
	static generateHTML(todo) {
		return `<li class="list-group-item">
					<div
						class="d-flex justify-content-between align-items-center"
					>
						${todo.text}
						<div id=${todo.id}>
							<button onclick='todoDone(event)' type="button" class="btn btn-success">
								Done
							</button>
							<button onclick ='todoUpdate(event)' type="button" class="btn btn-warning">
								Update
							</button>
							<button onclick="todoRemove(event)" type="button" class="btn btn-danger">
								Delete
							</button>
						</div>
					</div>
				</li>`;
	}
	static setHTMLToListElement(container, element) {
		container.innerHTML += this.generateHTML(element);
	}
}
const todoInp = document.querySelector('#todo');
const saveBtn = document.querySelector('#save');
const todoList = document.querySelector('.todo-list');
const modalOpenBtn = document.querySelector('#modalOpener');
const todos = [];
saveBtn.addEventListener('click', function () {
	let todo = new Todo(todoInp.value);
	todos.push(todo);
	HtmlWorker.setHTMLToListElement(todoList, todo);
	todoInp.value = '';
});
function todoDone(event) {
	event.target.parentNode.parentNode.parentNode.classList.add('done');
	let elem = todos.find((elem) => elem.id === event.target.parentNode.id);
	elem.status = 'done';
}
function todoUpdate(event) {
	modalOpenBtn.click();
}
function todoRemove(event) {
	let li = event.target.parentNode.parentNode.parentNode;
	let ul = li.parentNode;
	ul.removeChild(li);
	let index = todos.findIndex(
		(todo) => todo.id === event.target.parentNode.id
	);
	todos.splice(index, 1);
	console.log(todos);
}
