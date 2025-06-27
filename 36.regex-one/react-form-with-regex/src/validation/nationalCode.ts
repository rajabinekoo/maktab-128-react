export function validateIranianNationalCode(code: string) {
    if (!code) return "Required";
    
    if (!/^\d{10}$/.test(code)) {
        return "National code length is invalid";
    }

    const check = parseInt(code[9], 10);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(code[i], 10) * (10 - i);
    }
    
    const remainder = sum % 11;
    const valid = remainder < 2 ? check === remainder : check === (11 - remainder);
    return valid ? "" : "National code is invalid";
}