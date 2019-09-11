
const input = document.querySelector("input[type = text]");
const ul = document.querySelector("ul");
const add = document.querySelector('#add')


function inputLength(){
	return input.value.length;
}

function createListItem(){
	var li = document.createElement("li");
	li.className = "list-group-item";
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	input.value = "";

	//Append delete button

	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	dBtn.className = "btn"
	li.appendChild(dBtn);

	dBtn.addEventListener('click',deleteListItem);

	function deleteListItem(){
		li.parentNode.removeChild(li);
	}

	li.addEventListener('click',done);

	function done(){
		li.classList.toggle("done");
	}

}

function createListByAddButton(){
   if(input.value.length > 0){
   		console.log("createListByAddButton");
   		createListItem();
   } else{
   	alert('Input text');
   }
}

function createListByKeypressed(keyPressed){
	if(input.value.length > 0 && keyPressed.which === 13){
		console.log("createListByKeypressed");
		createListItem();
	}else if(input.value.length === 0 && keyPressed.which === 13){
		alert('Input text');
	}
}

input.addEventListener('keypress', createListByKeypressed);

add.addEventListener('click',createListByAddButton);

