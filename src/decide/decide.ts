import Card from "whot/dist/card"
import { GameInterface } from "src/game/gameInterface";
import { OpponentsInterface } from "../opponents/opponentsInterface";
import { Opponents } from "../opponents/opponents";
import { PlayerCards, PlayerInterface } from "../player/playerInterface";
import { DecideInterface } from "./decideInterface";
import { generalMarketValue, holdOnValue, iNeedValue, pickTwoValue, matchesShapeOrNumber, matchesShape, matchesNumber } from "../util";
import { HoldOn } from "../holdon/holdon";
import { HoldOnInterface } from "../holdon/holdonInterface";
import { Destroyer } from "../destroyer/destroyer";
import { DestroyerInterface } from "../destroyer/destroyerInterface";
import { isEqual } from "lodash";

export type decideProp = {
    game: GameInterface,
    player: PlayerInterface
}

export class Decide implements DecideInterface {

    game: GameInterface
    player: PlayerInterface
    opponents: OpponentsInterface
    shapeStreak: Card[] = []
    numberStreak: Card[] = []

   constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
        this.opponents = new Opponents(props)
   }

//    All checks are done based on the card ontop of the pile
   checkIfOpponentsIsLastCard(): Boolean {
       return this.opponents.checkIfOpponentsIsLastCard()
   }

   checkIFGeneralMarketExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            
            if(matchesShapeOrNumber(this.player.getCardOnPile(), card) && card.value === generalMarketValue){
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
            if((matchesShapeOrNumber(this.player.getCardOnPile(), card) && (card.value === generalMarketValue))
             || (matchesShapeOrNumber(this.player.getCardOnPile(), card) && (card.value === pickTwoValue))){
                return true
            }
        }
        return false
   }

   checkIfHoldonExistsInPlayerCards(): Boolean {
        const cards: Card[] = this.player.cards;
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            if(matchesShapeOrNumber(this.player.getCardOnPile(), card) && card.value === holdOnValue){
                return true
            }
        }
        return false
   }

   checkIfShapeExists(): Boolean {
        const cards: Card[] = this.player.cards;
        cards.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)

        let outerShapeStreak: Card[] = []
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            let shapeStreak: Card[] = []
            if(matchesShape(this.player.getCardOnPile(), card)){
                shapeStreak.push(card)
                for(let j = 0; j < cards.length; j++){
                    const card1: Card = cards[j]
                    if(isEqual(card, card1)){
                        continue
                    }
                    const lastCardInShapeStreak = shapeStreak[shapeStreak.length - 1]
                    if(matchesShape(lastCardInShapeStreak, card1)){
                        shapeStreak.push(card1)
                    }

                }
            }

            shapeStreak.length > outerShapeStreak.length ?  outerShapeStreak = shapeStreak : outerShapeStreak
        }

        if(outerShapeStreak.length > 0){
            this.shapeStreak = outerShapeStreak
            return true
        }

        return false
   }

   checkIfNumberExists(): Boolean {
        const cards: Card[] = this.player.cards;
        cards.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)

        let outerNumberStreak: Card[] = []
        for(let i = 0; i < cards.length; i++){
            const card: Card = cards[i]
            let numberStreak: Card[] = []
            if(matchesNumber(this.player.getCardOnPile(), card)){
                numberStreak.push(card)
                for(let j = 0; j < cards.length; j++){
                    const card1: Card = cards[j]
                    if(isEqual(card, card1)){
                        continue
                    }
                    const lastCardInShapeStreak = numberStreak[numberStreak.length - 1]
                    if(matchesNumber(lastCardInShapeStreak, card1)){
                        numberStreak.push(card1)
                    }

                }
            }

            numberStreak.length > outerNumberStreak.length ?  outerNumberStreak = numberStreak : outerNumberStreak
        }

        if(outerNumberStreak.length > 0){
            this.numberStreak = outerNumberStreak
            return true
        }

        return false
   }

   execute(): Card | null {
       
        // check if OP is last card
        // check if OP used whot and is last card
        // check if destroyer exists -> check destroyer winning strek -> play destroyer winning streak | store destroyer max winning streak
        // check if hold on exists -> check holdon winning streak -> play holdon winning streak | store holdon max winning streak
        // 
        return null
   }
}