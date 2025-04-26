from fastapi import APIRouter, HTTPException
from app.models.card import CardRequest, CardResponse, SaveCardRequest
from app.services.card_generator import CardGenerator
from app.services.anki_connect import AnkiConnect

router = APIRouter()
card_generator = CardGenerator()
anki_connect = AnkiConnect()

@router.post("/generate", response_model=CardResponse)
async def generate_card(request: CardRequest):
    try:
        card = await card_generator.generate_card(
            word=request.word,
            base_language=request.base_language,
            target_language=request.target_language,
            is_cloze=request.is_cloze
        )
        return card
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
async def save_card(request: SaveCardRequest):
    try:
        # Create deck if it doesn't exist
        await anki_connect.create_deck(request.deck_name)

        # Add note to Anki
        fields = {
            "Front": request.word,
            "Back": f"{request.target_word}\n\n{request.example_sentence}\n\nLiteral: {request.literal_translation}\n\nSemantic: {request.semantic_translation}",
        }

        if request.audio_url:
            fields["Audio"] = f"[sound:{request.audio_url}]"
        if request.image_url:
            fields["Image"] = f"<img src='{request.image_url}'>"

        response = await anki_connect.add_note(
            deck_name=request.deck_name,
            model_name="Basic",
            fields=fields,
            tags=request.tags
        )

        return {"message": "Card saved successfully", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/decks")
async def get_decks():
    try:
        decks = await anki_connect.get_deck_names()
        return {"decks": decks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 