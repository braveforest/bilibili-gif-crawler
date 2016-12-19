var fs = require('fs');
var request = require('request');
var jsonUrl = 'http://www.bilibili.com/index/index-icon.json';

getJsonFile(jsonUrl); // get json icon file, and save to gif file

function getJsonFile(url) {
  request({
    url: url,
    gzip: true
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log('====== uccessfull getJsonFile======');
      var result = JSON.parse(body);
      for (var i = 0; i < result.fix.length; i++) {
        saveGif(result.fix[i].icon, result.fix[i].title);
      }
    } else {
      console.log('=======Error info=======', err, 'Code: ' + res.statusCode);
      return false;
    }
  });
}

function saveGif(url, title) {
  request(url).pipe(fs.createWriteStream('./gif/' + title + '.gif'));
  console.log(title + ' => downloaded');
}


