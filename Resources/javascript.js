
// VARIABLES PARA EL FUNCIONAMIENTO
var content = document.getElementById("content");
var subContent1 = document.getElementById("sub-content-1");
var subContent2 = document.getElementById("sub-content-2");
var subContent3 = document.getElementById("sub-content-3");
var subContentDeckPricer = document.getElementById("sub-content-deckPricer")
var textFromFile
var subContent_about = document.getElementById("sub-content-about");
var subContent_advancedMode = document.getElementById("sub-content-advancedMode");
var subContent_miniCards = document.getElementById("sub-content-3-miniCards");
var subContent_filterBar = document.getElementById("sub-content-filterBar");
var images;
var results;
var banlist = "tcg";
var format = "tcg";
var value2;
var yugiohPricesResult;
var allCards;
var scrollingValue = 6000;
var language;
var view;

//  CUANTO VA A CARGAR
var resultsPerPage = 20;
var setsPerPage = 50;
var loadedCards = resultsPerPage
var loadThisManyCards = 12
var moreResults

// LOCALSTORAGE

// SAVE
function save2localStorage(value1, value2) {
  localStorage.setItem(value1, JSON.stringify(value2));
  // console.log(value1 + " was saved with a value of " + value2);
}

// READ
function readLocalStorage(value1) {
  if (localStorage.getItem(value1)) {
    value2 = JSON.parse(localStorage.getItem(value1));
    // console.log("searching '" + value1 + "' with a result of :" + value2);
  } else {
    // console.log("value not found!");
  }
  return value2;
}


// COPY CARD ID

function copyCardID(e){
	e = e || window.event;
	e = e.target || e.srcElement
	//console.log('cardArchetype :' +e.id)
    cardID = e.id
    // document.getElementById('bodyAdv').classList.add('d-none')
	cardShareURL= `${host}#/cardID/${cardID}`
	changeButtonColor(e.id)
	copy(cardShareURL)
}

// CLEAR SCREEN CONTENT

function clearScreen(){
  subContent1.innerHTML=""
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
  subContent_advancedMode.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
  subContentDeckPricer.innerHTML=""
  advancedModeToggle = 1
}

// CLEAR SCREEN FOR VIEW CHANGE

function clearScreenForViewChange(){
  subContent2.innerHTML="";
  subContent_miniCards.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
}


// CLEAR SCREEN CONTENT FOR ADVANCED MODE

function clearScreenForAdvancedMode(){
  subContent1.innerHTML=""
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
  subContentDeckPricer.innerHTML=""
}

// CLEAR CONTENT FOR SETS AND ARCHETYPES

function clearScreenForSetsAndArchetypes(){
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
  subContent_advancedMode.innerHTML=""
  subContent_about.innerHTML=""
  subContentDeckPricer.innerHTML=""
}

// WHAT TYPE OF CARD TO LOAD (CARD, MINI CARD)

var whatType

function changeView () {
  clearScreenForViewChange()
  view++
  if (view > 3) {
    view = 1
    console.log(view)
    whatType = createCard
    save2localStorage("view", view);
    resultsPerPage = 20
    loadThisManyCards = 12

  } else if (view==1) {
    whatType = createCard
    scrollingValue = 6000
    save2localStorage("view", view);
    resultsPerPage = 20
    loadThisManyCards = 12

  } else if (view == 2) {
    whatType = createMiniCard
    scrollingValue = 1000
    save2localStorage("view", view);
    resultsPerPage = 20
    loadThisManyCards = 12

  } else if (view == 3) {
    whatType = createDeck
    scrollingValue = 10
    save2localStorage("view", view);
    resultsPerPage = 40
    loadThisManyCards = 30
    
    loadedCards = resultsPerPage
    view = 0
  }


  if (results.data){
  for (var b = 0; b < resultsPerPage; b++) {
    // whatType(results.data[b])
  
    (async function(){await whatType(results.data[b]); })()
  
  }

    
  // console.log("Current view is set to "+ whatType)
  } else if (!(results.data)){
    for (var b = 0; b < resultsPerPage; b++) {
      // whatType(results[0][b])
    
      (async function(){await whatType(results[0][b]) })()
    }
  }


}



// LOAD MORE CARDS BUTTON

 
var moreCardsbtn = $('#loadMoreCards');

$(window).scroll(function() {
  if ($(window).scrollTop() > scrollingValue) {
    moreCardsbtn.addClass('show');
  } else {
    moreCardsbtn.removeClass('show');
  }
});


// BACK TO TOP BUTTON
 
var btn = $('#back2top');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


// LOAD MORE CARDS


function resetMoreResults(){
  moreResults=0
  loadedCards = resultsPerPage
}

function loadMoreCards(whatType){

  moreResults = loadedCards+loadThisManyCards;

  for (b = loadedCards; b < moreResults ; b++) {

    if (window.location.hash=="#/format/goat" || window.location.hash=="#/format/ocg%20goat" || window.location.hash== "#/format/rush%20duel" || window.location.hash=="#/format/speed%20duel" || window.location.hash=="#/format/duel%20links" || window.location.hash=="#/format/tcg"){
    //  crear variable para cargar las cartas sin modificar results
      whatType(filteredResults[b])
        loadedCards++
        


        } else if (results.data){
          whatType(results.data[b])
          loadedCards++
        }
        
        else if (results[0].length== 20) {
                whatType(allCards.data[b])
                loadedCards++
               } 
                    else if (b = results.data.length){
                      moreCardsbtn.removeClass('show');
                      resetMoreResults()
                      console.log('No more cards!');
                      alert("No more cards!")
                      return
                    } 
          }

        
}


$(document).ready(function () {
    loadHome()
   
  });

function loadHome(){
    // console.log("ready!");
  
    language = readLocalStorage("language");
    view = readLocalStorage("view", view)
    // console.log(language);
  
    if (language == undefined) {
      // default view set as default (1)
      view = 1;
      save2localStorage("view", view);

      language = "ENG";
      // console.log(language);
      loadInEnglish();


      // Ask for default language
      /*
      if (confirm("Load in English?")) {
        language = "ENG";
        // console.log(language);
        loadInEnglish();
        return;
  
      } else if (confirm("Cargar en Español?")) {
        language = "ESP";
        // console.log(language);
        loadInSpanish()
        return;
  
      } else {
        alert("Since you did not select any language it will be set to English, you can change it later in the Configuration Menu")
        language="ENG"
        loadInEnglish()
  
      }
      */

    }
  
    if (language == "ENG") {
      loadInEnglish();
    } else if (language == "ESP") {
      loadInSpanish();
    }
}


// CARGAR PAGINA EN ESPAÑOL

function loadInSpanish() {
    language = "ESP";
    document.documentElement.lang = "es"
    document.getElementById("card_name").setAttribute("placeholder", "Buscar carta por nombre...")
    save2localStorage("language", language);
    // console.log("Cargando página en Español");
    $("#header").load("content/ESP/navBar.html");
    $("#alertPopup").load("content/ESP/alertPopup.html");
    $("#scripts").load("content/ESP/scripts.html");
  }



  
// CARGAR PAGINA EN INGLES

function loadInEnglish() {
    language = "ENG";
    document.documentElement.lang = "en"
    document.getElementById("card_name").setAttribute("placeholder", "Search by card name...")
    save2localStorage("language", language);
    // console.log("Loading page in English");
    $("#header").load("content/ENG/navBar.html");
    $("#alertPopup").load("content/ENG/alertPopup.html");
    $("#scripts").load("content/ENG/scripts.html");
  }


