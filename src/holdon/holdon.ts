import {isEqual, map} from "lodash"
import Card from "whot/dist/card"
import { holdOnValue, isDestroyer, matchesNumber, matchesShape, matchesShapeOrNumber } from "../util";
import { HoldOnProp } from "./holdonInterface";
import { Destroyer } from "../destroyer/destroyer";

export class HoldOn {

    cards: Card[]
    holdOns: Card[] = []
    noneholdOns: Card[] = []
    isWinningStreak: Boolean = false
    winningStreak: Card[] = []
    maxWinningStreak: Card[] = []
    cardOnPile: Card
    continueCard?: Card 

    constructor(prop: HoldOnProp){
        this.cards = prop.cards
        this.cardOnPile = prop.cardOnPile
        this.seperateCards()
    }

    seperateCards(): void {
        let holdOns: Card[] = []
        let noneholdOns: Card[] = []
        for(let i = 0; i < this.cards.length; i++){
            const card: Card = this.cards[i]
            if(card.value === holdOnValue){
                holdOns.push(card)
            }else{
                noneholdOns.push(card)
            }
        }
        this.holdOns = holdOns
        this.noneholdOns = noneholdOns
    }

    checkIfContinueExists(): Boolean {
        // consdier using streak algorithm to check for continue
        this.noneholdOns.sort()

        let holdOnMap = new Map<Card, Card[]>()
        this.holdOns.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)
        this.noneholdOns.sort((a: Card, b: Card) => (a.value > b.value) ? 1: (a.value < b.value) ? -1 : 0)

        for(let j = 0; j < this.holdOns.length; j++){
            const holdOn: Card = this.holdOns[j]
            if(matchesShapeOrNumber(holdOn, this.cardOnPile)){
                holdOnMap.set(holdOn, [holdOn])

                for(let k = 0; k < this.holdOns.length; k++){
                    const holdOn1: Card = this.holdOns[k]
                    if(isEqual(holdOn1, holdOn)){
                        continue
                    }

                    let mapValue: Card[] = holdOnMap.get(holdOn) ?? []
                    const lastValueInMap: Card = mapValue[mapValue.length - 1]
                   
                    if(matchesNumber(lastValueInMap, holdOn1)){
                        mapValue.push(holdOn1)  
                        holdOnMap.set(holdOn, mapValue)
                    }
                }

                for(let i = 0; i < this.noneholdOns.length; i++){
                    const noneHoldon: Card = this.noneholdOns[i]
                    let mapValue: Card[] = holdOnMap.get(holdOn) ?? []
                    const lastValueInMap: Card = mapValue[mapValue.length - 1]

                    let _maxWinningStreak_ : Card[] = []
                    for(let l = 0; l < mapValue.length; l++){
                        const cardInMap: Card = mapValue[l]
                        if(matchesShape(noneHoldon, cardInMap)){
                            let mapValueCopy: Card[] = [...mapValue]
                            mapValueCopy.length = l + 1

                            if(isDestroyer(noneHoldon)){
                                const filteredCard = this.cards.filter((card: Card) => card.value !== holdOnValue)
                                const destroyer = new Destroyer({
                                    cards: filteredCard,
                                    cardOnPile: noneHoldon
                                })
                                destroyer.checkDestroyerWinningStreak()
                                if(destroyer.maxWinningStreak.length > 0){
                                    mapValueCopy = mapValueCopy.concat(destroyer.maxWinningStreak)
                                }
                            }else{
                                mapValueCopy.push(noneHoldon)
                            }
                            _maxWinningStreak_ = mapValueCopy.length > _maxWinningStreak_.length ? mapValueCopy: _maxWinningStreak_
                        }

                        if(l === mapValue.length - 1 && _maxWinningStreak_.length > 0){
                            this.maxWinningStreak = _maxWinningStreak_.length > this.maxWinningStreak.length ? _maxWinningStreak_: this.maxWinningStreak
                        }
                    }
                }         
                
            }
        }

        if(this.maxWinningStreak.length > 0){
            return true
        }
               
        return false
    }
}