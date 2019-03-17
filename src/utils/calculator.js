export const pprCalculator = ({ salary, months, role, rate }, cb) => {
    let bonus = (((salary * role) * rate) * 0.7).toFixed(2)
    
    if(months) {
        const monthsInPercent = (months / 12)
        bonus = (bonus * monthsInPercent).toFixed(2)
    }

    if(cb) return cb(bonus)

    return bonus
}

export const sindicateCalculator = (value) =>  {
    const result = (value * 0.97)
    if((value - result) > 200){
        return 200
    }
    
    return (value - result).toFixed(2)
}

export default pprCalculator