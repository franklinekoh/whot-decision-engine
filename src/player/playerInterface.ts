import Card from "whot/dist/card";
import {Shapes, renderShape, CardShape} from "whot/dist/shapes"
import { CardMove } from "whot/dist/moves"
import { eventify, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import Pile from "whot/dist/pile"
import {Player as WhotPlayer} from "whot/dist/player";

export type PlayerCards = {
    shapes: Card[],
    numbers: Card[]
}

export type IDInterface = {
    unique_id: string;
    name: string;
    id: number;
}

export interface PlayerInterface {

    IDInterface: IDInterface
    PlayerCards: PlayerCards

    // properties extended 
    id: number
    emitter: EventEmitter
    market: () => Market
    pile: () => Pile
    cards: Card[]
    turn: boolean
    hasWon: boolean
    toPick: number
    emit: (event: string, data: any) => WhotPlayer 

    getCardOnPile(): Card

    matchesShape(card: Card): Card[]

    matchesNumber(card: Card): Card[]

    // API functions that should be extended

    validator(card: Card): boolean

    add(_cards_: Card[]): void

    hand(): Card[]

    pick(): Card[]

    play(index: number, iNeed?: CardShape): Card

    lastCard(): boolean

    empty(): boolean

    canPlay(): boolean

    canMatchMove(move?: CardMove): boolean

    render(): string
}