

function getCardID(e){
	e = e || window.event;
	e = e.target || e.srcElement
	// console.log('cardID:' +e.id)
	var cardId = e.id
	getCardByID(cardId,searchingText)
}




function getCardByID(cardId,textValue1,textValue2){
    // window.location.hash = '/searchById'
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
  
    
