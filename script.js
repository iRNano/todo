
// const input = document.querySelector("input[type = text]")
// const ul = document.querySelector("ul");
// const add = document.querySelector('#add')
// const clear = document.querySelector("#clear");

// //load items in array if items exists in localstorage else empty array
// let itemsArray = localStorage.getItem('items') ?
// JSON.parse(localStorage.getItem('items')) : [];
// //Put itemsArray on localStorage
// localStorage.setItem('items', JSON.stringify(itemsArray));
// //convert stringified localStorage items to js object
// const data = JSON.parse(localStorage.getItem('items'));


// //Creates list from localStorage
// data.forEach(item => {
// 	createListItem(item);
// })

// //2 event listeners to add an item - by enter and clicking 'add'
// input.addEventListener('keypress', createListByKeypressed);
// add.addEventListener('click',createListByAddButton);

// function createListByAddButton(){
//    if(inputLength() > 0){
//    		addItemToLocalStorage();
//    		createListItem(input.value);
//    } else{
//    	alert('Input text');
//    }
// }

// function createListByKeypressed(keyPressed){
// 	if(inputLength() > 0 && keyPressed.which === 13){
// 		addItemToLocalStorage();
// 		createListItem(input.value);
// 	}else if(input.value.length === 0 && keyPressed.which === 13){
// 		alert('Input text');
// 	}
// }

// //Returns length of text input
// function inputLength(){
// 	return input.value.length;
// }

// //add text to itemsarray then save it in local storage
// function addItemToLocalStorage(){
// 	itemsArray.push(input.value);
// 	localStorage.setItem('items', JSON.stringify(itemsArray));
// }

// //A Nested list item creation 
// function createListItem(item){
// 	const li = document.createElement("li");
// 	li.className = "list-group-item";
// 	let textLi = document.createElement("input");
// 	textLi.disabled = true;
// 	textLi.value = item;
// 	textLi.className = "textInput"
// 	textLi.type = "text"
// 	li.appendChild(textLi);
// 	ul.appendChild(li);
// 	input.value = "";
	
// 	//Delete function
// 	//Append delete button
// 	const dBtn = document.createElement("button");
// 	dBtn.appendChild(document.createTextNode("X"));
// 	dBtn.className = "btn"
// 	li.appendChild(dBtn);


// 	dBtn.addEventListener('click',deleteListItem);
// 	function deleteListItem(e){
// 		ul.removeChild(e.target.closest('li'))
// 		itemsArray.splice(Array.prototype.indexOf.call(ul.children, e.target.closest('li')), 1);
// 		localStorage.setItem('items', JSON.stringify(itemsArray));
	
// 	}

// 	//Append edit button
// 	const edtBtn = document.createElement("button");
// 	edtBtn.appendChild(document.createTextNode("Edit"))
// 	edtBtn.className ="btn";
// 	li.appendChild(edtBtn);

// 	//Edit function
// 	edtBtn.addEventListener('click',editListButton);
// 	function editListButton(e){
// 		// console.log(Array.prototype.indexOf.call(li.parentNode.children, this));
// 		textLi.disabled = false;
// 		textLi.focus();
// 		textLi.select();
// 		let index = Array.prototype.indexOf.call(ul.children, e.target.closest('li'));
// 		console.log(index);
// 		textLi.addEventListener('keypress',editTextLi);
// 		function editTextLi(keyPressed){
			
			
// 			// console.log(index);
// 			if(keyPressed.which === 13 && textLi.value.length > 0){
// 				textLi.disabled = true;
// 				itemsArray[index] = textLi.value;
// 			}
// 			localStorage.setItem('items', JSON.stringify(itemsArray));
// 		}

// 	}


// 	//Add selected/done/crossedout feature
// 	li.addEventListener('click',getIndex);
// 	function getIndex(e){

// 	}
// }

 

// //clear button that clears the localStorage
// clear.addEventListener('click', function() {
// 	localStorage.clear()
// 	while (ul.firstChild){
// 		ul.removeChild(ul.firstChild)
// 	}
// });


//UI Module

