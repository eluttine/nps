import { useForm } from 'react-hook-form'
import Question from './Question'

const postAnswer = async (answer) => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answer)
  }
  const response = await fetch('http://localhost:5000/answer', request)
  if (response.ok) {
    const data = await response.json()
    return data.next_page
  }
}

function Page({ survey, page, setPage }) {
  const { register, handleSubmit, errors, reset } = useForm();

  // Handle form data and post to server
  const onSubmit = async (data) => {
    const answer = {}
    const questions = []

    for (let [key, value] of Object.entries(data)) {
      questions.push({name: key, answer: value})
    }

    answer.survey_id = survey.survey_id
    answer.page_id = page.id
    answer.answer_id = survey.answer_id
    answer.questions = questions

    const nextPage = await postAnswer(answer)
    setPage(nextPage)
    
    // e.target.reset()
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='survey-form'>
        {page.questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              register={register}
              errors={errors}
            />
          )
        )}
        <input type='submit' value='Next' className='btn' />
      </form>
    </div>
  )
}

export default Page
