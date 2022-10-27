class nodoDobleCircular{

    constructor(id){
        this.id=id;
        this.siguiente=null;
        this.anterior=null;
    }//Fin constructor

}// Nodo doble circular

class listaDobleCircular{

    constructor(id){
        this.primero=null;
        this.ultimo=null;
    }// fin constructor

    insertar(id){
        var nuevoNodo = new nodoDobleCircular(id);
        if(this.primero==null && this.ultimo==null){
            this.primero=nuevoNodo; this.ultimo=this.primero;
            this.primero.siguiente=this.primero; this.primero.anterior=this.ultimo;
        }// fin del if
        else{
            var auxNodo = this.primero;
            while(this.primero.siguiente!=auxNodo){this.primero=this.primero.siguiente;}
            this.ultimo=nuevoNodo;
            this.primero.siguiente=this.ultimo;
            this.ultimo.anterior=this.primero;
            this.primero=auxNodo;
            this.ultimo.siguiente=this.primero;
            this.primero.anterior=this.ultimo;
        }// else
    }// fin insertar

    grafica(){
        var strGraficaUno="digraph G { \n rankdir=\"RL\";\n"
        var nodoaux=this.primero;
        var contador=0;
        if(contador==0){ 
            strGraficaUno+=contador+"[label=\""+nodoaux.id+"\"];\n"
            nodoaux=nodoaux.siguiente;
        contador=contador+1;}
        while(nodoaux!=this.primero && contador!=0){
        strGraficaUno+=contador+"[label=\""+nodoaux.id+"\"];\n"
        var miau=contador-1
        strGraficaUno+=miau+"->"+contador+";\n"
        strGraficaUno+=contador+"->"+miau+";\n"
        contador=contador+1;
        nodoaux=nodoaux.siguiente;}
        strGraficaUno+="0->"+(miau+1)+";\n"
        strGraficaUno+=(miau+1)+"->0;\n"
        strGraficaUno+="}"
        return strGraficaUno
    } // graficauno


}// Fin lista doble circular


var prueba = new listaDobleCircular()
prueba.insertar(1)
prueba.insertar(2)
prueba.insertar(3)
prueba.insertar(4)
prueba.insertar(5)
prueba.insertar(6)
var miau = prueba.grafica()

d3.select("#grafica").graphviz()
.width(2000)
.height(150)
.renderDot(miau)