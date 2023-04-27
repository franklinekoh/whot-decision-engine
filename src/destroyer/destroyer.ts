import Card from "whot/dist/card"
import { decideProp } from "../decide/decide"
import { IDInterface, PlayerCards } from "../player/playerInterface";
import { generalMarketValue, pickTwoValue, matchesShapeOrNumber } from "../util";
import {isEqual} from "lodash"

export type DestroyerContinue = {
    destroyers: Card[]
    continue: Card
}

export type DestroyerProp = {
    cards: Card[],
    cardOnPile: Card
}

export class Destroyer {

    cards: Card[]
    destroyers: Card[] = []
    noneDestroyers: Card[] = []
    isWinningStreak: Boolean = false
    winningStreak: Card[] = []
    maxWinningStreak: Card[] = []
    cardOnPile: Card

    constructor(prop: DestroyerProp){
        this.cards = prop.cards
        this.cardOnPile = prop.cardOnPile
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
            for(let j = 0; j < this.destroyers.length; j++){
                const destroyer: Card = this.destroyers[j]
                if(matchesShapeOrNumber(destroyer, this.cardOnPile)){
                    for(let i = 0; i < this.noneDestroyers.length; i++){
                        const noneDestroyer: Card = this.noneDestroyers[i]
                        if(destroyer.shape === noneDestroyer.shape){
                            return true
                        }
                    }              
                }
            }
                   
        return false
    }

    checkDestroyerWinningStreak(): Boolean {
        
        let destroyerMap = new Map<Card, Card[]>()

        this.destroyers.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)
        this.noneDestroyers.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)

        /**
         * Loop through every destroyer. this.destroyers = [circle2, square14, square2], order destroyer
         * For each destroyer, check if matches card on pile/can be played. 
         * Loop through each destroyer and none destroyer and check if the last card in the destroyerMap matches current value and add to map.
         * At the end of each loop. if length of map === number of cards. set winning streak to through and perform winning streak
         */

        for(let i = 0; i < this.destroyers.length; i++){
            const destroyer: Card = this.destroyers[i]

            if(matchesShapeOrNumber(destroyer, this.cardOnPile)){
                destroyerMap.set(destroyer, [destroyer])
                
                for(let j = 0; j < this.destroyers.length; j++){
                    const destroyer1: Card = this.destroyers[j]

                    if(isEqual(destroyer, destroyer1)){
                        continue
                    }
//  check if the previous destroyer == current destroyer
                    let mapValue: Card[] = destroyerMap.get(destroyer) ?? []
                    const lastValueInMap: Card = mapValue[mapValue.length-1]
                    if(matchesShapeOrNumber(lastValueInMap, destroyer1)){                                    
                        mapValue.push(destroyer1)
                        destroyerMap.set(destroyer, mapValue)
                    }
                }

                // None destroyers
                for(let j = 0; j < this.noneDestroyers.length; j++){
                    const noneDestroyer: Card = this.noneDestroyers[j]

                    let mapValue: Card[] = destroyerMap.get(destroyer) ?? []
                    const lastValueInMap: Card = mapValue[mapValue.length-1]
                    if(mapValue.length > 0 && matchesShapeOrNumber(lastValueInMap, noneDestroyer)){                       
                        mapValue.push(noneDestroyer)
                        destroyerMap.set(destroyer, mapValue)
                    }
                }

                const _destroyerMap_ = destroyerMap.get(destroyer) ?? []
                this.maxWinningStreak = (_destroyerMap_.length > this.maxWinningStreak.length)? _destroyerMap_ : this.maxWinningStreak
                console.log(this.maxWinningStreak)
                if(_destroyerMap_.length === this.cards.length){
                    this.isWinningStreak = true
                    this.winningStreak = _destroyerMap_
                    // console.log(this.winningStreak)
                    return true
                }

                

            }
        }
      

        this.isWinningStreak = false
        return false
    }
}