import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import uuid from 'react-uuid';

import Header from './Header'
import NotFound from './NotFound'
import Page from './Page'
import ThankYou from './ThankYou'

function Survey() {
  const { id } = useParams()
  const [survey, setSurvey] = useState()
  const [page, setPage] = useState()

  useEffect(() => {
    async function doRequest() {
      const response = await fetch(`http://localhost:5000/surveys/${id}`)
      if (response.ok) {
        const data = await response.json()
        setSurvey({
          survey_id: data.survey_id,
          thank_you_text: data.thank_you_text,
          answer_id: uuid()
        })
        setPage(data.first_page)
      }
    }
    doRequest()
  }, [id])

  return (
    <div>
      {survey ? (
        <>
          <Header />
          {page ?
            <Page survey={ survey } page={ page } setPage={ setPage } />
            : <ThankYou text={survey.thank_you_text} />}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default Survey
