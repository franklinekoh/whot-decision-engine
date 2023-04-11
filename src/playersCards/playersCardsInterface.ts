import { PlayerInterface } from "../player/playerInterface"
import Card from "whot/dist/card"

export type playersCard = {
    card: Card,
    player: PlayerInterface,
}

export interface PlayersCardsInterface {

    setPlayersCard(playersCard: playersCard): void

    getLastPlayersCards(numberOfPlayers: number): playersCard[]

    getPlayersCards(): playersCard[]
}