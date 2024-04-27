from typing import List
from pydantic import BaseModel


class Source(BaseModel):
    id: str | None = None
    name: str


class Article(BaseModel):
    source: Source
    author: str
    title: str
    description: str
    url: str
    urlToImage: str | None = None
    publishedAt: str
    content: str


class NewsResults(BaseModel):
    status: str
    totalResults: int
    articles: List[Article]
