import {PlayerInterface} from "../player/playerInterface"
import Card from "whot/dist/card"
import {playersCard, PlayerCardsInterface} from "./playersCardsInterface"

export class PlayerCards implements PlayerCardsInterface{
    private playersCards: playersCard[]

    setPlayersCard(_playersCard_: playersCard): void{
        this.playersCards.push(_playersCard_)
    }

    getLastPlayersCards(numberOfPlayers: number): playersCard[] {
        return this.playersCards.slice(-numberOfPlayers)
    }

    getPlayersCards(): playersCard[] {
        return this.playersCards
    }
}