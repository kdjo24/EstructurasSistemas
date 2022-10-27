class nodoPila{
    constructor(id){
        this.id=id;
        this.siguiente=null;
    }//Fin constructor
}//Fin nodo cola

class pila{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }//Fin constructor

    insertar(id){
        var nuevo = new nodoPila(id)
        if(this.primero==null && this.ultimo==null){
            this.primero=nuevo;
            this.ultimo=nuevo;    
        }
        else{
            this.ultimo.siguiente=nuevo
            this.ultimo=this.ultimo.siguiente
        }
    }// fin insertar

    imprimir(){
        var aux = this.primero;
        if(aux==null){alert("No existen aun elementos en la pila")}
        while(aux!=null){
            alert(aux.id)
            aux=aux.siguiente
        }
    }// fin imprimir

    grafica(){
        var strGraficaUno="digraph G { \n rankdir=\"RL\";\n"
        var nodoaux=this.primero;
        while(nodoaux!=null){
        strGraficaUno+=nodoaux.id+"[label=\""+nodoaux.id+"\"];\n"
        if(nodoaux.siguiente!=null){strGraficaUno+=nodoaux.id+"->"+nodoaux.siguiente.id+";\n"}
        nodoaux=nodoaux.siguiente;}
        strGraficaUno+="}"
        console.log(strGraficaUno)
        return strGraficaUno
    } // graficauno




}//fin clase cola


var prueba = new pila()
prueba.insertar(1)
prueba.insertar(2)
prueba.insertar(3)
prueba.insertar(4)
prueba.insertar(5)
prueba.insertar(6)
prueba.insertar(7)
var miau = prueba.grafica()

d3.select("#grafica").graphviz()
.width(2000)
.height(150)
.renderDot(miau)