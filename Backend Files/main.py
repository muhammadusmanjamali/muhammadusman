from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Message
from schemas import MessageCreate


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Muhammad Usman Portfolio API",
    version="1.0.0"
)


# ==============================
# CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:8000",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ==============================
# HOME
# ==============================

@app.get("/")
def home():

    return {
        "message": "Muhammad Usman Portfolio API is running"
    }


# ==============================
# CONTACT FORM
# ==============================

@app.post("/api/contact")
def create_message(
    data: MessageCreate,
    db: Session = Depends(get_db)
):

    new_message = Message(
        name=data.name,
        email=data.email,
        message=data.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return {
        "message": "Message sent successfully!",
        "id": new_message.id
    }