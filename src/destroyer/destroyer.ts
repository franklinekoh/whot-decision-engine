import Card from "whot/dist/card"
import { decideProp } from "../decide/decide"
import { IDInterface, PlayerCards } from "../player/playerInterface";
import { generalMarketValue, pickTwoValue } from "../util";

export type DestroyerContinue = {
    destroyers: Card[]
    continue: Card
}

export class Destroyer {

    cards: Card[]
    destroyers: Card[] = []
    noneDestroyers: Card[] = []
    destroyerStreak: Boolean = false

    constructor(prop: Card[]){
        this.cards = prop
        this.seperateCards()
    }

    seperateCards(): void {
        let destroyers: Card[] = []
        let noneDestroyers: Card[] = []
        for(let i = 0; i < this.cards.length; i++){
            const card: Card = this.cards[i]
            if(card.value === generalMarketValue || card.value === pickTwoValue){
                destroyers.push(card)
            }else{
                noneDestroyers.push(card)
            }
        }
        this.destroyers = destroyers
        this.noneDestroyers = noneDestroyers
    }

    checkIfContinueExists(): Boolean {       
        for(let i = 0; i < this.noneDestroyers.length; i++){
            const noneDestroyer: Card = this.noneDestroyers[i]
            for(let j = 0; j < this.destroyers.length; j++){
                const destroyer: Card = this.destroyers[j]
                if(noneDestroyer.shape === destroyer.shape){
                    return true
                }
            }
        }
        return false
    }

    checkDestroyerWinningStreak(): Boolean {
        
        return false
    }
}