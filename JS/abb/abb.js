class nodoabb{
    constructor(id){
        this.id=id;
        this.izquierda=null;
        this.derecha=null;
    }
}//Fin nodo abb

class abb{
    constructor(){
        this.raiz=null;
        this.strGraphviz="digraph G { \n"
    }//fin constructor

    insertarInterno(id,raiz){
        if(raiz==null){raiz = new nodoabb(id);}
        else{
            if(id>raiz.id){raiz.derecha = this.insertarInterno(id,raiz.derecha);}
            else{raiz.izquierda = this.insertarInterno(id,raiz.izquierda);}
        }// fin else
        return raiz
    }// fin insertar interno

    insertar(id){
        this.raiz = this.insertarInterno(id,this.raiz)
    }// Fin insertar

    anidarNodosGrafica(raiz){
        if (raiz!=null){
            this.strGraphviz+=raiz.id+"[label=\""+raiz.id+"\"];\n"
            if(raiz.izquierda!=null){this.strGraphviz+=raiz.id+"->"+raiz.izquierda.id+";\n"}
            if(raiz.derecha!=null){this.strGraphviz+=raiz.id+"->"+raiz.derecha.id+";\n"}
            this.anidarNodosGrafica(raiz.izquierda);
            this.anidarNodosGrafica(raiz.derecha);
        }
    }//fin anidacion nodos grafica

    graficar(){
        this.strGraphviz="digraph G { \n";
        this.anidarNodosGrafica(this.raiz);
        this.strGraphviz+="\n}"
        //console.log(this.strGraphviz);
        return this.strGraphviz        
    }//fin graficar

    post_orden(){
        this.post_orden_interno(this.raiz)
    }

    post_orden_interno(raiz){
        if(raiz!=null){
            this.post_orden_interno(raiz.izquierda)
            this.post_orden_interno(raiz.derecha)
        console.log(raiz.id)
        }
    }

    inorden(){
        this.inordenII(this.raiz)
    }

    inordenII(raiz){
        if(raiz!=null){
            this.inordenII(raiz.izquierda)
            console.log(raiz.id)
            this.inordenII(raiz.derecha)
        }
    }

    preorden(){
        this.preordenII(this.raiz)
    }

    preordenII(raiz){
        if(raiz!=null){
            console.log(raiz.id)
            this.preordenII(raiz.izquierda)
            this.preordenII(raiz.derecha)
        }
    }



}// fin abb

var prueba = new abb()

prueba.insertar("F")
prueba.insertar("B")
prueba.insertar("A")
prueba.insertar("D")
prueba.insertar("C")
prueba.insertar("E")
prueba.insertar("G")
prueba.insertar("I")
prueba.insertar("H")
//prueba.post_orden()
//prueba.inorden()
prueba.preorden()
var miau = prueba.graficar()

d3.select("#grafica").graphviz()
.width(2000)
.height(3000)
.renderDot(miau)