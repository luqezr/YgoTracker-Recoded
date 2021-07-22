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

    fetch("https://db.ygoprodeck.com/api/v7/archetypes.php")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        results = data
        //console.log(searchCryteria)
        //if(data.length > 40){images = confirm("Load Images?") }
        subContent1.innerHTML= `${textValue1}${data.length}${textValue2}`;
        subContent_filterBar.innerHTML = ` 
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

    
