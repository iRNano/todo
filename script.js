
const input = document.querySelector("input[type = text]")
const ul = document.querySelector("ul");
const add = document.querySelector('#add')
const clear = document.querySelector("#clear");

//load items in array if items exists in localstorage else empty array
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];
//Put itemsArray on localStorage
localStorage.setItem('items', JSON.stringify(itemsArray));
//convert strigified localStorage items to js object
const data = JSON.parse(localStorage.getItem('items'));

//Creates list from localStorage
data.forEach(item => {
	createListItem(item);
})

//2 event listeners to add an item - by enter and clicking 'add'
input.addEventListener('keypress', createListByKeypressed);
add.addEventListener('click',createListByAddButton);

function createListByAddButton(){
   if(inputLength() > 0){
   		addItemToLocalStorage();
   		createListItem(input.value);
   } else{
   	alert('Input text');
   }
}

function createListByKeypressed(keyPressed){
	if(inputLength() > 0 && keyPressed.which === 13){
		addItemToLocalStorage();
		createListItem(input.value);
	}else if(input.value.length === 0 && keyPressed.which === 13){
		alert('Input text');
	}
}

//Returns length of text input
function inputLength(){
	return input.value.length;
}

//add text to itemsarray then save it in local storage
function addItemToLocalStorage(){
	itemsArray.push(input.value);
	localStorage.setItem('items', JSON.stringify(itemsArray));
}

//Creates list item
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

	//Add delete button event listener & function
	dBtn.addEventListener('click',deleteListItem);
	function deleteListItem(){
		li.parentNode.removeChild(li);
		for(let i=0; i<itemsArray.length;i++){
			if(itemsArray[i] === item){
				console.log(i);
				console.log(i-1);
				console.log(item);

				itemsArray.splice(i, 1);
				

			}
		}
		localStorage.setItem('items', JSON.stringify(itemsArray));
		
	}

	//Add selected/done/crossedout feature
	li.addEventListener('click',done);
	function done(){
		li.classList.toggle("done");
	}
}

//clear button that clears the localStorage
clear.addEventListener('click', function() {
	localStorage.clear()
	while (ul.firstChild){
		ul.removeChild(ul.firstChild)
	}
});

