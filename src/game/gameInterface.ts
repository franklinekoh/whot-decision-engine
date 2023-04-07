import {Player, PlayerInterface} from "../player"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"

export interface GameInterface {
    players: Player[]  // player with system id and name
    pile: Pile
    market: Market
    emitter: EventEmitter
    turn: Turn
    noOfDecks: number 
    noOfCardsPerPlayer: number 
    gameOn: boolean 

    assignPlayers(players: PlayerInterface[]): Player[]

    assignCardsToPlayers(): void

    start(): void
}