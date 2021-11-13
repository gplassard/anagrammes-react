import {mapIsSubsetOf, wordToCharacterMap, wordToSortedCharacters} from "./utils";

describe("wordToSortedCharacters", () => {
    test("should sort characters", () => {
        const sorted = wordToSortedCharacters("bonjour");
        expect(sorted).toEqual("bjnooru");
    });
});

describe("wordToCharacterMap", () => {
    test("should count characters for a word", () => {
        const characterMap = wordToCharacterMap("bonjour");
        expect(characterMap).toEqual(
            new Map()
                .set("b", 1)
                .set("o", 2)
                .set("n", 1)
                .set("j", 1)
                .set("u", 1)
                .set("r", 1)
        );
    });
});

describe("mapIsSubsetOf", () => {
    test("empty map should be subset of empty map", () => {
        const subset = mapIsSubsetOf(new Map(), new Map());
        expect(subset).toEqual(true);
    });

    test("empty map should be subset of non empty map", () => {
        const subset = mapIsSubsetOf(new Map(), new Map().set("a", 1));
        expect(subset).toEqual(true);
    });

    test("non empty map should not be a subset of empty map", () => {
        const subset = mapIsSubsetOf(new Map().set("a", 1), new Map());
        expect(subset).toEqual(false);
    });
});
