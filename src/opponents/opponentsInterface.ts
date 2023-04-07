import {Player, PlayerInterface} from "../player"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import Card from "whot/dist/card"

export interface OpponentsInterface {
    
    opponents: Player[]

    getOpponents(): Player[]

    checkIfOpponentsPlayedWhot(): Boolean

    checkIfOpponentsIsLastCard(): Boolean

    getOpponentsLastPlayed(): Card 

    getOpponentNToLastPlayed(n: Number): Card 
}