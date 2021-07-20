function assignValuesToCard (card){
	//console.log(card);
	id = card.id
	name = card.name;
	//name = name.replace(/\b[a-z]/g,c=>c.toUpperCase())
	name = name.toUpperCase()
	fname = card.fname 
	desc = card.desc
	type = card.type
	type_image = card.type
	atk = card.atk
	def = card.def
	level = card.level
	level_image = card.level
	race = card.race
	race_image = card.race
	attribute = card.attribute
	attribute_image = card.attribute
	link = card.link
	linkmarker = card.linkmarker
	linkvale = card.linkval
	scale = card.scale
	set = card.set
	archetype = card.archetype
	if (archetype == undefined){ archetype=' - '}
	banlist_info = card.banlist
	misc_info = card.misc_info
	if (misc_info === undefined){
		releaseText="Esta carta fue anunciada pero aun no ha sido impresa ni en TCG ni en OCG";
	} else { 
			if (misc_info[0].tcg_date == undefined){
			releaseText = `Esta carta fue impresa en OCG el ${misc_info[0].ocg_date} pero todavía no está disponible en TCG` 
		} if (misc_info[0].tcg_date !== undefined){
			releaseText=`Esta carta fue impresa en OCG el ${misc_info[0].ocg_date} y el ${misc_info[0].tcg_date} en TCG y está disponible en los siguientes sets: `
			}
		if (misc_info[0].tcg_date == undefined && misc_info[0].ocg_date == undefined  ){
				releaseText="Esta carta fue anunciada pero todavía no está disponible ni en OCG ni en TCG"
				}
		}
	if (card.card_images === undefined) {cardImage=`https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`} else{cardImage= card.card_images[0].image_url}
	if (images===false) {cardImage=`https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`}
	card_prices= card.card_prices;	
	card_sets= [card.card_sets];
	banlist_info = card.banlist_info
	if (def=== undefined || def == null){
		def=' - '
	}
	if (atk=== undefined || atk == null){
		atk=' - '
	}
	if (attribute=== undefined){
		attribute=' - '
	}
	if (level === undefined){
		level = 'LINK -' + card.linkval
	}
	if (card_prices !== undefined){
		//cardPrice = ('Amazon price : '+ card_prices[0].amazon_price + '<br>CardMarket price : ' +  card_prices[0].cardmarket_price+ '<br>Ebay price : ' +  card_prices[0].ebay_price + '<br>TCGPlayer price : ' +   card_prices[0].tcgplayer_price +'<br>')
	} else { cardPrice = '' }	

	// console.log(banlist_info)
	if (banlist_info == undefined ){
		banlist_info = "Ilimitada";
		banlist_info_image = "Unlimited"

	} 



	if (banlist == "tcg" ){
		banlist_info = banlist_info.ban_tcg;
		if (banlist_info == undefined ){
			banlist_info = "Ilimitada";		
			banlist_info_image = "Unlimited"
			
		} else if (banlist_info == "Limited" ){
		
			banlist_info = "Limitada";
			banlist_info_image = "Limited"
		
			} else if (banlist_info == "Semi-Limited" ){
					
				banlist_info = "Semi-Limitada";
				banlist_info_image = "Semi-Limited"
			
				} else if (banlist_info == "Banned" ){
					
					banlist_info = "Baneada";
					banlist_info_image = "Banned"
				
					}
	 } 

	if (banlist == "ocg" ){
		banlist_info = banlist_info.ban_ocg;
		banlist_info_image = banlist_info
	} 

	
	if (banlist == "goat" ){
	} 

	if (type=='Spell Card'){
		attribute = 'Magia'
		level= '-'
	}
	if (type == 'Trap Card'){
		attribute = 'Trampa'
		level= '-'
	}

}


