import { assert, expect } from "chai";
import { Player } from "../../src/player/player"
import { Pile } from "whot/dist/pile"
import { Market } from "whot/dist/market"
import { Turn } from "whot/dist/turn"
import { emitter, EventEmitter } from "whot/dist/events"
import Card from "whot/dist/card"
import GetTriangle from "whot/dist/card"
import GetCircle from "whot/dist/card"

const pile = new Pile({ emitter });
const market = new Market({
    noOfDecks: 1,
    pile: () => pile,
    emitter
})
const mockMarket = () => market
const mockPile = () => pile

describe("Player", () => {

    it('should throw error if player ids mismatch', () => {
        try{
            const player = new Player(
                {
                    id: 1,
                    emitter,
                    market: mockMarket,
                    pile: mockPile
                },
                {
                    unique_id: 'SLKLD1928100',
                    name: 'OBO',
                    id: 2
                }
            );
            assert.fail();
        }catch(err: any){
            assert.equal(err.name, "playerIDMismatch");
            assert.equal(err.message, "playerProps.id must be equal playerInterfaceProps.id");
        }       
    })

    it('Player.getCardOnPile() should return instance of card', () => {

        const singlePlayer: Player = new Player(
            {
                id: 1,
                emitter,
                market: mockMarket,
                pile: mockPile
            },
            {
                unique_id: 'SLKLD1928100',
                name: 'OBO',
                id: 1
            }
        )

        const cards = singlePlayer.market().pick(1)
        singlePlayer.pile().push(cards)
        const card = singlePlayer.getCardOnPile();  
             
        assert.instanceOf(card, Card)
        expect(cards[0]).to.equal(card)
    })

    it('Matches shape', () => {

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
        
        const shapeOnPile = Card.createTriangleCard({
            value: 8
        })

        singlePlayer.pile().push([shapeOnPile])

        const circle4 = Card.createCircleCard({
            value: 4
        })
        const triangle5 = Card.createTriangleCard({
            value: 5
        })
        const triangle11 = Card.createTriangleCard({
            value: 11
        })

        singlePlayer.add([circle4, triangle5, triangle11])
        const cardOnPile = singlePlayer.getCardOnPile()
        
        const shapeCards: Card[] = singlePlayer.matchesShape(cardOnPile)
        expect(shapeCards).to.satisfy((arrayOfShapeCards : Card[]) => {
            return arrayOfShapeCards.every((shapCard: Card) => {
                return shapCard.shape === cardOnPile.shape
            })
        })
    })

    it('Matches number', () => {
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
        
        const shapeOnPile = Card.createTriangleCard({
            value: 4
        })

        singlePlayer.pile().push([shapeOnPile])

        const circle4 = Card.createCircleCard({
            value: 4
        })
        const cross4 = Card.createCrossCard({
            value: 4
        })
        const triangle11 = Card.createTriangleCard({
            value: 11
        })

        singlePlayer.add([circle4, cross4, triangle11])
        const cardOnPile = singlePlayer.getCardOnPile()
        
        const numberCards: Card[] = singlePlayer.matchesNumber(cardOnPile)
        expect(numberCards).to.satisfy((arrayOfShapeCards : Card[]) => {
            return arrayOfShapeCards.every((shapCard: Card) => {
                return shapCard.value === cardOnPile.value
            })
        })
    })

    it('it should have matching card based on number and shape', () => {
        // add certain card to pile
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

        // Add different cards of shape and number to player
        const cardOnPile: Card = Card.createTriangleCard({
            value: 4
        })
        singlePlayer.pile().push([cardOnPile])

        const circle4 = Card.createCircleCard({
            value: 4
        })
        const cross4 = Card.createCrossCard({
            value: 4
        })
        const triangle11 = Card.createTriangleCard({
            value: 11
        })

        singlePlayer.add([circle4, cross4, triangle11])

        const playerCards = singlePlayer.PlayerCards

        // Accertain that player cards contains some shap and contains some number
        // Test for shapes
        expect(playerCards.shapes).to.satisfy((arrayOfShapeCards : Card[]) => {
            return arrayOfShapeCards.every((shapCard: Card) => {
                return shapCard.shape === cardOnPile.shape
            })
        })

        // Test for numbers 
        expect(playerCards.numbers).to.satisfy((arrayOfShapeCards : Card[]) => {
            return arrayOfShapeCards.every((shapCard: Card) => {
                return shapCard.value === cardOnPile.value
            })
        })
    });
})