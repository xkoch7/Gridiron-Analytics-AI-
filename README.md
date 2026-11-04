# Gridiron Analytics

An AI-powered NFL analytics platform that uses real-time and historical stats to predict plays, scores and player performance. It helps you build a better fantasy football team and gives you data-driven odds for games and player props.

> **Status:** Early development. Planned features are listed below.

## Features

### Fantasy Football Assistant
- AI-driven start/sit recommendations
- Waiver wire and trade suggestions
- Weekly projected points for each player
- Lineup optimization based on matchups, injuries and recent form

### Odds and Predictions
- **Team vs. team odds:** win probability, projected score and point spread for upcoming games
- **Player stat odds:** projections for passing, rushing and receiving yards, touchdowns, receptions and more
- **Sports betting insights:** compare model predictions against sportsbook lines to spot value

### Live Updates
- Real-time game stats and scores
- Predictions that update as games progress
- Injury and roster news alerts

### Gridiron Fantasy League (Planned)
- A free fantasy football league hosted on the site
- **No gambling of any kind:** no entry fees, no cash prizes, just competition

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, HTML, CSS |
| Backend | TypeScript (Node.js), Python, FastAPI |
| AI / Data | Python (prediction models trained on historical and live NFL stats) |
| Database | Supabase (free tier, PostgreSQL / SQL) |
| Hosting | Vercel or a custom domain |
| Collaboration | Git and GitHub |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS) and npm
- [Python 3.11+](https://www.python.org/)
- A [Supabase](https://supabase.com/) project

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Gridiron-Analytics-AI-.git
cd Gridiron-Analytics-AI-

# Install frontend dependencies
npm install

# Set up the Python backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

### Environment Variables
Create a `.env` file in the project root:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Running Locally

```bash
# Start the frontend
npm run dev

# Start the FastAPI backend (in a separate terminal)
uvicorn main:app --reload
```

## Contributing

1. Create a branch for your feature: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push the branch: `git push origin feature/your-feature`
4. Open a pull request on GitHub

## Disclaimer

Gridiron Analytics AI provides predictions for informational and entertainment purposes only. Predictions are not guaranteed. If you choose to bet on sports, please gamble responsibly and follow the laws in your area.
