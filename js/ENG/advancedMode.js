var filterBarSettings
var monsterFilterSettings 
var spellFilterSettings 
var trapFilterSettings  

var filterAll 
var filterMonster
var filterSpell 
var filterTrap 
var raceParameter ; 
var levelParameter;
var AttributeParameter;

var monsterCardType = undefined ;
var levelOfCard = undefined; 
var raceOfMonsterCard = undefined;
var attributeOfMonsterCard = undefined ;
var raceOfSpellCard = undefined;
var raceOfTrapCard = undefined;
var atkParameter=undefined;
var defParameter=undefined;
var results2filter


// LOAD IN AND OUT ADVANCED MODE 

var advancedModeToggle = 1

function toggleAdvancedMode () {

  advancedModeToggle++

  if (advancedModeToggle==1) {
    
    subContent_advancedMode.innerHTML=``

  } else if (advancedModeToggle==2) {
    loadAdvancedMode()
    advancedModeToggle = 0
  }

  }




function loadAdvancedMode(){
  

  clearScreenForAdvancedMode();

  for (let b = 0; b < resultsPerPage; b++) {
    // console.log(results.data[b])
    createCard(allCards.data[b]);
  }
  
  if (window.location.hash=="#/format/goat" || window.location.hash=="#/format/ocg%20goat" || window.location.hash== "#/format/rush%20duel" || window.location.hash=="#/format/speed%20duel" || window.location.hash=="#/format/duel%20links"){
    console.log("format filtering")
    console.log(window.location.hash)
    results2filter = results
      }  else {
        results2filter = allCards
        console.log(window.location.hash)
        console.log("results =allcards")
        }

    for (let b = 0; b < resultsPerPage; b++) {
      // console.log(results.data[b])
      whatType(results2filter.data[b]);
          }

  subContent_advancedMode.innerHTML=`
  <div id="advancedSearchBar">
  <!-- <div class="buttonFilters">
    
  <button onclick="sortBy('type')" class="btn btn-dark mb-2">Sort by Type</button>
  <button onclick="sortBy('type')" class="btn btn-dark mb-2">Sort by Inverted Type</button>
  <button onclick="sortBy('atk')" class="btn btn-dark mb-2">Sort by Lower ATK</button>
  <button onclick="sortByInverted('atk')" class="btn btn-dark mb-2">Sort by Higher ATK</button>
  <button onclick="sortBy('def')" class="btn btn-dark mb-2">Sort by Lower DEF</button>
  <button onclick="sortByInverted('def')" class="btn btn-dark mb-2">Sort by Higher DEF</button>
  <button onclick="sortBy('level')" class="btn btn-dark mb-2">Sort by Lower Level</button>
  <button onclick="sortByInverted('level')" class="btn btn-dark mb-2">Sort by Higher Level</button>
  
  </div> -->


  <form action="">
  <div id="typeOf">
    <label class="mr-sm-2" for="typeOfCard">Type of Card (multiple checks doesn't work yet!)</label><br>
    <div id="typeOfCard" class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="All" value="All" checked> 
      <label class="form-check-label" for="All">All </label>
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="Monster" value="Monster">
      <label class="form-check-label" for="Monster">Monster </label>
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="SpellCard" value="Spell Card">
      <label class="form-check-label" for="SpellCard">Spell Card </label>
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="TrapCard" value="Trap Card">
      <label class="form-check-label" for="TrapCard">Trap Card </label>
    </div>

  </div>
  </form>
  
  <div id="monsterFilters">

  </div>

  <div id="trapFilters">

  </div>

  <div id="spellFilters">

  </div>






  


  <div id="desc">
    <div class="form-inline">
      <label for="formGroupExampleInput">Name / Effect / Description of card</label>
      <input type="text" class="form-control col-12" id="descForm" vplaceholder="Text or Name of the card (case sensitive)">
    </div>
  </div>

  <br>


  <button onclick="filterResults()" class="btn btn-dark mb-2">Search!</button>

  </div>
  `
    filterBarSettings = document.getElementById("advancedSearchBar")
    monsterFilterSettings = document.getElementById("monsterFilters")
    spellFilterSettings = document.getElementById("spellFilters")
    trapFilterSettings = document.getElementById("trapFilters")
    
    filterAll = document.querySelector("input[id=All]");
    filterMonster = document.querySelector("input[id=Monster]");
    filterSpell = document.querySelector("input[id=SpellCard]");
    filterTrap = document.querySelector("input[id=TrapCard]");
    


    filterAll.addEventListener( 'change', function() {
      if(this.checked) {
          // radio is checked..
          
          typeParameter="All"
          spellFilterSettings.innerHTML=``;
          trapFilterSettings.innerHTML=``;
          monsterFilterSettings.innerHTML=``;
      } else {
             // radio is not checked..
          spellFilterSettings.innerHTML=``;
          trapFilterSettings.innerHTML=``;
          monsterFilterSettings.innerHTML=``;
             typeParameter = undefined;
          }
    });
    
    
    filterSpell.addEventListener( 'change', function() {
      if(this.checked) {
          // radio is checked..
          
          typeParameter="Spell Card"
          console.log("its a spell " +typeParameter)
          spellFilterSettings.innerHTML=``;
          trapFilterSettings.innerHTML=``;
          monsterFilterSettings.innerHTML=``;
    
          spellFilterSettings.innerHTML=`
          <form>
              <div id="typeOfSpell">
              <label class="mr-sm-2" for="inlineFormCustomSelect">Type of Spell</label><br>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="NormalSpell" value="Normal">
              <label class="form-check-label" for="NormalSpell"><img src="/media/icons/cardIcons/race/Normal.png" for="NormalSpell"> Normal </label>
              </div>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="ContinuousSpell" value="Continuous">
              <label class="form-check-label" for="ContinuousSpell"> <img src="/media/icons/cardIcons/race/Continuous.png" for="ContinuousSpell"> Continuous</label>
              </div>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="Field" value="Field">
              <label class="form-check-label" for="Field"> <img src="/media/icons/cardIcons/race/Field.png" for="Field"> Field</label>
              </div>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="Quick-Play" value="Quick-Play">
              <label class="form-check-label" for="Quick-Play"><img src="/media/icons/cardIcons/race/Quick-Play.png" for="Quick-Play"> Quick-Play  </label>
              </div>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="Ritual" value="Ritual">
              <label class="form-check-label" for="Ritual"><img src="/media/icons/cardIcons/race/Ritual.png" for="Ritual"> Ritual  </label>
              </div>
              <div class="form-check form-check-inline">
              <input class="form-check-input raceOfSpell" type="radio" name="inlineRadioOptions" id="Equip" value="Equip">
              <label class="form-check-label" for="Equip"><img src="/media/icons/cardIcons/race/Equip.png" for="Equip"> Equip </label>
              </div>
          </div>
          </form>
          `
      } else {
             // radio is not checked..
          spellFilterSettings.innerHTML=``;
          trapFilterSettings.innerHTML=``;
          monsterFilterSettings.innerHTML=``;
             typeParameter = undefined;
          }
    });
    
    filterTrap.addEventListener( 'change', function() {
        if(this.checked) {
            // radio is checked..
            
            typeParameter="Trap Card"
    
            console.log("its a trap " +typeParameter)
            spellFilterSettings.innerHTML=``;
            trapFilterSettings.innerHTML=``;
            monsterFilterSettings.innerHTML=``;
            
            trapFilterSettings.innerHTML=`
            <form>   
                <div id="typeOfTrap">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Type of Trap</label><br>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfTrap" type="radio" name="inlineRadioOptions" id="NormalTrap" value="Normal">
                <label class="form-check-label" for="NormalTrap"> <img src="/media/icons/cardIcons/race/Normal.png" for="NormalTrap" > Normal</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfTrap" type="radio" name="inlineRadioOptions" id="ContinuousTrap" value="Continuous">
                <label class="form-check-label" for="ContinuousTrap"><img src="/media/icons/cardIcons/race/Continuous.png" for="ContinuousTrap"> Continuous </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfTrap" type="radio" name="inlineRadioOptions" id="Counter" value="Counter">
                <label class="form-check-label" for="Counter"><img src="/media/icons/cardIcons/race/Counter.png" for="Counter"> Counter </label>
                </div>
                </div>
            </form>
            `
            
        } else {
            // radio is not checked..
            
            spellFilterSettings.innerHTML=``;
            trapFilterSettings.innerHTML=``;
            monsterFilterSettings.innerHTML=``;
    
            typeParameter = undefined;
       }
    });
    
    filterMonster.addEventListener( 'change', function() {
        if(this.checked) {
            // radio is checked..
            
            typeParameter = "Monster";
    
    
    
            spellFilterSettings.innerHTML=``;
            trapFilterSettings.innerHTML=``;
            monsterFilterSettings.innerHTML=``;
    
            monsterFilterSettings.innerHTML=`
                  <form>
                    <div id="type">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">TYPE</label><br>
                    
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Normal Monster" id="NormalMonster" >
                    <label class="form-check-label" for="NormalMonster"><img src="/media/icons/cardIcons/typeOfCard/Normal Monster.jpg" for="NormalMonster"> Normal Monster </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Normal Tuner Monster" id="NormalTunerMonster" >
                    <label class="form-check-label" for="NormalTunerMonster"><img src="/media/icons/cardIcons/typeOfCard/Normal Tuner Monster.jpg" for="NormalTunerMonster"> Normal Tuner Monster </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"  value="Effect Monster" id="EffectMonster" >
                    <label class="form-check-label" for="EffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Effect Monster.jpg" for="EffectMonster"> Effect Monster </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Flip Effect Monster" id="FlipEffectMonster">
                    <label class="form-check-label" for="FlipEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Flip Effect Monster.jpg" for="FlipEffectMonster"> Flip </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"  value="Gemini Monster" id="GeminiMonster">
                    <label class="form-check-label" for="GeminiMonster"><img src="/media/icons/cardIcons/typeOfCard/Gemini Monster.jpg" for="GeminiMonster"> Gemini</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Tuner Monster" id="TunerMonster">
                    <label class="form-check-label" for="TunerMonster"><img src="/media/icons/cardIcons/typeOfCard/Tuner Monster.jpg" for="TunerMonster"> Tuner</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"value="Union Effect Monster" id="UnionEffectMonster" >
                    <label class="form-check-label" for="UnionEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Union Effect Monster.jpg" for="UnionEffectMonster"> Union </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Spirit Monster" id="SpiritMonster" >
                    <label class="form-check-label" for="SpiritMonster"><img src="/media/icons/cardIcons/typeOfCard/Spirit Monster.jpg" for="SpiritMonster"> Spirit </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Toon Monster" id="ToonMonster" >
                    <label class="form-check-label" for="ToonMonster"><img src="/media/icons/cardIcons/typeOfCard/Toon Monster.jpg" for="ToonMonster"> Toon </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Pendulum Normal Monster" id="PendulumNormalMonster">
                    <label class="form-check-label" for="PendulumNormalMonster"><img src="/media/icons/cardIcons/typeOfCard/Pendulum Normal Monster.jpg" for="PendulumNormalMonster"> Pendulum Normal </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"value="Pendulum Effect Monster" id="PendulumEffectMonster">
                    <label class="form-check-label" for="PendulumEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Pendulum Effect Monster.jpg" for="PendulumEffectMonster"> Pendulum Effect</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Pendulum Tuner Effect Monster" id="PendulumTunerEffectMonster">
                    <label class="form-check-label" for="PendulumTunerEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Pendulum Tuner Monster.jpg" for="PendulumTunerEffectMonster"> Pendulum Tuner </label>
                    </div>
    
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Ritual Monster" id="RitualMonster">
                    <label class="form-check-label" for="RitualMonster"><img src="/media/icons/cardIcons/typeOfCard/Ritual Monster.jpg" for="RitualMonster"> Ritual</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Fusion Monster" id="FusionMonster">
                    <label class="form-check-label" for="FusionMonster"><img src="/media/icons/cardIcons/typeOfCard/Fusion Monster.jpg" for="FusionMonster"> Fusion </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"  value="Pendulum Effect Fusion Monster" id="PendulumEffectFusionMonster">
                    <label class="form-check-label" for="PendulumEffectFusionMonster"><img src="/media/icons/cardIcons/typeOfCard/Pendulum Effect Fusion Monster.jpg" for="PendulumEffectFusionMonster"> Pendulum Fusion </label>
                    </div> 
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="XYZ Monster" id="XYZMonster">
                    <label class="form-check-label" for="XYZMonster"><img src="/media/icons/cardIcons/typeOfCard/XYZ Monster.jpg" for="XYZMonster"> XYZ </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="XYZ Pendulum Effect Monster" id="XYZPendulumEffectMonster">
                    <label class="form-check-label" for="XYZPendulumEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/XYZ Pendulum Effect Monster.jpg" for="XYZPendulumEffectMonster"> XYZ Pendulum  </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Synchro Monster" id="SynchroMonster" >
                    <label class="form-check-label" for="SynchroMonster"><img src="/media/icons/cardIcons/typeOfCard/Synchro Monster.jpg" for="SynchroMonster"> Synchro </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Synchro Tuner Monster" id="SynchroTunerMonster" >
                    <label class="form-check-label" for="SynchroTunerMonster"><img src="/media/icons/cardIcons/typeOfCard/Synchro Tuner Monster.jpg" for="SynchroTunerMonster"> Synchro Tuner</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Synchro Pendulum Effect Monster" id="SynchroPendulumEffectMonster" >
                    <label class="form-check-label" for="SynchroPendulumEffectMonster"><img src="/media/icons/cardIcons/typeOfCard/Synchro Pendulum Effect Monster.jpg" for="SynchroPendulumEffectMonster"> Synchro Pendulum  </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions" value="Link Monster" id="LinkMonster">
                    <label class="form-check-label" for="LinkMonster"><img src="/media/icons/cardIcons/typeOfCard/Link Monster.jpg" for="LinkMonster"> Link </label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input typeOfMonsterCard" type="radio" name="inlineRadioOptions"value="Token" id="Token">
                    <label class="form-check-label" for="Token"><img src="/media/icons/cardIcons/typeOfCard/Token.jpg" for="Token"> Token </label>
                    </div>
                    </div>
                  </form>
                  <form>
                    <div id="levels">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">LEVEL OR RANK</label><br>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level1" value="1">
                      <label class="form-check-label" for="level1">1 <img src="/media/icons/cardIcons/level.png" for="level1"></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level2" value="2">
                      <label class="form-check-label" for="level2">2 <img src="/media/icons/cardIcons/level.png" for="level2"></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level3" value="3">
                      <label class="form-check-label" for="level3">3 <img src="/media/icons/cardIcons/level.png" for="level3"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level4" value="4">
                      <label class="form-check-label" for="level4">4 <img src="/media/icons/cardIcons/level.png" for="level4"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level5" value="5">
                      <label class="form-check-label" for="level5">5 <img src="/media/icons/cardIcons/level.png" for="level5"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level6" value="6">
                      <label class="form-check-label" for="level6">6 <img src="/media/icons/cardIcons/level.png" for="level6"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level7" value="7">
                      <label class="form-check-label" for="level7">7 <img src="/media/icons/cardIcons/level.png" for="level7"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level8" value="8">
                      <label class="form-check-label" for="level8">8 <img src="/media/icons/cardIcons/level.png" for="level8"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level9" value="9">
                      <label class="form-check-label" for="level9">9 <img src="/media/icons/cardIcons/level.png" for="level9"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level10" value="10">
                      <label class="form-check-label" for="level10">10 <img src="/media/icons/cardIcons/level.png" for="level10"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level11" value="11">
                      <label class="form-check-label" for="level11">11 <img src="/media/icons/cardIcons/level.png" for="level11"> </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input levelOfCard" type="radio" name="inlineRadioOptions" id="level12" value="12">
                      <label class="form-check-label" for="level12">12 <img src="/media/icons/cardIcons/level.png" for="level12"> </label>
                    </div>
                    </div>
              </form>
              <form>
            <div id="race">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Race</label><br>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Aqua" value="Aqua">
                <label class="form-check-label" for="Aqua"><img src="/media/icons/cardIcons/race/Aqua.png" for="Aqua"> Aqua </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Beast" value="Beast">
                <label class="form-check-label" for="Beast"><img src="/media/icons/cardIcons/race/Beast.png" for="Beast"> Beast </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Beast-Warrior" value="Beast-Warrior">
                <label class="form-check-label" for="Beast-Warrior"><img src="/media/icons/cardIcons/race/Beast-Warrior.png" for="Beast-Warrior"> Beast-Warrior </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Creator-God" value="Creator-God">
                <label class="form-check-label" for="Creator-God"><img src="/media/icons/cardIcons/race/Divine-Beast.png" for="Creator-God"> Creator-God </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Cyberse" value="Cyberse">
                <label class="form-check-label" for="Cyberse"><img src="/media/icons/cardIcons/race/Cyberse.png" for="Cyberse"> Cyberse </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Dinosaur" value="Dinosaur">
                <label class="form-check-label" for="Dinosaur"><img src="/media/icons/cardIcons/race/Dinosaur.png" for="Dinosaur"> Dinosaur </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Divine-Beast" value="Divine-Beast">
                <label class="form-check-label" for="Divine-Beast"><img src="/media/icons/cardIcons/race/Divine-Beast.png" for="Divine-Beast"> Divine-Beast </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Dragon" value="Dragon">
                <label class="form-check-label" for="Dragon"><img src="/media/icons/cardIcons/race/Dragon.png" for="Dragon"> Dragon </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Fairy" value="Fairy">
                <label class="form-check-label" for="Fairy"><img src="/media/icons/cardIcons/race/Fairy.png" for="Fairy"> Fairy </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Fiend" value="Fiend">
                <label class="form-check-label" for="Fiend"><img src="/media/icons/cardIcons/race/Fiend.png" for="Fiend"> Fiend </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Fish" value="Fish">
                <label class="form-check-label" for="Fish"><img src="/media/icons/cardIcons/race/Fish.png" for="Fish"> Fish </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Insect" value="Insect">
                <label class="form-check-label" for="Insect"><img src="/media/icons/cardIcons/race/Insect.png" for="Insect"> Insect </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Machine" value="Machine">
                <label class="form-check-label" for="Machine"><img src="/media/icons/cardIcons/race/Machine.png" for="Machine"> Machine </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Plant" value="Plant">
                <label class="form-check-label" for="Plant"><img src="/media/icons/cardIcons/race/Plant.png" for="Plant"> Plant </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Psychic" value="Psychic">
                <label class="form-check-label" for="Psychic"><img src="/media/icons/cardIcons/race/Psychic.png" for="Psychic"> Psychic</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Pyro" value="Pyro">
                <label class="form-check-label" for="Pyro"><img src="/media/icons/cardIcons/race/Pyro.png" for="Pyro"> Pyro </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Reptile" value="Reptile">
                <label class="form-check-label" for="Reptile"><img src="/media/icons/cardIcons/race/Reptile.png" for="Reptile"> Reptile </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Rock" value="Rock">
                <label class="form-check-label" for="Rock"><img src="/media/icons/cardIcons/race/Rock.png" for="Rock"> Rock </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="SeaSerpent" value="Sea Serpent">
                <label class="form-check-label" for="SeaSerpent"><img src="/media/icons/cardIcons/race/Sea Serpent.png" for="SeaSerpent"> Sea Serpent </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Spellcaster" value="Spellcaster">
                <label class="form-check-label" for="Spellcaster"><img src="/media/icons/cardIcons/race/Spellcaster.png" for="Spellcaster"> Spellcaster </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Thunder" value="Thunder">
                <label class="form-check-label" for="Thunder"><img src="/media/icons/cardIcons/race/Thunder.png" for="Thunder"> Thunder </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Warrior" value="Warrior">
                <label class="form-check-label" for="Warrior"><img src="/media/icons/cardIcons/race/Warrior.png" for="Warrior"> Warrior </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="WingedBeast" value="Winged Beast">
                <label class="form-check-label" for="WingedBeast"><img src="/media/icons/cardIcons/race/Winged Beast.png" for="WingedBeast"> Winged Beast </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Wyrm" value="Wyrm">
                <label class="form-check-label" for="Wyrm"><img src="/media/icons/cardIcons/race/Wyrm.png" for="Wyrm"> Wyrm </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input raceOfMonsterCard" type="radio" name="inlineRadioOptions" id="Zombie" value="Zombie">
                <label class="form-check-label" for="Zombie"><img src="/media/icons/cardIcons/race/Zombie.png" for="Zombie"> Zombie </label>
                </div>
            </div>
            </form>
    
            <form>
            <div id="attribute">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Attribute</label><br>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="DARK" id="DARK" value="DARK">
            <label class="form-check-label" for="DARK"><img src="/media/icons/cardIcons/attribute/DARK.png" for="DARK"> DARK </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="DIVINE" id="DIVINE" value="DIVINE">
            <label class="form-check-label" for="DIVINE"><img src="/media/icons/cardIcons/attribute/DIVINE.png" for="DIVINE"> DIVINE </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="inlineRadioOptions" id="EARTH" value="EARTH">
            <label class="form-check-label" for="EARTH"><img src="/media/icons/cardIcons/attribute/EARTH.png" for="EARTH"> EARTH </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="inlineRadioOptions" id="FIRE" value="FIRE">
            <label class="form-check-label" for="FIRE"><img src="/media/icons/cardIcons/attribute/FIRE.png" for="FIRE"> FIRE </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="inlineRadioOptions" id="LIGHT" value="LIGHT">
            <label class="form-check-label" for="LIGHT"><img src="/media/icons/cardIcons/attribute/LIGHT.png" for="LIGHT"> LIGHT </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="inlineRadioOptions" id="WATER" value="WATER">
            <label class="form-check-label" for="WATER"><img src="/media/icons/cardIcons/attribute/WATER.png" for="WATER"> WATER </label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input attributeOfMonsterCard" type="radio" name="inlineRadioOptions" id="WIND" value="WIND">
            <label class="form-check-label" for="WIND"><img src="/media/icons/cardIcons/attribute/WIND.png" for="WIND"> WIND </label>
            </div>
        </div>
        <form>
    
        
        <div class="row">
          <div class="col-auto atk" id="atk">
              <label for="atk">ATTACK</label>
              <input type="text" class="form-control mb-2" id="atkForm" placeholder="ATK">
          </div>
    
          <div class="col-auto def" id="def">
              <label for="def">DEFENSE</label>
              <input type="text" class="form-control mb-2" id="defForm" placeholder="DEF">
          </div>
        </div>
    
    
            `
        } else {
            // radio is not checked..
            
            spellFilterSettings.innerHTML=``;
            trapFilterSettings.innerHTML=``;
            monsterFilterSettings.innerHTML=``;
    
             typeParameter = undefined;
        }
    });
}



