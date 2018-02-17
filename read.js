var tesseract = require('node-tesseract');

// Recognize text of any language in any format
tesseract.process('/tmp/test.jpg',options,function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});

// Recognize German text in a single uniform block of text and set the binary path

var options = {
    l: 'eng',
    psm: 6,
    binary: '/usr/bin/tesseract'
};
/*
tesseract.process(__dirname + '/path/to/image.jpg', options, function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});*/
