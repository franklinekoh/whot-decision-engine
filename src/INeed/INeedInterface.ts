import {PlayerCards} from '../player'

export interface INeedInterface {
    playerCards: PlayerCards

    checkINeedWinningStreak(): true

    performINeedWinningStreak(): any
}