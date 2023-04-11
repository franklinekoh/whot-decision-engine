import { GameInterface } from "src/game/gameInterface";
import { OpponentsInterface } from "src/opponents/opponentsInterface";
import { Opponents } from "src/opponents/opponents";
import { PlayerCards, PlayerInterface } from "src/player/playerInterface";
import { DecideInterface } from "./decideInterface";

export type decideProp = {
    game: GameInterface,
    player: PlayerInterface
}
export class decide  {

    game: GameInterface
    player: PlayerInterface;
    opponents: Opponents;

   constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
        this.opponents = new Opponents(props)
   }

   checkIfOpponentIsLastCard(): true {
       
   }


}