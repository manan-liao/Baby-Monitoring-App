status = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function modelLoaded(){
    console.log("modelloaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
    
        for(i = 0;i < objects.length;i++){
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Detected";
            }
            else if(objects[i].label != "person"){
                document.getElementById("status").innerHTML = "Baby not detected";
            }
            if(objects.length < 0){
            document.getElementById("status").innerHTML = "Baby not detected";
            } 
        
            document.getElementById("number_objectdetector").innerHTML = "number-object detected = "+objects.length;
            fill(r,g,b);
            textSize(20);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

