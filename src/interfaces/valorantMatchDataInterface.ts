type Team = "Red" | "Blue"

interface ValorantMatchData {
    metadata: {
        map: string
        game_start: number
        mode_id: string
    }
    teams: Record<string, TeamData>
    players: {
        all_players: PlayerData[]
    }
    rounds: RoundData[]
}

interface TeamData {
    has_won: boolean
    rounds_won: number
    rounds_lost: number
}

interface PlayerData {
    puuid: string
    name: string
    tag: string
    team: Team
    currenttier: number
    assets: {
        agent: Agent
    }
    stats: PlayerStat
    economy: {
        spent: {
            overall: number
        }
        dammage_made: number
    }
}

interface RoundData {
    player_stats: RoundPlayerStat[]
    bomb_planted: boolean
    bobm_defused: boolean
    plant_events: {
        planted_by: {
            puuid: string
        }
    }
    defuse_events: {
        defused_by: {
            puuid: string
        }
    }
}

interface Agent {
    small: string
    bust: string
    full: string
    killfeed: string
}

interface PlayerStat {
    score: number
    kills: number
    deaths: number
    assists: number
}

interface RoundPlayerStat {
    player_puuid: string
    kill_events: KillEvent[]
}

interface KillEvent {
    kill_time_in_round: number
}