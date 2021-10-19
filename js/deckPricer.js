var deck = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };
    

var textFromFile

function loadDeckPricer() {
  console.log("load deck pricer");
  clearScreen();
  subContent1.innerHTML = ` Elegir deck 
    <input type="file" id="file-input" />
    <h3>Contenido del archivo:</h3>
    <pre id="contenido-archivo"></pre>
            `;
  document
    .getElementById("file-input")
    .addEventListener("change", leerArchivo, false);
    console.log(deck)
}


function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
  createDeck()
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById("contenido-archivo");
  elemento.innerHTML = contenido;
  console.log(contenido)
  textFromFile = contenido
}



function createDeck() {
    textFromFile = textFromFile.replace("#created by ", "#creator ");
    textFromFile = textFromFile.replace("!", "#");
    console.log(textFromFile)
    // Recorrer textFromFile y reemplazar los "\r\" por "," para poder almacenarlo en deck

}