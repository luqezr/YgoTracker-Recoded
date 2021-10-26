function createDeck(card,where){

	if (where == "deck") { 
		
		var deckMain = document.getElementById("deck_main")
		where = deckMain ; 
		// console.log("main!!")
	}
	if (where == "extra") { 
		var deckExtra = document.getElementById("deck_extra")
		where = deckExtra ; 
		// console.log("extra!!")
	}
	if (where == "side") { 
		var deckSide = document.getElementById("deck_side")
		where = deckSide ; 
		// console.log("side!!")
	}
	if (where == undefined ){ 
		where = subContent_miniCards ; 
		// console.log("subcontent_minicards")
	}


	assignValuesToCard (card, createCard_releaseText_1, createCard_releaseText_2_1,createCard_releaseText_2_2,createCard_releaseText_3_1,createCard_releaseText_3_2,createCard_releaseText_3_3,createCard_banlist_info_unlimited,createCard_banlist_info_limited,createCard_banlist_info_semi_limited,createCard_banlist_info_banned, createCard_attribute_spell,createCard_attribute_trap)

	
	if (type == "Trap Card" || type == "Spell Card" ){

		where.innerHTML+= `		
		<div class="miniCardDeck" class="card" class="col-sm" >
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImagesSmall" id='${id}_imageModal' alt="${name}" >
		</button>

		<div class="modal fade cardModal" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">

					
						<img src="${cardImage}" class="card-img-bottom cardImages center" id='${id}_image' alt="${name}" class="close" data-dismiss="modal" >
						
					</div>
					<div class="modal-body">
						<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
						<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}' data-dismiss="modal" >  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID :<span onclick='getCardID(this.id)'> <a style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span>
						<br>
						
								
							<p class="cardDescription">${desc}</p>
							<p id="${id}_setsTitles"> ${releaseText}</p>
					
									<div id="${id}_moreInfo"> </div>
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

		where.innerHTML+= `
		<div class="miniCardDeck" class="card" class="col-sm" >
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
			<img src="${cardImage}" class="card-img-bottom cardImagesSmall" id='${id}_imageModal' alt="${name}" >
			</button>

			<div class="modal fade cardModal" id="ModalID${id}" class="close" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">

							<img src="${cardImage}" class="card-img-bottom cardImages center" id='${id}_image' alt="${name}" class="close" data-dismiss="modal">
							
							
						</div>
						<div class="modal-body">
							<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
							<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/media/icons/cardIcons/attribute/${attribute_image}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/media/icons/cardIcons/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}' data-dismiss="modal" >  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/media/icons/cardIcons/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/media/icons/cardIcons/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID :<span onclick='getCardID(this.id)'> <a style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
 
							<p class="cardDescription">${desc}</p>
							<p id="${id}_setsTitles"> ${releaseText}</p>
					
							
							<div id="${id}_moreInfo"> </div>

						</div>

						</div>
					</div>
				</div>
			</div>
		</div>

	
		`
	}
			
	


}



