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
  var db = firebase.database();

  //root toma el nombre de la tabla donde se escribira y titulo toma un array de los campos que esta tenga
  function nuevo(root,titulo,loc){
    var data = firebase.database().ref(root);
    var obj = new Object();
    if(root!="Usuarios"){
    var n;var n1;
    
    titulo.forEach(function(i){
        obj[i]=document.getElementById(i).value;
    });
    
    data.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            //print(datosArray[documento].Nombre);
            console.log(documento);
            n=documento;
            n1= parseInt(n.substring(2))+1;
        }
      //  console.log(n);
        console.log(n1);
        id="id"+n1;
        console.log(id);
       
        //console.log("hola");
        var add = data.child(id);
        add.set(obj);
        
    });       
    }else{
        obj["contraseña"]=document.getElementById("contraseña").value;
        obj["Tipo"]="admin";
        data.child(document.getElementById("Nombre").value).set(obj);
    }
    alert("GUARDADO!");
    window.location=loc+".html";
  }
  function mostrar(root,table){
      var data = firebase.database().ref(root);
      var tbl = document.getElementById(table);
      var obj = new Object();
      var tot="";
      if(root=="Usuarios"){
          console.log("user");
            data.once("value", function(snap) {
                var aux = snap.val();
                for(var documento in aux){
                    console.log("a");
                    var x;
                    x= "<tr> <td>"+documento+" </td>"+
                          "<td>"+aux[documento].contraseña+" </td>"+
                          "<td> "+
                    "<button id='delete' value='"+documento+"' class='btn btn-danger' type='button' name='add'><i class='material-icons'>delete</i> </button> "+
                    "<button id='edit' value='"+documento+"' class='btn btn-info' type='button' name='add'><i class='material-icons'>create</i> </button> "+
                    +"</td> </tr>"; 
                    var acum = x.substring(0,x.length-4);
                    tot+=acum;
                    console.log(tot);
                    
                }
                tbl.innerHTML = tot;
          }); 
      }else{
        console.log("not user");
        data.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){

            }

        }); 
      }
      

  }
  function login(){
    var data = firebase.database().ref("Usuarios");
    var bandera = true;
    var name = document.getElementById("user").value;
    var pass = document.getElementById("contra").value;
    console.log(name+" "+pass);
    data.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            console.log(documento);
            if(documento == name){
                bandera=false;
                if(pass == aux[documento].contraseña){
                    alert("Correcto");
                    window.location="Principal.html";
                }else{
                    
                    alert("usuario y/o contraseña Incorrectos");
                }
            }
       }
       if(bandera){
           alert("usuario y/o contraseña Incorrectos");
       }
       
    });  


  }