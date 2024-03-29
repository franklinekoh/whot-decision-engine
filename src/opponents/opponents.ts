import {PlayerInterface} from "../player/playerInterface"
import { decideProp } from "../decide/decide"
import { GameInterface } from "../game/gameInterface"
import { playersCard } from "../playersCards/playersCardsInterface"
import { OpponentsInterface } from "./opponentsInterface"
import { iNeedValue } from "../util";


export class Opponents implements OpponentsInterface {

    game: GameInterface
    player: PlayerInterface;

    constructor(props: decideProp){
        this.game = props.game
        this.player = props.player
    }   

    getOpponents(): PlayerInterface[]{
        return this.game.players.filter((player: PlayerInterface) => {
            return player.IDInterface.id !== this.player.IDInterface.id
        })
    }

    getOpponentsLastPlayed(): playersCard[] {
        let result: playersCard[] = []
        let playerSet = new Set()
        const data = this.game.playersCards.getPlayersCards()

        for(let i = data.length - 1; i >= 0; i--){
            let value: playersCard = data[i]

            if(value.player.id === this.player.id){
                continue
            }

            if(playerSet.has(value.player.id)){
                break
            }

            if(result.length > 0 && result[result.length - 1].player.id !== value.player.id){
                playerSet.add(result[result.length - 1].player.id)
            }

            result.push(value)
        }
      
        return result
    }

    checkIfOpponentsIsLastCard(): Boolean {
        const opponents = this.getOpponents()
        for(let i = 0; i < opponents.length; i++){
            const player: PlayerInterface = opponents[i]
            if(player.cards.length === 1){
                return true
            }
        }
        return false;
    }

    checkIfOpponentsPlayedWhot(): Boolean {
        const opponentsLastPlayed = this.getOpponentsLastPlayed()
        for(let i = 0; i < opponentsLastPlayed.length; i++){
            const playerCard: playersCard = opponentsLastPlayed[i]
            if(playerCard.card.value === iNeedValue){
                return true
            }
        }

        return false
    }

}