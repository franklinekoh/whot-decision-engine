import Card from 'whot/dist/card'
import { GameInterface } from "src/game/gameInterface";
import { PlayerInterface } from "../player/playerInterface";

export interface INeedInterface {

    game: GameInterface
    player: PlayerInterface
    cards: Card[]
    cardOnPile: Card
    INeedCards: Card[]
    noneINeedCards: Card[]

    seperateCards(): void

    chooseCard(): Card
}