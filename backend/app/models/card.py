from pydantic import BaseModel
from typing import Optional

class CardRequest(BaseModel):
    word: str
    base_language: str
    target_language: str
    is_cloze: bool = False

class CardResponse(BaseModel):
    word: str
    target_word: str
    example_sentence: str
    literal_translation: str
    semantic_translation: str
    audio_url: Optional[str] = None
    image_url: Optional[str] = None

class SaveCardRequest(BaseModel):
    word: str
    target_word: str
    example_sentence: str
    literal_translation: str
    semantic_translation: str
    audio_url: Optional[str] = None
    image_url: Optional[str] = None
    deck_name: str = "Language Learning"
    tags: Optional[list[str]] = None 