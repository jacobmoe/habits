const fs = require('fs')
const unzip = require('unzip')
const path = require('path')
const csv = require('csv')
const moment = require('moment')

const {
  dataDirPath,
  buildDirPath,
  habitsDataFilename,
  habitsDescriptionFilename
} = require('./constants')

const descriptionCsvColumnOrder = [
  'position',
  'name',
  'description',
  'numRepetitions',
  'interval',
  'color'
]

const activityPerformedIndicator = '2'

async function transform (zipFilePath) {
  try {
    const descriptionCsvData = await csvDataFromZip(
      zipFilePath,
      habitsDescriptionFilename
    )

    const dataFileCsvData = await csvDataFromZip(
      zipFilePath,
      habitsDataFilename,
      (row) => {
        // only want data for a year
        if (moment(row[0], 'YYYY-MM-DD').isValid()) {
          if (moment(new Date()).diff(moment(row[0]), 'days') > 365) {
            return false
          }
        }

        return true
      }
    )

    const res = buildDataCollection(descriptionCsvData, dataFileCsvData)
    await saveData(res, path.join(dataDirPath, 'data.json'))
    await saveData(res, path.join(buildDirPath, 'data.json'))

    console.log("saved data json")
  } catch (err) {
    console.log("error building data from zip: ", err)
    throw err
  }
}

function saveData(data, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function buildDataCollection(descCsv, dataCsv) {
  let res = buildBaseCollection(descCsv);
  let colNames = dataCsv[0]

  for (let rowNum = 1; rowNum < dataCsv.length; rowNum++) {
    let row = dataCsv[rowNum]
    let activitiesOnDate = []
    let habits = res["habits"]

    Object.keys(res["habits"]).forEach((habitName) => {
      let dataCsvHabitRowIndex = colNames.indexOf(habitName)

      if (row[dataCsvHabitRowIndex] === activityPerformedIndicator) {
        activitiesOnDate.push(habitName)
      }
    })

    res["dates"][row[0]] = activitiesOnDate
  }

  return res

}

function buildBaseCollection(descCsv) {
  let res = {"habits": {}, "dates": {}}

  // skip first row - it's the header
  for (let rowNum = 1; rowNum < descCsv.length; rowNum++) {
    let row = descCsv[rowNum]

    let info = {}
    for (let colNum = 0; colNum < row.length; colNum++) {
      info[descriptionCsvColumnOrder[colNum]] = row[colNum]
    }

    const habitName = row[descriptionCsvColumnOrder.indexOf("name")]
    res["habits"][habitName] = info
  }

  return res
}

function csvDataFromZip (zipFilePath, filename, collectDataCondition) {
  return new Promise((resolve, reject) => {
    let results = []

    const readStream = fs.createReadStream(zipFilePath)
    const parser = csv.parse()
    collectDataCondition = collectDataCondition || (() => (true))

    parser.on('data', (chunk) => {
      if (collectDataCondition(chunk)) {
        results.push(chunk)
      }
    })

    parser.on('finish', () => {
      resolve(results)
    })

    parser.on('error', reject)

    readStream
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        var entryName = entry.path;

        if (entryName === filename) {
          entry.pipe(parser);
        } else {
          entry.autodrain();
        }
      })
      .on('end', () => {
        parser.close()
      })
  })
}

module.exports = transform
