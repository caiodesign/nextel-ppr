export const pprCalculator = ({ salary, months, role, rate }, cb) => {
    let bonus = (((salary * role) * rate) * 0.7).toFixed(2)
    
    if(months) {
        const monthsInPercent = (months / 12)
        bonus = (bonus * monthsInPercent).toFixed(2)
    }

    if(cb) return cb(bonus)

    return bonus
}

export default pprCalculator