function loadAbout(){
  clearScreen()
  if (language=="ENG"){
    // console.log("loading about in "+language)
    $("#sub-content-about").load("content/ENG/about.html");
    window.location.hash="/about"
  }
    else if (language == "ESP"){
      // console.log("loading about in "+language)
      $("#sub-content-about").load("content/ESP/about.html");
      window.location.hash="/about"
    }
}

whatType = createCard;

function assignValuesToCard(
  card,
  createCard_releaseText_1,
  createCard_releaseText_2_1,
  createCard_releaseText_2_2,
  createCard_releaseText_3_1,
  createCard_releaseText_3_2,
  createCard_releaseText_3_3,
  createCard_banlist_info_unlimited,
  createCard_banlist_info_limited,
  createCard_banlist_info_semi_limited,
  createCard_banlist_info_banned,
  createCard_attribute_spell,
  createCard_attribute_trap
) {
  //console.log(card);
  id = card.id;
  name = card.name;
  //name = name.replace(/\b[a-z]/g,c=>c.toUpperCase())
  name = name.toUpperCase();
  fname = card.fname;
  desc = card.desc;
  type = card.type;
  type_language = card.type;
  type_image = card.type;
  atk = card.atk;
  def = card.def;
  level = card.level;
  level_image = card.level;
  race = card.race;
  race_language = card.race;
  race_image = card.race;
  attribute = card.attribute;
  attribute_language = card.attribute;
  attribute_image = card.attribute;
  link = card.link;
  linkmarker = card.linkmarker;
  linkvale = card.linkval;
  scale = card.scale;
  set = card.set;
  archetype = card.archetype;

  versionCardImageLink=[]

  if (archetype == undefined) {
    archetype = " - ";
  }
  // banlist_info = card.banlist_info

  misc_info = card.misc_info;
  // console.log(misc_info)
  if (misc_info === undefined) {
    releaseText = createCard_releaseText_1;
    konami_id = "-";
  } else {
    konami_id = misc_info[0].konami_id;

    if (misc_info[0].tcg_date == undefined) {
      releaseText = `${createCard_releaseText_2_1}${misc_info[0].ocg_date}${createCard_releaseText_2_2}`;
      if (konami_id === undefined) {
        konami_id = "-";
      }
    }
    if (misc_info[0].tcg_date !== undefined) {
      releaseText = `${createCard_releaseText_3_1}${misc_info[0].ocg_date}${createCard_releaseText_3_2}${misc_info[0].tcg_date}${createCard_releaseText_3_3}`;
    }
    if (
      misc_info[0].tcg_date == undefined &&
      misc_info[0].ocg_date == undefined
    ) {
      releaseText = createCard_releaseText_1;
    }
  }

  // Card Image Big
  if (card.card_images === undefined) {
    cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
  } else {
    cardImage = card.card_images[0].image_url;
  }
  if (images === false) {
    cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
  }

  // Card Image Small https://storage.googleapis.com/ygoprodeck.com/pics_small/
  if (card.card_images === undefined) {
    cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`;
  } else {
    cardImage_small = card.card_images[0].image_url;
  }
  if (images === false) {
    cardImage_small = `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`;
  }


  card_prices = card.card_prices;
  card_sets = [card.card_sets];
  if (def === undefined || def == null) {
    def = " - ";
  }
  if (atk === undefined || atk == null) {
    atk = " - ";
  }
  if (attribute === undefined) {
    attribute = " - ";
  }
  if (level === undefined) {
    level = "LINK -" + card.linkval;
  }
  if (card_prices !== undefined) {
    //cardPrice = ('Amazon price : '+ card_prices[0].amazon_price + '<br>CardMarket price : ' +  card_prices[0].cardmarket_price+ '<br>Ebay price : ' +  card_prices[0].ebay_price + '<br>TCGPlayer price : ' +   card_prices[0].tcgplayer_price +'<br>')
  } else {
    cardPrice = "";
  }

  banlist_info = card.banlist_info;
  // console.log(banlist_info)

  if (banlist_info == undefined) {
    banlist_info = createCard_banlist_info_unlimited;
    banlist_info_image = "Unlimited";
  }

  if (banlist == "tcg") {
    if (banlist_info.ban_tcg) {
      // console.log("existe ban en tcg")
    } else {
      banlist_info = createCard_banlist_info_unlimited;
      banlist_info_image = "Unlimited";
      // console.log("no existe ban en tcg")
    }

    // banlist_info = banlist_info.ban_tcg;
    if (banlist_info == undefined) {
      banlist_info = createCard_banlist_info_unlimited;
      banlist_info_image = "Unlimited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Limited") {
      banlist_info = createCard_banlist_info_limited;
      banlist_info_image = "Limited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Semi-Limited") {
      banlist_info = createCard_banlist_info_semi_limited;
      banlist_info_image = "Semi-Limited";
      // console.log(banlist_info_image)
    } else if (banlist_info.ban_tcg == "Banned") {
      banlist_info = createCard_banlist_info_banned;
      banlist_info_image = "Banned";
      // console.log(banlist_info_image)
    }
  }

  if (banlist == "ocg") {
    banlist_info = banlist_info.ban_ocg;
  }

  if (banlist == "goat") {
    banlist_info = banlist_info.ban_goat;
  }

  if (type == "Spell Card") {
    attribute = createCard_attribute_spell;
    level = "-";
  }
  if (type == "Trap Card") {
    attribute = createCard_attribute_trap;
    level = "-";
  }
}

function createCard(card) {
  assignValuesToCard(
    card,
    createCard_releaseText_1,
    createCard_releaseText_2_1,
    createCard_releaseText_2_2,
    createCard_releaseText_3_1,
    createCard_releaseText_3_2,
    createCard_releaseText_3_3,
    createCard_banlist_info_unlimited,
    createCard_banlist_info_limited,
    createCard_banlist_info_semi_limited,
    createCard_banlist_info_banned,
    createCard_attribute_spell,
    createCard_attribute_trap
  );

  if (type == "Trap Card" || type == "Spell Card") {
    subContent2.innerHTML += `
		<div>
			<div class="card cards" class='showCardInfo' style="width: 100%;">
				<div class="cardGrid" >
					<div class"cardGridIMG"> 

						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
						<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
						</button>

					
					</div>
						<div class='cardInfo'  id='${name}'>
							<h5>${name}</h5>
							<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID :<span onclick='getCardID(this.id)'> <a  style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>

						
								
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


							<div id="${id}_moreInfo"> </div>
					

						</div>
						
					
					</div>
		  
				</div>
			</div>
			
			

			<div class="miniCard" class="card" class="col-sm" >
	

	<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content modalImage">
			<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_image' alt="${name}" data-dismiss="modal" >

			
				</div>
			</div>


		</div>

	`;
  } else {
    let levelOrRankOrLink = "level";

    if (type == "XYZ Monster" || type == "XYZ Pendulum Effect Monster") {
      levelOrRankOrLink = "rank";
    }

    if (type == "Link Monster") {
      levelOrRankOrLink = "link";
    }

    subContent2.innerHTML += `
	<div>
	<div class="card cards" class='showCardInfo' style="width: 100%;">
	<div class="cardGrid" >
	
	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
		</button>

		<div class='cardInfo'  id='${name}'>
		
			<h5>${name}</h5>
			<img src="/media/icons/banStatus/${banlist_info_image}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/media/icons/cardIcons/typeOfCard/${type_image}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/media/icons/cardIcons/race/${race_image}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/media/icons/cardIcons/attribute/${attribute_image}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/media/icons/cardIcons/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a style="cursor: pointer" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/media/icons/cardIcons/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/media/icons/cardIcons/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID :<span onclick='getCardID(this.id)'> <a style="cursor: pointer" class='getCardID' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span>  </span><br>
		
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
			
			<div id="${id}_moreInfo"> </div>

		</div>
	
	</div>
	  
	</div>
</div>
	
<div class="miniCard" class="card" class="col-sm" >
		

		<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content modalImage">
					
					<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_image' alt="${name}" data-dismiss="modal" >
				</div>
			</div>
		</div>
	</div>



</div>

	`;
  }

  if (card_sets[0] !== undefined) {
    card_sets.forEach(function (setName, i) {
      for (var b = 0; b < card_sets[0].length; b++) {
        set_code = setName[b].set_code;
        set_name = setName[b].set_name;
        set_price = setName[b].set_price;
        set_rarity = setName[b].set_rarity;
		

        //console.log(set_code)
        document.getElementById(id + "_setTable").innerHTML += `
		   <div onclick='addToCollection(this.id)' style='display:inline'>
			
		 


			<tr>
			<td><span onclick='cardSet(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_name}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_name} </a></span>  </td>
			<td class="setRarity">  ${set_rarity}  </td>
			<td class="setCode" ><span onclick='getCardSetCode(this.id)'>  <a  style="cursor: pointer" id="${setName[b].set_code}" class='getBySet'  class="close" data-dismiss="modal" aria-label="Close"> ${setName[b].set_code} </a></span></td> 
			<td class="setPrice"> $${setName[b].set_price}  </td>
				

		   </div>
		   
		  `;
      }
	  document.getElementById(id + "_moreInfo").innerHTML += ` 
	  					<div class='moreCardInfo'>
							<a href='https://yugipedia.com/wiki/${id}' target="_blank"> Yugipedia </a> / 
							<a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${konami_id}' target="_blank"> Konami Database </a> / 
							<a href='https://db.ygorganization.com/card#${konami_id}' target="_blank"> Card Rulings </a>
							<br>
							<p>
							Card market: €${card_prices[0].cardmarket_price}* / 
							TCG Player: $${card_prices[0].tcgplayer_price}* / 
							Ebay: $${card_prices[0].ebay_price}* / 
							Amazon: $${card_prices[0].amazon_price}* / 
							Coolstuff Inc: $${card_prices[0].coolstuffinc_price}*
							<br>
							*${lowerPriceText}
							</p>
						
						</div>`
    });
  } else {
    document.getElementById(id + "_setTable").innerHTML = " ";
    document.getElementById(id + "_setTable").innerHTML += ` `;
  }
}

function modifyPriceList(card, set) {
  currentSet = set;
  avg = card.average;
  high = card.high;
  low = card.low;
  oneDay = card.shift.toFixed(3);
  threeDay = card.shift_3.toFixed(3);
  sevenDay = card.shift_7.toFixed(3);
  twentyOneDay = card.shift_21.toFixed(3);
  thirtyDay = card.shift_30.toFixed(3);
  ninetyDay = card.shift_90.toFixed(3);
  ohaeDay = card.shift_180.toFixed(3);
  tsDay = card.shift_365.toFixed(3);
  updated = card.updated_at;

  var listTBody = document.getElementsByClassName("cardInfo");

  // console.log(listTBody)

  listTBody[0].innerHTML += `

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
	`;
}

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
		<div class="miniCardDeck " class="card" class="col-sm" >
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
							
							<div id="${id}_moreInfo"> </div>

						</div>

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
		document.getElementById(id + "_moreInfo").innerHTML += ` 
		<div class='moreCardInfo'>
		  <a href='https://yugipedia.com/wiki/${id}' target="_blank"> Yugipedia </a> / 
		  <a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${konami_id}' target="_blank"> Konami Database </a> / 
		  <a href='https://db.ygorganization.com/card#${konami_id}' target="_blank"> Card Rulings </a>
		  <br>
		  <p>
		  Card market: €${card_prices[0].cardmarket_price}* / 
		  TCG Player: $${card_prices[0].tcgplayer_price}* / 
		  Ebay: $${card_prices[0].ebay_price}* / 
		  Amazon: $${card_prices[0].amazon_price}* / 
		  Coolstuff Inc: $${card_prices[0].coolstuffinc_price}*
		  <br>
		  *${lowerPriceText}
		  </p>
	  
	  </div>`


	 })} else {
		
		  document.getElementById(id+'_setTable').innerHTML = " ";
		  document.getElementById(id+'_setTable').innerHTML+=` `
		}

		
}


var cardID

function createMiniCards(){
	clearScreen()
	for (var b = 0; b < resultsPerPage; b++) {
		//console.log(data[b])
	whatType = createMiniCard
	createMiniCard(results.data[b])}
	$(window).scroll(function() {
		if ($(window).scrollTop() > scrollingValue) {
		  moreCardsbtn.addClass('show');
		} else {
		  moreCardsbtn.removeClass('show');
		}
	  });
	}


function createMiniCard(card,where){

	if (where == "deck") { 
		where = deckMain ; 
		// console.log("main!!")
	}
	if (where == "extra") { 
		where = deckExtra ; 
		// console.log("extra!!")
	}
	if (where == "side") { 
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
		
		<div class="miniCard" class="card" class="col-sm" >
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
		<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
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
		<div class="miniCard" class="card" class="col-sm" >
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
			<img src="${cardImage}" class="card-img-bottom cardImages" id='${id}_imageModal' alt="${name}" >
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
							
							<div id="${id}_moreInfo"> </div>

						</div>

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
		document.getElementById(id + "_moreInfo").innerHTML += ` 
		<div class='moreCardInfo'>
		  <a href='https://yugipedia.com/wiki/${id}' target="_blank"> Yugipedia </a> / 
		  <a href='https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${konami_id}' target="_blank"> Konami Database </a> / 
		  <a href='https://db.ygorganization.com/card#${konami_id}' target="_blank"> Card Rulings </a>
		  <br>
		  <p>
		  Card market: €${card_prices[0].cardmarket_price}* / 
		  TCG Player: $${card_prices[0].tcgplayer_price}* / 
		  Ebay: $${card_prices[0].ebay_price}* / 
		  Amazon: $${card_prices[0].amazon_price}* / 
		  Coolstuff Inc: $${card_prices[0].coolstuffinc_price}*
		  <br>
		  *${lowerPriceText}
		  </p>
	  
	  </div>`


	 })} else {
		
		  document.getElementById(id+'_setTable').innerHTML = " ";
		  document.getElementById(id+'_setTable').innerHTML+=` `
		}

		
}

var allCardNames = []

function searchCardNamesForAutocomplete(){
    
for (let b=0 ; b < allCards.data.length ; b++){
    allCardNames.push(allCards.data[b].name)
}

allCardNames = [...new Set(allCardNames)];
//  console.log(allCardNames)

}



function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        // WHAT HAPPENS IF DOWN KEY PRESSED
        currentFocus++;
        addActive(x);


      } else if (e.keyCode == 38) { 
        // WHAT HAPPENS IF DOWN KEY PRESSED
        currentFocus--;
        addActive(x);

      } else if (e.keyCode == 39) {
        console.log("right key pressed! ")
        closeAllLists(e.target);
        
      } else if (e.keyCode == 13) {
        // WHAT HAPPENS IF ENTER IS PRESSED
        // console.log(addActive(x))
        // console.log("enter pressed, searching")
        closeAllLists(e.target)
        // console.log("Searching : "+cardName)

        var cardName = document.search.fname.value;
        // searchCards(cardName, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)


        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
          
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    // console.log(e.target)
    // console.log("element clicked")
    
});
}

autocomplete(document.getElementById("card_name"), allCardNames);


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



var deck = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };

var rawDeck = {
  creator: [],
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var lowestPriceForDeck = {
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var highetsPriceForDeck = {
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var lowestCardPriceArray = []
var lowestCardPrice
var mainDeckDuplicates 
var extraDeckDuplicates
var sideDeckDuplicates
var deckInfo



function loadDeckPricer() {
  console.log("load deck pricer");
  window.location.hash = `/deckPricer`
  clearScreen();

  subContent1.innerHTML = ` <h2>${deckPricer_chooseDeck}</h2> 
  <input type="file" id="file-input" class="form-control-file" />
  <pre id="contenido-archivo"></pre>
          `;

  subContentDeckPricer.innerHTML=`
  <h3>${deckPricer_dropkYdk}</h3>
  <div id="deck">
    <div id="deck_creator"></div>
    <hr>
    <h2>Main Deck </h2>
    <div id="deck_main"></div>
    <hr>
    <h2>Extra Deck </h2>
    <div id="deck_extra"></div>
    <hr>
    <h2>Side Deck </h2>
    <div id="deck_side"></div>
  </div>
  <button type="button" class="btn btn-secondary btn-lg btn-block" onclick="searchLowestPrices()">Price Breakdown</button>
  <br>
  <br>
  <div id="deck_info">

  </div>


  `

  let area = document.getElementById('sub-content-deckPricer');
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', readFile);
  

            
  document
    .getElementById("file-input")
    .addEventListener("change", leerArchivo, false);
    
}

function searchLowestPrices(){
  deckInfo = document.getElementById("deck_info")
  deckInfo.innerHTML+='<br>-----------------------------------<br>Main Deck'
  searchLowestDeckValue(deck.mainDeck)
  deckInfo.innerHTML+='<br>-----------------------------------<br>Extra Deck'
  searchLowestDeckValue(deck.extraDeck)
  deckInfo.innerHTML+='<br>-----------------------------------<br>Side Deck'
  searchLowestDeckValue(deck.sideDeck)
  deckInfo.innerHTML+='<br>-----------------------------------'
  let decktotalprice = lowestPriceForDeck.mainDeck.reduce((a, b) => a + b, 0);
  let extradecktotalprice = lowestPriceForDeck.extraDeck.reduce((a, b) => a + b, 0);
  let sidedecktotalprice = lowestPriceForDeck.sideDeck.reduce((a, b) => a + b, 0);
  let totalprice = decktotalprice+extradecktotalprice+sidedecktotalprice
  deckInfo.innerHTML+=`<br>Total price for maindeck : ${decktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price for extradeck : ${extradecktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price for sidedeck : ${sidedecktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price : ${totalprice.toFixed(2)}`
  
}

function leerArchivo(e) {
  clearDeck()
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  // console.log(contenido)
  textFromFile = contenido
  createDeckArray()
  
  
  var deckInfo = document.getElementById("deck_info")
  var deckDiv = document.getElementById("deck")
  var deckCreator = document.getElementById("deck_creator")
  var deckMain = document.getElementById("deck_main")
  var deckExtra = document.getElementById("deck_extra")
  var deckSide = document.getElementById("deck_side")
  let cardsInMainDeck
  let cardsInExtraDeck
  let cardsInSideDeck

  if (deck.mainDeck[0] == undefined){
    console.log("No main deck")
    cardsInMainDeck = 0
    } else if (deck.extraDeck[0] == undefined){
      console.log("No extra deck")
      cardsInExtraDeck = 0
    } else if (deck.sideDeck[0] == undefined){
      console.log("No side deck")
      cardsInSideDeck = 0
    }else{
      cardsInMainDeck = deck.mainDeck.length
      cardsInExtraDeck = deck.extraDeck.length
      cardsInSideDeck = deck.sideDeck.length


          deckInfo.innerHTML=`
            ${deckPricer_deckCreator} : ${rawDeck.creator}
            ${deckPricer_mainDeck} (${cardsInMainDeck})
            ${deckPricer_extraDeck} (${cardsInExtraDeck})
            ${deckPricer_sideDeck} (${cardsInSideDeck})
              `

        var cardPrices = document.getElementById("cardPrices")
    }

  mainDeckDuplicates=count_duplicate(deck.mainDeck)
  extraDeckDuplicates=count_duplicate(deck.extraDeck)
  sideDeckDuplicates=count_duplicate(deck.sideDeck)

  getCardsById(rawDeck.mainDeck,"deck","deck","mainDeck")
  getCardsById(rawDeck.extraDeck,"extra","extra","extraDeck")
  getCardsById(rawDeck.sideDeck,"side","side","sideDeck")

}

function createDeckArray() {
    textFromFile = textFromFile.replace("#created by ", "#creator:");
    textFromFile = textFromFile.replace("#main", "#main:");
    textFromFile = textFromFile.replace("#extra", "#extra:");
    textFromFile = textFromFile.replace("!", "#");
    textFromFile = textFromFile.replace(" ", "");
    textFromFile = textFromFile.replace("#side", "#side:");
    // Values From .ydk
    var rawinfo = textFromFile.split("#creator:")
    // console.log(rawinfo[1])
    var rawname = rawinfo[1].split("#main:")
    // console.log("Deck Creator : ", rawname[0])
    var rawmain = rawname[1].split("#extra:")
    // console.log("Main deck : ", rawmain[0])
    var rawextra = rawmain[1].split("#side:")
    // console.log("Extra deck : ", rawextra[0])
    // console.log("Side deck : ", rawextra[1])
    // CREATOR 
    deck.creator = rawname[0].replace(/\r\n/g, "")
    rawDeck.creator = rawname[0].replace(/\r\n/g, "")
    // MAIN DECK
    deck.mainDeck = rawmain[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.mainDeck = deck.mainDeck
    deck.mainDeck = deck.mainDeck.split(",");  //Convert to array
    // EXTRA DECK
    deck.extraDeck = rawextra[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.extraDeck = deck.extraDeck
    deck.extraDeck = deck.extraDeck.split(",");
    // SIDE DECK
    deck.sideDeck = rawextra[1].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.sideDeck = deck.sideDeck
    deck.sideDeck = deck.sideDeck.split(",");


}

function getCardsById(cardIds,where,checkDuplicates,modifyDeckArray){
  resetMoreResults()

  deck = {
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };


	if (checkDuplicates == "deck") { 
		checkDuplicates = mainDeckDuplicates ; 
		// console.log("main!!")
	}
	if (checkDuplicates == "extra") { 
		checkDuplicates = extraDeckDuplicates ; 
		// console.log("extra!!")
	}
	if (checkDuplicates == "side") { 
		checkDuplicates = sideDeckDuplicates ; 
		// console.log("side!!")
	}

  (async function(){
    await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+cardIds+"&misc=yes")
        .then( cardInfo => cardInfo.json() )
        .then(data => {	
            results = data;
            results.data.sort( sortBy );

            for (var b = 0; b < results.data.length; b++) {
              createDeck(results.data[b],where);
              pushToDeck(modifyDeckArray,b)
              for (var c = 1; c < checkDuplicates[results.data[b].id]; c++) { 
                    createDeck(results.data[b],where);
                    pushToDeck(modifyDeckArray,b)
              
                
              }

              // if (checkDuplicates[results.data[b].id] > 1 ){
              //  console.log("Duplicate here!")

              // }
            }
            });

          })();

          deck.mainDeck.sort( sortBy );
          deck.extraDeck.sort( sortBy );
          deck.sideDeck.sort( sortBy );

  }

  // Drag and drop 


function readFile (e) {
  e.preventDefault();
  clearDeck()
  let file = e.dataTransfer.files[0];
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(file);
}

function clearDeck(){
  var deckInfo = document.getElementById("deck_info")
  var deckDiv = document.getElementById("deck")
  var deckCreator = document.getElementById("deck_creator")
  var deckMain = document.getElementById("deck_main")
  var deckExtra = document.getElementById("deck_extra")
  var deckSide = document.getElementById("deck_side")

  deckCreator.innerHTML=""
  deckMain.innerHTML=""
  deckExtra.innerHTML=""
  deckSide.innerHTML=""

}



function count_duplicate(a){
  let counts = {}
 
  for(let i =0; i < a.length; i++){ 
      if (counts[a[i]]){
      counts[a[i]] += 1
      } else {
      counts[a[i]] = 1
      }
     }  
     for (let prop in counts){
         if (counts[prop] >= 2){
            //  console.log(prop + " counted: " + counts[prop] + " times.")
         }
     }
  //  console.log(counts)
   return counts
 }
 
function pushToDeck(modifyDeckArray,b){
  if (modifyDeckArray == "mainDeck") { 
    deck.mainDeck.push(results.data[b]) ; 
    // console.log("main!!")
  } else if (modifyDeckArray == "extraDeck") {  
    deck.extraDeck.push(results.data[b]) ; 
    // console.log("extra!!")
  } else if (modifyDeckArray == "sideDeck") { 
    deck.sideDeck.push(results.data[b]); 
    // console.log("side!!")
  }
}

function searchLowestDeckValue(value){
  deckInfo = document.getElementById("deck_info")
  if (value == deck.mainDeck ) {
        for (let b = 0 ; b < deck.mainDeck.length ; b++ ){
          // console.log(deck.mainDeck[b].card_sets)

            lowestCardPriceArray=[]
            for ( let i = 0 ; i < deck.mainDeck[b].card_sets.length ; i++) { 
            
              if (deck.mainDeck[b].card_sets[i].set_price == 0 ){ 
                // console.log("set price  = 0") 
                continue
               } else {
              lowestCardPriceArray.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))

               }
              // console.log(Math.min(...lowestCardPriceArray));
              // lowestCardPrice = Math.min(...lowestCardPriceArray)
              // console.log("---------------------------------------------------------------")
              // console.log(deck.mainDeck[b].name+ " set de carta numero "+i + " valor $" +deck.mainDeck[b].card_sets[i].set_price)
            
              // lowestPriceForDeck.mainDeck.push(lowestCardPrice)
            }
            // console.log(lowestCardPriceArray)
            // console.log("lowest value for " + deck.mainDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))

            deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.mainDeck[b].id}">${deck.mainDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
            lowestPriceForDeck.mainDeck.push(Math.min(...lowestCardPriceArray))
            
        }


    } else if ( value == deck.extraDeck){

      for (let b = 0 ; b < deck.extraDeck.length ; b++ ){
          lowestCardPriceArray=[]
          for ( let i = 0 ; i < deck.extraDeck[b].card_sets.length ; i++) { 
            if (deck.extraDeck[b].card_sets[i].set_price == 0 ){ 
              // console.log("set price  = 0") 
              continue
             } else {
            lowestCardPriceArray.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))

             }
        
          }
          // console.log(lowestCardPriceArray)
          // console.log("lowest value for " + deck.extraDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))

          deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.extraDeck[b].id}">${deck.extraDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
          lowestPriceForDeck.extraDeck.push(Math.min(...lowestCardPriceArray))
      }


      } else if ( value == deck.sideDeck){

        for (let b = 0 ; b < deck.sideDeck.length ; b++ ){
          lowestCardPriceArray=[]
          for ( let i = 0 ; i < deck.sideDeck[b].card_sets.length ; i++) { 
            if (deck.sideDeck[b].card_sets[i].set_price == 0 ){ 
              // console.log("set price  = 0") 
              continue
             } else {
            lowestCardPriceArray.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))

             }
        
          }
          // console.log(lowestCardPriceArray)
          // console.log("lowest value for " + deck.sideDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))
          
          deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.sideDeck[b].id}">${deck.sideDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
          lowestPriceForDeck.sideDeck.push(Math.min(...lowestCardPriceArray))
      }

        }

 


}


function sortBy( a, b ) {
  if ( a.type < b.type ){
    return -1;
  }
  if ( a.type > b.type ){
    return 1;
  }
  return 0;
}

var archetypesPerPage = 100


function getArchetypeLetter(e){
	e = e || window.event;
	e = e.target || e.srcElement
	// console.log('Archetype Letter:' +e.id)
    archetypeLetter = e.id
    clearScreenForSetsAndArchetypes()
    resetMoreResults()

    var filteredArchetypes = results.filter(result => result.archetype_name[0] == `${archetypeLetter}`);
    //console.log(filteredArchetypes)

    for (b = 0; b < filteredArchetypes.length ; b++) {
        createArchetype(filteredArchetypes[b])
    }

        }

   

function getAllArchetypes(textValue1,textValue2){

    clearScreen()
    
    window.location.hash = '/archetypes'

    
    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/media/wait/wait02.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${searchingText}</h3>
    </div>
    `;


    fetch("https://db.ygoprodeck.com/api/v7/archetypes.php")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        results = data
        
        clearScreen()

        //console.log(searchCryteria)
        //if(data.length > 40){images = confirm("Load Images?") }
        subContent1.innerHTML= `${textValue1}${data.length}${textValue2}`;
        subContent_filterBar.innerHTML = ` 
        <div id="aToM">
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="A" id="A"> A </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="B" id="B"> B </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="C" id="C"> C </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="D" id="D"> D </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="E" id="E"> E </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="F" id="F"> F </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="G" id="G"> G </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="H" id="H"> H </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="I" id="I"> I </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="J" id="J"> J </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="K" id="K"> K </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="L" id="L"> L </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="M" id="M"> M </a> </span>
        </div>
        <div id="nToZ">
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="N" id="N"> N </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="O" id="O"> O </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="P" id="P"> P </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="Q" id="Q"> Q </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="R" id="R"> R </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="S" id="S"> S </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="T" id="T"> T </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="U" id="U"> U </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="V" id="V"> V </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="W" id="W"> W </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="X" id="X"> X </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="Y" id="Y"> Y </a> </span>
        <span onclick='getArchetypeLetter(this.id)'> <a href="#" value="Z" id="Z"> Z </a> </span>
        </div>
    `;


        for (b = 0; b < results.length ; b++) {
            searchCryteria.push(`${results[b]["Set Name"]}`)
        }

        for (b = 0; b < archetypesPerPage && !(b > results.length) ; b++) {
            if (b >= data.length){console.log('No more cards!'); return} else {
                createArchetype(data[b],b)
        
            }}
    });

    }

    

    const searchCryteria = [];

    function getSetLetter(e) {
        e = e || window.event;
        e = e.target || e.srcElement
        setLetter = e.id
        clearScreenForSetsAndArchetypes()
        resetMoreResults()
        var filteredSets = results.filter(result => result.set_name[0] == `${setLetter}`);
    
        for (b = 0; b < filteredSets.length; b++) {
            createSet(filteredSets[b], allSetsText_H1_1,allSetsText_H1_2,allSetsText_H1_3,allSetsText_H1_4,allSetsText_H1_5)
        }
    
    }
    
    
    function getAllSets(textValue1,textValue2) {
    
        clearScreen()
    
        window.location.hash = `/allSets`
    
        subContent2.innerHTML= `
        <div id='wait'>
        <img src="/media/wait/wait_sets.gif" alt="Wait" style="width: '400px'"> 
        <br>
        <h3>${searchingText}</h3>
        </div>
        `;
    
        
        fetch("https://db.ygoprodeck.com/api/v7/cardsets.php")
            .then(cardInfo => cardInfo.json())
            .then(data => {
                results = data
                //console.log(searchCryteria)
                //if(data.length > 40){images = confirm("Load Images?") }
    
                clearScreen()
    
                subContent1.innerHTML = `${textValue1}${data.length}${textValue2}`;
                subContent_filterBar.innerHTML = ` 
                <div id="aToM">
                <span onclick='getSetLetter(this.id)'> <a href="#" value="A" id="A"> A </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="B" id="B"> B </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="C" id="C"> C </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="D" id="D"> D </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="E" id="E"> E </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="F" id="F"> F </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="G" id="G"> G </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="H" id="H"> H </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="I" id="I"> I </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="J" id="J"> J </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="K" id="K"> K </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="L" id="L"> L </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="M" id="M"> M </a> </span>
                </div>
                <div id="nToZ">
                <span onclick='getSetLetter(this.id)'> <a href="#" value="N" id="N"> N </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="O" id="O"> O </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="P" id="P"> P </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="Q" id="Q"> Q </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="R" id="R"> R </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="S" id="S"> S </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="T" id="T"> T </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="U" id="U"> U </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="V" id="V"> V </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="W" id="W"> W </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="X" id="X"> X </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="Y" id="Y"> Y </a> </span>
                <span onclick='getSetLetter(this.id)'> <a href="#" value="Z" id="Z"> Z </a> </span>
                </div>
            `;
    
                for (b = 0; b < results.length; b++) {
                    searchCryteria.push(`${results[b]["Set Name"]}`)
                }
    
                for (b = 0; b < setsPerPage && !(b > results.length); b++) {
                    if (b >= data.length) { console.log('No more cards!'); return } else {
                        createSet(data[b], allSetsText_H1_1,allSetsText_H1_2,allSetsText_H1_3,allSetsText_H1_4,allSetsText_H1_5)
    
                    }
                }
            });
    
    }
    

    function wichBanlist(e){
        e = e || window.event;
        e = e.target || e.srcElement
        //console.log('Banlist for : ' +e.id)
        banlist = e.id
        
    
        getBanlist(banlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)
        
        }
    
    
    function wichBanlistButton(e){
        e = e || window.event;
        e = e.target || e.srcElement
        banlistButton = e.id
        
       filteredResults= results.data.filter(function(card){result.includes(banlistButton)})
    
        // console.log('banlistButton hitted, value ='+ banlistButton+'/ banlist value ='+ banlist)
    
        var filteredBanlist = results.data.filter(result => banlist == `${banlistButton}`);
    
        // console.log(filteredBanlist)
        // console.log(results.data.filter(result => banlist == `${banlistButton}`))
    
        }
    
    
    
    
    function getBanlist(cardvalue,textValue1,textValue2,textValue3){
    
    
        clearScreen()
        resetMoreResults()
    
        window.location.hash = `/banlist/${cardvalue}`
    
    
        subContent2.innerHTML= `
        <div id='wait'>
        <img src="/media/wait/wait_banlist.gif" alt="Wait" style="width: '400px'"> 
        <br>
        <h3>${searchingText}</h3>
        </div>
        `;
    
    
        var banlist = cardvalue
    
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist="+banlist+"&misc=yes")
        .then( cardInfo => cardInfo.json() )
        .then(data => {		
            //console.log(data)
            results = data;
            currentBanlist = data
    
            banlist = banlist.toUpperCase()
    
            clearScreen()
    
            subContent1.innerHTML= `${textValue1}${results.data.length}${textValue2}${banlist}${textValue3}</a></span> `;
    
    
            for (var b = 0; b < resultsPerPage ; b++) {
                whatType(data.data[b])}
                
                
        }
        );
    
    
    
        }
    
        function cardArchetype(e) {
            e = e || window.event;
            e = e.target || e.srcElement;
            archetype = e.id;
            getCardsOfArchetype(archetype, searchingText, getCardArchetype_H1);
            
            
           
          }
          
          function getCardsOfArchetype(cardvalue, value1, value2) {
            resetMoreResults()
            clearScreen();
          
            var cardvalue = archetype;
          
            window.location.hash = `/archetype/${cardvalue}`
          
            
            subContent2.innerHTML = `
              <div id='wait'>
              <img src="/media/wait/wait_archetype.gif" alt="Wait" style="width: '400px'"> 
              <br>
              <h3>${value1}</h3>
              </div>
              `;
          
            fetch(
              "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=" +
                cardvalue +
                "&misc=yes"
            )
              .then((cardInfo) => cardInfo.json())
              .then((data) => {
                clearScreen();
                results = data;
          
          
                subContent1.innerHTML = ` ${results.data.length} ${value2}<span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span> `;
          
                for (var b = 0; b < data.data.length; b++) {
                  whatType(data.data[b]);
                }
              });
          }
         
          
          

function getCardID(e){
	e = e || window.event;
	e = e.target || e.srcElement
	// console.log('cardID:' +e.id)
	var cardId = e.id
	getCardByID(cardId,searchingText)
}




function getCardByID(cardId,textValue1,textValue2){

    window.location.hash = `/searchById/${cardId}`
    
    clearScreen()
    resetMoreResults()

    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/media/wait/wait_.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${textValue1}</h3>
    </div>
    `;

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+cardId+"&misc=yes")
    .then( cardInfo => cardInfo.json() )
    .then(data => {	
        results = data;
        clearScreen()
        whatType(results.data[0])
                
        });

    }
  
    
    function getCardSetCode(e) {
        e = e || window.event;
        e = e.target || e.srcElement;
        // console.log("cardID:" + e.id);
        cardSetCode = e.id;
        getCardBySetCode(cardSetCode);
      }
      
      function getCardBySetCode(cardSetCode,textValue1) {
        clearScreen()
        resetMoreResults()
        // console.log("Get card by set code");
        window.location.hash = `/setcode/${cardSetCode}`;
    
        subContent2.innerHTML= `
        <div id='wait'>
        <img src="/media/wait/wait_.gif" alt="Wait" style="width: '400px'"> 
        <br>
        <h3>${textValue1}</h3>
        </div>
        `;
    
    
        function getYgopricesPrice(cardId) {
              var request = new XMLHttpRequest();
          
              request.open(
                "GET",
                 `http://yugiohprices.com/api/price_for_print_tag/${cardSetCode}`
                //  `https://private-anon-2d909a8f25-yugiohprices.apiary-mock.com/api/price_for_print_tag/${cardSetCode}`
                // `https://private-anon-2d909a8f25-yugiohprices.apiary-proxy.com/api/price_for_print_tag/${cardSetCode}`
                
              );
          
              request.onreadystatechange = function () {
                if (this.readyState === 4) {
                  // console.log('Status:', this.status);
                  // console.log('Headers:', this.getAllResponseHeaders());
                  // console.log('Body:', this.responseText);
                  yugiohPricesResult = JSON.parse(this.responseText);
          
                  // console.log(yugiohPricesResult.data);
                  // console.log(yugiohPricesResult.data.price_data.name);
                  // console.log(yugiohPricesResult.data.price_data.price_data.data.prices)
              
                }
              };
              // console.log(yugiohPricesResult)
              request.send();
    
          
        }
    
    
        getYgopricesPrice();
    
        
    
        fetch(
          "https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=" +
            cardSetCode +
            "&misc=yes"
        )
          .then((cardInfo) => cardInfo.json())
          .then((data) => {
            results = data;
            console.log(results);
            cardName = results.name;
      
            // createCard(data)
      
            // moreSetCardsButton.classList.remove("d-none");
          });
      
        setTimeout(function () {
          fetch(
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
              cardName +
              "&misc=yes"
          )
            .then((cardInfo) => cardInfo.json())
            .then((data) => {
              //console.log(data);
              clearScreen()
              results = data;
              console.log(results);
              console.log(results.data[0])
              whatType(results.data[0]);
    
              function replaceCardImage(){
                currentSetImage = `https://static-3.studiobebop.net/ygo_data/card_variants/${cardSetCode}.jpg`
    
                var previousImage = document.getElementById(`${results.data[0].id}_image`).src 
    
                document.getElementById(`${results.data[0].id}_image`).src = currentSetImage
                document.getElementById(`${results.data[0].id}_imageModal`).src = currentSetImage
    
                var value = document.getElementById(`${results.data[0].id}_image`).src
    
                if (value == "https://static-3.studiobebop.net/ygo_data/card_missing.jpg") {
                console.log("No set image, default image restored") 
                document.getElementById(`${results.data[0].id}_image`).src = previousImage
                document.getElementById(`${results.data[0].id}_imageModal`).src = previousImage
                return
                }
                
              }
               replaceCardImage()
    
              modifyPriceList(yugiohPricesResult.data.price_data.price_data.data.prices,yugiohPricesResult.data.price_data.name);
            });
        }, 1500);
    
        // setTimeout(function () {getCardSupport(results.data[0].name)}, 2000);
        
      }
      
    
    
    
    
    

