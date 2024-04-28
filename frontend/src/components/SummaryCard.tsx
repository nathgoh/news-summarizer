import { useState } from "react"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Collapse from "@mui/material/Collapse"
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography';

import "../styles/SummaryCard.css"
import { Article } from "../types/News"



const SummaryCard = (props: {summaryResults: string, newsArticles: Article[]}) => {
  const [expanded, setExpanded] = useState(false);

  const handleOnClickExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded)
    e.preventDefault()
  }
  
  

  return(
    <>
      <CardHeader title={"The News Summary"}/>
      <CardContent>
        {props.summaryResults}
      </CardContent>
      <CardActions>
        <Button onClick={handleOnClickExpand} size="small"> 
          <Typography variant="button" display="block" gutterBottom>
            References 
          </Typography>
        </Button>
      </CardActions>
      <Collapse id="references-collapse" in={expanded} timeout="auto" unmountOnExit>
        <ul>
          {props.newsArticles && props.newsArticles.map((article, idx) => (
            <Typography variant="subtitle1" gutterBottom>
              <li key={`reference-${idx}`}>
                  {article.title + " "} 
                  <Link target="_blank" rel="noopener noreferrer" href={article.url} key={`title-${idx}`}> 
                    [{idx + 1}] 
                  </Link>
              </li>
            </Typography>
          ))}
        </ul>
      </Collapse>
    </>
  )
}

export default SummaryCard