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
console.log(a)



a.addEventListener('click',()=>{
	let id = Math.random().toString(36).slice(2, 10);
	Armazenamento.setData(`${id}`, JSON.stringify({
		content: document.querySelector('.input').value,
		createdAt: new Date(),
		id: id
	}));
	updateTaskViewer();
})



function deletarTask(id){
	console.log('deletando;;;', id)
	Armazenamento.deleteData(id);
	updateTaskViewer();
}

function createTask(obj){
	let div = document.createElement('div');
	div.setAttribute('class', 'task');
	div.innerHTML = `
		<p>${obj.content}  <span class="task__date">${obj.createdAt}</span></p>
		<button onclick=deletarTask('${obj.id}')>delete</button>
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


