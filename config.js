exports.SpeechToText = {
  "password": "",
  "username": "",
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
  "username": "6f249b5e-",
  "version": "v1"
}

exports.VisualRecognition = {
  api_key: ''
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

exports.Pins = {
  "LIGHT_PIN": 36
}

exports.Speak = {
  "on": "Alright, I'm turning the light on for you, stay turned",
  "off": "Cool, no worry, I'm turning the light off for you now",
  "bye": "OK, take care, goodbye",
  "pop": "OK , I'm turning the light off",
  "see": "OK , give me some seconds"
}
