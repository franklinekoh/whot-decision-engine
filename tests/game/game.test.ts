import { assert } from "chai";
import Shapes, { CardShape } from 'whot/dist/shapes'
import { GameLoop } from "../../src/game/loop"
import { InvalidNumberOfPlayers } from "../../src/error/errors"

describe("Game", () => {
    it("should have specified number of players", () => {
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

        assert.equal(players.length, game.players.length)
    })

    it("should throw InvalidNumberOfPlayers", () => {
        try{
            const players = [{
                unique_id: 'KDJKFskdksjks',
                name: 'starboy',
                id: 1
            }]
            const game = new GameLoop(players)
        }catch(err: any){
            assert.equal(err.name, InvalidNumberOfPlayers.name)
            assert.equal(err.message, InvalidNumberOfPlayers.message)
        }
       
    })

    it("Should assign specific number of cards to each player", () => {
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
        game.noOfCardsPerPlayer = 7
        game.assignCardsToPlayers();

        game.players.forEach((players) => {
            assert.equal(players.cards.length, game.noOfCardsPerPlayer)
        })
    })

})