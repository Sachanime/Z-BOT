export function getLevelWithXp(xp: number) {
    const level = Math.floor((Math.sqrt(20 * xp + 25 ) - 5) / 10)
    return(level)
}