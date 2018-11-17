 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC5Fz7x6mupIKZ8IsyyKS7WRN6Hr_rVcK8",
    authDomain: "plaf-3cf84.firebaseapp.com",
    databaseURL: "https://plaf-3cf84.firebaseio.com",
    projectId: "plaf-3cf84",
    storageBucket: "plaf-3cf84.appspot.com",
    messagingSenderId: "709281942479"
  };
  firebase.initializeApp(config);
 function sd(){ 
  var prueba = document.getElementById("id2");

  var dbref = firebase.database();
  //.set() se agrega el objeto

var y = document.getElementById("user").value;
var x = document.getElementById("contra").value;
//print(y);
var obj = {
    Nombre: "franklin",
    Telefono: 2023636,
    Dui: 02
}
/*var messageref0 = dbref.ref("Vendedores").child(y);
messageref0.child("Nombre").set(x);*/
var message = dbref.ref("Vendedores");
var lol="";
message.on("value", function(snap) {
  var datosArray = snap.val();
  for(var documento in datosArray){
    console.log("::"+documento);
    //print(datosArray[documento].Nombre);
    lol += datosArray[documento].Nombre+"-";
    if(datosArray[documento].Nombre=== y){
      alert("CORRECTO!");
    }
  }
});
console.log(lol);
prueba.innerText = lol;
/*
var y = document.getElementById("user").value;
print(y);
var messageref = dbref.ref("Vendedores");
*/
//messageref.child("Nombre").set(y);
  /*messageref.once('value').then(function(snap){
        var x = snap.val();
        prueba.innerText = x.Nombre+" "+x.Dui+" "+x.Telefono;
        
     
  });*/

  //messageref.child("Nombre").set(y);
  //messageref.child("Nombre").set("vendedor1");
  /*messageref.on('value').then(function(snap){
      var dat = snap.val();
      for(var documento in dat){
        dat[documento].Nombre;
    }
      
  });*/
}