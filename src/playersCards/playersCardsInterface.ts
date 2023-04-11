import { PlayerInterface } from "../player/playerInterface"
import Card from "whot/dist/card"

export type playersCard = {
    card: Card,
    Player: PlayerInterface,
}

export interface PlayerCardsInterface {

    setPlayersCard(playersCard: playersCard): void

    getLastPlayersCards(numberOfPlayers: number): playersCard[]

    getPlayersCards(): playersCard[]
}