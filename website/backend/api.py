from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from lmnt.api import Speech
from dotenv import load_dotenv
import os
# from game import *
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class formula_1(BaseModel):
    question: str
# API endpoint to get the current question
load_dotenv()


# API endpoint to answer a question
@app.post('/formula_1')
async def game_formula1(question: formula_1):
    lmntKey = os.getenv("LMNT_API_KEY")
    questionText = question.question
    async with Speech(api_key=lmntKey) as speech:
        synthesis = await speech.synthesize(questionText, 'lily')
    audioFile = f'question.mp3'
    with open(audioFile, 'wb') as f:
        f.write(synthesis['audio'])
    return FileResponse(audioFile)    
    

@app.post('/spelling_bee')
async def spelling():
    pass
# Main entry point
if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
