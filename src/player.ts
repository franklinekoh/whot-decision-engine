import {Player as WhotPlayer} from "whot/dist/player";
import { eventify, EventEmitter } from "whot/dist/events";
import Market from "whot/dist/market";
import Pile from "whot/dist/pile";
import Card from "whot/dist/card";

export type PlayerInterface = {
    unique_id: string;
    name: string;
    id: number;
}

type PlayerProps = {
    id: number;
    emitter: EventEmitter;
    market: () => Market;
    pile: () => Pile;
}

type PlayerCards = {
    shapes: Card[],
    numbers: Card[]
}

export class Player extends WhotPlayer {
    playerInterface: PlayerInterface

    constructor(playerProps: PlayerProps, playerInterfaceProps: PlayerInterface){
        super(playerProps)
        this.playerInterface = playerInterfaceProps;
    }

    getCardOnPile(): Card{
        return this.pile().top();
    }
    
    getMatchingCardsBasedOnShapeAndNumber(): PlayerCards{
        const shapes = this.matchesShape(this.getCardOnPile())
        const numbers = this.matchesNumber(this.getCardOnPile())
        const playerCards: PlayerCards = {
            shapes,
            numbers
        }
        return playerCards
    }

    matchesShape(card: Card): Card[] { 
       const shapes = this.cards.filter(value => {
        return value.shape === card.shape
       })
       return shapes
    }

    matchesNumber(card: Card): Card[] {
        return this.cards.filter(value => value.value === card.value)
    }
}

