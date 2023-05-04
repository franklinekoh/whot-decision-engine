import { GameInterface } from "src/game/gameInterface";
import { PlayerInterface } from "src/player/playerInterface";
import Card from "whot/dist/card";

export interface DecideInterface{
    game: GameInterface
    player: PlayerInterface

    checkIFGeneralMarketExistsInPlayerCards(): Boolean

    checkIfOpponentsIsLastCard(): Boolean

    checkIfINeedExistsInPlayerCards(): Boolean

    checkIfDestroyersExistsInPlayerCards(): Boolean

    checkIfHoldonExistsInPlayerCards(): Boolean

    execute(): Card|null
}