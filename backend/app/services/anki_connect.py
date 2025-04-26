import httpx
from app.core.config import get_settings
from typing import Optional

settings = get_settings()

class AnkiConnect:
    def __init__(self):
        self.base_url = settings.ANKI_CONNECT_URL

    async def add_note(
        self,
        deck_name: str,
        model_name: str,
        fields: dict,
        tags: Optional[list[str]] = None
    ) -> dict:
        """
        Add a note to Anki using AnkiConnect.
        
        Args:
            deck_name: Name of the deck to add the note to
            model_name: Name of the note type
            fields: Dictionary of field names and values
            tags: Optional list of tags to add to the note
            
        Returns:
            Dictionary containing the response from AnkiConnect
        """
        action = {
            "action": "addNote",
            "version": 6,
            "params": {
                "note": {
                    "deckName": deck_name,
                    "modelName": model_name,
                    "fields": fields,
                    "tags": tags or [],
                }
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, json=action)
            return response.json()

    async def create_deck(self, deck_name: str) -> dict:
        """
        Create a new deck in Anki if it doesn't exist.
        
        Args:
            deck_name: Name of the deck to create
            
        Returns:
            Dictionary containing the response from AnkiConnect
        """
        action = {
            "action": "createDeck",
            "version": 6,
            "params": {
                "deck": deck_name
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, json=action)
            return response.json()

    async def get_deck_names(self) -> list[str]:
        """
        Get a list of all deck names in Anki.
        
        Returns:
            List of deck names
        """
        action = {
            "action": "deckNames",
            "version": 6
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, json=action)
            return response.json()["result"] 