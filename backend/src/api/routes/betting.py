from fastapi import APIRouter

from src.models.schemas import Matchup, PropLine
from src.services import predictions

router = APIRouter()


@router.get("/game-lines", response_model=list[Matchup])
def get_game_lines():
    return predictions.get_game_lines()


@router.get("/player-props", response_model=list[PropLine])
def get_player_props():
    return predictions.get_player_props()