function wichFormat(e){
	e = e || window.event;
	e = e.target || e.srcElement
	//console.log('Banlist for : ' +e.id)
    format = e.id
	getByFormat(format,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)
}


function getByFormat(format,textValue1,textValue2,textValue3){
    
    clearScreen()
    resetMoreResults()
  
     window.location.hash = `/format/${format}`


     subContent2.innerHTML= `
     <div id='wait'>
     <img src="/media/wait/wait_format.gif" alt="Wait" style="width: '400px'"> 
     <br>
     <h3>${searchingText}</h3>
     </div>
     `;


    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?format=${format}&misc=yes`)
    .then( cardInfo => cardInfo.json() )
    .then(data => {	
        //console.log(data);
        allResults = data;
        results = data;
        format = format.toUpperCase()

        clearScreen()

        subContent1.innerHTML= `${textValue1}${data.data.length}${textValue2}${format}${textValue3}`;

        toggleAdvancedMode ()
        
        for (b = 0; b < resultsPerPage ; b++) {
            if (b >= data.data.length){console.log('No more cards!'); return} 
            else {
                whatType(results.data[b])}}
                
    });
    }
   



    function cardSet(e){
        e = e || window.event;
        e = e.target || e.srcElement
        // console.log('cardSet:' +e.id)
        setName = e.id
        getCardBySet(setName,searchingText,getSetCards_H1)
    }
    
    
    
    function getCardBySet(setName,textSearchValue,textValue1){
    
        clearScreen()
        resetMoreResults()
    
        window.location.hash = `/set/${setName}`
    
    //    document.location.href=`http://yugiohtracker.com/${setName}`
     
        subContent2.innerHTML= `
        <div id='wait'>
        <img src="/media/wait/wait_format.gif" alt="Wait" style="width: '400px'"> 
        <br>
        <h3>${textSearchValue}</h3>
        </div>
        `;
        
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset="+setName+"&misc=yes")
        .then( cardInfo => cardInfo.json() )
        .then(data => {	
    
            clearScreen()
            
                
            // console.log(data);
            results = data;
            setImage = setName.replace(/ /g, "_");
            setImage = setImage.replace(/:/g,"_");
    
            subContent1.innerHTML= ` 
            <div class="setDivHeader-subContent1">
                <div class="setDiv-subContent1">      
                ${data.data.length}${textValue1}<span onclick='cardSet(this.id)'><a href="#" class='getBySet' id='${setName}'>${setName}</a></span>
                </div>
                <div class="setImage-subContent1"> 
                    <div class="setImage cardGridIMG"> 
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${setImage}">
                            <img src="https://static-3.studiobebop.net/ygo_data/set_images/${setImage}.jpg" class="card-img-bottom setImages" id='${setName}'  alt="set Image" srcset=""> 
                    
                        </button>
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
            `
    
            for (b = 0; b < resultsPerPage && !(b > results.data.length) ; b++) {
                if (b >= data.length){console.log('No more cards!'); return} else {
                    whatType(data.data[b])}}
                    
        });
        }
    

        

        
