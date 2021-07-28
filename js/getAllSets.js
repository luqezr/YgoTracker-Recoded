
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
