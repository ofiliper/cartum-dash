export default function fnFormatCurrency(value: string | number, maxLength?: number): string {
    let newValue = value.toString().replace(/\D/g, '');

    if (newValue.length === 0) {
        return '';
    }

    // Se maxLength for definido e newValue ultrapassar esse limite, corta o valor
    if (maxLength !== undefined && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
    }

    while (newValue.length < 3) {
        newValue = '0' + newValue;
    }

    const cents = newValue.slice(-2);
    const integerPart = newValue.slice(0, -2);

    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const cleanedIntegerFormatted = integerFormatted.replace(/^0+/, '');

    return `${cleanedIntegerFormatted || '0'}.${cents}`;
}
