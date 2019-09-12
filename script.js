
const input = document.querySelector("input[type = text]");
const ul = document.querySelector("ul");
const add = document.querySelector('#add')
const clear = document.querySelector("#clear");
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];


localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


function inputLength(){
	return input.value.length;
}

function createListItem(item){
	const li = document.createElement("li");
	li.className = "list-group-item";
	li.appendChild(document.createTextNode(item));
	ul.appendChild(li);
	input.value = "";


	//Append delete button

	const dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	dBtn.className = "btn"
	li.appendChild(dBtn);

	dBtn.addEventListener('click',deleteListItem);

	function deleteListItem(){
		li.parentNode.removeChild(li);
	}

	//Add selected/done/crossedout feature

	li.addEventListener('click',done);
	function done(){
		li.classList.toggle("done");
	}

}

function addItemToLocalStorage(){
	itemsArray.push(input.value);
	localStorage.setItem('items', JSON.stringify(itemsArray));

	
}
data.forEach(item => {
	createListItem(item);
})
function createListByAddButton(){
   if(input.value.length > 0){
   		console.log("createListByAddButton");
   		addItemToLocalStorage();
   		createListItem(input.value);
   } else{
   	alert('Input text');
   }
}

function createListByKeypressed(keyPressed){
	if(input.value.length > 0 && keyPressed.which === 13){
		console.log("createListByKeypressed");
		addItemToLocalStorage();
		createListItem(input.value);
	}else if(input.value.length === 0 && keyPressed.which === 13){
		alert('Input text');
	}
}

input.addEventListener('keypress', createListByKeypressed);

add.addEventListener('click',createListByAddButton);

clear.addEventListener('click', function() {
	localStorage.clear()
	while (ul.firstChild){
		ul.removeChild(ul.firstChild)
	}
});

