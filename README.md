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

pip install -U poetry #langserv uses poetry to manage python dependencies https://python-poetry.org/

pip install -U langchain-core langchain-community "langserve[all]" langchain-cli langsmith
```

### 2. Use `gh` to fork; this will make your repo public;
```bash
gh repo fork uf-hobi-informatics-lab/next-enterprise-langserv --fork-name <your_app_name> --clone
```
### If you want to have a `private` "fork", do this 
```bash
git clone --bare https://github.com/uf-hobi-informatics-lab/next-enterprise-langserv.git <your_app_name>
cd <your_app_name>

gh repo create <your_app_name> --private ## create a empty repo under your own account; assuming you have already run gh auth, etc.
git push --mirror <your_github_link/your_app_name>

cd ..
rm -rf <your_app_name> #delete the old one

git clone <your_github_link/your_app_name>
cd <your_app_name>

## To pull updates from the public templates (in case this gets updated, and there are features you want to merge into your private repo
git remote add template https://github.com/uf-hobi-informatics-lab/next-enterprise-langserv
git pull template main
```

### 3. Run it
You need two terminal.
In terminal 1, run frontend
```bash
  yarn dev
```
In terminal 2, run backend
```bash
conda activate langchain # make sure you use the right python venv

cd langserv 
uvicorn app.server:app --reload

```

### 4. Use it
* Open [http://localhost:3000](http://localhost:3000) to see the web frontend.

* Open [http://localhost:8000](http://localhost:8000) to see the langchain server.

### 5. MISC
* Please strict follow https://www.conventionalcommits.org/en/v1.0.0/#summary; and this project uses a git hook to enforce [conventional commits](https://github.com/qoomon/git-conventional-commits). To install the git hook, run the following command in the root directory of the project:
```sh
brew install pre-commit
pre-commit install -t commit-msg
```
* It uses `shadcn-ui` from https://ui.shadcn.com/docs; by default it installed 
```bash
npx shadcn-ui@latest add form button label dropdown-menu badge drawer input select textarea tooltip scroll-area
```

## Frontend
* Take a look at "playground.tsx", which has set up dark model
* It aslo links to the backend with some example codes on both the frontend and backend side
  * You can access through http://localhost:3000/playground
* We use `next.config.mjx` rewrites to route calls to the backend 
```json
{
  source: "/backend/:path*",
  destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/:path*" : "/"
}
```
   * In your front, endpoint can be written as 
   ```ts
    const endpoint = `backend/playground/get`
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: data.message }),
    })
   ```
   * It calls "http://127.0.0.1:8000/playground/get"

## langserv 
* Server side structure; read these https://fastapi.tiangolo.com/tutorial/bigger-applications/;
```
- app/
	- routers/                       -----API routes
	- schemas/                       ----- Pydantic models
	- services/                      ----- Business logic
	- utils/                         ----- Utils
	- playground/                    -----Playground
	- dependencies.py                ----- dependencies across modules when needed
	- server.py                      ----- main file
	- cli.py                         -----commandline
	- exc.py                         -----Exception handler
- tests/
- docs/
	- README.md
- pyproject.toml                   ----- peotry config; python dependency management
- README.md
- .env                             ----- dotenv (python-dotenv) for environment variables
```
* Operate under the `langserv` folder
```bash
cd ./langserv
```
* If you want to add a python package 
```bash
poetry add langchain-openai
```
* **[Deprecated]** The `packages` are not really used; as it breaks some of the dependencies;
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






