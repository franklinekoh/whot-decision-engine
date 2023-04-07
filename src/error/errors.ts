
type ErrorInterface = {
    name: string,
    message: string
}

export const InvalidNumberOfPlayers: ErrorInterface = {
    name: 'InvalidNumberOfPlayers',
    message: 'Players must be two or more'
}