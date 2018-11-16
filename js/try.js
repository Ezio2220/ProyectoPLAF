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
/*
var obj = {
    Nombre: "franklin",
    Telefono: 20203636,
    Dui: 02;
}
var messageref0 = dbref.ref("Vendedores");
messageref0.set("id2");
messageref0.child("id2").set(obj);
*/
  var messageref = dbref.ref("Vendedores").child("id1");
  messageref.once('value').then(function(snap){
        var x = snap.val();
        prueba.innerText = x.Nombre+" "+x.Dui+" "+x.Telefono;
        
     
  });
  var y = document.getElementById("user").value;
  print(y);
  messageref.child("Nombre").set(y);
  //messageref.child("Nombre").set("vendedor1");
  /*messageref.on('value').then(function(snap){
      var dat = snap.val();
      for(var documento in dat){
        dat[documento].Nombre;
    }
      
  });*/
}