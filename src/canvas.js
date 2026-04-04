const { createCanvas, loadImage } = require("canvas")

async function createTestCanvas(client, ID) {

    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext("2d")
    const avatarURL = client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(ID.Clients.ZBOT).user.displayAvatarURL({ extension: 'png', size: 256 })
    const avatarCanvasImage = await loadImage(avatarURL)

    ctx.fillStyle = '#2c3e50'
    ctx.fillRect(0, 0, 400, 200)
    ctx.font = 'bold 25px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textBaseline = 'middle'
    ctx.fillText("Comming soon...", 150, 100)
    ctx.beginPath()
    ctx.arc(75, 100, 50, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatarCanvasImage, 25, 50, 100, 100)

    const buffer = canvas.toBuffer('image/png')
    return(buffer)

}

async function createLevelCanvas(userData, xp, xpGoal, level) {

    const canvas = createCanvas(400, 100)
    const ctx = canvas.getContext("2d")
    const avatarURL = userData.displayAvatarURL({ extension: "png", size: 64 })
    const avatarCanvasImage = await loadImage(avatarURL)
    const fillXp = xp * 275 / xpGoal

    //Fond
    ctx.fillStyle = "#2c3e50"
    ctx.fillRect(0, 0, 400, 100)

    //Barre
    ctx.beginPath()
    ctx.roundRect(100, 55, 275, 10, 5)
    ctx.fillStyle = "#1B2631"
    ctx.fill()
    ctx.closePath()

    //Demi Barre
    ctx.beginPath()
    ctx.roundRect(100, 55, fillXp, 10, 5)
    ctx.fillStyle = "#5DADBC"
    ctx.fill()
    ctx.closePath

    //Texte Level
    ctx.font = "bold 20px Discord"
    ctx.fillStyle = "#FFF"
    ctx.textBaseline = "middle"
    ctx.fillText("Niveau " + level, 100, 40)

    //Texte XP Current
    ctx.font = "bold 10px Discord"
    ctx.fillStyle = "#FFF"
    ctx.textBaseline = "middle"
    ctx.fillText(xp + "xp", 100, 75)

    //Texte XP Goal
    ctx.font = "bold 10px Discord"
    ctx.fillStyle = "#FFF"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillText(xpGoal + "xp", 375, 75)

    //Cercle
    ctx.beginPath()
    ctx.arc(50, 50, 25, 0, Math.PI * 2, true)
    ctx.closePath()

    //PP
    ctx.clip()
    ctx.drawImage(avatarCanvasImage, 25, 25, 50, 50)

    const buffer = canvas.toBuffer("image/png")
    return(buffer)

}

module.exports = { createTestCanvas, createLevelCanvas }