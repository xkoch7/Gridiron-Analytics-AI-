# Response models. Keep these in sync with frontend/src/types/index.ts
from pydantic import BaseModel


class PlayerProjection(BaseModel):
    player_id: str
    name: str
    team: str
    position: str
    projected_points: float


class Matchup(BaseModel):
    game_id: str
    home_team: str
    away_team: str
    home_win_probability: float
    projected_home_score: float
    projected_away_score: float


class PropLine(BaseModel):
    player_id: str
    stat: str
    line: float
    projection: float
