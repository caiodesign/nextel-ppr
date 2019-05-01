export const pprCalculator = ({ salary, months, role, rate }, cb) => {
    let bonus = (((salary * role) * rate) - (salary * 0.7)).toFixed(2);
    
    if (months) {
        const monthsInPercent = (months / 12);
        bonus = (bonus * monthsInPercent).toFixed(2);
    }

    if (cb) return cb(bonus);

    return bonus;
}

export const sindicateCalculator = (value) => {
    const result = (value * 0.97);
    if ((value - result) > 200) {
        return 200;
    }
    
    return (value - result).toFixed(2);
}

export const overtimeCalculator = ({ salary, days, extraDayHours, extraNightHours }, cb) => {
    const baseSalaryPerHour = (salary / 200)
    const baseOvertimeHours = (days * 16)

    let totalOvertimeBonus = ((baseSalaryPerHour / 3) * baseOvertimeHours)

    if (extraDayHours) {
        totalOvertimeBonus = totalOvertimeBonus + ((baseSalaryPerHour * 2) * extraDayHours);
    };
    
    if (extraNightHours) {
        totalOvertimeBonus = totalOvertimeBonus + ((baseSalaryPerHour * 2.3) * extraNightHours);
    };

    if (cb) return totalOvertimeBonus.toFixed(2);

    return totalOvertimeBonus.toFixed(2);
}

export default pprCalculator;

// http://www.sindpd.org.br/sindpd/upload/convencoes/CCT-2017-homologada.pdf
// O bonus de sobreaviso é em cima de 1/3 das horas trabalhadas.
// Caso trabalhe durante este período, além das horas ordinárias, ganha-se no mínimo 75% a mais para cada hora.
// Trabalhando sob adicional noturno, adiciona-se mais 30% para cada hora extra.