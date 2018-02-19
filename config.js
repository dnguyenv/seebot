exports.SpeechToText = {
  "password": "put_your_credentials_here",
  "username": "put_your_credentials_here",
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
  "voice": "en-US_LisaVoice",
  "password": "put_your_credentials_here",
  "username": "put_your_credentials_here",
  "version": "v1"
}

exports.VisualRecognition = {
  credentials: {
    visual_recognition: {
      api_key: 'put_your_credentials_here'
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
  "know": "Sure, let me give it a try, please wait for a moment",
  "greet": "Hi! Chuc mung nam moi! I am Thien An bot. What can I do for you?",
  "read": "Ok, give me a moment please"
}