function createCard(card){

assignValuesToCard(card)

if (type == "Trap Card" || type == "Spell Card" ){

	subContent2.innerHTML+= `
		<div>
			<div class="card cards" class='showCardInfo' style="width: 100%;">
				<div class="cardGrid" >
					<div class"cardGridIMG"> 

						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
						<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
						</button>

					
					</div>
						<div class='cardInfo'  id='${name}'>
							<h5>${name}</h5>
							<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Arquetipo : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID :<span onclick='getCardID(this.id)'> <a href="#" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>

							
						<p class="cardDescription">${desc}</p>


						
						<p id="${id}_setsTitles"> ${releaseText}</p>
						<table  class="priceTable"  id="${id}_setTable" >
								<tr>
								<th>Set</th>
								<th>Rareza</th>
								<th>Código</th>
								<th>Precio</th>
								</tr>
							</table>
							<br>
							<div id='prices'>
			
							</div>
						</div>
					
					</div>
		  
				</div>
			</div>
			
			

			<div class="miniCard" class="card" class="col-sm" >
	

	<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content modalImage">
				<div class="modal-header">
				
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
					<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
					
				</div>
				
				<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>

					</div>
				</div>
			</div>


		</div>

	`

} else {
	
	let levelOrRankOrLink="level";

	if (type=="XYZ Monster" || type == "XYZ Pendulum Effect Monster"){ 
		levelOrRankOrLink="rank";
	}

	if (type=="Link Monster"){ 
		levelOrRankOrLink="link"
	}

	subContent2.innerHTML+= `
	<div>
	<div class="card cards" class='showCardInfo' style="width: 100%;">
	<div class="cardGrid" >
	
	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
		</button>

		<div class='cardInfo'  id='${name}'>
		
			<h5>${name}</h5>
			<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/media/icons/cardIcons/attribute/${attribute_image}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/media/icons/cardIcons/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Arquetipo : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/media/icons/cardIcons/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/media/icons/cardIcons/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID :<span onclick='getCardID(this.id)'> <a href="#" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
		
			<p class="cardDescription">${desc}</p>
			<p id="${id}_setsTitles"> ${releaseText}</p>
			<table class="priceTable" id="${id}_setTable" >
			<tr>
			<th>Set</th>
			<th>Rareza</th>
			<th>Código</th>
			<th>Precio</th>
			</tr>
			</table>
			<br>
			<div id='prices'>
			</div>
		</div>
	
	</div>
	  
	</div>
</div>
	
<div class="miniCard" class="card" class="col-sm" >
		

		<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content modalImage">
					<div class="modal-header">
					
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
						<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
						
					</div>
				
					<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>



</div>

	`
}
		

if (card_sets[0] !== undefined ){


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
	}

 })} else {
	
	 document.getElementById(id+'_setTable').innerHTML = " ";
	 document.getElementById(id+'_setTable').innerHTML+=` `
	}

}



function modifyPriceList(card,set){
	currentSet=set
	avg=card.average
	high=card.high
	low=card.low
	oneDay=card.shift.toFixed(3);
	threeDay=card.shift_3.toFixed(3);
	sevenDay=card.shift_7.toFixed(3);
	twentyOneDay=card.shift_21.toFixed(3);
	thirtyDay=card.shift_30.toFixed(3);
	ninetyDay=card.shift_90.toFixed(3);
	ohaeDay=card.shift_180.toFixed(3);
	tsDay=card.shift_365.toFixed(3);
	updated=card.updated_at



	var listTBody= document.getElementsByClassName("cardInfo");

	console.log(listTBody)
	
	listTBody[0].innerHTML+=`

	<p>Price Shift for <span onclick='cardSet(this.id)'>  <a  style="cursor: pointer" id="${currentSet}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close">${currentSet}</a>, updated at ${updated}</p>
	<thead >		
	<table >
								<tr>
								<th>Average</th>
								<th>High</th>
								<th>Low</th>
								</tr>
												
  </thead>
  <tbody>
								<tr>
								<td>$${avg}</td>
								<td>$${high}</td>
								<td>$${low}</td>
								</tr>
			
			</table>
			<br>
			<table>
								<tr>
								<th>1 Day</th>
								<th>3 Days</th>
								<th>7 Days</th>
								<th>21 Days</th>
								</tr>
								<tr>
								<td>$${oneDay}</td>
								<td>$${threeDay}</td>
								<td>$${sevenDay}</td>
								<td>$${twentyOneDay}</td>
								</tr>
								</table>
								<br>
								<table>
								<tr>
								<th>30 Days</th>
								<th>90 Days</th>
								<th>180 Days</th>
								<th>365 Days</th>
								</tr>
								<tr>
								<td>$${thirtyDay}</td>
								<td>$${ninetyDay}</td>
								<td>$${ohaeDay}</td>
								<td>$${tsDay}</td>
								</tr>

	  </table>
	`



}