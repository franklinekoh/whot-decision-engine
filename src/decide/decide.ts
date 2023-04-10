import { GameInterface } from "src/game/gameInterface";
import { PlayerCards, PlayerInterface } from "src/player/playerInterface";
import { DecideInterface } from "./decideInterface";

export type decideProp = {
    game: GameInterface,
    player: PlayerInterface
}
export class decide implements DecideInterface {

    game: GameInterface
    player: PlayerInterface;
   constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
   }

   checkForGeneralMarket(): true {
       
   }

   checkIfListContainsDestroyer(): true {
       
   }

   checkIfListContainsHoldOn(): true {
       
   }

   checkIfListContainsINeed(): true {
       
   }

   checkIfOpponentIsLastCard(): true {
       
   }

   checkIfWhotExistsInPlayerCards(): true {
       
   }
}