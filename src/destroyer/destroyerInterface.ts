import Card from "whot/dist/card"
import {PlayerCards} from '../player/playerInterface'

export interface DestroyerInterface {
    playerCards: PlayerCards

    seperateCards(): void

    checkIfContinueExists(): Boolean

    checkDestroyerWinningStreak(): Boolean

    performDestroyerWinningStreak(): void
}