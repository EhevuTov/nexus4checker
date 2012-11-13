var https = require('https');

var options = {
  host: 'play.google.com',
  port: 443,
  path: '/store/devices/details?id=nexus_4_8gb',
  method: 'GET'
};

var checkInMseconds = 5000;
var pass = 0;
var arrayBuf = [];
arrayBuf[0] = '';
arrayBuf[1] = '';

setInterval(function(){
var req = https.request(options, function(res) {
  arrayBuf[pass] = '';

  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    arrayBuf[pass]+= chunk;
  });
  res.on('end', function () {
    if (arrayBuf[0] != arrayBuf[1]) {
      console.log('Different!');
    };
    pass++;
  });
});

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}, checkInMseconds);
