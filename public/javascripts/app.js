// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");
        
        
    }
    window.addEventListener("load", Start);
})();
let loadFile = function(event) {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src);
    }};

let loadPdf = function(event) {
    let viewPdf = document.getElementById('viewPdf');
    viewPdf.src = URL.createObjectURL(event.target.files[0]);
    viewPdf.onload = function() {
        URL.revokeObjectURL(viewPdf.src);
    }};

let loadView = function() {
    let inputPdf = document.getElementById('viewUrl');
    console.log(inputPdf.value);
    let outputPdf = document.getElementById('embedUrl');
    outputPdf.src = inputPdf;
};
