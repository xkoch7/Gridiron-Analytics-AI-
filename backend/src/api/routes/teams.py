from fastapi import APIRouter

from src.models.schemas import Matchup
from src.services import predictions

router = APIRouter()


@router.get("/matchups", response_model=list[Matchup])
def get_matchups():
    return predictions.get_matchups()


@router.get("/{team_id}")
def get_team(team_id: str):
    # TODO: return stats for a single team
    return {"team_id": team_id}
