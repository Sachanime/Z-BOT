import { createCanvas, loadImage } from 'canvas'
import { User } from 'discord.js'

export async function createLevelCanvas(user: User, xp: number, xpGoal: number, level: number) {

    const canvas = createCanvas(400, 100)
    const ctx = canvas.getContext('2d')
    const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 64 })
    const avatarCanvasImage = await loadImage(avatarUrl)
    const fillXp = xp * 275 / xpGoal

    ctx.fillStyle = '#2C3E50'
    ctx.fillRect(0, 0, 400, 100)

    ctx.beginPath()
    ctx.roundRect(100, 55, 275, 10, 5)
    ctx.fillStyle = '#1B2631'
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.roundRect(100, 55, fillXp, 10, 5)
    ctx.fillStyle = '#5DADBC'
    ctx.fill()
    ctx.closePath()

    ctx.font = 'bold 20px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Niveau ${level}`, 100, 40)

    ctx.font = 'bold 10px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${xp}xp`, 100, 75)

    ctx.font = 'bold 10px Discord'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${xpGoal}xp`, 375, 75)

    ctx.beginPath()
    ctx.arc(50, 50, 25, 0, Math.PI * 2, true)
    ctx.closePath()

    ctx.clip()
    ctx.drawImage(avatarCanvasImage, 25, 25, 50, 50)

    const buffer = canvas.toBuffer('image/png')
    return buffer

}