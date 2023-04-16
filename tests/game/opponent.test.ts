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
        const playerTurn = game.getPlayerTurn()
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
})