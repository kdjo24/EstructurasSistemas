class hashInterno{
    constructor(){
        // ----------
        this.dato=null
        // ---------- Puntero
        this.siguiente=null
    }// fin constructor
}// Hash interno

class nodoHash{
    constructor(posMax){
        // -- posicion maxima
        this.posMax = posMax
        // ---- punteros
        this.siguiente=null
        this.raiz=null
        // --- llenado
        for(var a=0;a<posMax;a++){
            this.creacion()
        }// fin llenado
    }// fin constructor

    creacion(){
        var nuevo = new hashInterno()
        if(this.raiz==null){
            this.raiz=nuevo
        }//  si esta vacio
        else{
            var auxiliar = this.raiz
            while(auxiliar.siguiente!=null){auxiliar=auxiliar.siguiente;}
            auxiliar.siguiente=nuevo
        }
    }// creacion

    insertar(dato){
        var aux = this.raiz;
        while(aux!=null){
            if(aux.dato==null){aux.dato=dato; return;}
            aux=aux.siguiente;
        }// fin while
    }
}// fin nodo hash

class tablaHash{
    constructor(posMax){
        //--posicion
        this.posMax=posMax
        //--punteros
        this.raiz=null
        // llenado
        for(var b=0;b<posMax;b++){
            this.creandoNodos()
        }
        // ---- 
        this.strGrafica=""
    }// posicion maxima

    creandoNodos(){
        var nuevoNodo = new nodoHash(5)
        if(this.raiz==null){this.raiz=nuevoNodo;}
        else{
            var nodoAuxiliar = this.raiz;
            while(nodoAuxiliar.siguiente!=null){nodoAuxiliar=nodoAuxiliar.siguiente}
            nodoAuxiliar.siguiente=nuevoNodo
        }
    }// creando Nodos

    retornarId(id){
        var contador=0
        var auxiliarRetorno = this.raiz
        while(auxiliarRetorno.siguiente!=null){
            if(contador==id){return auxiliarRetorno}
            auxiliarRetorno=auxiliarRetorno.siguiente
            contador=contador+1
        }
        return auxiliarRetorno
    }// retornar Id

    insertar(llave,dato){
        // aca hare la funcion hash 
        var posicionHash = llave%this.posMax
        var nodoNuevo = this.retornarId(posicionHash)
        nodoNuevo.insertar(dato)
    }// insertar

   grafica(){
    this.strGrafica="digraph G{ \n rankdir =\"LR\";"
    var auxiliarUnoG = this.raiz
    var guiaPrincipales = 0; 
    while(auxiliarUnoG!=null){
        this.strGrafica+="p"+guiaPrincipales+"[label=\""+guiaPrincipales+"\"]; \n"
        if(guiaPrincipales+1<this.posMax){this.strGrafica+= "p"+guiaPrincipales+ "->"+"p"+(guiaPrincipales+1)+";\n"}
        this.strGrafica += "subgraph "+guiaPrincipales+"{ \n rank=same;\n";
        // ---- Empezamos con los secundarios o listas internas 
        var auxiliarDosG = auxiliarUnoG.raiz
        var guiaSecundarios = 0; 
        if(auxiliarDosG.dato!=null){this.strGrafica+="p"+guiaPrincipales + "-> "+"p"+guiaPrincipales+"secundario"+guiaSecundarios+";\n";}
        while(auxiliarDosG!=null){
            if(auxiliarDosG.dato!=null){
                this.strGrafica+="p"+guiaPrincipales+"secundario"+guiaSecundarios+"[label=\""+auxiliarDosG.dato+"\"];\n"
                if(auxiliarDosG.siguiente.dato!=null){this.strGrafica+="p"+guiaPrincipales+"secundario"+guiaSecundarios+"->"+"p"+guiaPrincipales+"secundario"+(guiaSecundarios+1)+";\n"}
            }
            guiaSecundarios=guiaSecundarios+1
            auxiliarDosG=auxiliarDosG.siguiente
        }
        auxiliarUnoG=auxiliarUnoG.siguiente
        guiaPrincipales=guiaPrincipales+1
        this.strGrafica+="}"
    }// Primer while
    this.strGrafica+="}"
    return this.strGrafica
   }// Grafica

   recorriendo(){
    var auxiliarUnoG = this.raiz
    while(auxiliarUnoG!=null){
        var auxiliarDosG = auxiliarUnoG.raiz
        while(auxiliarDosG!=null){
            if(auxiliarDosG.dato!=null){
             console.log(auxiliarDosG.dato)
            }
            auxiliarDosG=auxiliarDosG.siguiente
        }
        auxiliarUnoG=auxiliarUnoG.siguiente
    }// Primer while
    return null
   }// recorriendo




}// Tabla Hash



var miau = new tablaHash(13)
miau.insertar(79,25)
miau.insertar(80,25)
miau.insertar(2,26)
miau.insertar(90,25)
var strr=miau.grafica()
miau.recorriendo()
d3.select("#grafica").graphviz()
.width(2000)
.height(2000)
.renderDot(strr)