
function createSet(set,b){
	var visibleSet = Object.values(set)
	setCode = visibleSet [1]
	setQuantity = visibleSet[2]
	setName = visibleSet[0]
	setDate = visibleSet[3]
	
	setImage = "img/noimage.jpg"
	subContent2.innerHTML+= 
	`
	<div class="sets" id='${setName}'>
	<div class="setGrid" >
		<div class='cardInfo'>
		<span onclick='cardSet(this.id)'><h5>  <a  style="cursor: pointer" id="${setName}" class='getBySet' href="#"> ${setName} </a> <br> ${setQuantity} cards in this set // Set Code ${setCode} // Released on TCG ${setDate} </h5></span> 
		</div>
	  
	</div>
	</div>
	
	`;

		
}