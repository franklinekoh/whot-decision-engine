import { GameInterface } from "src/game/gameInterface";
import { PlayerInterface } from "src/player/playerInterface";

export interface DecideInterface{
    game: GameInterface
    player: PlayerInterface

    checkIfWhotExistsInPlayerCards(): true

    checkForGeneralMarket(): true

    checkIfOpponentIsLastCard(): true

    checkIfListContainsINeed(): true

    checkIfListContainsDestroyer(): true

    checkIfListContainsHoldOn(): true
}