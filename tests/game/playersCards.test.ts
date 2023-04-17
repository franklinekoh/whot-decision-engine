import { assert, expect } from "chai";
import Card from "whot/dist/card"
import { Pile } from "whot/dist/pile"
import { Market } from "whot/dist/market"
import {playersCard, PlayersCardsInterface} from "../../src/playersCards/PlayersCardsInterface"
import { PlayersCards } from "../../src/playersCards/playersCards"
import { Player } from "../../src/player/player"
import { emitter, EventEmitter } from "whot/dist/events"



describe("PlayersCards", () => {
    it('should set playerCard', () => {

        const playersCards: PlayersCardsInterface = new PlayersCards()

        const pile = new Pile({ emitter });
        const market = new Market({
            noOfDecks: 1,
            pile: () => pile,
            emitter
        })

        const firstPlayer: Player = new Player(
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

        const firstPlayerCard: Card = Card.createCircleCard({
            value: 5
        })

        const firstPlayersCard: playersCard = {
            player: firstPlayer,
            card: firstPlayerCard
        }

        playersCards.setPlayersCard(firstPlayersCard)

        const secondPlayer: Player = new Player(
            {
                id: 2,
                emitter,
                market: () => market,
                pile: () => pile
            },
            {
                unique_id: 'SLKLD1928100',
                name: 'WIZZY',
                id: 2
            }
        )

        const secondPlayerCard: Card = Card.createCrossCard({value: 14})
        const secondPlayersCard: playersCard = {
            player: secondPlayer,
            card: secondPlayerCard
        }
  
        playersCards.setPlayersCard(secondPlayersCard)

        expect(playersCards.getPlayersCards()).to.include(secondPlayersCard)
        expect(playersCards.getPlayersCards()).to.include(firstPlayersCard)
        expect(playersCards.getLastPlayersCards(2)).to.include(secondPlayersCard)
        expect(playersCards.getLastPlayersCards(1)).to.include(secondPlayersCard)
        expect(playersCards.getLastPlayersCards(1)).not.include(firstPlayersCard)
    })


})