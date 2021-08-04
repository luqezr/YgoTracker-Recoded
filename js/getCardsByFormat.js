

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
   
