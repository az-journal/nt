type UnitType = {
    [type: string]: number;
};

const units: UnitType = {
    // TEther: 1e30,
    // GEther: 1e27,
    // MEther: 1e24,
    // KEther: 1e21,
    Ether: 1e18,
    // Finney: 1000000000000000,
    // Szabo: 1000000000000,
    Gwei: 1000000000,
    // Mwei: 1000000,
    // Kwei: 1000,
    Wei: 1,
};

export const getUnitName = (wei: number | string): string => {
    for (let unit in units) {
        if (Number(wei) >= units[unit] / 1000) {
            return unit;
        }
    }
    return 'Wei';
};

export const weiToUnit = (wei: number | string): string => {
    return (Number(wei) / units[getUnitName(wei)]).toLocaleString('en-US', {
        maximumFractionDigits: 3,
        minimumFractionDigits: 0,
    });
};

export const getFormattedWei = (wei: number | string): string => {
    return `${weiToUnit(wei)} ${getUnitName(wei)}`;
};
