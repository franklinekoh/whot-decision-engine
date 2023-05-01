
import {isEqual} from "lodash"
import Card from "whot/dist/card"
import { holdOnValue } from "../util";

export type HoldOnProp = {
    cards: Card[],
    cardOnPile: Card
}

export interface HoldOnInterface{

    cards: Card[]
    holdOns: Card[] 
    noneholdOns: Card[] 
    isWinningStreak: Boolean
    winningStreak: Card[]
    maxWinningStreak: Card[] 
    cardOnPile: Card
    continueCard?: Card 

    checkHoldOnWinningStreak(): Boolean

    seperateCards(): void

    checkIfContinueExists(): Boolean

    checkHoldOnWinningStreak(): Boolean
}