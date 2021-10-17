Objects=[];
Status="";
video="";
function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas=createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(Status!="")
{
    object_detector.detect(video, gotresult);
    for(i=0; i<objects.length; i++)
    {
        document.getElementById("status").innerHTML="status:Objects Detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects Detected:Objects Detected"+ objects.length;

        Fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+""+ percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

}
}
function gotresult(error, results)
{
   if(error)
{
    console.log(error);
}
console.log(results);
objects=results;
}
function start()
{
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";

}
function modelLoaded()
{
    console.log("model is loaded");
    Status=true;
    video.loop();
    video.speed(2);
    video.volume(2);
}