import { assert, expect } from "chai";
import Card from "whot/dist/card"
import { INeed } from "../../src/INeed/INeed";
import { INeedInterface} from "../../src/INeed/INeedInterface";
import { GameLoop } from "../../src/game/loop"
import { PlayerInterface } from "../../src/player/playerInterface";

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

        const players = [{
            unique_id: 'KDJKFskdksjks',
            name: 'starboy',
            id: 1
        },
        {
            unique_id: 'KDJKFskdksjks',
            name: 'Obo',
            id: 2
        }]

        const game = new GameLoop(players)
        const player1: PlayerInterface = game.players[0] 
        const player2: PlayerInterface = game.players[1]

        player1.cards = cards
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        const INeedProp = {
            game: game,
            player: playerTurn
        }

        const iNeed = new INeed(INeedProp)

        expect(iNeed.INeedCards).to.include(whot)
        expect(iNeed.noneINeedCards).to.include(cross4)
        expect(iNeed.noneINeedCards).to.include(triangle7)
    })

    it('should choose card', () => {
        const players = [{
            unique_id: 'KDJKFskdksjks',
            name: 'starboy',
            id: 1
        },
        {
            unique_id: 'KDJKFskdksjks',
            name: 'Obo',
            id: 2
        }]

        const game = new GameLoop(players)
        const player1: PlayerInterface = game.players[0] 
        const player2: PlayerInterface = game.players[1]

        player1.cards = cards
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()
        playerTurn.pile().push([Card.createTriangleCard({value: 4})])

        const INeedProp = {
            game: game,
            player: playerTurn
        }

        const iNeed = new INeed(INeedProp)

        expect(iNeed.chooseCard()).to.be.instanceOf(Card)
        expect(iNeed.chooseCard()).to.equal(cross4)
    })
})