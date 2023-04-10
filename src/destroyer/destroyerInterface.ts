import {PlayerCards} from '../player/playerInterface'

export interface DestroyerInterface {
    playerCards: PlayerCards

    checkIfContinueExists(): true

    checkDestroyerWinningStreak(): true

    performDestroyerWinningStreak(): void
}