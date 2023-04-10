import { PlayerInterface } from "../player/playerInterface"
import Card from "whot/dist/card"

export type playersCards = {
    card: Card,
    Player: PlayerCardsInterface,
}

export interface PlayerCardsInterface {
    playersCards: playersCards[]

    setPlayersCards(playerCards: playersCards): playersCards[]

    getLastPlayersCards(): playersCards[]

}