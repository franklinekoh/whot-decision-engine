import Card from "whot/dist/card"
import {PlayerCards} from '../player/playerInterface'

export type DestroyerContinue = {
    destroyers: Card[]
    continue: Card
}

export type DestroyerProp = {
    cards: Card[],
    cardOnPile: Card
}

export interface DestroyerInterface {
    cards: Card[]
    destroyers: Card[]
    noneDestroyers: Card[] 
    isWinningStreak: Boolean
    winningStreak: Card[] 
    maxWinningStreak: Card[]
    cardOnPile: Card

    seperateCards(): void

    checkIfContinueExists(): Boolean

    checkDestroyerWinningStreak(): Boolean
}