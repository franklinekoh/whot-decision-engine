
import {PlayerCards} from '../player/playerInterface'
export interface HoldOnInterface{

    playerCards: PlayerCards
    checkHoldOnWinningStreak(): true

    performHoldOnWinningStreak(): any

    checkIfContinueExists(): true
}