import { assert, expect } from "chai"
import Card from "whot/dist/card"
import { Pile } from "whot/dist/pile"
import { Market } from "whot/dist/market"
import {playersCard, PlayersCardsInterface} from "../../src/playersCards/PlayersCardsInterface"
import { PlayersCards } from "../../src/playersCards/playersCards"
import { Player } from "../../src/player/player"
import { emitter, EventEmitter } from "whot/dist/events"
import { Opponents } from "../../src/opponents/opponents"
import { GameLoop } from "../../src/game/loop"
import { PlayerInterface } from "../../src/player/playerInterface";
import { Decide } from "../../src/decide/decide"

describe("Decide", () => {
    it("Should check if opponents is last card", () => {
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
        game.players.forEach((Player: PlayerInterface) => {               
             Player.pick()
        })

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        let decide = new Decide({
            game: game,
            player: playerTurn
        });
        expect(decide.checkIfOpponentsIsLastCard()).to.be.true
        game.players.forEach((Player: PlayerInterface) => {               
            Player.pick()
        })

        decide = new Decide({
        game: game,
        player: playerTurn
        });

        expect(decide.checkIfOpponentsIsLastCard()).to.be.false
    })

    it("Should check if general market exists in player card", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player2.cards.push(Card.createSquareCard({value: 11}))
      
        const playerTurn: PlayerInterface = game.getPlayerTurn()

        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        playerTurn.pile().push([Card.createCrossCard({value: 4})])
        expect(decide.checkIFGeneralMarketExistsInPlayerCards()).to.be.false
        
        playerTurn.cards.push(Card.createCrossCard({value: 14}))
        expect(decide.checkIFGeneralMarketExistsInPlayerCards()).to.be.true

    })

    it("Should check if ineed exists in player cards", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        expect(decide.checkIfINeedExistsInPlayerCards()).to.be.false

        playerTurn.cards.push(Card.createWhotCard({value: 20}))
        expect(decide.checkIfINeedExistsInPlayerCards()).to.be.true
    })

    it("Should check if hold on exists in player card", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        playerTurn.pile().push([Card.createStarCard({value: 8})])

        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        expect(decide.checkIfHoldonExistsInPlayerCards()).to.be.false
        playerTurn.pile().push([Card.createCircleCard({value: 8})])

        playerTurn.cards.push(Card.createCircleCard({value: 1}))
        expect(decide.checkIfHoldonExistsInPlayerCards()).to.be.true
    })

    it("Should check if destroyers on exists in player card", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()


        let decide = new Decide({
            game: game,
            player: playerTurn
        });
        playerTurn.pile().push([Card.createCircleCard({value: 7})])
        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.false

        playerTurn.cards.push(Card.createCircleCard({value: 2}))
        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.true

        playerTurn.cards.pop()
        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.false

        playerTurn.cards.push(Card.createCircleCard({value: 14}))
        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.true
    })

    it("Should check if shape exists", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player1.cards.push(Card.createCircleCard({value: 2}))
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        playerTurn.pile().push([Card.createTriangleCard({value: 7})])
        expect(decide.checkIfShapeExists()).to.be.false
        playerTurn.pile().push([Card.createCircleCard({value: 7})])
        expect(decide.checkIfShapeExists()).to.be.true
        expect(decide.shapeStreak).to.have.lengthOf(2)
    })

    it("Should check if number exists", () => {
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

        player1.cards.push(Card.createCircleCard({value: 5}))
        player1.cards.push(Card.createTriangleCard({value: 5}))
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()

        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        playerTurn.pile().push([Card.createSquareCard({value: 7})])
        expect(decide.checkIfNumberExists()).to.be.false
        playerTurn.pile().push([Card.createSquareCard({value: 5})])
        expect(decide.checkIfNumberExists()).to.be.true
        expect(decide.numberStreak).to.have.lengthOf(2)
    })

    it("Should execute decision", () => {
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

        const circle5 = Card.createCircleCard({value: 5})
        player1.cards.push(circle5)
        player2.cards.push(Card.createSquareCard({value: 11}))

        const playerTurn: PlayerInterface = game.getPlayerTurn()
        game.pile.push([Card.createCircleCard({value: 1})])
    
        let decide = new Decide({
            game: game,
            player: playerTurn
        });

       expect(decide.execute()).to.equal(circle5)

    })
})