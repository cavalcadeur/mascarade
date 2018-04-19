// Module contenant la fonction de dessin.

var Draw = function(){
    
    var onGoing;
    var goalText;
    var currentText;
    var timerText = 2;
    var longTimeText = 5;
    var nLettre = 2;
    var persos = {};
    var imagePerso,imageDecor;
    var posPersoX = 0;
    var posPersoY = 0;

    function drawImage(){
        ctx.drawImage(imageDecor,0,0,W,H);
        ctx.drawImage(imagePerso,posPersoX,posPersoY);
    }

    function drawBlank(){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0,0,W,H);
    }

    
    return {

        start: function(){

            onGoing = true;
            
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0,0,W,H);
            this.draw = drawBlank;

            var that = this;
            
            // Boucle de dessin.
            var f = function(t){
                // Partie affichage du texte.
                timerText -= 1;
                if (timerText <= 0){
                    timerText = longTimeText;
                    for (var i = 0;i < nLettre;i++){
                        var letter = goalText.charAt(currentText.length);
                        currentText += letter;
                        if (letter == ".") timerText += 20 + rnd(6);
                    }
                    alert(currentText);
                }
                that.draw();
                if (onGoing) window.requestAnimationFrame(f);
            };
            window.requestAnimationFrame(f);
        },

        load: function(current){
            this.alert(current[1]);
            this.draw = drawBlank;
            persos = {};
            for (var i = 2;i < current.length;i+=2){
                persos[current[i]] = [current[i+1],new Image(),new Image()];
                persos[current[i]][1].src = "images/persos/" + current[i] + ".png";
                persos[current[i]][2].src = "images/decors/" + current[i+1] + ".png";
            }
        },

        show: function(nom,pos){
            imageDecor = persos[nom][2];
            imagePerso = persos[nom][1];
            this.draw = drawImage;
            if (pos == "middle"){
                posPersoX = 0;
                posPersoY = 0;
            }
        },

        draw: function(){

        },

        alert: function(msg){
            goalText = msg;
            currentText = "";
        },

        testText: function(){
            if (goalText != currentText){
                currentText = goalText;
                return false;
            }
            else {
                return true;
            }
        }

    };
};
