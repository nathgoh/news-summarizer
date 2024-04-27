# News Summarizer
This is the backend implementation of News Summarizer. 

## Overview
- Utilize NewsAPI to retrieve the top ten most relevant news articles for a user-defined topic. 
- Implement a map reduce summarizer using LangChain and LLMs to summarize the ten news articles

## Code Development 
### Installation
#### Virtual Environment
> **Note**: You need to have [Miniconda](https://docs.conda.io/en/latest/miniconda.html) installed first so that you can setup a virtual environment in Python (and so the command below will work).

With conda now installed, you can run the following Makefile command:
```
make install
```
This will create the virtual environment `news-llm` with the necessary packages installed.

### API Keys
In the parent directory `news-summarizer-backend` there is a file named `.env`.
In the `.env` file, add your API keys for [NewsAPI](https://newsapi.org/) and [Hugging Face](https://huggingface.co/).
```
NEWS_API_KEY=INSERT_YOUR_API_KEY
HUGGINGFACEHUB_API_TOKEN=INSERT_YOUR_API_KEY
```
### Run
To run the backend, use the following Makefile command:
```
make run
```
### Repository Structure
The repository code is layed out in the following directory structure:
```
news-summarizer-backend
|   .env
|   .gitignore
|   pyproject.toml
|   README.md
|   LICENSE
|   setup.cfg
|   Makefile
|   
|   main.py
|
\---routers
|    +---news.py
|
\---schemas
|    +---news_schemas.py
|
\---utils
|    +---llm.py
```