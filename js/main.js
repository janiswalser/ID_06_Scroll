/**
 * Created by janis on 18/12/16.
 */

$("#output").scroll(function(){
    x += 1;
});



var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;


var output = document.getElementById('output');
var output2 = document.getElementById('output2');
var progress = document.getElementById('progress');
var background = document.getElementById("bg");

var $sound = $('#sound');

var posthumb;
var thumbStart, thumbMid, indexStart, indexEnd, indexMid;
var vectorBetweenIndexStart;
var mainValue = 100;
var trackMovement = false;
var posEnter;
var saveMainValue;
var firstDistance;
var distance;

var color = 0;
var g = 40;
var soundIn2 = false;
var tap = 1;
var aktion = false;
var active = false;
var timer;
var ausgabe = 0;
var tapTimeout = null;





var controllerTest = Leap.loop(function(frame){



    if (HandIn && soundIn) {
        $.playSound("data/txting_press_b");
        soundIn = false;
    }
    else if (!HandIn && !soundIn){
        $.playSound("data/txting_press_a");
        soundIn = true;
    }

    HandIn = false;

    // $(function() {
    //     $('#edit').froalaEditor()
    // });






});






Leap.loop({background: true}, {


    hand: function (hand) {
        HandIn = true;



        posthumb = hand.fingers[0].dipPosition[0];

        // defi. Finger
        thumbStart = new Vector(hand.fingers[0].dipPosition[0],hand.fingers[0].dipPosition[1],hand.fingers[0].dipPosition[2]);
        thumbMid = new Vector(hand.fingers[0].pipPosition[0],hand.fingers[0].pipPosition[1],hand.fingers[0].pipPosition[2]);
        indexStart = new Vector(hand.fingers[1].dipPosition[0],hand.fingers[1].dipPosition[1],hand.fingers[1].dipPosition[2]);
        indexMid = new Vector(hand.fingers[1].pipPosition[0],hand.fingers[1].pipPosition[1],hand.fingers[1].pipPosition[2]);
        indexEnd = new Vector(hand.fingers[1].mcpPosition[0],hand.fingers[1].mcpPosition[1],hand.fingers[1].mcpPosition[2]);
        var middlecarp = new Vector(hand.fingers[2].pipPosition[0],hand.fingers[2].pipPosition[1],hand.fingers[2].pipPosition[2]);
        var indexcarp = new Vector(hand.fingers[1].pipPosition[0],hand.fingers[1].pipPosition[1],hand.fingers[1].pipPosition[2]);

        // TAP Back -----------------------------------------------------------------------------------

        // var abstandThumbIndexToIndexMCP = vectorBetweenPoints(thumbMid,indexStart).length();
        // console.log(abstandThumbIndexToIndexMCP);
        //
        // // Tappen
        // if (abstandThumbIndexToIndexMCP > 70 && trackMovement == false) {
        //     console.log('TAP-Right');
        //
        //
        // }






        // TAP -----------------------------------------------------------------------------------



//         // Adistance from thumb to indexMid
//         var verbindungsvektor = vectorBetweenPoints(thumbStart,indexMid);
//         var abstand0zu1 = verbindungsvektor.length();
//
//
//         // Adistance from thumb to indexStart
//         var abstandThumbIndex = vectorBetweenPoints(thumbStart,indexStart).length();
//
//         // Tappen
//         if (abstandThumbIndex < 40 && trackMovement == false) {
//             console.log('TAP-Left');
//             clearTimeout(tapTimeout);
//             tapTimeout = setTimeout(function(){
//
//                 pressA();
//                 /*
//                 var e = jQuery.Event("keyup");
//
//
// // e.which is used to set the keycode
//                 e.which = 97; // it is up
//                 e.which = 97; // it is down
//                 $("#tastaturTest").trigger(e);
//                 console.log(e);
//
//
//                 var e = jQuery.Event("keyup");
//                 e.which = 41; // # Some key code value
//                 $("#tastaturTest").trigger(e);
//
//                 console.log(e);
//
//                 alert(String.fromCharCode(e.keyCode));
//
// */
//
//             }, 50);
//
//
//         }




        // Slide -----------------------------------------------------------------------------------


        vectorBetweenIndexStart = vectorBetweenPoints(middlecarp, indexcarp);
        // console.log(vectorBetweenIndexStart.length());
        lineindex = new Line(middlecarp,vectorBetweenIndexStart);
        distance = lineindex.distanceFromPoint(thumbStart);
        console.log(distance);
        var threshold = 25;
        var multiplier = 10;

        //enter tracking
        if(distance < threshold && trackMovement == false){
            console.log("enter");
            trackMovement = true;
            posEnter = thumbStart;

            var diffVector = vectorBetweenPoints(posEnter, indexcarp);
            firstDistance = diffVector.length();
        }


        //tracking
        if(distance < threshold && trackMovement == true ) {


                // timer = setTimeout(function(){ active = true}, 2000);

                //
                // if(active) {

                // console.log('SCROLL');
                diffVector = vectorBetweenPoints(posEnter, thumbStart);
                var diffLength = diffVector.length();

                diffVector = vectorBetweenPoints(thumbStart, indexcarp);
                var newDistance = diffVector.length();

                if (newDistance > firstDistance) {
                    saveMainValue = mainValue - diffLength * multiplier;
                }
                else {
                    saveMainValue = mainValue + diffLength * multiplier;
                }


                ausgabe = Math.round(saveMainValue);
                window.scroll(10,ausgabe);
                // console.log(ausgabe);
                $('#output').css('height', ausgabe);


            // var scroll = 0;
            // $(window).scroll(function() {
            //     scroll++;
            //     // if (j <= 4) {
            //     //     // if (scroll % 25 == 0) {
            //     //     //     j++;
            //     //     //     t = t + 24;
            //     //     //     initYear();
            //     //
            //     //     }
            //
            // });
            //}
        }


            // else {
        //     clearTimeout(timer);
        //         active = false;
        // }


        //exit tracking
        if(distance >= threshold && trackMovement == true){
            trackMovement = false;
            mainValue = saveMainValue;
            aktion = false;

            $('#output').css('font-weight', 'normal');
            console.log("exit");
        }



    }



    //---------------------------trigger-----------------------------------





});




