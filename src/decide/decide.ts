import { GameInterface } from "src/game/gameInterface";
import { OpponentsInterface } from "../opponents/opponentsInterface";
import { Opponents } from "../opponents/opponents";
import { PlayerCards, PlayerInterface } from "../player/playerInterface";
import { DecideInterface } from "./decideInterface";
import Card from "whot/dist/card"
import { generalMarketValue, holdOnValue, iNeedValue, pickTwoValue } from "../util";

export type decideProp = {
    game: GameInterface,
    player: PlayerInterface
}

export class Decide implements DecideInterface {

    game: GameInterface
    player: PlayerInterface;
    opponents: OpponentsInterface;

   constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
        this.opponents = new Opponents(props)
   }

   checkIfOpponentsIsLastCard(): Boolean {
       return this.opponents.checkIfOpponentsIsLastCard()
   }

   checkIFGeneralMarketExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            if(card.value === generalMarketValue){
                return true
            }
        }
        return false
   }

   checkIfINeedExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            if(card.value === iNeedValue){
                return true
            }
        }
        return false
   }

   checkIfDestroyersExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            if(card.value === generalMarketValue || card.value === pickTwoValue){
                return true
            }
        }
        return false
   }

   checkIfHoldonExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            if(card.value === holdOnValue){
                return true
            }
        }
        return false
   }
}