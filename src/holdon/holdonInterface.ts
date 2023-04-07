
import {PlayerCards} from '../player'
export interface HoldOnInterface{

    playerCards: PlayerCards
    checkHoldOnWinningStreak(): true

    performHoldOnWinningStreak(): any

    checkIfContinueExists(): true
}