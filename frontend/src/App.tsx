import { useState, useEffect } from "react"
import axios from "axios"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CircularProgress from "@mui/material/CircularProgress"

import "./styles/App.css"
import Footer from "./components/Footer"
import SummaryCard from "./components/SummaryCard"
import { Article } from "./types/News"

function App() {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [summaryResults, setSummaryResults] = useState<string>("")
  const [newsArticles, setNewsArticles] = useState<Article[]>([])

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
        setNewsArticles(response.data["news_articles"])
      })  
    }
  }, [loading, disabled, searchInput])

  useEffect(() => {
    if (summaryResults) {
      setLoading(false)
      setDisabled(false)
    }
  }, [summaryResults])


  return (
    <>
      <h1 id="app-title"> News Summarizer </h1>
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
          {
            summaryResults &&
            <Box sx={{ maxWidth: 700, minWidth:275 }}>
              <Card id="summary-card">
                <SummaryCard summaryResults={summaryResults} newsArticles={newsArticles}/>
              </Card>
            </Box>
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App