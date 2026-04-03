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

async function createLevelCanvas(userData) {

    const canvas = createCanvas(400, 100)
    const ctx = canvas.getContext("2d")
    const avatarURL = userData.displayAvatarURL({ extension: "png", size: 64 })
    const avatarCanvasImage = await loadImage(avatarURL)

    //Fond
    ctx.fillStyle = "#2c3e50"
    ctx.fillRect(0, 0, 400, 100)

    //Barre
    ctx.beginPath()
    ctx.roundRect(100, 45, 275, 10, 5)
    ctx.fillStyle = "#F00"
    ctx.fill()
    ctx.closePath()

    //Demi Barre
    ctx.beginPath()
    ctx.roundRect(100, 45, 275/2, 10, 5)
    ctx.fillStyle = "#0FF"
    ctx.fill()
    ctx.closePath

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