class StorageManager{
	constructor(){
		this.storage = localStorage;
	}
	getData(key){
		return this.storage.getItem(key);
	}
	setData(key, value){
		this.storage.setItem(key, value);
	}
	deleteData(key){
		this.storage.removeItem(key);
	}
}

const Armazenamento = new StorageManager;

const a = document.querySelector('.button-add');

function addNote(){
	let id = Math.random().toString(36).slice(2, 10);
	let data = new Date();
	Armazenamento.setData(`${id}`, JSON.stringify({
		content: document.querySelector('.input').value,
		createdAt: data,
		id: id
	}));
	document.querySelector(".input").value = '';
	updateTaskViewer();
}

a.addEventListener('click',()=>{
	addNote();
})

a.onsubmit = ()=>{
	addNote();
}


function deletarTask(id){
	console.log('deletando;;;', id)
	Armazenamento.deleteData(id);
	updateTaskViewer();
}

function createTask(obj){
	let div = document.createElement('div');
	div.setAttribute('class', 'task');
	div.innerHTML = `
		<p class="task__content">${obj.content}</p>  
		<p class="task__date">${obj.createdAt}</p>
		<button class="task__delete" onclick=deletarTask('${obj.id}')>DELETAR</button>
	`
	return div;
}

function updateTaskViewer(){
	document.querySelector('.task__viewer').innerHTML = '';
	Object.keys(localStorage).forEach(e=>{
		let obj = JSON.parse(Armazenamento.getData(e));
		let a = createTask(obj);
		document.querySelector('.task__viewer').appendChild(a)
	})
}

updateTaskViewer();
