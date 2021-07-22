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

