import { matchesNumber, matchesShape, matchesShapeOrNumber, isDestroyer } from "../../src/util"
import { assert, expect } from "chai"
import Card from "whot/dist/card"

const circle2 = Card.createCircleCard({value: 2})
const circle4 = Card.createCircleCard({value: 4})
const square4 = Card.createSquareCard({value: 4})
describe("Decide", () => {
    it("Matches Shape Or Number", () => {
        expect(matchesShapeOrNumber(circle2, circle4)).to.be.true
        expect(matchesShapeOrNumber(square4, circle4)).to.be.true
        expect(matchesShapeOrNumber(circle2, square4)).to.be.false
    })  

    it("Matches Number", () => {
        expect(matchesNumber(circle2, circle4)).to.be.false
        expect(matchesNumber(square4, circle4)).to.be.true
    }) 

    it("Matches Shape", () => {
        expect(matchesShape(circle2, circle4)).to.be.true
        expect(matchesShape(square4, circle4)).to.be.false
    }) 

    it("Is destroyer", () => {
        expect(isDestroyer(circle2)).to.be.true
        expect(isDestroyer(square4)).to.be.false
    }) 
})
