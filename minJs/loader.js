async function loadHome(){language=readLocalStorage("language"),view=readLocalStorage("view",view),null==language&&(view=1,save2localStorage("view",view),language="ENG",loadInEnglish()),"ENG"==language?await loadInEnglish():"ESP"==language&&await loadInSpanish()}function loadInSpanish(){language="ESP",document.documentElement.lang="es",document.getElementById("card_name").setAttribute("placeholder","Buscar carta por nombre..."),save2localStorage("language",language),$("#header").load("content/ESP/navBar.html"),$("#alertPopup").load("content/ESP/alertPopup.html"),$("#scripts").load("content/ESP/scripts.html")}function loadInEnglish(){language="ENG",document.documentElement.lang="en",document.getElementById("card_name").setAttribute("placeholder","Search by card name..."),save2localStorage("language",language),$("#header").load("content/ENG/navBar.html"),$("#alertPopup").load("content/ENG/alertPopup.html"),$("#scripts").load("content/ENG/scripts.html")}function loadAbout(){clearScreen(),"ENG"==language?($("#sub-content-about").load("content/ENG/about.html"),window.location.hash="/about"):"ESP"==language&&($("#sub-content-about").load("content/ESP/about.html"),window.location.hash="/about")}$(document).ready(async function(){await loadHome()});