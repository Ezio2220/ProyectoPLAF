 
 //var activo = 0;
var Actual;
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
  function nuevo(root,titulo,loc,sel=0,title=[0,0]){//****************************************************FUNCION PARA GUARDAR
    var data = firebase.database().ref(root);
    var obj = new Object();
    
    if(root!="Usuarios"){
    var n;var n1;
    
    titulo.forEach(function(i){
         console.log(i);
        if(sel!=0){
            
            var j = document.getElementById(i).value;
            console.log(j);
            obj[i] = j.substring(0,j.length);
            console.log(j +"-"+obj[i]);
        }else{
             obj[i]=document.getElementById(i).value;
        }
       
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
        var add;
        if(sel!=0){
            add = data.child(sel);
        }else{
            add = data.child(id);
        }
         
        add.set(obj);
        
    });       
    }else{
        obj["contraseña"]=document.getElementById("contraseña").value;
        obj["Tipo"]="admin";
        data.child(document.getElementById("Nombre").value).set(obj);
    }
    if(sel==0){
         alert("GUARDADO!");
    }else{
        alert("Actualizado");
    }
   
    location.reload(true);
    //window.location=loc+".html";
  }
  ////****************************************************FUNCION PARA ELIMINAR
  function borrar(root,id){
     // console.log(root);
     // console.log(id);
      var data = firebase.database().ref(root);
      var item = document.getElementById(id).value;
     // console.log(item);
      data.child(item).remove();
    alert("borrado");
    location.reload(true);
    }


    function emptymodal(){
        var x = document.getElementById("foredit");
        x.innerHTML = "";
    }
    function geti(y){
        var k = Array();
        y.forEach(function(i){
            console.log(document.getElementById(i).value);
            k.push(document.getElementById(i).value);
        });
        return k;
    }
//****************************************************FUNCION PARA EDITAR
    function editar(root,id,n1=[0,0]){
        var item = document.getElementById(id).value;
        console.log(item);
        console.log(n1);
        var comp;
        var y = Array();

        n1.forEach(function(i){
            i.id = i.id+"1";
            y.push("\'"+i.id+"\'");
            comp = i;
        });
        console.log(comp);
       // console.log(comp.length);
        if(comp.length == undefined){
        var x = document.getElementById("foredit");
        var code = id+"modal";
        var modal = "<div class='modal fade' id='"+code+"' tabindex='-1' role='dialog' aria-labelledby='"+code+"' aria-hidden='true'>"+
        "<div class='modal-dialog' role='document'>"+
          "<div style='background-color: #1a2035;color : #8b92a9;' class='modal-content'>"+
            "<div style='border-bottom: 1px solid #8b92a975;' class='modal-header'>"+
              "<h5 class='modal-title' id='"+code+"'>"+root+" modal "+id+"</h5>"+
              "<button onclick='emptymodal();' style='color: white;' type='button' class='close' data-dismiss='modal' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+
              "</button>"+
            "</div> <form id = 'formedt' action=\"JavaScript:nuevo('"+root+"',["+y+"],'"+root+"','"+item+"',["+geti(y)+"]);\">"+
            "<div class='modal-body'>";

            n1.forEach(function(i){

               modal += i.outerHTML;
                console.log(i.outerHTML);
            });
            modal+=
            "</div>"+
            "<div style='border-top: 1px solid #8b92a975;' class='modal-footer'>"+
              "<button onclick='emptymodal();'  type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"+
              "<button type='submit' class='btn btn-primary'>Actualizar</button>"+
            "</div></form>"+
          "</div>"+
        "</div>"+
      "</div>";
      var options ;
      x.innerHTML = modal;
        console.log(modal);
        console.log(code);
      $("#"+code).modal(options);
        }
        
        //alert("modificado"); 
    }
//**************************************************** FUNCION PARA MOSTRAR EN TABLA!!!!
  function mostrar(root,table,n=[0,0]){
      var data = firebase.database().ref(root);
      var tbl = document.getElementById(table);
      var obj = new Object();
      var tot="";
      var i=1;
      if(root=="Usuarios"){
          console.log("user");
            data.once("value", function(snap) {
                var aux = snap.val();
                for(var documento in aux){
                    var xy = aux[documento]
                   // console.log("a");
                    var x;
                    x= "<tr> <td>"+documento+" </td>"+
                          "<td>"+aux[documento].contraseña+" </td>"+
                          "<td> "+
                    "<button onclick="+"borrar('"+root+"','delete"+i+"');"+" id='delete"+i+"' value='"+documento+"' class='btn btn-danger' type='button' name='add'><i class='material-icons'>delete</i> </button> "+
                    "<button id='edit"+i+"' value='"+documento+"' class='btn btn-info' type='button' name='add'><i class='material-icons'>create</i> </button> "+
                    +"</td> </tr>"; 
                    var acum = x.substring(0,x.length-4);
                    tot+=acum;
                    //console.log(tot);
                    i=i+1;
                }
                tbl.innerHTML = tot;
          }); 
      }else{
        console.log("not user");
        data.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){
                var xy = aux[documento]
                var x;
                x= "<tr>";
                n.forEach(function(i){
                    x+="<td>"+xy[i]+"</td>"
                    console.log(xy[i]);
                });
                
                x+="<td><button onclick="+"borrar('"+root+"','delete"+i+"');"+" id='delete"+i+"' value='"+documento+"' class='btn btn-danger' type='button' name='add'><i class='material-icons'>delete</i> </button> "+
                    "<button onclick="+"editar('"+root+"','edit"+i+"',["+n+"]);"+" id='edit"+i+"' value='"+documento+"' class='btn btn-info' type='button' name='add'><i class='material-icons'>create</i> </button>"+
                    "</td> </tr>";
                var acum = x.substring(0,x.length-5);
                tot+=acum;
                console.log(tot);
                i=i+1;
            }
            tbl.innerHTML = tot;
        }); 
      }
      

  }
  function SESSION(){
    //var db = firebase.database().ref("Estado");
        var db = firebase.database().ref("Usuarios");
        var act = localStorage.getItem("Actual");
        console.log(act);
    db.once("value", function(snap) {
        var aux = snap.val();
         //console.log(aux["Actual"]);
         if(aux[act].Estado == 0){
            window.location="index.html";
         }
     /*   if(aux["Actual"]==0){
            window.location="index.html";
        }*/
    });
  }
  
  function close(){
      console.log("cerrar sesion");
      var act = localStorage.getItem("Actual");
      var db = firebase.database().ref("Usuarios").child(act);
      db.child("Estado").set(0);
      /*firebase.database().ref("Estado");
      db.child("Actual").set(0);
      db.child("user").set("0");*/
      alert("Cerrando sesion..");
      window.location="index.html";
  }

  function login(){
    //var db = firebase.database().ref("Estado");
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
                    data.child(name).child("Estado").set(1);
                    this.Actual = name;
                    localStorage.setItem("Actual",name);
                    //db.child("Actual").set(1);
                    //db.child("user").set(name);
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