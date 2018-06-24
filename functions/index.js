const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const uuids = require('uuid-v4');

const gcconfig = {
  projectId: 'shareplaces-208010',
  keyFilename: 'shareplaces.json'
};

const gsc = require('@google-cloud/storage')(gcconfig);

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
      console.log(err);
      return response.status(500).json({error: err});
    });
    const bucket = gsc.bucket('shareplaces-208010.appspot.com');
    const uuid = uuids();
    bucket.upload('/tmp/uploaded-image.jpg', {
      uploadType: 'media',
      destination: '/places/' + uuid + '.jpg',
      metadata: {
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadTokens: uuid
        }
      }
    }, (err, file) => {
      if(!err) {
        response.status(201).json({
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
            bucket.name + '/o/' + encodeURIComponent(file.name) + '?alt=media&token=' + uuid
        });
      } else {
        console.log(err);
        respose.status(500).json({error: err})
      }
    });
  });
});
