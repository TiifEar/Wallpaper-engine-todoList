const listArea 	= document.querySelector('.list')
const content 	= document.getElementsByTagName('.content')
const container = document.getElementsByTagName('.container')

let todoList = []
let localTodo =localStorage.getItem("localTodo")

//Заповнення масиву
if(localTodo){
	todoList = JSON.parse(localTodo)
	todoList.forEach(function (item){
		writeTodo(item.getName, item.getId, item.getCheck)
	})
}

function addNewTodo(){
	let todoText = prompt('Мошу-мошу?')
	if(!todoText){return}
	todoList.push({getName: todoText, getId: todoList.length,  getCheck: false})
	localStorage.setItem("localTodo", JSON.stringify(todoList))
	writeTodo(todoText, todoList.length-1, false)
}

function rewriteList(){
	listArea.innerHTML = '';
	todoList.forEach(function (item){
		writeTodo(item.getName, item.getId, item.getCheck)
	})
}

function writeTodo(getName, getId, getcheck){
	let liItem = document.createElement('li')
	liItem.setAttribute('id', getId)
	let checIco = document.createElement('input')
	let text = document.createElement('p')
	let editIco = document.createElement('img')
	let deletico = document.createElement('img')
	
	
	checIco.type = "checkbox"
	if(getcheck){checIco.setAttribute('checked', 'checked')}
	checIco.classList.add('chaek')
	
	text.innerHTML=getName;
	text.classList.add('text')
	
	editIco.src= "data/edit.png"
	editIco.classList.add('edit')
	
	deletico.src= "data/trash.png"
	deletico.classList.add('delete')
	
	liItem.appendChild(checIco)
	liItem.appendChild(text)
	liItem.appendChild(editIco)
	liItem.appendChild(deletico)
	listArea.prepend(liItem)
}

function editToDo(element){
	let todoText = prompt('Зміна нотатки?', element.previousSibling.textContent)
	if(!todoText){return}
	todoList[element.parentElement.id].getName=todoText
	localStorage.setItem("localTodo", JSON.stringify(todoList))
	rewriteList()
}

function removeToDo(element){
	element.remove(element)
	todoList = todoList.filter(word => word.getId!=element.id);
	let id=0
	todoList.forEach(function(item){item.getId=id; id++})
	rewriteList()
	localStorage.setItem("localTodo", JSON.stringify(todoList));
}

function checkTodo(element){
	if(todoList[element.id].getCheck){todoList[element.id].getCheck=false}
	else{todoList[element.id].getCheck=true}
	localStorage.setItem("localTodo", JSON.stringify(todoList))
}

listArea.addEventListener("click", function (event) {
	const element = event.target
	switch (element.className){
		case 'delete':
			removeToDo(element.parentElement)
			break
		case 'edit':
			editToDo(element)
			break
		case 'chaek':
			checkTodo(element.parentElement)
			break
	}
});
window.addEventListener('click', function(event){if(event.target.className=='container'){addNewTodo();}})