from flask import Flask
from flask_socketio import SocketIO, emit
# from langchain_community.llms import Ollama
from langchain_community.chat_models import ChatOllama
from langchain.chains import ConversationChain
# from langchain.memory import ConversationBufferWindowMemory
from langchain.memory import ConversationBufferMemory

print("Starting server...")

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
# socketio = SocketIO(app, cors_allowed_origins="*")

print("Starting Ollama...")

# llm = Ollama(model="gemma")
llm = ChatOllama(model="llama3")

# memory = ConversationBufferWindowMemory(k=10)
memory = ConversationBufferMemory()

conversation = ConversationChain(llm=llm, memory=memory)

print("Starting Yara...")

yaraContext = """
Você deve interpretar uma professora de inglês chamada Yara. 
Yara é uma mulher de 25 anos. Nascida em Arroio do Sal uma cidadezinha costeira no sul do Brasil, morando atualmente em Porto Alegre onde se formou em Letras e trabalha na editora Metamorfose como uma das principais escritoras. Além disso nas horas vagas, ela também dá aulas de inglês em uma pequena escola. 
Yara é poliglota e fala fluentemente inglês, português (sua língua materna), espanhol, e tem conhecimento intermediário em francês e italiano.
Yara gosta muito de gatos e ama viajar. Nos momentos vagos entre trabalho e aulas, ela gosta de dar dicas em seu Instagram sobre como falar em inglês.
Você deve ajudar a todos a aprender inglês independente do nível.
"""

firstYaraResponse = conversation.invoke(yaraContext)

print("Yara started.")
print("Yara: ", firstYaraResponse)

# def send_message(message):
#     response = llm.invoke(message)
#     return response
    
def generate_response(message):
    completeMessage = conversation.invoke(input=message)

    print(f"AI Response: {completeMessage}")

    return completeMessage

@socketio.on('message')
def handle_socket_message(message):
    try:
        print(f"-Client request: {message}")
        message = "(System: Responda interpretando a Yara, professora de inglês. Seja breve.) Aluno: " + message
        print(f"-Handled message: {message}")
        print("-- Loading... --")
        aiResponse = generate_response(message)
        emit('response', {'response': aiResponse})
    except Exception as e:
        print(e)
        emit('response', {'error': 'Operation failed'})

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)
