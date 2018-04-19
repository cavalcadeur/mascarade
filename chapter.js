// Module contenant la fonction chapter qui va s'occuper de charger un chapitre à partir de son nom et de le jouer.

var Chapter = function(){

    var data;
    var drawer;
    var position = 0;
    var internCtx;
    



    return {

        start: function(name,invent,graphique,context){
            // Entree : name/string inventaire/objet 
            // Fonction qui lance le chapitre name.

            drawer = new graphique();
            position = 0; // On commence à la première diapo.
            internCtx = context;
            
            var requestURL = "chapters/" + name + ".json";
            var request = new XMLHttpRequest();
            request.open("GET",requestURL);
            request.responseType = 'json';
            request.send();
            console.log(drawer);
            var that = this;
            request.onload = function(){
                data = request.response;
                // les données sont arrivées, on lance donc la fonction drawer.
                // On setup le drawer et on s'arrète là. En effet, le dialogue n'avance que lorsque le joueur clique donc on attend ce moment.
                // Cependant le drawer a besoin d'afficher des trucs quand même. Alors on lance la première action.
                that.diapo();
                drawer.start(); // Le drawer commence sa boucle de dessin.
            };
        },

        diapo: function(){
            // Dans cette fonction, on joue le plan actuel puis on incrémente le compteur pour passer au plan suivant.
            var current = data[position];
            
            if (current[0] == "load"){
                drawer.load(current);
            }
            else if (current[0] == "text"){
                drawer.show(current[1],current[3]);
                drawer.alert(current[2]);
            }
            position += 1;
        },

        touch: function(){
            // Quelqu'un touche l'écran. Cette fonction va déterminer ce qu'il faut faire.
            if (drawer.testText()){
                this.diapo();
            }
        }

    };
};


/*
 Structures de données pour les diapos.

   - Les load contiennent d'abord un texte puis plusieurs couples perso/lieux
   - Les text contiennent un couple perso/texte puis optionnellement la position dans le cadre.
   - Les puzzle contiennent plusieurs couples solutions/position
   - Les jump contiennent un élément position
*/
