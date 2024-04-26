import { useState, useEffect } from 'react'
import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';

import './styles/App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [summaryResults, setSummaryResults] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    setDisabled(true)
    e.preventDefault()
  }

  useEffect(() => {
    if (loading && disabled) {
      const url = "http://127.0.0.1:8000/news_summary/topic=" + searchInput 
      axios.get(url).then((response) => {  
        setSummaryResults(response.data["news_summary"])
      })  
    }
  }, [loading, disabled, searchInput])

  useEffect(() => {
    if (summaryResults) {
      setLoading(false)
      setDisabled(false)
    }
  }, [summaryResults])


  // const processSummaryResult = (summary: {"news_summary": string, "news_article": SearchResults}) => {
  //   return summary["news_summary"]
  // }

  return (
    <>
      <h1 id='app-title'> News Summarizer </h1>
      <div className="search-container">
        <form id="search-form" action="search" method="GET">
          <input 
            id="search-bar"
            name="topic"
            type="text"
            placeholder="Enter a news topic!"
            value={searchInput}
            onChange={handleChange}
          />
          <button id="summary-button" type="submit" onClick={handleOnClick} disabled={disabled}> 
            Search 
          </button>
          <div id="summary-loading-animation">
            {loading && <CircularProgress />}
          </div> 
        </form>
        <div className="summary-container">
          <p>
            {summaryResults}
          </p>
        </div>
      </div>
    </>
  )
}

export default App