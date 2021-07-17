function cardSet(e){
	e = e || window.event;
	e = e.target || e.srcElement
	console.log('cardSet:' +e.id)
	setName = e.id
	getCardBySet(setName,searchingText,getSetCards_H1)
}



function getCardBySet(setName,textSearchValue,textValue1){

    clearScreen()

//    document.location.href=`http://yugiohtracker.com/${setName}`
 
    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/img/wait/wait04.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${textSearchValue}</h3>
    </div>
    `;
    
function getYgopricesPrice(setName){
    var request = new XMLHttpRequest();

request.open('GET', `http://yugiohprices.com/api/price_for_print_tag/${setName}`);

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    // console.log('Status:', this.status);
    // console.log('Headers:', this.getAllResponseHeaders());
    // console.log('Body:', this.responseText);
    yugiohPricesResult = this.responseText
  }

};

request.send();
console.log(yugiohPricesResult)
}

getYgopricesPrice()

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset="+setName+"&misc=yes")
    .then( cardInfo => cardInfo.json() )
    .then(data => {	

        clearScreen()
        // window.location.hash = `/set/${setName}`
        
        	
        console.log(data);
        results = data;
        setImage = setName.replace(/ /g, "_");
        setImage = setImage.replace(/:/g,"_");

        subContent1.innerHTML= ` 
        <div class="setDivHeader-subContent1">
            <div class="setDiv-subContent1">      
            ${data.data.length}${textValue1}<span onclick='cardSet(this.id)'><a href="#" class='getBySet' id='${setName}'>${setName}</a></span>
            </div>
		    <div class="setImage-subContent1"> 
                <img src="https://static-3.studiobebop.net/ygo_data/set_images/${setImage}.jpg" alt="set Image" srcset=""> 
            </div>
        </div>
        `

        for (b = 0; b < resultsPerPage && !(b > results.data.length) ; b++) {
            if (b >= data.length){console.log('No more cards!'); return} else {
                createCard(data.data[b])}}
                
    });
    }

