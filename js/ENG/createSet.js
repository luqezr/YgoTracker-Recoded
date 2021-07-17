
function createSet(set,textValue1,textValue2,textValue3,textValue4,textValue5){
	var visibleSet = Object.values(set)
	setCode = visibleSet [1]
	setQuantity = visibleSet[2]
	setName = visibleSet[0]
	setDate = visibleSet[3]
	setImage = setName.replace(/ /g, "_");
	setImage = setImage.replace(/:/g,"_");

	subContent2.innerHTML+= 
	`
	<div class="sets" id='${setName}'>
		<div class="setGrid" >

			<div class="setImage"> 
				<img src="https://static-3.studiobebop.net/ygo_data/set_images/${setImage}.jpg" alt="set Image" srcset=""> 
			</div>

			<div class='cardInfo'>
			<span onclick='cardSet(this.id)'><h5>${textValue1}<a  style="cursor: pointer" id="${setName}" class='getBySet' href="#"> ${setName} </a><br>${textValue2}${setQuantity}${textValue3}${setCode}${textValue4}${setDate}${textValue5}</h5></span> 
			</div>
		
		</div>
	</div>
	
	`;

		
}