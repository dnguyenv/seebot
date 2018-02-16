exports.SpeechToText = {
  "password": "",
  "username": "-155c-443a-b776-",
  "version": "v1"
}
// You can change the voice of the robot to your favorite voice.
// Some of the available options are:
// en-US_AllisonVoice
// en-US_LisaVoice
// en-US_MichaelVoice (the default)
//  en-GB_KateVoice
//Credentials for Watson Text to Speech service
exports.TextToSpeech = {
  "voice": "es-ES_LauraVoice",
  "password": "",
  "username": "-1273-4a06-b07a-",
  "version": "v1"
}

exports.VisualRecognition = {
  credentials: {
    visual_recognition: {
      api_key: ''
    }
  },
  configuration: {
    robot: {
      gender: 'male',
      name: 'An'
    },
    see: {
      confidenceThreshold: {
        object: 0.5, // only list image tags with confidence > 0.5
        text: 0.5 // only list text tags with confidence > 0.5
      },
      camera: {
        height: 720,
        width: 960,
        verticalFlip: false, // flips the image vertically, may need to set to 'true' if the camera is installed upside-down
        horizontalFlip: false // flips the image horizontally, should not need to be overridden
      }
    }

  }
}

exports.Speak = {
  "see": "OK , give me some seconds please",
  "recognize": "Alright, I am processing it, please give me some seconds",
  "greet": "Hi, how are you doing? I am Thien An bot. What can I do for you?"
}
