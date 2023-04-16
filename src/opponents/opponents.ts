import {PlayerInterface} from "../player/playerInterface"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import { decideProp } from "../decide/decide"
import { GameInterface } from "../game/gameInterface"
import { playersCard, PlayersCardsInterface } from "../playersCards/playersCardsInterface"
import { PlayersCards } from "../playersCards/playersCards"


export class Opponents {

    game: GameInterface
    player: PlayerInterface;

    constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
    }   

    getOpponents(): PlayerInterface[]{
        return this.game.players.filter((player: PlayerInterface) => {
            return player.IDInterface.id !== this.player.IDInterface.id
        })
    }

    // getOpponentsLastPlayed(): playersCard[] {

    // }

}