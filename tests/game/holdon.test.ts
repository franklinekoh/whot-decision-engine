import { assert, expect } from "chai"
import Card from "whot/dist/card"
import { HoldOn } from "../../src/holdon/holdon"
import { HoldOnProp } from "../../src/holdon/holdonInterface"

const sqaure2 = Card.createSquareCard({
    value: 2
})

const circle1 = Card.createCircleCard({
    value: 1
})

const circle2 = Card.createCircleCard({
    value: 2
})

const triangle1 = Card.createTriangleCard({
    value: 1
})

const triangle2 = Card.createTriangleCard({
    value: 2
})

const triangle5 = Card.createTriangleCard({
    value: 5
})

const square1 = Card.createSquareCard({value: 1})

let cards = [sqaure2, circle1, triangle1, triangle5]
describe("Destroyer", () => {

    it('should seperate cards', () => {
        const holdOn = new HoldOn({
            cards,
            cardOnPile: sqaure2
        })

        expect(holdOn.holdOns).to.include(circle1)
        expect(holdOn.holdOns).to.include(triangle1)
        expect(holdOn.noneholdOns).to.include(sqaure2)
        expect(holdOn.noneholdOns).to.include(triangle5)
    })

    it('should check if continue exists', () => {
        cards.pop()
        
        let holdOn = new HoldOn({
            cards,
            cardOnPile: sqaure2
        })

        expect(holdOn.checkIfContinueExists()).to.be.false
        cards.push(triangle5)
        cards.push(square1)

        holdOn = new HoldOn({
            cards,
            cardOnPile: Card.createTriangleCard({value: 7})
        })
        expect(holdOn.checkIfContinueExists()).to.be.true
    })

    it('should check holdon winning streak', () => {
        // console.log(cards)
        let holdOn = new HoldOn({
            cards,
            cardOnPile: Card.createTriangleCard({value: 7})
        })
        expect(holdOn.checkHoldOnWinningStreak()).to.be.false

        cards = cards.filter((card: Card) => card.value !== 5)

        holdOn = new HoldOn({
            cards,
            cardOnPile: Card.createTriangleCard({value: 7})
        })
        expect(holdOn.checkHoldOnWinningStreak()).to.be.true

        holdOn = new HoldOn({
            cards,
            cardOnPile: Card.createCircleCard({value: 2})
        })
        expect(holdOn.checkHoldOnWinningStreak()).to.be.true
    })

})