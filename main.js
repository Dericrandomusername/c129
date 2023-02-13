
Webcam.set({
width:350,
height:300,
image_format:"png",
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src='"+data_uri+"' >";
    })
}
console.log("ml5 version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HKEdFstLY/model.json",modelLoaded);
function modelLoaded(){
    console.log("model has been loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speakData1="first prediction is "+prediction_1;

    var utterThis=new SpeechSynthesisUtterance(speakData1)
    synth.speak(utterThis);
}
function check(){
    var img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
    
            }
     function gotResult(error,results){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            prediction_1=results[0].label;
           
            document.getElementById("result_emotion_name").innerHTML=prediction_1;
          
            speak();
            if(prediction_1=="proper mask"){
                document.getElementById("update_emoji").innerHTML="&#entrance allowed";
            }
            if(prediction_1=="inproper"){
                document.getElementById("update_emoji").innerHTML="&#entrance denied";
            }
            if(prediction_1=="no mask"){
                document.getElementById("update_emoji").innerHTML="&#entrance denied";
            }

        }
     }