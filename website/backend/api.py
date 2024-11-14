from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from game import *
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class formula_1_1(BaseModel):
    operation_type: str
    digits: str
# API endpoint to get the current question



# API endpoint to answer a question
@app.get('/formula_1_1/start')
def start_formula_game():
    return FileResponse('./moonlightdrive.mp3')
@app.post('/formula_1_1')
async def formula(operation_type: formula_1_1):
    operation_type.digits = digits
    question, correct_answer = await generate_question(operation_type.operation_type)
    answer_options = [correct_answer, correct_answer + 1, correct_answer - 1, correct_answer + 2]
    random.shuffle(answer_options)
    return {'question':question,
            'answer_options':answer_options,
             'question_sound': FileResponse('./question.mp3') } 
@app.post('/spelling_bee')
async def spelling():
    pass
# Main entry point
if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
