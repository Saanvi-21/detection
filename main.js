status ="";
objects= [];


function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";



}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function draw(){ 
    image(video, 0, 0, 640, 420);
   if (status != ""){ 

    r = random(255);
    g = random(255);
    b = random(255);
     for (i=0; i < objects.length; i++){
         
        
        document.getElementById("status").innerHTML = "Status: Object - Detected";
        document.getElementById("number").innerHTML = "Number of objects detected are "+ objects.length;
        fill(r,b,g);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y);
        noFill();
        stroke(r,b,g);
        rect(objects[i].x, objects[i].y, objects[i].width ,objects[i].height);
       }
    }
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }

}