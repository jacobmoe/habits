const path = require('path')

module.exports = {
  dataDirPath: path.join(__dirname, 'data'),
  buildDirPath: path.join(__dirname, '../build'),
  habitsDataFilename: "Checkmarks.csv",
  habitsDescriptionFilename: "Habits.csv"
}
