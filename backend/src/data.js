const { readSurvey } = require('./fileHandler')
const { NotFound } = require('./utils/errors');

exports.findSurvey = (surveyId) => {
  try {
    const data = readSurvey(surveyId)
    return ({
      survey_id: data.survey_id,
      thank_you_text: data.thank_you_text,
      first_page: data.pages?.[0]
    })
  } catch (err) {
    throw new NotFound(`Survey not found with id ${surveyId}`)
  }
}

exports.findNextPage = (surveyId, currentPageId, questionAnswers) => {
  const data = readSurvey(surveyId)

  if (surveyId === data.survey_id) {
    let page
    
    // find index of current page
    const currentPageIndex = data.pages.findIndex(x => x.id === currentPageId);
    const currentPageQuestions = data.pages[currentPageIndex].questions

    // is this answer for NPS question?
    const isNpsQuestion = isThisNpsQuestion(currentPageQuestions, questionAnswers)
       
    if (isNpsQuestion) {
      // find next page which passes conditions
      for (let i = currentPageIndex + 1; i < data.pages.length; i++) {
        const pageForTest = data.pages[i]
        const answer = questionAnswers[0].answer

        if (doesPageConditionsPass(data, pageForTest, answer)) {
          page = pageForTest
          break
        }
      }
    } else {
      // find next page which doesn't have nps condition
      for (let i = currentPageIndex + 1; i < data.pages.length; i++) {
        // for now check only first condition
        if (!data.pages[i].conditions) {
          page = data.pages[i]
          break
        }
      }
    }

    if (page) {
      // next page found, prepare for response
      const nextPageId = getNextPageId(data, page.id)
      if (nextPageId) {
        page.next_page = nextPageId
      }

      delete page.conditions

      return page
    }
  }

}

/*
 * Finds out if this is a NPS question.
 * Rules:
 * - only one question in questions list
 * - question type must be 'nps'
 */
const isThisNpsQuestion = (currentPageQuestions) => {
  if (currentPageQuestions.length === 1 && currentPageQuestions[0].type === 'nps') {
    return true
  }

  return false
}


// Check if page has NPS conditions and do they pass
const doesPageConditionsPass = (data, pageToTest, npsValue) => {
  // const data = readSurvey()

  let ret = true

  if (!pageToTest.conditions) {
    return true
  }

  for (let j = 0; j < pageToTest.conditions.length; j++) {
    let condition = pageToTest.conditions[j]

    if (condition.question === 'nps') {
      if (condition.test === 'lessthan' && npsValue >= condition.value) {
        ret = false
      }
      if (condition.test === 'greaterthan' && npsValue <= condition.value) {
        ret = false
      }
    }
  }

  return ret
}

const getNextPageId = (data, pageId) => {
  for (let i = 0; i < data.pages.length; i++) {
    let page = data.pages[i]
    if (pageId === page.id && i + 1 < data.pages.length) {
      return data.pages[i + 1].id
    }
  }
}
