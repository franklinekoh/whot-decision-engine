
type ErrorInterface = {
    name: string,
    message: string
}

export const InvalidNumberOfPlayers: ErrorInterface = {
    name: 'InvalidNumberOfPlayers',
    message: 'Players must be two or more'
}

export const playerIDMismatch: ErrorInterface = {
    name: 'playerIDMismatch',
    message: 'playerProps.id must be equal playerInterfaceProps.id'
}