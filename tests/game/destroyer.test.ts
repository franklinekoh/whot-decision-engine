import { assert, expect } from "chai"
import Card from "whot/dist/card"
import { Decide } from "../../src/decide/decide"
import { PlayerInterface, PlayerCards } from "../../src/player/playerInterface"
import { Destroyer, DestroyerProp } from "../../src/destroyer/destroyer"
import { GameLoop } from "../../src/game/loop"
import { Player } from "../../src/player/player"
import { Pile } from "whot/dist/pile"
import { Market } from "whot/dist/market"
import { emitter } from "whot/dist/events"

const pile = new Pile({ emitter });
const market = new Market({
    noOfDecks: 1,
    pile: () => pile,
    emitter
})

const singlePlayer: Player = new Player(
    {
        id: 1,
        emitter,
        market: () => market,
        pile: () => pile
    },
    {
        unique_id: 'SLKLD1928100',
        name: 'OBO',
        id: 1
    }
)

const circle4 = Card.createCircleCard({
    value: 4
})

const circle2 = Card.createCircleCard({
    value: 2
})

const square14 = Card.createSquareCard({
    value: 14
})

const sqaure2 = Card.createSquareCard({
    value: 2
})

singlePlayer.add([circle2, square14, sqaure2])

describe("Destroyer", () => {

    it('should get destroyer cards', () => {
        singlePlayer.pile().push([Card.createCircleCard({value: 8})])
        const destroyerProp: DestroyerProp = {
            cards: singlePlayer.cards,
            cardOnPile: singlePlayer.getCardOnPile()
        }
        const destroyer: Destroyer = new Destroyer(destroyerProp)
        expect(destroyer.destroyers).to.include(sqaure2)
        expect(destroyer.destroyers).to.include(circle2)
        expect(destroyer.destroyers).to.include(square14)
        expect(destroyer.destroyers).to.not.include(circle4)
    })

    it('should check if continue exists', () => {
        singlePlayer.pile().push([Card.createCircleCard({value: 2})])
        const destroyerProp: DestroyerProp = {
            cards: singlePlayer.cards,
            cardOnPile: singlePlayer.getCardOnPile()
        }
        const destroyer: Destroyer = new Destroyer(destroyerProp)
        
        const continueCard: Card = Card.createSquareCard({value: 4})
        expect(destroyer.checkIfContinueExists()).to.be.false
        expect(destroyer.continueCard).to.be.undefined
        
        singlePlayer.add([continueCard])
        const destroyer1: Destroyer = new Destroyer(destroyerProp)
        expect(destroyer1.checkIfContinueExists()).to.be.true
        expect(destroyer1.continueCard).to.be.equal(continueCard)
    })

    it('should check destroyer winning streak', () => {
        // singlePlayer.pile().push([Card.createSquareCard({value: 14})])
        const destroyerProp: DestroyerProp = {
            cards: singlePlayer.cards,
            cardOnPile: singlePlayer.getCardOnPile()
        }
        // streak = [circle2, sqaure2, square14, square4]
        const destroyer: Destroyer = new Destroyer(destroyerProp)
        expect(destroyer.checkDestroyerWinningStreak()).to.be.true
        singlePlayer.add([Card.createTriangleCard({value: 7})])

        const destroyerProp1: DestroyerProp = {
            cards: singlePlayer.cards,
            cardOnPile: singlePlayer.getCardOnPile()
        }
        // streak = [circle2, sqaure2, square14, square4, triangle7]
        const destroyer1: Destroyer = new Destroyer(destroyerProp1)
        expect(destroyer1.checkDestroyerWinningStreak()).to.be.false
        
    })
})