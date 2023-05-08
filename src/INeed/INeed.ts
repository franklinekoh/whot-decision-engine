import Card from "whot/dist/card";
import { GameInterface } from "src/game/gameInterface";
import { PlayerCards, PlayerInterface } from "../player/playerInterface";
import { INeedInterface } from "./INeedInterface";
import { iNeedValue, matchesShape } from "../util";
import { decideProp, Decide } from "../../src/decide/decide";



export class INeed implements INeedInterface {
    game: GameInterface
    player: PlayerInterface
    cards: Card[]
    cardOnPile: Card
    INeedCards: Card[] = []
    noneINeedCards: Card[] = []

    constructor(prop: decideProp){
        this.game = prop.game
        this.player = prop.player
        this.cards = prop.player.cards   
        this.cardOnPile = prop.player.getCardOnPile()
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

    chooseCard(): Card {  
        this.noneINeedCards.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)
        const cardsToDecideFrom = this.cards.filter((card: Card) => !matchesShape(card, this.cardOnPile) && card.value !== iNeedValue)

        for(let i = 0; i < this.noneINeedCards.length; i++){
            const noneINeedCard = this.noneINeedCards[i]
            if(matchesShape(noneINeedCard, this.cardOnPile)){
                continue
            }

            const playerToDecideFrom = this.player
            playerToDecideFrom.cards = cardsToDecideFrom
            playerToDecideFrom.pile().push([noneINeedCard])
            const decision: Decide = new Decide({
                game: this.game,
                player: playerToDecideFrom
            })

            const execute = decision.execute()

            if(execute){
                return execute
            }
        }

        if(cardsToDecideFrom.length){
            return cardsToDecideFrom[0]
        }

        return this.noneINeedCards[0]
    }
}