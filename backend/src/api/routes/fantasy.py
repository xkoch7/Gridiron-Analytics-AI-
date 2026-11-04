from fastapi import APIRouter

from src.models.schemas import PlayerProjection
from src.services import predictions

router = APIRouter()


@router.get("/projections", response_model=list[PlayerProjection])
def get_projections():
    return predictions.get_player_projections()


@router.get("/start-sit", response_model=list[PlayerProjection])
def get_start_sit():
    return predictions.get_start_sit()
