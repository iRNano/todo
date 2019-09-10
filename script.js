
const input = document.querySelector("input[type = text]");
const ul = document.querySelector("ul");
const add = document.querySelector('#add')


function inputLength(){
	return input.value.length;
}

function createListByAddButton(){
   if(input.value.length > 0){
   		console.log("createListByAddButton");
   } else{
   	alert('Input text');
   }
}

function createListByKeypressed(keyPressed){
	if(input.value.length > 0 && keyPressed.which === 13){
		console.log("createListByKeypressed");
	}else if(input.value.length === 0 && keyPressed.which === 13){
		alert('Input text');
	}
}

input.addEventListener('keypress', createListByKeypressed);

add.addEventListener('click',createListByAddButton);

