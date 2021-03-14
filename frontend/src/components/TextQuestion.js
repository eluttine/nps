function TextQuestion({ question, register, errors }) {
  const required = question.required ? ' *' : ''

  return (
    <div>
      <h4>{question.label}{required}</h4>
      <textarea
        name={question.name}
        ref={register({ required: question.required })}
      />
      {errors[question.name] && <p className='errors'>
        Please, give an answer.
      </p>}
    </div>
  )
}

export default TextQuestion
