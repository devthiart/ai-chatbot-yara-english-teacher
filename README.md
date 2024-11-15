# AI Chat with Yara, an AI English Teacher powered by Ollama

This project is an AI-powered chatbot leveraging Facebook's Ollama LLaMa3 model. The backend is built with Flask and uses the Langchain framework to handle AI interactions. The frontend, built with React, communicates with the backend via Socket.IO.

## Example - Application Working

![Working application example](./yara-example.png)

## Requirements

- Python 3.x
- `Ollama`
- `langchain`
- `Flask`
- `Node`

## Installation

1. Install Ollama

    To use this project, you need to have Ollama installed on your machine.
    Install [Ollama](https://ollama.com/) and run `ollama run llama3` to run and chat with Llama 3

2. Clone the repository:

    ```bash
    git clone https://github.com/devthiart/ai-chat-yara-english-teacher
    ```

3. Navigate to the project directory:

    ```bash
    cd ai-chat-yara-english-teacher
    ```
### Installation Backend
4. Opening a backend folder, creating a virtual environment and install the required dependencies (Windows):

    `Open Backend folder:`
    ```bash
    cd backend
    ```

    `Creating virtual environment:`
    ```bash
    python -m venv langchain
    ```

    `Activate virtual environment:`
    ```bash
    langchain\Scripts\activate
    ```

    `Install dependences:`
    ```bash
    pip install -r requirements.txt
    ```

### Instalation Frontend

5. Opening a frontend folder and installing the required dependencies:

    `In another terminal, open the frontend folder:`
    ```bash
    cd frontend
    ```

    `Install dependences:`
    ```bash
    npm install
    ```

## Usage

1. In backend folder, start the Flask Backend server:

    ```bash
    python app.py
    ```

2. In another terminal, in frontend folder start the Frontend:

    ```bash
    npm start
    ```
