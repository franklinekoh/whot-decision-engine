import {PlayerCards} from '../player'
import Card from "whot/dist/card"

export interface whotInterface {
    playerCards: PlayerCards

    checkIfWhotExistsInPlayersCard(): true

    // Go through the decision engine to get the right card
    requestForCards(): Card
}