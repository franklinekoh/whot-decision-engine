import {PlayerInterface} from "../player/playerInterface"
import Card from "whot/dist/card"
import {playersCard, PlayersCardsInterface} from "./playersCardsInterface"

export class PlayersCards implements PlayersCardsInterface{
    private playersCards: playersCard[] = []

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