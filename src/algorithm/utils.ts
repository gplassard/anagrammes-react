export function wordToSortedCharacters(word: string): string {
    return word.split("").sort().join("");
}

export function wordToCharacterMap(word: string): Map<string, number> {
    const map = new Map<string, number>();
    for (const character of word.split("")) {
        const count = map.get(character) || 0;
        map.set(character, count + 1);
    }
    return map;
}

export function mapIsSubsetOf(map: Map<string, number>, biggerMap: Map<string, number>): boolean {
    for (const [key, value] of map.entries()) {
        const biggerCount = biggerMap.get(key) || 0;
        if (value > biggerCount) {
            return false;
        }
    }
    return true;
}
