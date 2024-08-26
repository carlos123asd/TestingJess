const palindromo  = require("../utils/palindrome");

test('Una palabra es un palindromo', () => {
    const result  = palindromo('alexcode')
    expect(result).toBe('edocxela')
});

test('Una cadena vacia como palindromo', () => {
    const result = palindromo('')
    expect(result).toBe('')
});
