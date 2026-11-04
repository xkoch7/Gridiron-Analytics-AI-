// Shared data types. Keep these in sync with backend/src/models/schemas.py

export interface PlayerProjection {
  playerId: string;
  name: string;
  team: string;
  position: string;
  projectedPoints: number;
}

export interface Matchup {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  homeWinProbability: number;
  projectedHomeScore: number;
  projectedAwayScore: number;
}

export interface PropLine {
  playerId: string;
  stat: string;
  line: number;
  projection: number;
}
