from pydantic import BaseModel
from pydantic import EmailStr


class MessageCreate(BaseModel):

    name: str
    email: EmailStr
    message: str