var cardID

function createMiniCards(){
	clearScreen()
	for (var b = 0; b < resultsPerPage; b++) {
		//console.log(data[b])
		createMiniCard(results.data[b])}
	}


function createMiniCard(card){


	assignValuesToCard(card)

	if (type == "Trap Card" || type == "Spell Card" ){

		subContent_miniCards.innerHTML+= `			
		
		<div class="miniCard" class="card" class="col-sm" >
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
		</button>

		<div class="modal fade cardModal" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">

						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>

						<img src="${cardImage}" class="card-img-bottom cardImages center" id='${fname}' alt="${name}" >
						
					</div>
					<div class="modal-body">
						<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
									<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' class="close" data-dismiss="modal" aria-label="Close" id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID : <span onclick='getCardID(this.id)'> <a href="#" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
								
							<p class="cardDescription">${desc}</p>
							<p id="${id}_setsTitles"> ${releaseText}</p>
							<table  class="priceTable"  id="${id}_setTable" >
										<tr>
										<th>Set Name</th>
										<th>Rarity</th>
										<th>Code</th>
										<th>Price</th>
										</tr>
									</table>
									<br>
									<div id='prices'>
					
									</div>
								</div>
							
								<div class="modal-footer">
								<div class='shareButton'>
								<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='button.${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span>
								</div>
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				
		`

	} else {
		
		let levelOrRankOrLink="level";

		if (type=="XYZ Monster" || type == "XYZ Pendulum Effect Monster"){ levelOrRankOrLink="rank"}

		if (type=="Link Monster"){ levelOrRankOrLink="link"}

		subContent_miniCards.innerHTML+= `		
		<div class="miniCard" class="card" class="col-sm" >
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
			<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
			</button>

			<div class="modal fade cardModal" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">

							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>

							<img src="${cardImage}" class="card-img-bottom cardImages center" id='${fname}' alt="${name}" >
							
							
						</div>
						<div class="modal-body">
							<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
							<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/media/icons/cardIcons/race/${race}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/media/icons/cardIcons/attribute/${attribute_image}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/media/icons/cardIcons/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'  class="close" data-dismiss="modal" aria-label="Close">  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/media/icons/cardIcons/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/media/icons/cardIcons/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID : <span onclick='getCardID(this.id)'> <a href="#" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
 
							<p class="cardDescription">${desc}</p>
							<p id="${id}_setsTitles"> ${releaseText}</p>
							<table  class="priceTable" id="${id}_setTable" >
								<tr>
								<th>Set Name</th>
								<th>Rarity</th>
								<th>Code</th>
								<th>Price</th>
								</tr>
							</table>
							<br>
							<div id='prices'>
			
							</div>
						</div>

						
						<div class="modal-footer">
						<div class='shareButton'>
						<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='button.${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span> 
						</div>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	
		`
	}
			
	

	if (card_sets[0] !== undefined ){

		
		//sortCardSets();

	card_sets.forEach(function(setName,i){

		for (var b = 0; b < card_sets[0].length ; b++) {
			
			set_code= setName[b].set_code;
			set_name= setName[b].set_name;
			set_price= setName[b].set_price;
			set_rarity= setName[b].set_rarity;
			//console.log(set_code)
		   document.getElementById(id+'_setTable').innerHTML+=`
		   <div onclick='addToCollection(this.id)' style='display:inline'>
			
		 


			<tr>
				<td><span onclick='cardSet(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_name}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_name} </a></span>  </td>
				<td class="setRarity">  ${set_rarity}  </td>
				<td class="setCode" ><span onclick='getCardSetCode(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_code}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_code} </a></span></td> 
				<td class="setPrice"> $${setName[b].set_price}  </td>
				
			</tr>
					
			


		   </div>
		  `
		//   $(document).ready(function(){
		// 	$('[data-toggle="tooltip"]').tooltip();   
		//   })
		}

	 })} else {
		
		  document.getElementById(id+'_setTable').innerHTML = " ";
		  document.getElementById(id+'_setTable').innerHTML+=` `
		}

		
}

