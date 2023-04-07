import {PlayerCards} from '../player'

export interface DestroyerInterface {
    playerCards: PlayerCards

    checkIfContinueExists(): true

    checkDestroyerWinningStreak(): true

    performDestroyerWinningStreak(): void
}