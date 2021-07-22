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
