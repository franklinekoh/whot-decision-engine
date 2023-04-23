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


        let decide = new Decide({
            game: game,
            player: playerTurn
        });

        expect(decide.checkIfHoldonExistsInPlayerCards()).to.be.false

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

        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.false

        playerTurn.cards.push(Card.createCircleCard({value: 2}))
        expect(decide.checkIfDestroyersExistsInPlayerCards()).to.be.true
    })
})