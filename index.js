import * as wasm from 'cirilica';

document.getElementById('prepisi').onclick = function () {
  myFunction();
};

function myFunction(ev) {
  document.getElementById('cirilica').value = wasm.latin_to_cyrillic(document.getElementById('latinica').value);
  
}
