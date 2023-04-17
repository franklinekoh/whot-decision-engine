import { assert, expect } from "chai";
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
        }
        ]
        const game = new GameLoop(players)
        
        for(let i = 0; i < game.players.length * 2; i++){
            const player: PlayerInterface = game.players[i]
            const card: Card[] = game.market.pick(1)
            game.playersCards.setPlayersCard({
                player,
                card: card[0]
            })
        }
        const playerTurn: PlayerInterface = game.getPlayerTurn()
        const opponents = new Opponents({
            game: game,
            player: playerTurn
        })

        console.log(opponents.getOpponentsLastPlayed())
        expect(opponents.getOpponentsLastPlayed()).to.satisfy((playersCards: playersCard[]) => {
            return playersCards.every((playersCard: playersCard) => {
                return playersCard.player.id !== playerTurn.id
            })
        })

    })
})