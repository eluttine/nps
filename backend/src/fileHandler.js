const { EPROTONOSUPPORT } = require('constants')
const fs = require('fs')

const SURVEYS_DIR = 'surveys'
const ANSWERS_DIR = 'answers'

exports.readSurvey = (surveyId) => {
  const filePath = `${SURVEYS_DIR}/${surveyId}.json`

  try {
    return readFile(filePath)
  } catch (err) {
    console.error(`Cannot read file ${filePath}: ${err.message}`)
  }
}

exports.createOrUpdateAnswerFile = (answer) => {
  const filePath = `${ANSWERS_DIR}/answer-${answer.answer_id}.json`
  delete answer.page_id

  if (fs.existsSync(filePath)) {
    // update data on file
    const data = readFile(filePath)
    answer.questions.forEach((x) => data.questions.push(x))
    writeFile(filePath, data);
  } else {
    // create a new file with data
    writeFile(filePath, answer);
  }
}

const readFile = (filePath) => {
  const rawdata = fs.readFileSync(filePath);
  return JSON.parse(rawdata);
}

const writeFile = (filePath, data) => {
  const json = JSON.stringify(data, null, 4);
  fs.writeFileSync(filePath, json);
}