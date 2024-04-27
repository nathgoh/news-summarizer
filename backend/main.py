from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import news

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(news.router)


@app.get("/")
def read_root():
    return "News Summarizer"
