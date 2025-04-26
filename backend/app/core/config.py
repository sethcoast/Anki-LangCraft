from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "Anki-LangCraft"
    DEBUG: bool = True
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    ANKI_CONNECT_URL: str = "http://localhost:8765"
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings() 