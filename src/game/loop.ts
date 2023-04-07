import {Player as WhotPlayer} from "whot/dist/player";
import {Player, PlayerInterface} from "../player"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import { GameInterface } from "./gameInterface"
import { createError }  from '../error'
import { InvalidNumberOfPlayers as numberOfPlayerError } from "../error/errors"

const InvalidNumberOfPlayers = createError(numberOfPlayerError.name)

export class GameLoop implements GameInterface  {

    players: Player[] = [] // player with system id and name
    pile: Pile
    market: Market
    emitter: EventEmitter
    turn: Turn
    noOfDecks: number = 1
    noOfCardsPerPlayer: number = 5
    gameOn: boolean = true

    constructor(playerInerfaces: PlayerInterface[]) {

        if(playerInerfaces.length < 2){
          throw InvalidNumberOfPlayers(numberOfPlayerError.message)
        }
        this.pile = new Pile({ emitter })

        this.market = new Market({
         noOfDecks: this.noOfDecks,
         emitter,
         pile: () => this.pile
       })
   
       this.assignPlayers(playerInerfaces)
   
       this.turn = new Turn({
         players: this.players,
         emitter,
       })
   
       this.emitter = emitter

    }

     /**
   * Assign players 
   * 
   */
  assignPlayers(players: PlayerInterface[]): Player[] {
    this.players = []

    for(let i = 0; i < players.length; i++){
      const playerInterface: PlayerInterface = players[i]

      const player: Player = new Player({
        id: playerInterface.id,
        emitter,
        market: () => this.market,
        pile: () => this.pile
      }, 
      {
        unique_id: playerInterface.unique_id,
        name: playerInterface.name,
        id: playerInterface.id
      });
      this.players.push(player)
    }

    return this.players
  }

  assignCardsToPlayers(){
    for(let i = 0; i < this.noOfCardsPerPlayer; i++){
      this.players.forEach(Player => {
        Player.pick()
      })
    }
  }

  start(): void {
      // listen for player:checkup even and update game status
      while(this.gameOn){

        const player: WhotPlayer|undefined = this.turn.next()

        // Listens for when a player wins
        this.emitter.on('player:checkup', (player) => {
          this.gameOn = false
          // updates/announces that a player has won
        })
      }
  } 
}