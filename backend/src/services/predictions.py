# Prediction logic lives here so routes stay thin.
# TODO: replace placeholders with real models trained on NFL stats.
from src.models.schemas import Matchup, PlayerProjection, PropLine


def get_player_projections() -> list[PlayerProjection]:
    return []


def get_start_sit() -> list[PlayerProjection]:
    return []


def get_matchups() -> list[Matchup]:
    return []


def get_game_lines() -> list[Matchup]:
    return []


def get_player_props() -> list[PropLine]:
    return []
