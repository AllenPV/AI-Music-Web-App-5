Avengers = "";
HarryPotter = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
    Avengers = loadSound("The Avengers Theme Song.mp3");
    HarryPotter = loadSound("music.mp3");
}

function setup() {
    Canvas = createCanvas(400, 400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model is loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	song1_status = Avengers.isPlaying();
	song2_status = HarryPotter.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			HarryPotter.stop();

		if(song1_status == false)
		{
			Avengers.play();
			document.getElementById("song_name").innerHTML = "Playing - Avengers Theme Song"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			Avengers.stop();

		if(song2_status == false)
		{
			HarryPotter.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

}