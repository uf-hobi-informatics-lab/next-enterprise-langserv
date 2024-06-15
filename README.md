## This Boilerplate is extended by the Next.js Enterprise Boilerplate ("https://github.com/Blazity/next-enterprise"). I've added langchain server into this template.

You can check detailed information in ("https://github.com/Blazity/next-enterprise")

## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

### 0. Prerequisits:
* Setup `homebrew` for mac; https://brew.sh/
* Setup `pyenv` for multiple python environments; https://github.com/pyenv/pyenv
    ```bash
    brew install pyenv 
    ```
  * use `miniconda3-latest` from pyenv; 
  * Afterwards all python packages are managed with conda
* Setup `gh` to interact with github; https://cli.github.com/manual/
    ```bash
    brew install gh 
    ```

### 1. Setup dedicated venv for `langchain`
```bash
conda create -n langchain
conda activate langchain

conda install poetry #langserv uses poetry to manage python dependencies https://python-poetry.org/

pip install -U langchain-core langchain-community "langserve[all]" langchain-cli langsmith
```

### 2. Use `gh` to fork
```bash
gh repo fork bianjiang/next-enterprise-langserv --fork-name <your_app_name> --clone
```

### 3. Run it
```bash
    cd <your_app_name>
    yarn
    yarn dev
```

### 4. Use it
* Open [http://localhost:3000](http://localhost:3000) to see the web frontend.

* Open [http://localhost:8000](http://localhost:8000) to see the langchain server.

### 5. MISC
* This project uses a git hook to enforce [conventional commits](https://github.com/qoomon/git-conventional-commits). To install the git hook, run the following command in the root directory of the project:
```sh
brew install pre-commit
pre-commit install -t commit-msg
```

### Langserv related
* Operate under the `langserv` folder
```bash
cd ./langserv
```
* If you want to add a python package 
```bash
poetry add langchain-openai
```
* If you want to add a `package` using existing templates; https://python.langchain.com/v0.2/docs/templates/;
  * e.g., the `neo4j-advanced-rag`; https://python.langchain.com/v0.2/docs/templates/neo4j-advanced-rag/

    ```bash
    langchain app add neo4j-advanced-rag
    ```
  * And add the following code to your `server.py` file:
    ```python
    from neo4j_advanced_rag import chain as neo4j_advanced_chain

    add_routes(app, neo4j_advanced_chain, path="/neo4j-advanced-rag")
    ```
  * And set environment variables
    ```bash
    export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
    export NEO4J_URI=<YOUR_NEO4J_URI>
    export NEO4J_USERNAME=<YOUR_NEO4J_USERNAME>
    export NEO4J_PASSWORD=<YOUR_NEO4J_PASSWORD>
    ```
  * We can see all templates at http://127.0.0.1:8000/docs 
  * We can access the playground at http://127.0.0.1:8000/neo4j-advanced-rag/playground 






