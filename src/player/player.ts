import {Player as WhotPlayer} from "whot/dist/player";
import { eventify, EventEmitter } from "whot/dist/events";
import Market from "whot/dist/market";
import Pile from "whot/dist/pile";
import Card from "whot/dist/card";
import { IDInterface, PlayerCards, PlayerInterface } from "./playerInterface";
import { createError }  from '../error'
import { playerIDMismatch } from "../error/errors"

const playerIDMismatchError = createError(playerIDMismatch.name)

type PlayerProps = {
    id: number;
    emitter: EventEmitter;
    market: () => Market;
    pile: () => Pile;
}


export class Player extends WhotPlayer implements PlayerInterface {
    IDInterface: IDInterface
    PlayerCards: PlayerCards

    constructor(playerProps: PlayerProps, playerInterfaceProps: IDInterface){
        if(playerProps.id !== playerInterfaceProps.id){
            throw playerIDMismatchError(playerIDMismatch.message)
        }
        super(playerProps)
        this.IDInterface = playerInterfaceProps
        
        const shapes = this.matchesShape(this.getCardOnPile())
        const numbers = this.matchesNumber(this.getCardOnPile())
        const playerCards: PlayerCards = {
            shapes,
            numbers
        }
        this.PlayerCards = playerCards
    }

    getCardOnPile(): Card{
        return this.pile().top();
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

