# Gridiron Analytics AI

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
| Frontend | Next.js (React), TypeScript, HTML, CSS |
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

# Install website dependencies
npm install

# Set up the Python backend
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

### Environment Variables
Copy `.env.example` to `.env.local` and `backend/.env.example` to `backend/.env`, then fill in your Supabase keys.

### Running Locally

```bash
# Start the website at http://localhost:3000
npm run dev

# Start the FastAPI backend at http://localhost:8000 (separate terminal, venv active)
npm run backend
```

Requests to `/api/...` on the website are forwarded to the FastAPI backend (see `next.config.ts`).

## Project Structure

```
src/                           Next.js website (React + TypeScript)
  app/                         Each folder is a page (App Router)
    page.tsx                   /          Landing page
    login/page.tsx             /login     Sign in / sign up
    fantasy/page.tsx           /fantasy   Fantasy predictions
    betting/page.tsx           /betting   Betting assistant
    teams/page.tsx             /teams     Team stats and predictions
    account/page.tsx           /account   Account settings
    layout.tsx                 Shared layout (navbar) for every page
    globals.css                Global styles
  components/
    layout/                    Navbar and other page-frame pieces
    ui/                        Reusable building blocks (Card, PageHeader)
  data/                        Static data (nav links, etc.)
  lib/                         Supabase client and API helpers
  types/                       Shared TypeScript types

backend/                       Python + FastAPI (AI predictions)
  src/
    main.py                    App entry point
    api/routes/                API endpoints (fantasy, betting, teams)
    services/                  Prediction logic
    models/                    Request/response schemas
    core/                      Config and settings

supabase/migrations/           Database tables (SQL)
public/                        Images, icons and other static files
scripts/                       Helper scripts (data imports, etc.)
```

To add a new page, create a folder in `src/app/` with a `page.tsx` inside. For example, `src/app/players/page.tsx` becomes `/players`. To show it in the navbar, add it to `src/data/navLinks.ts`.

## Contributing

1. Create a branch for your feature: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push the branch: `git push origin feature/your-feature`
4. Open a pull request on GitHub

## Disclaimer

Gridiron Analytics AI provides predictions for informational and entertainment purposes only. Predictions are not guaranteed. If you choose to bet on sports, please gamble responsibly and follow the laws in your area.
