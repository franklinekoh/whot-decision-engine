import { assert, expect } from "chai";
import Card from "whot/dist/card"
import {playersCard} from "../../src/playersCards/PlayersCardsInterface"
import { Opponents } from "../../src/opponents/opponents"
import { GameLoop } from "../../src/game/loop"
import { PlayerInterface } from "../../src/player/playerInterface";

describe("Opponents", () => {
    it("Should get player opponents", () => {
        const players = [{
            unique_id: 'KDJKFskdksjks',
            name: 'starboy',
            id: 1
        },
        {
            unique_id: 'KDJKFskdksjks',
            name: 'Obo',
            id: 2
        }
        ]
        const game = new GameLoop(players)
        const playerTurn: PlayerInterface = game.getPlayerTurn()
        const opponents = new Opponents({
            game: game,
            player: playerTurn
        })

        expect(opponents.getOpponents()).to.satisfy((players: PlayerInterface[]) => {
            return players.every((player: PlayerInterface) => {
                return player.id !== playerTurn.id
            })
        })

    })

    it("should get players Last played", () => {
        const players = [{
            unique_id: 'KDJKFskdksjks',
            name: 'starboy',
            id: 1
        },
        {
            unique_id: 'KDJKFskdksjks',
            name: 'Obo',
            id: 2
        },
        {
            unique_id: 'hskwoeiuow',
            name: 'Halla',
            id: 3
        }]
        const game = new GameLoop(players)
        
        for(let i = 0; i < game.players.length; i++){
            let n = 0
            while(n < 2){
                const player: PlayerInterface = game.players[i]
                const card: Card[] = game.market.pick(1)
                game.playersCards.setPlayersCard({
                    player,
                    card: card[0]
                })
                ++n
            }
            
        }

        const card: Card[] = game.market.pick(1)
        const player: PlayerInterface = game.players[1]
        game.playersCards.setPlayersCard({
            player,
            card: card[0]
        })

        const playerTurn: PlayerInterface = game.getPlayerTurn()
        const opponents = new Opponents({
            game: game,
            player: playerTurn
        })

        const opponentsLastPlayed = opponents.getOpponentsLastPlayed()
        expect(opponentsLastPlayed).to.have.lengthOf(3);
        expect(opponentsLastPlayed).to.satisfy((playersCards: playersCard[]) => {
            return playersCards.every((playersCard: playersCard) => {
                return playersCard.player.id !== playerTurn.id
            })
        })

    })

    it("should check opponents last card", () => {
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

        const game1 = new GameLoop(players)
        game1.players.forEach((Player: PlayerInterface) => {               
             Player.pick()
        })

        const playerTurn: PlayerInterface = game1.getPlayerTurn()
        const opponents = new Opponents({
            game: game1,
            player: playerTurn
        })

        expect(opponents.checkIfOpponentsIsLastCard()).to.be.true

        const game2 = new GameLoop(players)
        game2.players.forEach((Player: PlayerInterface) => {   
            for(let i = 0; i < 2; i++){
                Player.pick()
            }                      
        })

        const playerTurn2: PlayerInterface = game2.getPlayerTurn()
        const opponents2 = new Opponents({
            game: game2,
            player: playerTurn2
        })

        expect(opponents2.checkIfOpponentsIsLastCard()).to.be.false
    })

    it("should check opponents played whot", () => {
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

        const game1 = new GameLoop(players)
        game1.players.forEach((player: PlayerInterface, index) => {               
             const card: Card = (index == 0)?Card.createCircleCard({
                value: 4
            }):Card.createCrossCard({
                value: 14
            })
            game1.playersCards.setPlayersCard({
                player,
                card: card
            })
        })

        const playerTurn: PlayerInterface = game1.getPlayerTurn()
        const opponents = new Opponents({
            game: game1,
            player: playerTurn
        })

        const game2 = new GameLoop(players)
        game2.players.forEach((player: PlayerInterface, index) => {               
             const card: Card = (index == 0)?Card.createCircleCard({
                value: 4
            }):Card.createWhotCard({
                value: 20
            })
            game2.playersCards.setPlayersCard({
                player,
                card: card
            })
        })

        const playerTurn2: PlayerInterface = game2.getPlayerTurn()
        const opponents2 = new Opponents({
            game: game2,
            player: playerTurn2
        })

        expect(opponents2.checkIfOpponentsPlayedWhot()).to.be.true
    })
})