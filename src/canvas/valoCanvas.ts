//const { createCanvas, loadImage } = require('canvas');
import { createCanvas, loadImage } from 'canvas'

export async function generateScoreboard() {

    // Dimensions de l'image (à adapter selon le modèle)
    const width = 1200;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');   

    // 1. Fond de l'image (Couleur sombre typique de Valorant)
    ctx.fillStyle = '#0f1923';
    ctx.fillRect(0, 0, width, height);

    // 2. En-tête de la partie (Map et Mode)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px Arial, sans-serif';
    ctx.fillText('BREEZE - COMPÉTITIF', 50, 60);

    // 3. Noms des colonnes
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#8b978f';
    ctx.fillText('AGENT', 50, 130);
    ctx.fillText('JOUEUR', 150, 130);
    ctx.fillText('K / D / A', 450, 130);
    ctx.fillText('SCORE DE COMBAT', 650, 130);

    // 4. Fonction pour dessiner une ligne de joueur
    function drawPlayerRow(y: number, agentName: string, playerName: string, kills: number, deaths: number, assists: number, acs: string, isCurrentPlayer: boolean) {
        // Fond de la ligne (mise en évidence si c'est le joueur principal)
        ctx.fillStyle = isCurrentPlayer ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(40, y - 35, width - 80, 55);

        // Paramètres du texte
        ctx.fillStyle = '#ffffff';
        ctx.font = isCurrentPlayer ? 'bold 22px Arial, sans-serif' : '22px Arial, sans-serif';

        // Espace réservé pour l'icône de l'agent (Carré de couleur pour l'exemple)
        // Pour charger une vraie image d'agent : const img = await loadImage('chemin/image.png'); ctx.drawImage(img, 50, y - 25, 40, 40);
        ctx.fillStyle = '#ff4655'; // Rouge Valorant
        ctx.fillRect(50, y - 25, 35, 35);
        ctx.fillStyle = '#ffffff'; // Retour au blanc pour le texte

        // Données du joueur écrites en dur
        ctx.fillText(playerName, 150, y);
        ctx.fillText(`${kills} / ${deaths} / ${assists}`, 450, y);
        ctx.fillText(acs, 650, y);
    }

    // 5. Intégration des données en dur
    // Ligne 3 : GATTOUZ (Corrigé à 14 Kills)
    drawPlayerRow(200, 'Jett', 'GATTOUZ', 14, 12, 5, '210', false);
    
    // Dernière ligne : Zanay avec Clove
    drawPlayerRow(270, 'Clove', 'Zanay', 18, 15, 8, '245', true);

    // 6. Sauvegarde de l'image
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    return(buffer)
}