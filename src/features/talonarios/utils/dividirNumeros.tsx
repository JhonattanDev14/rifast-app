export function dividirNumeros(
    numeros: number[],
    limite = 200
): number[][] {
    const grupos: number[][] = [];

    for (let i = 0; i < numeros.length; i += limite) {
        grupos.push(numeros.slice(i, i + limite));
    }

    return grupos;
}