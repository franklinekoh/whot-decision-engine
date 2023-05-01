
import {isEqual} from "lodash"
import Card from "whot/dist/card"
import { holdOnValue } from "../util";

export type HoldOnProp = {
    cards: Card[],
    cardOnPile: Card
}

export interface HoldOnInterface{

    cards: Card[]
    checkHoldOnWinningStreak(): true

    seperateCards(): void

    checkIfContinueExists(): true
}