import {PlayerCards} from '../player/playerInterface'
import Card from 'whot/dist/card'

export type INeedProp = {
    cards: Card[],
    cardOnPile: Card
}

export interface INeedInterface {
    playerCards: PlayerCards

    checkINeedWinningStreak(): true

    checkIfContinueExists(): true
}