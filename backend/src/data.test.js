const { findSurvey, findNextPage } = require('./data')


test('finds survey with correct id', () => {
  expect(findSurvey('survey1').survey_id).toBe('survey1');
})

test('finds page after lessthan passes after nps result', () => {
  const questions = [{
      "name": "nps",
      "answer": "6"
    }]
  const nextPage = findNextPage('survey1', 'page1', questions)
  expect(nextPage.id).toBe('page2');
})

test('finds page after greaterthan passes after nps result', () => {
  const questions = [{
      "name": "nps",
      "answer": "7"
    }]
  const nextPage = findNextPage('survey1', 'page1', questions)
  expect(nextPage.id).toBe('page3');
})

test('finds page after question1', () => {
  const questions = [{
      "name": "question1",
      "answer": "answer text"
    }]
  const nextPage = findNextPage('survey1', 'page2', questions)
  expect(nextPage).toBe(undefined);
})

test('finds page after question2', () => {
  const questions = [{
      "name": "question2",
      "answer": "answer text"
    }]
  const nextPage = findNextPage('survey1', 'page3', questions)
  expect(nextPage).toBe(undefined);
})
