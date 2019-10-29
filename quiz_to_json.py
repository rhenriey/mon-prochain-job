import pandas as pd
import numpy as np

import sys
import xlsxwriter
import datetime


import json

df = pd.read_excel("questions.xlsx")
#print(df)

stack = []
last_theme = ""
question = None
theme = None
for index , row in df.iterrows():
    if row['theme'] != last_theme:
        if theme is not None:
            stack.append(theme)
        theme = {
            "title":row['theme'],
            "questions":[]
        }
        print("new theme",row["theme"] )
        last_theme = row['theme']
    if pd.isnull(row["Points change"]):
        print("new question",row["question"] )
        if question is not None:
            print(" ajoute question dans theme")
            theme["questions"].append(question)
        question = {
            "title":row["question"],
            "propositions":[]
        }
    else:
        answer = {
            "title":row['question'],
            "score_frein":row["Point freins"],
            "score_change":row["Points change"]
        }
        print("- add answer",row['question'])
        question["propositions"].append(answer)

        #if question is not None:
            #theme["questions"].append(question)

stack.append(theme)

#print(stack)
with open('quiz.json', 'w') as f:
    json.dump(stack, f)
