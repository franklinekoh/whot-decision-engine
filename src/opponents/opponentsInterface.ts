import {PlayerInterface} from "../player/playerInterface"
import { playersCard } from "../playersCards/playersCardsInterface"

export interface OpponentsInterface {
    
    getOpponents(): PlayerInterface[]

    checkIfOpponentsPlayedWhot(): Boolean

    checkIfOpponentsIsLastCard(): Boolean

    getOpponentsLastPlayed(): playersCard[] 
}