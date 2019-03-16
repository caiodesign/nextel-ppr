export const pprCalculator = ({ salary, months, role, rate }, cb) => {
    let bonus = ((salary * role) * rate) * 0.7
    
    if(months) {
        const monthsInPercent = (months / 12)
        bonus = (bonus * monthsInPercent)
    }

    if(cb) return cb(bonus.toFixed(2))

    return bonus.toFixed(2)
}

export default pprCalculator