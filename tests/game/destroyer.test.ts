import { assert, expect } from "chai"
import Card from "whot/dist/card"
import { Decide } from "../../src/decide/decide"
import { PlayerInterface, PlayerCards } from "../../src/player/playerInterface"
import { Destroyer } from "../../src/destroyer/destroyer"
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

const cross14 = Card.createCrossCard({
    value: 14
})

singlePlayer.add([circle2, square14, cross14])

describe("Destroyer", () => {

    it('should get destroyer cards', () => {
        const destroyer: Destroyer = new Destroyer(singlePlayer.cards)
        expect(destroyer.destroyers).to.include(cross14)
        expect(destroyer.destroyers).to.include(circle2)
        expect(destroyer.destroyers).to.include(square14)
        expect(destroyer.destroyers).to.not.include(circle4)
    })

    it('should check if continue exists', () => {
        const destroyer: Destroyer = new Destroyer(singlePlayer.cards)
        expect(destroyer.checkIfContinueExists()).to.be.false
        singlePlayer.add([circle4])
        const destroyer1: Destroyer = new Destroyer(singlePlayer.cards)
        expect(destroyer1.checkIfContinueExists()).to.be.true
    })
})