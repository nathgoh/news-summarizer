import os
from joblib import Parallel, delayed

from typing import List
from dotenv import load_dotenv
from langchain_community.llms import HuggingFaceEndpoint
from langchain.prompts import PromptTemplate
from langchain_text_splitters import CharacterTextSplitter
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains.combine_documents.map_reduce import MapReduceDocumentsChain
from langchain.chains.combine_documents.reduce import ReduceDocumentsChain
from langchain.chains.llm import LLMChain

load_dotenv()
HF_HUB_API_KEY = os.getenv("HUGGINGFACEHUB_API_TOKEN")


def configure_langchain_llm(
    repo_id: str, temperature: float, repetition_penalty: float
) -> HuggingFaceEndpoint:
    """
    Configure LLM with the model we want from HuggingFace and the LLM parameters.
    This uses the HuggingFaceEndpoint method provided by LangChain.

    Models that work:
        HuggingFaceH4/zephyr-7b-beta
        mistralai/Mixtral-8x7B-Instruct-v0.1
        mistralai/Mistral-7B-Instruct-v0.2
    """

    return HuggingFaceEndpoint(
        repo_id=repo_id,
        temperature=temperature,
        repetition_penalty=repetition_penalty,
        max_new_tokens=512,
    )


def invoke_llm(llm, article, i):
    # Create the N news article summaries
    template = """
        Summarize and identify the main theme/points 
        the news article in at most 100 words: {text}
    """
    prompt = PromptTemplate.from_template(template)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    summary = llm_chain.invoke(article)

    return f"{i + 1}: {summary['text']}\n"


def summarize_news_articles(news_articles: List, llm: HuggingFaceEndpoint) -> str:
    """
    Implement summarization by employing a similar approach to LangChain's
    Map-Reduce approach.

    First summarize each news article individually before doing a final
    summarization of the summaries of the news articles.

    We are parallelizing the summarization per article, use all CPUs available
    on the machine to get the per article summerization.
    """
    news_summaries = Parallel(n_jobs=-1, verbose=10)(
        delayed(invoke_llm)(llm, article, i) for i, article in enumerate(news_articles)
    )

    # Reduce the N news article summaries into one summary
    template = """
        The following is a list of news article summaries: {text}.
        Take the list of news article summaries and distill it into a final,
        consolidated summary of the main themes in at most 200 words.
    """
    prompt = PromptTemplate.from_template(template)
    llm_chain = LLMChain(prompt=prompt, llm=llm)

    final_summary = llm_chain.invoke(news_summaries)

    return final_summary["text"]


# def summarize_news_articles_mr(news_articles, llm: HuggingFaceEndpoint):
#     """
#     Implement the LangChain Map-Reduce approach for summarization.

#     Map-Reduce will first summarize each news article individually before
#     'reducing' the summaries into one final aggregate summary.
#     """

#     # Map
#     map_template = """
#         The following is a set of news articles: {news_articles}.

#         Based on the this list of news articles, summarize and identify the main
#         theme/points of the news article.

#         Summaries:
#     """
#     map_prompt = PromptTemplate.from_template(map_template)
#     map_chain = LLMChain(llm=llm, prompt=map_prompt)

#     # Reduce
#     reduce_template = """
#         The following is a set of news article summaries: {news_articles}.

#         Take the list of news article summaries and distill it into a final,
#         consolidated summary of the main themes.

#         Final Summary:
#     """
#     reduce_prompt = PromptTemplate.from_template(reduce_template)
#     reduce_chain = LLMChain(llm=llm, prompt=map_prompt)

#     # Combine the list of news articles into a single string before passing it
#     # into a LLMChain
#     combine_news_articles_chain = StuffDocumentsChain(
#         llm_chain=reduce_chain, document_variable_name="news_articles"
#     )

#     # Combine and iteratively reduce the mapped news articles
#     reduce_news_articles_chain = ReduceDocumentsChain(
#         combine_documents_chain=combine_news_articles_chain,  # Final chain that is called
#         collapse_documents_chain=combine_news_articles_chain,  # If news articles exceed context for StuffDocumentsChain
#         token_max=4000,  # Max number of tokens to group news articles into
#     )

#     # Map-Reduce
#     map_reduce_chain = MapReduceDocumentsChain(
#         llm_chain=map_chain,  # Map chain
#         reduce_documents_chain=reduce_news_articles_chain,  # Reduce chain
#         document_variable_name="news_articles",  # Where news articles will be put in the llm_chain
#         return_intermediate_step=False,  # Bool to return the results of the map steps in the output
#     )
#     text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
#         chunk_size=2000, chunk_overlap=100
#     )
#     split_news_articles = text_splitter.split_documents(news_articles)

#     return map_reduce_chain.invoke(split_news_articles)
