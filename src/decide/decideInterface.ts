import { GameInterface } from "src/game/gameInterface";
import { PlayerInterface } from "src/player/playerInterface";

export interface DecideInterface{
    game: GameInterface
    player: PlayerInterface

    checkIFGeneralMarketExistsInPlayerCards(): Boolean

    checkIfOpponentsIsLastCard(): Boolean

    checkIfINeedExistsInPlayerCards(): Boolean

    checkIfDestroyersExistsInPlayerCards(): Boolean

    checkIfHoldonExistsInPlayerCards(): Boolean
}