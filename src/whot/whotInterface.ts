import {PlayerCards} from '../player/playerInterface'
import Card from "whot/dist/card"

export interface whotInterface {
    playerCards: PlayerCards

    checkIfWhotExistsInPlayersCard(): true

    // Go through the decision engine to get the right card
    requestForCard(): Card
}