var UIcontroller = (function(){
	
	var DOMString = {
		taskDescription: '#task-description',
		addTask: '#add',
		todoList: '.todolist',
		input: '#input'	
	};

	return {
		getDOM: function(){
			return DOMString;
		},

		getInput: function(){
			return document.querySelector(DOMString.taskDescription).value;
		},
		addTask: function(input){
			var html, newHTML; 
			html = '<div class="list-item-group"><div><input id="input"type="text" value="%task%" disabled><button id="edit">E</button><button id="delete">X</button></input></div></div>'
			// <div class=\'list-item-group\'></div><div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

			newHTML = html.replace('%task%', input);
			document.querySelector(DOMString.todoList).insertAdjacentHTML('beforeend', newHTML);
		},
		deleteTask: function(target){
			// var index = Array.prototype.indexOf.call(target.parentNode.parentNode.parentNode.children, target.parentNode.parentNode);
			target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
			
		},
		editTask:function(target){
			var input = target.previousSibling;
			// input.toggleAttribute("disabled");
			input.disabled = false;
			input.focus();
			input.select();

			return input;
		},
		clearFields: function(){
			var fields = document.querySelector(DOMString.taskDescription).value = "";
			return fields;
		}
	}

})();

//DATA module

var dataController = (function(){

	var tasks = [];

	return {
		saveTask: function(input){
			tasks.push(input);
			//JSON.stringify converts the array contents to String
			localStorage.setItem('items', JSON.stringify(tasks));
			console.log(localStorage)
		},

		getTasks: function(){
			console.log(tasks);
		},
		deleteTask: function(target){
			//Since todolist length is equal to array length. get index of list item
			var index;
			index = Array.prototype.indexOf.call(target.parentNode.parentNode.parentNode.children, target.parentNode.parentNode);
			//Delete from array
			tasks.splice(index, 1);
			//Update local storage with new array
			localStorage.setItem('items',JSON.stringify(tasks));
		},
		editTask: function(target, value){
			var index;
			index = Array.prototype.indexOf.call(target.parentNode.parentNode.parentNode.children, target.parentNode.parentNode);
			tasks[index] = value;
			localStorage.setItem('items',JSON.stringify(tasks));

		},
		loadLocalStorage: function(){
			//JSON.parse converts stringified data to JS Object
			tasks = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
			
			return tasks;
		}
	}

})();

//CONTROLLER module

var controller = (function(uiCtrl, dataCtrl){

	var setEventListeners = function(){

		var DOM = uiCtrl.getDOM();
		//Event Delegation ??
		document.querySelector(DOM.taskDescription).addEventListener('keypress', function(event){
			if(event.which === 13 || event.keyCode === 13){
				ctrlAddTask();	
			}
		});
		//Assign event listener to a DOM
		document.querySelector(DOM.addTask).addEventListener('click',ctrlAddTask);
		//Event Delegation ??
		document.querySelector(DOM.todoList).addEventListener('click', function(event){
			var command, target;
			command = event.target.id;
			target = event.target;

			if(command === 'edit'){
				ctrlEditTask(target);
			}else if(command === 'delete'){
				ctrlDeleteTask(target);

			}			
		})
	}

	var ctrlAddTask = function(){

		var input;
		input = uiCtrl.getInput();
		console.log(input);

		if(input !== ""){
			dataCtrl.saveTask(input);
			uiCtrl.addTask(input);
			uiCtrl.clearFields();
		}
		
	}

	var ctrlEditTask = function(target){
		//call Edit task of uiCtrl
		var input = uiCtrl.editTask(target);
		console.log(input);

		input.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				input.disabled = true;
				dataCtrl.editTask(target, input.value);
			}
		});


		
	}

	var ctrlDeleteTask = function(target){
		//Delete from array and local storage
		dataCtrl.deleteTask(target);
		//Remove from UI
		uiCtrl.deleteTask(target);
		
		
	}

	var ctrlLoadLocalStore = function(){
		var tasks = dataCtrl.loadLocalStorage();
		tasks.forEach(function(curr){
			uiCtrl.addTask(curr);
		});
		
	}

	return {
		init: function(){
			setEventListeners();
			ctrlLoadLocalStore();
		}
	}

})(UIcontroller, dataController);
controller.init();
