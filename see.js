/*
Thien An Bot recipe to recognize objects using Watson text to speech, Watson
speech to text, and Watson Visual Recognition service
Duy Nguyen (dnguyenv@us.ibm.com)
*/

var  watson = require('watson-developer-cloud'),
  config = require('./config'),
  exec = require('child_process').execSync,
  fs = require('fs'),
  Q = require('q'),
  text_to_speech = watson.text_to_speech(config.TextToSpeech),
  TJBot = require('tjbot'),
  speech_to_text = watson.speech_to_text(config.SpeechToText);

// Initiate Microphone Instance to Get audio samples
var mic = require('mic');
var hardware = ['camera'];
var tj = new TJBot(hardware, config.VisualRecognition.configuration, config.VisualRecognition.credentials);

var micInstance = mic({
  'rate': '44100',
  'channels': '2',
  'debug': false,
  'exitOnSilence': 6
});
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
  //console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
  console.log("Error in Input Stream: " + err);
});

micInputStream.on('silence', function() {
  // detect silence.
});
micInstance.start();

speak(config.Speak.greet);

console.log("Thien An bot is listening, you may speak now.");

var recognizeparams = {
  content_type: 'audio/l16; rate=44100; channels=2',
  model: 'en-US_BroadbandModel' // Specify your language model here
};

var textStream = micInputStream.pipe(
  speech_to_text.createRecognizeStream(recognizeparams)
);

textStream.setEncoding('utf8');
textStream.on('data', function(str) {
  console.log(' ===== Text recognized ===== : ' + str);
  parseText(str);
});

textStream.on('error', function(err) {
  console.log(' === Watson Speech to Text : An Error has occurred ====='); // handle errors
  console.log(err);
  console.log("Press <ctrl>+C to exit.");
});

/*Parse the recognized text to determine next step */

function parseText(text) {
  var containsRec = (text.indexOf("recognize") >= 0),
    containsCan = text.indexOf("can") >= 0,
    containsYou = text.indexOf("you") >= 0,
    containsDo = text.indexOf("do") >= 0,
    containsKno = (text.indexOf("know") >= 0),
    containsSee = (text.indexOf("see") >= 0);
  if ((containsDo || containsCan || containsYou) && (containsKno || containsSee || containsRec)){
    parseCommand(text);
    //console.log('test');
  }
}

var seeCommandList = ['see','sea','recognize','know'];

// reset the pin before exist
process.on('SIGINT', function() {
  process.nextTick(function() {
    process.exit(0);
  });
});

/*Further parsing the text to determine appropirate command*/

function parseCommand(text) {
  var words = text.split(" ");
  for (var i = 0; i < words.length; i++) {
    if (seeCommandList.indexOf(words[i])>-1) {
      var mapArr = ['see','recognize'];
      var rand = mapArr[Math.floor(Math.random() * mapArr.length)];
      processSeeCommand(rand);
      break;
    }
  }
}

/* Speak the sentence accordingly to the command, and switch the light*/

var processSeeCommand = function(command) {
  speak(config.Speak[command]);
  setTimeout(function() {
    takePicture().then(function(result) {
      tj.recognizeObjectsInPhoto(result)
      .then(function(objects){
        var str = objects[0].class;
        speak('OK, this looks like a ' + str);
      })
    })
  }, 5000);

}

var takePicture = function() {
  var d = Q.defer();
  const PiCamera = require('pi-camera');
  var out = '/tmp/test.jpg';
  const myCamera = new PiCamera({
    mode: 'photo',
    output: out,
    width: 960,
    height: 720,
    nopreview: true,
  });

  myCamera.snap()
    .then((result) => {
      console.log(out);
      d.resolve(out);
      // Your picture was captured
    })
    .catch((error) => {
      // Handle your error
    });
  return d.promise;
}

/* Stream the resuting audio data to file and play back*/

function speak(text) {
  //micInstance.stop();
  var params = {
    text: text,
    voice: config.TextToSpeech.voice,
    accept: 'audio/wav'
  };
  /* Streaming the resulting audio to file and play the file using aplay */
  text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav')).on('close', function() {
    var create_audio = exec('aplay output.wav', function(error, stdout, stderr) {
      if (error !== null) {
        console.log('Error occurred while playing back: ' + error);
      }
    });
  });
}
