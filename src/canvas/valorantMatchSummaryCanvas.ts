import path from 'path'
import { createCanvas, loadImage } from 'canvas'
import { ValorantMatchData } from '../interfaces'

export async function createValorantMatchSummaryCanvas(/*data: ValorantMatchData*/) {

    const width = 2272
    const height = 1149
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const backgroundImagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'valorantMatchSummaryBackgroundImage.png')
    const backgroundImage = await loadImage(backgroundImagePath)

    ctx.drawImage(backgroundImage, 0, 0)

    const buffer = canvas.toBuffer('image/png')
    return(buffer)

}