function getStaples(textValue1, textValue2){
    
    clearScreen()
    resetMoreResults()

    window.location.hash = `/staples`


    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/media/wait/wait_staples.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${searchingText}</h3>
    </div>
    `;

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes&misc=yes")
    .then( cardInfo => cardInfo.json() )
    .then(data => {	
        //console.log(data);
        results = data;
        // subContent1.innerHTML= `${textValue1}${data.data.length}${textValue2}: </span>`;
        
        clearScreen()

        subContent1.innerHTML=textValue1
        
        for (b = 0; b < resultsPerPage ; b++) {
            if (b >= data.data.length){console.log('No more cards!'); return} else {
                whatType(data.data[b])}}
                
    });

    }
   


    var searchButton = document.getElementById("send")


    searchButton.addEventListener("click", function getCard(evt) {
      evt.preventDefault();
        var cardName = document.search.fname.value;
    
        // console.log("Searching : "+cardName)
        resetMoreResults()
        searchCards(cardName, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)
    
    })
    
    
    function searchCards(cardName, textValue1,textValue2,textValue3,textValue4) {
      
    
      clearScreen()
    
      window.location.hash = `/search/${cardName}`;
    
    
      subContent2.innerHTML= `
      <div id='wait'>
      <img src="/media/wait/wait0.gif" alt="Wait" style="width: '400px'"> 
      <br>
      <h3>${searchingText}</h3>
      </div>
      `;
    
    
      fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=" +
          cardName +
          "&misc=yes"
      )
        .then((cardInfo) => cardInfo.json())
        .then((data) => {
          results = data;
          // console.log(results)
          
        clearScreen()
        
          subContent1.innerHTML = `<h2>${textValue1} ${results.data.length} ${textValue2}</h2>`;
          for (let b = 0; b <= resultsPerPage; b++) {
            // console.log(results.data[b])
            whatType(results.data[b]);
          }
          if (results.data.length == undefined) {
            //console.log(data)
            subContent1.innerHTML = `<h2>${textValue3}</h2>`;
            subContent2.innerHTML = `
                          <div id='wait'>
                          <img src="/img/error.gif" alt="Wait" style="width: '400px'">
                          <br>
                          <h3>${textValue4}</h3>
                          </div>
                          `;
          }
        });
    }
    
 
    

function searchNewCards(value1,value2){


    clearScreen()
    resetMoreResults()
    // console.log("searching new cards...")
    window.location.hash = '/newCards'

    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/media/wait/wait_newCards.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${searchingText}</h3>
    </div>
    `;
   fetch("https://db.ygoprodeck.com/api/newcards.php")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        clearScreen()
        results=data
        newCardsResults=data
        fetchInfo=true;

        subContent1.innerHTML= `${value1}`;
        for (var b = 0; b < 20 ; b++) {
            let card = [data[0][b]]
            //console.log(card)
            //console.log(card[0])
            whatType(card[0])
        }
        
       
	if (fetchinfo = true ){
        (async function(){  
            await getAllCards()
        })
		// console.log('fetchinfo='+fetchinfo)
        }
        
        });
    


    }


