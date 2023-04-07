import {Player, PlayerInterface} from "../player"
import Card from "whot/dist/card"

export type playersCards = {
    card: Card,
    Player: Player,
}

export interface PlayerCardsInterface {
    playersCards: playersCards[]

    setPlayersCards(playerCards: playersCards): playersCards[]

    getLastPlayersCards(): playersCards[]

}