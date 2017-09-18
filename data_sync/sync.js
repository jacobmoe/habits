// https://github.com/google/google-api-nodejs-client

const fs = require('fs')
const path = require('path')
const api = require('./config/drive')
const { dataDirPath } = require('./constants')
const transform = require('./transform')

const filenamePrefix = 'Loop Habits CSV'
let zipFileRegex = new RegExp(
  `${filenamePrefix} ([0-9]+)-([0-9]+)-([0-9]+).zip`
)

async function sync() {
  try {
    let auth = await api.authorize()
    const q = `name contains '${filenamePrefix}'`
    const driveFiles = await api.getFileList(auth, q)

    const lastTimestamp = await lastDownloadTimestamp()
    const nextFile = await nextDriveFile(api, auth, lastTimestamp)

    if (nextFile) {
      let filePath = await downloadFile(nextFile, auth)
      transform(filePath)
      console.log("downloaded", nextFile.name);
    } else {
      console.log('no new file to download')
    }
  } catch (err) {
    console.log("error: ", err)
  }
}

async function downloadFile(driveFile, auth) {
  return new Promise((resolve, reject) => {
    let f = fs.createWriteStream(path.join(dataDirPath, driveFile.name));
    f.on("finish", () => {
      f.close()
      resolve(f.path)
    });

    f.on("error", reject);

    api.getFile(driveFile, auth).pipe(f);
  })
}

async function nextDriveFile(api, auth, currentTimestamp) {
  const q = `name contains '${filenamePrefix}'`
  const driveFiles = await api.getFileList(auth, q)

  let filenames = driveFiles.map((f) => (f.name))
  let [nextTimestamp, index] = timestampOfMostRecentFile(filenames)

  if (nextTimestamp > currentTimestamp) {
    return driveFiles[index]
  }

  return null
}

function lastDownloadTimestamp() {
  return new Promise((resolve, reject) => {
    fs.readdir(dataDirPath, function(err, items) {
      if (err) {
        reject(err)
      } else {
        var [timestamp, index] = timestampOfMostRecentFile(items)

        resolve(timestamp)
      }
    });
  })
}

function timestampOfMostRecentFile(filenames) {
  let index = null, timestamp = null

  for (let i = 0; i < filenames.length; i++) {
    let t = timestampFromFilename(filenames[i])

    if (t) {
      if (!timestamp || t > timestamp) {
        timestamp = t
        index = i
      }
    }
  }

  return [timestamp, index]
}


function timestampFromFilename(filename) {
  let match = filename.match(zipFileRegex)

  if (match) {
    let t = parseInt(`${match[1]}${match[2]}${match[3]}`)
    if (!isNaN(t)) {
      return t
    }
  }

  return null
}

sync()
