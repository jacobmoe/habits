let google = require('googleapis');
let privatekey = require("./google_service_account_key.json");

let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/drive']
);

const drive = google.drive('v3')

module.exports = {
  authorize: () => {
    return new Promise((resolve, reject) => {
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
        } else {
          resolve(jwtClient)
        }
      });
    });
  },
  getFileList: (authClient, query) => {
    return new Promise((resolve, reject) => {
      drive.files.list({
        auth: authClient,
        q: query
      }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.files)
        }
      })
    });
  },
  getFile: (file, authClient) => {
    return drive.files.get({
      fileId: file.id,
      alt: 'media',
      auth: authClient
    })
  }
}
