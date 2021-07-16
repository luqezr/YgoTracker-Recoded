
function createArchetype(set,b){
	
	var visibleSet = Object.values(set)
	setQuantity = visibleSet [1]
	archetype = visibleSet[0]
	subContent2.innerHTML+= 
	`
	<div class="archetype" id='${archetype}'>
	<div class="archetypeGrid" >
		<div class='cardInfo'>
		<span onclick='cardArchetype(this.id)'><h5>  <a id="${archetype}" class='getBySet' href="#"> ${archetype} </a> </h5></span> 
		</div>
	  
	</div>
	</div>
	
	`;



		
}
