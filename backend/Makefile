CONDA_HOME = $(HOME)/miniconda3
CONDA := $(shell which conda)

ENV_NAME = news-llm

install:
	@echo 'Setting up the ${ENV_NAME} conda environment'
	@echo '======================================================================='
	conda create --name $(ENV_NAME) python=3.10 &&\
	$(CONDA) run --name $(ENV_NAME) pip install e .
	@echo '======================================================================='
	@echo 'Setup complete for $(ENV_NAME) conda environment'
	@echo '======================================================================='
	@echo 'Start conda environment with:' 
	@echo '      $$ conda activate $(ENV_NAME)'
	@echo '======================================================================='

lint:
	python -m black .

run:
	uvicorn main:app --reload

uninstall:
	pip uninstall -y dagster_natron
	@echo '======================================================================='
	@echo 'Uninstalled dagster_natron'
	@echo '======================================================================='
	@echo 'Deactivate conda environment with:'
	@echo '     $$ conda deactivate'
	@echo '======================================================================='
	@echo 'Remove conda environment with:'
	@echo '     $$ make remove-conda'
	@echo '======================================================================='

remove-conda:
	$(CONDA) remove --name $(ENV_NAME) --all -y
	@echo '======================================================================='
	@echo ' Conda environment $(ENV_NAME)' has been removed
	@echo '======================================================================='

