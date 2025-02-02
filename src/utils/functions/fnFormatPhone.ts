export const fnFormatPhone = (value: any) => {
    const _cleanedValue = value.replace(/\D/g, '')
    const _maxLength = 11
    const _value = _cleanedValue.slice(0, _maxLength)

    // Formatação do número
    const match = _value.match(/^(\d{2})(\d{0,5})(\d{0,4})$/)
    if (match) {
        return `(${match[1]})${match[2] ? ' ' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`
    }
    return _value
}