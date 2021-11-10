$(document).ready(async function () {
  
    await loadHome()
   

  });

async function loadHome(){
    // console.log("ready!");
  
    language = readLocalStorage("language");
    view = readLocalStorage("view", view)
    // console.log(language);
  
    if (language == undefined) {
      // default view set as default (1)
      view = 1;
      save2localStorage("view", view);

      language = "ENG";
      // console.log(language);
      loadInEnglish();


      // Ask for default language
      /*
      if (confirm("Load in English?")) {
        language = "ENG";
        // console.log(language);
        loadInEnglish();
        return;
  
      } else if (confirm("Cargar en Español?")) {
        language = "ESP";
        // console.log(language);
        loadInSpanish()
        return;
  
      } else {
        alert("Since you did not select any language it will be set to English, you can change it later in the Configuration Menu")
        language="ENG"
        loadInEnglish()
  
      }
      */

    }
  
    if (language == "ENG") {
      await loadInEnglish();
    } else if (language == "ESP") {
      await loadInSpanish();
    }
}


// CARGAR PAGINA EN ESPAÑOL

async function loadInSpanish() {
    language = "ESP";
    document.documentElement.lang = "es"
    document.getElementById("card_name").setAttribute("placeholder", "Buscar carta por nombre...")
    await save2localStorage("language", language);
    // console.log("Cargando página en Español");
    await $("#header").load("content/ESP/navBar.html");
    await $("#alertPopup").load("content/ESP/alertPopup.html");
    await $("#scripts").load("content/ESP/scripts.html");
  }



  
// CARGAR PAGINA EN INGLES

async function loadInEnglish() {
    language = "ENG";
    document.documentElement.lang = "en"
    document.getElementById("card_name").setAttribute("placeholder", "Search by card name...")
    await save2localStorage("language", language);
    // console.log("Loading page in English");
    await $("#header").load("content/ENG/navBar.html");
    await $("#alertPopup").load("content/ENG/alertPopup.html");
    await $("#scripts").load("content/ENG/scripts.html");
  }


function loadAbout(){
  clearScreen()
  if (language=="ENG"){
    // console.log("loading about in "+language)
    $("#sub-content-about").load("content/ENG/about.html");
    window.location.hash="/about"
  }
    else if (language == "ESP"){
      // console.log("loading about in "+language)
      $("#sub-content-about").load("content/ESP/about.html");
      window.location.hash="/about"
    }
}