var moreFilteredResults

var typeParameter="All"


Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

Array.prototype.sortByInverted = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
  });
}

function sortByInverted(parameter,textValue1,textValue2){
  
  clearScreenForAdvancedMode()
  fetchRandom=false;
  newCards = false;
 

  sortedResultsInverted = results.sortByInverted(parameter)
     //CREATING THE CARDS

     function createSortedByInvertedCards(){
      subContent1.innerHTML= `${textValue1}${sortedResultsInverted.length}${textValue2}: `
      for (var b = 0; b < resultsPerPage ; b++) {
        whatType(sortedResultsInverted[b])}
    }  
    
    createSortedByInvertedCards()
    
}

function sortBy(parameter,textValue1,textValue2){ 

  clearScreenForAdvancedMode()

  sortedResults = results.sortBy(parameter)
  //CREATING THE CARDS

  function createSortedByInvertedCards(){
    subContent1.innerHTML= `${textValue1}${sortedResults.length}${textValue2}: `
   for (var b = 0; b < resultsPerPage ; b++) {
     whatType(sortedResults[b])}
 }  
 
 createSortedByInvertedCards()
 
}



function resultsDescToLowerCase(){

  let descForm = (document.getElementById("descForm").value)

for (b = 0; !(b > results.length); b++) {
  //console.log((results[b].desc).toLowerCase())
  
    }
      
    } 

    
