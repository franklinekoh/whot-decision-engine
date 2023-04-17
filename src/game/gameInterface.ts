import {PlayerInterface, IDInterface} from "../player/playerInterface"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import { PlayersCards } from "../playersCards/playersCards"

export interface GameInterface {
    players: PlayerInterface[]  // player with system id and name
    pile: Pile
    market: Market
    emitter: EventEmitter
    turn: Turn
    noOfDecks: number 
    noOfCardsPerPlayer: number 
    gameOn: boolean
    playersCards: PlayersCards //stores every card played by every player for decision making


    assignPlayers(players: IDInterface[]): PlayerInterface[]

    assignCardsToPlayers(): void

    start(): void
}