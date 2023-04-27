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