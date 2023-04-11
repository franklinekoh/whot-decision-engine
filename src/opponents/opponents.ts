import {PlayerInterface} from "../player/playerInterface"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import { decideProp } from "src/decide/decide"
import { GameInterface } from "src/game/gameInterface";

export class Opponents {

    game: GameInterface
    player: PlayerInterface;

    constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
    }   

    getOpponents(): PlayerInterface[]{
        return this.game.players.filter((player: PlayerInterface) => {
            player.IDInterface.unique_id !== this.player.IDInterface.unique_id
        })
    }

    

}