import Card from "whot/dist/card";
import { INeedProp } from "./INeedInterface";
import { iNeedValue } from "../util";



export class INeed {
    cards: Card[]
    cardOnPile: Card
    INeedCards: Card[] = []
    noneINeedCards: Card[] = []

    constructor(prop: INeedProp){
        this.cards = prop.cards
        this.cardOnPile = prop.cardOnPile
        this.seperateCards()
    }

    seperateCards(): void {
        let INeedCards: Card[] = []
        let noneINeedCards: Card[] = []

        for(let i = 0; i < this.cards.length; i++){
            const card = this.cards[i]
            if(card.value === iNeedValue){
                INeedCards.push(card)
            }else{
                noneINeedCards.push(card)
            }
        }

        this.INeedCards = INeedCards
        this.noneINeedCards = noneINeedCards
    }
}