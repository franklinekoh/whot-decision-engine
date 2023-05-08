import Card from "whot/dist/card"

export const generalMarketValue = 14
export const iNeedValue = 20
export const holdOnValue = 1
export const pickTwoValue = 2

export const matchesShapeOrNumber = (a: Card, b: Card): Boolean => {
    if(a.shape === b.shape){
        return true
    }

    if(a.value === b.value){
        return true
    }    

    return false
}

export const matchesShapeAndNumber = (a: Card, b: Card): Boolean => {
    if((a.shape === b.shape) && (a.value === b.value)){
        return true
    }

    return false
}

export const matchesNumber = (a: Card, b: Card): Boolean => {
    if(a.value === b.value){
        return true
    }

    return false
}

export const matchesShape = (a: Card, b: Card): Boolean => {
    if(a.shape === b.shape){
        return true
    }

    return false
}

export const isDestroyer = (card: Card): Boolean => {
    if(card.value === generalMarketValue || card.value === pickTwoValue){
        return true
    }
    return false
}