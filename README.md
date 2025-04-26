# Anki-LangCraft

A lightweight, open-source web app that helps language learners generate high-quality Anki cards with minimal friction.

## Features

- Generate vocabulary word cards with natural example sentences
- Create literal and semantic translations
- Optional Cloze (fill-in-the-blank) cards
- Audio pronunciation and optional image generation
- Direct integration with Anki via AnkiConnect

## Prerequisites

- Python 3.8+
- Node.js 16+
- Anki with AnkiConnect add-on installed
- Google Cloud API key (for Gemini AI services)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Anki-LangCraft.git
cd Anki-LangCraft
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
GOOGLE_API_KEY=your_api_key_here
```

5. Start the development servers:

Backend:
```bash
cd backend
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm run dev
```

## Project Structure

```
Anki-LangCraft/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── tests/
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
