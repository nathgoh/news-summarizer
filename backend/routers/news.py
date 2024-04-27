import os

from datetime import datetime
from dotenv import load_dotenv
from newsapi import NewsApiClient
from fastapi import APIRouter

from utils.llm import configure_langchain_llm, summarize_news_articles

router = APIRouter()

load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")


@router.get("/news_summary/topic={topic}", tags=["news_topic"])
def get_news(topic: str) -> dict:
    news_client = NewsApiClient(api_key=NEWS_API_KEY)
    articles = news_client.get_everything(
        q=topic,
        language="en",
        to=datetime.now().strftime("%Y-%M-%d"),
        sort_by="relevancy",
        page_size=10,
    )

    cleaned_articles = []
    for article in articles["articles"]:
        if article["title"] != "[Removed]":
            cleaned_articles.append(article)
    cleaned_articles = cleaned_articles[:5]

    article_content = [article["content"] for article in cleaned_articles]
    llm = configure_langchain_llm(
        repo_id="HuggingFaceH4/zephyr-7b-beta",
        temperature=0.2,
        repetition_penalty=1.1,
    )
    summary = summarize_news_articles(article_content, llm)

    return {"news_summary": summary, "news_articles": cleaned_articles}