// Allow usage of pints
function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

// Add two vectors
Vector.prototype.add = function(vector) {
    var vx = this.x + vector.x;
    var vy = this.y + vector.y;
    var vz = this.z + vector.z;
    return new Vector(vx,vy,vz);
}

Vector.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector.prototype.subtract = function(vector) {
    var vx = this.x - vector.x;
    var vy = this.y - vector.y;
    var vz = this.z - vector.z;
    return new Vector(vx,vy,vz);
}

Vector.prototype.multiply = function(vector) {
    var vx = this.x * vector.x;
    var vy = this.y * vector.y;
    var vz = this.z * vector.z;
    return new Vector(vx,vy,vz);
}

Vector.prototype.divide = function(vector) {
    var vx = this.x / vector.x;
    var vy = this.y / vector.y;
    var vz = this.z / vector.z;
    return new Vector(vx,vy,vz);
}

Vector.prototype.crossProduct = function (vector) {
    var vx = (this.y * vector.z) - (this.z * vector.y);
    var vy = (this.z * vector.x) - (this.x * vector.z);
    var vz = (this.x * vector.y) - (this.y * vector.x);

    return new Vector(vx, vy, vz);
}

function Line(a, b) {
    this.stuetzvektor = a || 0;
    this.richtungsvektor = b || 0;
}

Line.prototype.distanceFromPoint = function(p) {
    var pointMinusStuetzvektor = p.subtract(this.stuetzvektor);
    var naechsterSchritt = pointMinusStuetzvektor.crossProduct(this.richtungsvektor);
    var lengthieren = naechsterSchritt.length();
    var untereHaelfte = this.richtungsvektor.length();

    return lengthieren/untereHaelfte;
};



////////////////////////////////////////

function vectorBetweenPoints(a,b) {
   var vx = a.x - b.x;
   var vy = a.y - b.y;
   var vz = a.z - b.z;
    return new Vector(vx,vy,vz);
}

function map(value, f1, t1, f2, t2) {
    return f2 + (t2 - f2) * (value - f1) / (t1 - f1);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
