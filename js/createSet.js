
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
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${setImage}">
					<img src="https://static-3.studiobebop.net/ygo_data/set_images/${setImage}.jpg" class="card-img-bottom setImages" id='${setName}'  alt="set Image" srcset=""> 
			
				</button>
			</div>

			<div class='cardInfo'>
			<span onclick='cardSet(this.id)'><h5>${textValue1}<a  style="cursor: pointer" id="${setName}" class='getBySet' href="#"> ${setName} </a><br>${textValue2}${setQuantity}${textValue3}${setCode}${textValue4}${setDate}${textValue5}</h5></span> 
			</div>
		

			<div class="modal fade modalCardImage" id="ModalID${setImage}" class="close" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content modalImage">
						
						<img src="https://static-3.studiobebop.net/ygo_data/set_images/${setImage}.jpg" class="card-img-bottom setImages" id='${setName}' alt="${name}" class="close" data-dismiss="modal">

					</div>
				</div>
			</div>

		</div>
	</div>
	
	`;

		
}