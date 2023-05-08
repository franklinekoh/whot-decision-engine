import {Player as WhotPlayer} from "whot/dist/player";
import {PlayerInterface, IDInterface} from "../player/playerInterface"
import { emitter, EventEmitter } from "whot/dist/events"
import Market from "whot/dist/market"
import { Pile } from "whot/dist/pile"
import Turn from "whot/dist/turn"
import { GameInterface } from "./gameInterface"
import { createError }  from '../error'
import { InvalidNumberOfPlayers as numberOfPlayerError } from "../error/errors"
import { Player } from "../player/player";
import { PlayersCards } from "../playersCards/playersCards"
import Card from "whot/dist/card";
import { Decide } from "../decide/decide";
import { matchesShapeAndNumber } from "../util";

const InvalidNumberOfPlayers = createError(numberOfPlayerError.name)

export class GameLoop implements GameInterface  {

    players: PlayerInterface[] = [] // player with system id and name
    pile: Pile
    market: Market
    emitter: EventEmitter
    turn: Turn
    noOfDecks: number = 1
    noOfCardsPerPlayer: number = 5
    gameOn: boolean = true
    playersCards: PlayersCards //stores every card played by every player for decision making
    iNeedChosenCard?: Card

    constructor(playerInterfaces: IDInterface[]) {

        if(playerInterfaces.length < 2){
          throw InvalidNumberOfPlayers(numberOfPlayerError.message)
        }
        this.pile = new Pile({ emitter })

        this.market = new Market({
         noOfDecks: this.noOfDecks,
         emitter,
         pile: () => this.pile
       })
   
       this.assignPlayers(playerInterfaces)
   
       this.turn = new Turn({
         players: this.players,
         emitter,
       })

       this.playersCards = new PlayersCards()
       this.emitter = emitter

       this.turn.execute(this.playFirstCard(), true);
    } 

     /**
   * Assign players 
   * 
   */
  assignPlayers(players: IDInterface[]): PlayerInterface[] {
    this.players = []

    for(let i = 0; i < players.length; i++){
      const playerInterface: IDInterface = players[i]

      const player: PlayerInterface = new Player({
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

  getPlayerTurn(): PlayerInterface {
    const player: WhotPlayer|undefined = this.turn.next()
    const playerTurn = this.players.filter((value: PlayerInterface) => value.IDInterface.id === player?.id)
    return playerTurn[0]
  }

  start(): void {
      this.assignCardsToPlayers()
      // listen for player:checkup event and update game status
      // let count = 0
      while(this.gameOn){
        setTimeout(() => {
        }, 10000);
        
          const player: PlayerInterface = this.getPlayerTurn()
          if(player.cards.length === 0){
            console.log('***********************************************************')
            console.log('Player won', player)
            this.gameOn = false
          }
          // console.log('------------------------------------------------')
          // console.log(player?.canPlay())
          // count++
          if(player.canPlay()){
            
              const decide: Decide = new Decide({
                game: this,
                player
              })
              
              const chosenCard = decide.execute()

              if(!chosenCard){
                player.pick();
                this.turn.switch()
                continue
              }

              const compatibleCardIndex = player.hand().findIndex((card: Card) => matchesShapeAndNumber(card, chosenCard))
              player.play(compatibleCardIndex)

              this.playersCards.setPlayersCard({
                card: chosenCard,
                player
              })

            this.turn.execute(this.pile.top());
            // Listens for when a player wins
            this.emitter.on('player:checkup', (player) => {
              this.gameOn = false
              // updates/announces that a player has won
              console.log('Player won', player)
            })
          }else{
            player.pick();
            this.turn.switch()
          }
      }
  }

  playFirstCard = (firstCard?: Card) => {
    const cards = this.market.pick(1);
    if (firstCard) this.pile.push([firstCard]);
    else this.pile.push(cards);
    return cards[0];
  };
  
}

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
game.start()