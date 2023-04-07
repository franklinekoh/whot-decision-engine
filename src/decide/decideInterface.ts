import { GameInterface } from "src/game/gameInterface";
import { PlayerCards } from "src/player";

export interface decideInterface{
    game: GameInterface
    playerCards: PlayerCards

    checkIfWhotExistsInPlayerCards(): true

    checkForGeneralMarket(): true

    checkIfOpponentIsLastCard(): true

    checkIfListContainsINeed(): true

    checkIfListContainsDestroyer(): true

    checkIfListContainsHoldOn(): true
}