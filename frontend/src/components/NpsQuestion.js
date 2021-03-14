const populateChoices = (min, max) => {
  let choices = []
  let i, value

  for (i = 0, value = min; value <= max; i++, value++) {
    choices[i] = value
  }

  return choices
}

function NpsQuestion({ question, register, errors }) {
  const choices = populateChoices(question.range_min, question.range_max)
  const required = question.required ? ' *' : ''

  return (
    <div className='form-control'>
      <h4>{question.label}{required}</h4>
      {choices.map((choice, index) => (
        <label>
          <input
            key={index}
            type='radio'
            id={index}
            name={question.name}
            value={choice}
            ref={register({ required: question.required })}
          />
          {choice}
        </label>
      ))}

      {errors[question.name] && <p className='errors'>
        Please, give an answer.
      </p>}
    </div>
  )
}

export default NpsQuestion
