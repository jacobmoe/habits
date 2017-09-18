const fs = require('fs')
const unzip = require('unzip')
const path = require('path')
const csv = require('csv')

const {
  dataDirPath,
  habitsDataFilename,
  habitsDescriptionFilename
} = require('./constants')

async function transform (zipFilePath) {
  try {
    const descriptionCsvFilePath = await retrieveFileFromZip(
      zipFilePath,
      habitsDescriptionFilename
    )

    const dataFileCsvPath = await retrieveFileFromZip(
      zipFilePath,
      habitsDataFilename
    )
  } catch (err) {
    console.log("error building data from zip: ", err)
    throw err
  }
}

function retrieveFileFromZip (zipFilePath, filename) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(path.join(dataDirPath, filename))

    stream.on('finish', () => {
      resolve(stream.path)
    })

    stream.on('error', reject)

    fs.createReadStream(zipFilePath)
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        var entryName = entry.path;

        if (entryName === filename) {
          entry.pipe(stream);
        } else {
          entry.autodrain();
        }
      })
      .on('end', () => {
        stream.close()
      })
  })
}

module.exports = transform
