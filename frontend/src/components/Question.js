import NpsQuestion from './NpsQuestion'
import TextQuestion from './TextQuestion'

function Question({ index, question, register, errors }) {
  return (
    <div>
      {question.type === 'nps' && (
        <NpsQuestion
          question={question}
          register={register}
          errors={errors}
        />
      )}
      {question.type === 'textarea' && (
        <TextQuestion
          question={question}
          register={register}
          errors={errors}
        />
      )}
    </div>
  )
}

export default Question
