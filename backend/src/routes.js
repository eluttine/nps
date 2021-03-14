const express = require('express')
const { findSurvey, findNextPage } = require('./data')
const { createOrUpdateAnswerFile } = require('./fileHandler')
const { BadRequest } = require('./utils/errors');

const router = express.Router()

// Getting survey
router.get('/surveys/:id', async (req, res, next) => {
  const surveyId = req.params.id

  try {
    const survey = findSurvey(surveyId)
    res.send(survey)
  } catch (err) {
    next(err)
  }
})

router.post('/answer', (req, res, next) => {
  const { survey_id, page_id, answer_id, questions } = req.body;

  try {
    if (!survey_id || !page_id || !answer_id || !questions) {
      throw new BadRequest('Missing required field(s): survey_id, page_id, answer_id or questions');
    }

    // save answer to JSON file
    createOrUpdateAnswerFile(req.body)

    // get next page if available
    const nextPage = findNextPage(survey_id, page_id, questions)

    res.status(201).json({
      'next_page': nextPage
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router 
