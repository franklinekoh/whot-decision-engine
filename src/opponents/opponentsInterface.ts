import {PlayerInterface} from "../player/playerInterface"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import Card from "whot/dist/card"
import { playersCard } from "../playersCards/playersCardsInterface"

export interface OpponentsInterface {
    
    getOpponents(): PlayerInterface[]

    checkIfOpponentsPlayedWhot(): Boolean

    checkIfOpponentsIsLastCard(): Boolean

    getOpponentsLastPlayed(): playersCard[] 

    getOpponentNToLastPlayed(n: Number): playersCard[] 
}