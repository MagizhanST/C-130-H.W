Blue_song="";
Wellerman_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Blue = "";
song_Wellerman = "";

function setup(){
    canvas = createCanvas(640,480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Blue_song = loadSound("music.mp3");
    Wellerman_song = loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,640,480);

    fill("#00ff00");
    stroke("#ff0000");

    song_Blue = Blue_song.isPlaying();
    console.log(song_Blue);

    song_Wellerman = Wellerman_song.isPlaying();
    console.log(song_Wellerman);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Wellerman_song.stop();
        if(song_Blue == false){
            Blue_song.play();
        }
        else{
            console.log("Song Name: Blue (Da Ba Dee)");
            document.getElementById("song_id").innerHTML = "Song Name: Blue (Da Ba Dee)";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Blue_song.stop();
        if(song_Wellerman == false){
            Wellerman_song.play();
        }
        else{
            console.log("Song Name: Wellerman (Sea Shanty)");
            document.getElementById("song_id").innerHTML = "Song Name: Wellerman (Sea Shanty)";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}