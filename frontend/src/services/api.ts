import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export interface CardData {
  word: string
  baseLanguage: string
  targetLanguage: string
  isCloze: boolean
}

export interface GeneratedCard {
  word: string
  targetWord: string
  exampleSentence: string
  literalTranslation: string
  semanticTranslation: string
  audioUrl?: string
  imageUrl?: string
}

export const api = {
  generateCard: async (data: CardData): Promise<GeneratedCard> => {
    const response = await axios.post(`${API_BASE_URL}/api/cards/generate`, data)
    return response.data
  },

  saveToAnki: async (card: GeneratedCard): Promise<void> => {
    await axios.post(`${API_BASE_URL}/api/cards/save`, card)
  },
} 