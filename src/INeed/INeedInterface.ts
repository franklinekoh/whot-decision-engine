import {PlayerCards} from '../player/playerInterface'

export interface INeedInterface {
    playerCards: PlayerCards

    checkINeedWinningStreak(): true

    performINeedWinningStreak(): any
}