# meta-llama/Llama-2-7b
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat")

llm = transformers.pipeline(
    task="summarization",
    model=model,
    tokenizer=tokenizer,
    return_full_text=true,
    temperature=0.01,
    max_new_tokens=250,
    repetition_penality=1.1,
)
