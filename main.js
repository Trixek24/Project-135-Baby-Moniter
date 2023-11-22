var objects = [];
var song = "";

function preload()
{
    song = loadSound("ring.mp3");
}

function setup()
{
    
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}


function draw()
{
    
    image(video, 0, 0, 380, 380);

    

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(255,255,255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(255,255,255);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[0].label == "person")
            {
            document.getElementById("baby_status").innerHTML = "Baby Detected";
            song.pause();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby Not Detected";
            song.play();
            }

            if(objects.length == 0)
            {
            document.getElementById("baby_status").innerHTML = "Baby Not Detected";
            song.play();
            }
        }
        
    }
}

function modelLoaded()
{
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(video, gotResult);
    
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }

    
}