
const Upload = require('s3-uploader');
const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const s3 = require('./../s3config');
const Promise = require('bluebird');


const shippingListFile = '../shippingData/shippingList.txt';
const clarifaiTagFile = '../shippingData/clarifaiTags.txt';

const clarApp = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);

var tokenResponse;

clarApp.getToken().then( token => {
  tokenResponse = token;
});





var readClarfaiTags = () => {
  data = String(fs.readFileSync(clarifaiTagFile, 'utf8'));
  const lines = data.split('\n');
  const tags = lines.map( line => { return line.trim(); });
  return tags;
}


exports.readClarfaiTags = readClarfaiTags;



var readClarfaiItems = () => {
  data = String(fs.readFileSync(shippingListFile, 'utf8'));
  const lines = data.split('\n');
  const items = lines.map( line => { return line.trim(); });
  return items;
}

exports.readClarfaiItems = readClarfaiItems;


exports.saveAndUpload = (filePath, photoData) => {
  const savePromise = new Promise( (resolve, reject) => {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });

  return savePromise.then( (success) => {
    console.log('saved image');
    return new Promise( (resolve, reject) => {
      s3.upload(filePath, {}, (err, versions) => {
        console.log('done with upload');
        if (err) {
          reject(err);
        } else if (versions.length < 1) {
          reject('No images uploaded');
        } else {
          const imageUrl = versions[versions.length - 1].url;
          resolve(imageUrl);
        }
      });
    });
  });
};

exports.getClarifaiToken = () => {
  console.log('token', tokenResponse.access_token);
  return tokenResponse.access_token;
};


var getMatches = tag => {
  var checkList = [tag];
  if (tag in nameMappings) {
    checkList.push(nameMappings[tag]);
  }
  var matches = [];
  items2check.forEach( item => {
    var lowered = item.toLowerCase();
    for (var i = 0; i < checkList.length; i ++) {
      var tagcheck = checkList[i];
      console.log('check', tagcheck, item);
      if (lowered.includes(tagcheck)) {
        matches.push(item);
        break;
      }
    }
  });
  return matches;
}


exports.predict = imageUrl => {
  //return clarifaiModel.predict(imageUrl);
  return clarApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then( response => {
    const data = response.data.outputs[0].data.concepts;
    console.log('response', data);
    var possibilities = [];
    for (var i = 0; i < data.length; i ++) {
      var tag = data[i].name;
      var result = getMatches(tag);
      possibilities = possibilities.concat(result);
    }
    console.log('possibilities', possibilities);
    return possibilities;
  },
  err => {
    throw err;
  });
};




