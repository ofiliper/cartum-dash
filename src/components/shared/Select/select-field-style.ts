const selectFieldStyle = {
    label: () => `
    transition-all text-sm font-medium mb-[7px] block text-gray-900
    `,
    button: () => `
    flex p-3 
    rounded-xl 
    gap-3 
    px-5
    w-full
    shadow-sm
    border-[1px]
    border-gray-200
    text-gray-900
    `,
    options: (active: boolean, lenght: number) => `
    absolute transition-all 
    bg-gray-50 w-full
    rounded-xl ease-linear
    ${active ?
            'top-[-15px] opacity-100 visible' :
            'top-[-20px] opacity-0 invisible'}
    ${lenght > 4 ?
            'overflow-y-scroll overflow-x-hidden h-[160px]' :
            ''}
    `,
    optionButton: () => `
    shadow-none hover:bg-gray-100 text-gray-900
    `
}

export default selectFieldStyle;