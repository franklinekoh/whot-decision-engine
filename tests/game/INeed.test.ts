import { assert, expect } from "chai";
import Card from "whot/dist/card"
import { INeed } from "../../src/INeed/INeed";
import { INeedInterface, INeedProp } from "../../src/INeed/INeedInterface";

const sqaure2 = Card.createSquareCard({
    value: 2
})

const whot = Card.createWhotCard({
    value: 20
})

const triangle7 = Card.createTriangleCard({
    value: 7
})

const cross4 = Card.createCrossCard({
    value: 4
})

const cards = [ whot, triangle7, cross4]

describe("INeed", () => {
    it('should seperate cards', () => {
        const INeedProp: INeedProp = {
            cards,
            cardOnPile: sqaure2
        }

        const iNeed = new INeed(INeedProp)

        expect(iNeed.INeedCards).to.include(whot)
        expect(iNeed.noneINeedCards).to.include(cross4)
        expect(iNeed.noneINeedCards).to.include(triangle7)
    })
})