function getAllCards(){
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        //console.log(data)
        data=data
        // results = data;
        allCards = data;
        // console.log(results)
        searchCardNamesForAutocomplete()
     });
     
}


function fetchxRandomCards(howManyToFetch,value1,value2){

    window.location.hash = '/randomCards'
    clearScreen()
    resetMoreResults()
    subContent1.innerHTML= `${value1}`
    howManyToFetch = resultsPerPage
    results=[]
    results[0]=[]
    for (var i = 0; i < howManyToFetch; i++) {
        (async function(){await searchRandomCards(); })()
     }
    return 
}


function searchRandomCards(where){
            
   
    where="https://db.ygoprodeck.com/api/v7/randomcard.php"
    fetch(where)
    .then( cardInfo => cardInfo.json())
    .then(data => {
        //console.log(data)
        results[0].push(data)
        whatType(data)
        fetchRandom=true;
        
})};

function getMoreRandomCards(){
    let x = 10
    for (var i = 0; i < x; i++) {
    searchRandomCards()
     }
    
     
    return 
}




function resolveURL() {

    currentURL = window.location.hash
    host = window.location.host + '/'
    fullURL = host + currentURL
    pathname = window.location.pathname
    hash = window.location.hash

    banlist="tcg"

    getAllCards()

    view = readLocalStorage("view");
    console.log("view = "+view)

    if (view > 3){
        view=1
        save2localStorage("view", view);
    } else if (view==1) {
        whatType = createCard
        scrollingValue = 6000
        console.log("Normal view set as default")
      } else if (view==2) {
        whatType = createMiniCard
        scrollingValue = 1000
        console.log("Mini Card view set as default")
      } else if (view==3) {
        whatType = createDeck
        scrollingValue = 10
        console.log("deck view set as default")
        resultsPerPage = 40
        loadThisManyCards = 30
        loadedCards = resultsPerPage
      }




    if (currentURL == '') {
        searchNewCards(newCards_H1)
    }


    if (hash.includes('search')) {

        // var res = hash.slice(9); //corta #/search/
        var searchedValue = hash.slice(9);
        searchCards(searchedValue, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)
    }


    if (hash.includes('archetype/')) {

        // var res = hash.slice(12); //corta #/archetype/
        var searchedValue = hash.slice(12);
        getCardsOfArchetype(searchedValue, searchingText, getCardArchetype_H1);
    }

    if (hash.includes('setcode/')) {

        // var res = hash.slice(10); //corta #/setcode/
        var searchedValue = hash.slice(10);
        getCardBySetCode(searchedValue)
    }

    if (hash.includes('set/')) {

        // var res = hash.slice(6); //corta #/set/
        var searchedValue = hash.slice(6);

	    setName = searchedValue.replace(/%20/g," ");
        // console.log(searchedValue)
        getCardBySet(setName,searchingText,getSetCards_H1)
    }

    if (hash.includes('customList')) {
        console.log("Load Custom List")
        var searchedValue = hash.slice(13);
        separador = "&"
        cardsToSearch = searchedValue.split(separador);
        customList = cardsToSearch
        console.log(customList)
        // getCustomList()


        
        createListTable()
        
       for (var b = 0; b < (cardsToSearch.length-1); b++) {

            fetch("https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=" + cardsToSearch[b])
                .then(cardInfo => cardInfo.json())
                .then(data => {
                    results = data
                    console.log(results)
                    createList(results)

                })
        };


    }

    if (hash.includes('cardID')) {


        // var res = hash.slice(9); //corta #/cardID/
        var searchedValue = hash.slice(9);
        // console.log(searchedValue)
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + searchedValue)
            .then(cardInfo => cardInfo.json())
            .then(data => {
                results = data
                cardResults.innerHTML = '';
                // console.log(results)
                whatType(results.data[0])

            })
    }



    switch (currentURL) {
        case `#/newCards`:
            console.log("/newCards")
            searchNewCards(newCards_H1)
            break;
        case ``:
            console.log("nothing")
            if (pathname == 'index.html') {
                searchNewCards(newCards_H1)
            }
            break;

            
        case `#/advancedMode`:
            console.log("#/advancedMode")
            
            searchNewCards(newCards_H1)
                
            break;


        case `#/search`:
            console.log("/#/newCards")
            searchNewCards(newCards_H1)
            break;

        case `#/allSets`:
            console.log("/#/allSets")
            getAllSets(getAllSets_H1_1,getAllSets_H1_2)
            break;

        case `#/setCode`:
            console.log("/#/setCode")
            getCardBySetCode(cardvalue)
            //    getAllArchetypes()
            break;
        case `#/set`:
            console.log("/#/setName")
            
            //  getAllArchetypes()
            break;
            
        case `#/about`:
            console.log("/#/about")
            loadAbout()
            //  getAllArchetypes()
            break;

        case `#/archetypes`:
            console.log("/#/archetypes")
            getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2)
            break;

        case `#/getByArchetype`:
            console.log("/#/archetype")
            getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2)
            break;

        case `#/randomCards`:
            console.log("/#/randomCards")
            fetchxRandomCards(resultsPerPage, randomCards_H1)
            break;
        case `#/staples`:
            console.log("/#/staples")
            getStaples(getStaples_H1_1)
            break;

        case `#/format/tcg`:
            console.log("/#/format/tcg")
            Urlformat='tcg'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;

        case `#/format/goat`:
            console.log("/#/format/goat")
            Urlformat='goat'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/ocg%20goat`:
            console.log("/#/ocg%20goat")
            Urlformat='ocg goat'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/rush%20duel`:
            console.log("/#/format/rush%duel")
            Urlformat = 'rush duel'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/speed%20duel`:
            console.log("/#/format/speed%20duel")
            Urlformat='speed duel'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/duel%20links`:
            console.log("/#/format/duel%20links")
            Urlformat='duel links'
            getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;

        case `#/banlist/tcg`:
            console.log("#/banlist/tcg")
            urlBanlist= 'tcg'
            getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            
            break;
        case `#/banlist/ocg`:
            console.log("/#/banlist/ocg")
            urlBanlist= 'ocg'
            getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            break;
        case `#/banlist/goat`:
            console.log("/#/banlist/goat")
            urlBanlist= 'goat'
            getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            break;

        case `#/deckPricer`:
            console.log("deck pricer")
            loadDeckPricer()

            break;
    
    }


}

resolveURL()




    
    
        



