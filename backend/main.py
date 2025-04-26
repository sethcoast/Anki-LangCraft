from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api import cards

app = FastAPI(title=get_settings().APP_NAME)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])

@app.get("/")
async def root():
    return {"message": "Welcome to Anki-LangCraft API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 