$('#descForm').on('input', function() { 
  // Your code here
  let searchCryteria = (this.value)
});





//FILTER RESULTS FILTRARA EN BASE AL TIPO DE CARTA QUE SE PONGA ACA


function filterResults(){
  clearScreenForAdvancedMode()
//FILTER BY DESCRIPTION
if ((document.getElementById("descForm").value) != undefined){
  function filterByDescription(){
    
    return (filteredResults= (results2filter.data.filter(function(card){
      return ((card.desc).includes(document.getElementById("descForm").value) || (card.name).includes(document.getElementById("descForm").value))
    
    })))
      }
  filterByDescription()
  //console.log(filteredResults)
} 


  //CREATING THE CARDS
  if (typeParameter == "All"){
  subContent1.innerHTML= `Card Results ${filteredResults.length} cards : `
  for (var b = 0; b < resultsPerPage ; b++) {
  whatType(filteredResults[b])}
  return
   }


//FILTER BY PARAMETER

  if (typeParameter != undefined){
    //ITS A MONSTER? 
    if (typeParameter == "Monster"){
      console.log("it's a monster!")
      function filterByMonsterType(){
        console.log("filterByMonsterType running")
        return (filteredResults= (filteredResults.filter(function(card){return (card.type).includes("Monster")})))
          }
        
      //console.log(filteredResults)

      //FILTER BY TYPE OF MONSTER CARD (PENDULUM, SYNCHRO; NORMAL; XYZ; ETC)
 
      function filterByMonsterCardType(){
        
        console.log("filterByMonsterCardType running")
        return (filteredResults= (filteredResults.filter(function(card){return (card.type == monsterCardType)})))
          }
      
        if (monsterCardType == undefined){filterByMonsterType()} 
         
        if (document.querySelector('.typeOfMonsterCard:checked')){
          monsterCardType = document.querySelector('.typeOfMonsterCard:checked').value;
                    
          if (monsterCardType=="Ritual Monster"){
            function filterByRitualMonsterType(){
              return (filteredResults= (filteredResults.filter(function(card){return (card.type).includes("Ritual")})))
                }
                filterByRitualMonsterType()
                console.log("its a ritual")
              }  
              
              // if (monsterCardType != "Ritual Monster"){
              // filterByMonsterCardType();
              //       }
                    
                   

        if (monsterCardType=="Tuner Monster") {
              function filterByTunerMonsterType(){
                return (filteredResults= (filteredResults.filter(function(card){return (card.type).includes("Tuner")})))
                  }
                  filterByTunerMonsterType()
                  console.log("its a tuner")
                }  
                
                if (monsterCardType !="Ritual Monster" && monsterCardType != "Tuner Monster"){
                filterByMonsterCardType();
                      }
                      
              }



// FILTER BY Level 
function filterByLevelOfCard(){
  console.log("filterByLevelOfCard ok "+ levelOfCard)
    return (filteredResults= (filteredResults.filter(function(card){return (card.level == levelOfCard)})))
      }
      if (document.querySelector('.levelOfCard:checked') ){
        levelOfCard = document.querySelector('.levelOfCard:checked').value;
        filterByLevelOfCard()};
    
  // FILTER BY ATTRIBUTE 
  
  if (document.querySelector('.attributeOfMonsterCard:checked')){
    
    console.log("filterByAttribute running")
    attributeOfMonsterCard = document.querySelector('.attributeOfMonsterCard:checked').value;
    filterByAttributeMonsterOfCard()};
  
  function filterByAttributeMonsterOfCard(){
  
  return (filteredResults= (filteredResults.filter(function(card){return (card.attribute == attributeOfMonsterCard)})))
    }
  
  
  
  
       //FILTER BY ATK
  
  
       if ((document.getElementById("atkForm").value) != "" && !(document.getElementById("defForm").value)){
                  
        console.log("filterByaTK running")
        atkParameter = document.getElementById("atkForm").value
        function filterByAtk(){
            return (filteredResults= (results2filter.data.filter(function(card){return (card.atk ==atkParameter)})))
                }
                filterByAtk()
    } 
        
          //FILTER BY DEF
        
        
        if ((document.getElementById("defForm").value) != "" && !(document.getElementById("atkForm").value)){
                    
        console.log("filterByDef running")
                defParameter = document.getElementById("defForm").value
                function filterByDef(){
                    return (filteredResults= (results2filter.data.filter(function(card){return (card.def ==defParameter)})))
                        }
                        filterByDef()
            } 
  
          
          // FILTER BY ATK & DEF - CURRENTLY NOT WORKING
          
            if ((document.getElementById("defForm").value) != "" && (document.getElementById("atkForm").value) != ""){


              defParameter = document.getElementById("defForm").value
              function filterByDef(){
                  return (filteredResults= (results2filter.data.filter(function(card){return (card.def ==defParameter)})))
                      }
                      filterByDef()
              
              atkParameter = document.getElementById("atkForm").value
              function filterByAtk(){
                  return (filteredResults= (results2filter.data.filter(function(card){return (card.atk ==atkParameter)})))
                      }
                filterByAtk()


             }

          
          // FILTER BY RACE 
          
          if (document.querySelector('.raceOfMonsterCard:checked') ){
            
        console.log("filterByrace running")
            raceOfMonsterCard = document.querySelector('.raceOfMonsterCard:checked').value;
          
            function filterByRaceMonsterOfCard(){
              return (filteredResults= (filteredResults.filter(function(card){return (card.race == raceOfMonsterCard)})))
                }
          
            filterByRaceMonsterOfCard()};
          
          } //END OF MONSTER TYPE CARD


    //ITS A MAGIC OR TRAP? 
    if (typeParameter == "Spell Card" || typeParameter == "Trap Card"){
        function filterByType(){
          return (filteredResults= (filteredResults.filter(function(card){return (card.type == typeParameter)})))
        } 
      filterByType()

      
     if (document.querySelector('.raceOfSpell:checked') ){
    raceOfSpellCard = document.querySelector('.raceOfSpell:checked').value;
  
        function filterByRaceOfSpellCard(){
          return (filteredResults= (filteredResults.filter(function(card){return (card.race == raceOfSpellCard)})))
            }
      
        filterByRaceOfSpellCard()};
  
  

    if (document.querySelector('.raceOfTrap:checked') ){
      raceOfTrapCard = document.querySelector('.raceOfTrap:checked').value;
    
      function filterByRaceOfTrapCard(){
        return (filteredResults= (filteredResults.filter(function(card){return (card.race == raceOfTrapCard)})))
          }
    
          filterByRaceOfTrapCard()};
    
    

        } 
    

      

    //RESULTS TO SHOW
  // console.log(filteredResults)




   //CREATING THE CARDS

  function createFilteredCards(textValue1,textValue2){


  subContent1.innerHTML= `${textValue1}${filteredResults.length}${textValue2}`
  for (var b = 0; b < resultsPerPage ; b++) {

    whatType(filteredResults[b])}
  }
}




  
advancedSearchBar.classList.remove("d-none");
clearScreenForAdvancedMode()
if(filteredResults.length==0){
  
  subContent2.innerHTML= `
  <div class='cardGrid' style="display:flex; flex-direction:column;">
  <img src="/media/error/error2.gif" alt="error" style="width: '400px'"> 
  <br>
  <h3>${errorText}</h3>
  </div>
  `;
}
createFilteredCards(filteredResults_H1_1,filteredResults_H1_2)



}

