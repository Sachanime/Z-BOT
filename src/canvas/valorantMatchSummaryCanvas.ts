import path from 'path'
import { createCanvas, loadImage } from 'canvas'
import { ValorantMatchData } from '../interfaces'

export async function createValorantMatchSummaryCanvas(data: ValorantMatchData, targetPlayerPuuid: string) {

    const gameStartMs = data.metadata.game_start * 1000
    const gameDate = new Date(gameStartMs)
    const gameMonth = gameDate.toLocaleString('en-US', { month: 'long' }).toUpperCase().substring(0, 3)
    const gameDay = gameDate.getDate().toString()
    const gameYear = gameDate.getFullYear().toString()
    const modeName = data.metadata.mode_id.toUpperCase()
    const mapName = data.metadata.map.toUpperCase()
    const gameLength = data.metadata.game_length
    const gameLengthMin = Math.floor(gameLength / 60)
    const gameLengthS = gameLength % 60
    const blueColor = '#14E5B3'
    const redColor = '#FF4655'
    const players = data.players.all_players
    const roundsPlayed = data.metadata.rounds_played
    const firstBlood = new Map<string, number>()
    const plants = new Map<string, number>()
    const defuses = new Map<string, number>()
    let targetPlayer
    let targetPlayerScore: string
    let targetPlayerScoreColor: string
    let enemyPlayerScore: string
    let enemyPlayerScoreColor: string
    let gameResult: string

    for(const player of data.players.all_players) {

        if(player.puuid == targetPlayerPuuid) {
            targetPlayer = player
            break
        }

    }

    for(const round of data.rounds) {

        let killTime = 86400000
        let firstBloodPlayerPuuid = ""

        for(const player of round.player_stats) {

            if(player.kill_events.length > 0) {
                
                if(killTime > player.kill_events[0].kill_time_in_round) {
                    killTime = player.kill_events[0].kill_time_in_round
                    firstBloodPlayerPuuid = player.player_puuid
                }

            }

        }

        if(firstBlood.get(firstBloodPlayerPuuid)) {
            const playerFirstBloodNumber = firstBlood.get(firstBloodPlayerPuuid) as number
            firstBlood.set(firstBloodPlayerPuuid, playerFirstBloodNumber + 1)
        }

        else {
            firstBlood.set(firstBloodPlayerPuuid, 1)
        }

        if(round.bomb_planted) {
            
            const planterPlayerPuuid = round.plant_events.planted_by.puuid

            if(plants.get(planterPlayerPuuid)) {
                const playerPlantNumber = plants.get(planterPlayerPuuid) as number
                plants.set(planterPlayerPuuid, playerPlantNumber + 1)
            }

            else {
                plants.set(planterPlayerPuuid, 1)
            }

        }

        if(round.bomb_defused) {
            
            const defuserPlayerPuuid = round.defuse_events.defused_by.puuid

            if(defuses.get(defuserPlayerPuuid)) {
                const playerDefuseNumber = defuses.get(defuserPlayerPuuid) as number
                defuses.set(defuserPlayerPuuid, playerDefuseNumber + 1)
            }

            else {
                defuses.set(defuserPlayerPuuid, 1)
            }

        }

    }

    if(!targetPlayer) { return }
    const targetPlayerTeam = targetPlayer.team.toLowerCase()
    const targetPlayerTeamData = data.teams[targetPlayerTeam]
    targetPlayerScore = targetPlayerTeamData.rounds_won.toString()
    enemyPlayerScore = targetPlayerTeamData.rounds_lost.toString()

    if(targetPlayerTeamData.has_won) {
        gameResult = 'VICTORY'
        targetPlayerScoreColor = blueColor
        enemyPlayerScoreColor = redColor
    }

    else {
        gameResult = 'DEFEAT'
        targetPlayerScoreColor = redColor
        enemyPlayerScoreColor = blueColor
    }

    const width = 2272
    const height = 1149
    const xCenter = width / 2
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const backgroundImagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'valorantMatchSummaryBackgroundImage.png')
    const backgroundImage = await loadImage(backgroundImagePath)

    ctx.drawImage(backgroundImage, 0, 0)

    ctx.font = 'bold 20px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textBaseline = 'top'
    ctx.fillText(`${gameMonth} ${gameDay}, ${gameYear}`, 18, 65)
    ctx.fillText(modeName, 18, 95)
    ctx.fillText(`MAP - ${mapName} // ${gameLengthMin}:${gameLengthS}`, 18, 125)

    ctx.font = 'bold 70px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.fillText(gameResult, xCenter, 50)

    const gameResultTextWidth = ctx.measureText(gameResult).width
    const gameResultTextMidWidth = gameResultTextWidth / 2
    const leftGameScoreStart = xCenter - gameResultTextMidWidth - 15
    const rightGameScoreStart = xCenter + gameResultTextMidWidth + 15

    ctx.fillStyle = targetPlayerScoreColor
    ctx.textAlign = 'right'
    ctx.fillText(targetPlayerScore, leftGameScoreStart, 50)

    ctx.fillStyle = enemyPlayerScoreColor
    ctx.textAlign = 'left'
    ctx.fillText(enemyPlayerScore, rightGameScoreStart, 50)

    const tabWidth = 1800
    const tabMidWidth = tabWidth / 2
    const tabHeight = 850
    const tabXStart = xCenter - tabMidWidth
    const tabYStart = 200
    let headerCaseXStart

    ctx.fillStyle = '#2C3945'
    ctx.fillRect(tabXStart, tabYStart, tabWidth, 40)

    let headerCaseXMid = tabXStart + 500 / 2
    let headerCaseYMid = tabYStart + 40 / 2
    ctx.font = 'bold 20px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText("INDIVIDUALLY SORTED", headerCaseXMid, headerCaseYMid)

    headerCaseXStart = tabXStart + 500
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("AVG SCORE", headerCaseXMid, headerCaseYMid)

    headerCaseXStart += 216
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("KDA", headerCaseXMid, headerCaseYMid)

    headerCaseXStart += 216
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("AVG ECON", headerCaseXMid, headerCaseYMid)

    headerCaseXStart += 216
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("FIRST BLOOD", headerCaseXMid, headerCaseYMid)

    headerCaseXStart += 216
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("PLANTS", headerCaseXMid, headerCaseYMid)

    headerCaseXStart += 216
    headerCaseXMid = headerCaseXStart + 216 / 2
    ctx.fillText("DEFUSES", headerCaseXMid, headerCaseYMid)

    const agentTabHeight = tabHeight - 40
    const agentTabXStart = tabXStart
    let agentTabYStart = tabYStart + 40
    const agentLitleCaseWidth = 81
    const agentLargeCaseWidth = 540
    const agentCaseHeight = agentTabHeight / 10
    const agentLitleCaseXMid = agentLitleCaseWidth / 2
    const agentLargeCaseXMid = agentLargeCaseWidth / 2
    const agentCaseYMid = agentCaseHeight / 2
    const agentCaseYTier = agentCaseHeight / 3

    players.sort((a, b) => {
        return b.stats.score / roundsPlayed - a.stats.score / roundsPlayed
    })

    for(let i = 0; i < 10; i++) {

        const playerName = players[i].name
        const playerAgentName = players[i].character.toUpperCase()
        const playerAgentIcon = players[i].assets.agent.small
        const agentIcon = await loadImage(playerAgentIcon)
        const playerTeam = players[i].team.toLowerCase()
        const playerTier = players[i].currenttier
        const playerTierIconUrl = `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${playerTier}/largeicon.png`
        const playerTierIconImage = await loadImage(playerTierIconUrl)
        const playerScore = Math.floor(players[i].stats.score / data.metadata.rounds_played).toString()
        const playerKills = players[i].stats.kills.toString()
        const playerDeaths = players[i].stats.deaths.toString()
        const playerAssists = players[i].stats.assists.toString()
        const playerKDA = `${playerKills} / ${playerDeaths} / ${playerAssists}`
        const playerDamageMade = players[i].damage_made
        const playerEconSpent = players[i].economy.spent.overall
        const playerEcon = Math.floor(playerDamageMade / playerEconSpent * 1000).toString()
        let playerFirstBloodNumber = firstBlood.get(players[i].puuid) as number
        if(playerFirstBloodNumber == undefined) { playerFirstBloodNumber = 0 }
        const playerFirstBlood = playerFirstBloodNumber.toString()
        let playerPlantNumber = plants.get(players[i].puuid) as number
        if(playerPlantNumber == undefined) { playerPlantNumber = 0 }
        const playerPlant = playerPlantNumber.toString()
        let playerDefuseNumber = defuses.get(players[i].puuid) as number
        if(playerDefuseNumber == undefined) { playerDefuseNumber = 0 }
        const playerDefuse = playerDefuseNumber.toString()
        let textXStart = agentTabXStart + agentLargeCaseXMid
        let textYStart = agentTabYStart + agentCaseYTier
        let agentCaseXStart = agentTabXStart
        let agentCaseYStart = agentTabYStart
        let playerColor

        if(playerTeam == targetPlayerTeam) {
            playerColor = blueColor
        }

        else {
            playerColor = redColor
        }

        if(players[i].puuid == targetPlayerPuuid) {
            playerColor = '#b0a05e'
        }

        ctx.fillStyle = playerColor
        ctx.fillRect(agentTabXStart, agentTabYStart, tabWidth, agentCaseHeight)
        ctx.drawImage(agentIcon, agentCaseXStart, agentCaseYStart, agentLitleCaseWidth, agentCaseHeight)

        agentCaseXStart += agentLitleCaseWidth
        ctx.drawImage(playerTierIconImage, agentCaseXStart, agentCaseYStart, agentLitleCaseWidth, agentCaseHeight)

        agentCaseXStart += agentLitleCaseWidth
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(playerName, textXStart, textYStart)

        textYStart = agentTabYStart + agentCaseYTier * 2
        ctx.fillText(playerAgentName, textXStart, textYStart)

        agentCaseXStart = tabXStart + 500
        textYStart = agentTabYStart + agentCaseYMid
        textXStart = agentCaseXStart + 216 / 2
        ctx.fillText(playerScore, textXStart, textYStart)

        agentCaseXStart += 216
        textXStart = agentCaseXStart + 216 /2
        ctx.fillText(playerKDA, textXStart, textYStart)

        agentCaseXStart += 216
        textXStart = agentCaseXStart + 216 /2
        ctx.fillText(playerEcon, textXStart, textYStart)

        agentCaseXStart += 216
        textXStart = agentCaseXStart + 216 /2
        ctx.fillText(playerFirstBlood, textXStart, textYStart)

        agentCaseXStart += 216
        textXStart = agentCaseXStart + 216 /2
        ctx.fillText(playerPlant, textXStart, textYStart)

        agentCaseXStart += 216
        textXStart = agentCaseXStart + 216 /2
        ctx.fillText(playerDefuse, textXStart, textYStart)

        agentTabYStart += agentCaseHeight + 5

    }

    const buffer = canvas.toBuffer('image/png')
    return(buffer)

}