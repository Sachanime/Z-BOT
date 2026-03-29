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

module.exports = { createTestCanvas }