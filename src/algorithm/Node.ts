// Source: https://prograide.com/pregunta/46535/algorithme-pour-generer-des-anagrammes

export class Node {
    static newRoot(): Node {
        return new Node('', false, 0);
    }

    constructor(public readonly letter: string,
                public final: boolean,
                public readonly depth: number,
                public childrens: { [k in string]: Node } = {}) {
    }

    public add(letters: string): void {
        let node: Node = this;
        const chars = [...letters.toLowerCase()];
        chars.forEach((char, index) => {
            if (node.childrens[char] === undefined) {
                node.childrens[char] = new Node(char, index === chars.length - 1, index + 1)
            }
            node = node.childrens[char];
        });
    }

    public anagram(letters: string, minWordSize = 3): Generator<string> {
        const tiles: { [k in string]: number } = {};
        const chars = [...letters.replaceAll(' ', '').toLowerCase()];
        chars.forEach((char) => {
            tiles[char] = (tiles[char] || 0) + 1
        });
        const minLength = chars.length;
        return this.anagrams(tiles, [], this, minLength, minWordSize);
    }

    private* anagrams(tiles: { [p: string]: number }, path: string[], root: Node, minLength: number, minWordSize: number): Generator<string> {
        if (this.final && this.depth >= minWordSize) {
            const word = path.join('');
            const length = word.replaceAll(' ', '').length;
            if (length >= minLength) {
                yield word;
            }
            for (const word of root.anagrams(tiles, [...path, ' '], root, minLength, minWordSize)) {
                yield word;
            }
        }
        for (const [letter, node] of Object.entries(this.childrens)) {
            const count = tiles[letter] || 0;
            if (count === 0) {
                continue;
            }
            tiles[letter] = count - 1;
            for (const word of node.anagrams(tiles, [...path, letter], root, minLength, minWordSize)) {
                yield word;
            }
            tiles[letter] = count;
        }
    }
}
