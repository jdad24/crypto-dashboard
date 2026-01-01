export function convertToCurrency(amount: Number, numDecimals = 2) {
    const formattedCurrency = amount.toLocaleString(undefined, { // 'undefined' uses the user's default locale
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: numDecimals
    })

    return formattedCurrency
}

export function capitalize(word: string){
    const firstLetter = word[0].toUpperCase()
    return firstLetter + word.slice(1)     
}

export const myPriceFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format;
