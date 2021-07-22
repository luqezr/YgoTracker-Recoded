
function getStaples(textValue1, textValue2){
    
    clearScreen()
    resetMoreResults()

    window.location.hash = `/staples`

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes&misc=yes")
    .then( cardInfo => cardInfo.json() )
    .then(data => {	
        //console.log(data);
        results = data;
        subContent1.innerHTML=textValue1
        // subContent1.innerHTML= `${textValue1}${data.data.length}${textValue2}: </span>`;
        
        for (b = 0; b < resultsPerPage ; b++) {
            if (b >= data.data.length){console.log('No more cards!'); return} else {
                whatType(data.data[b])}}
                
    });

    }
   

