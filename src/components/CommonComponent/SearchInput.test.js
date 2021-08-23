import { searchByType, block_re, add_re, tx_re } from './SearchInput'


describe("check search types", () => {
    test("correctly ids blocks", () => {
        const block_Regex = block_re;
        const input = [38426517,38426540,384,20000000000000000000,0]
        const expected = [true, true, true, false, false]
        const isBlock = (num) => {
            return block_Regex.test(num.toString()) ? true : false
        }
        const areBlocks = input.map(num => isBlock(num))
        expect(areBlocks).toEqual(expected)
    });

    test("correctly ids transactions", () => {
        const tx_Regex = tx_re;
        const input = ["0xa2968b7d3bde8818f9e4c53b9b41f5a05b457c4da163ebbc0485eea6983f960e","0xbff754969d2edb69d2a4ec5eae9db82d51ee979625fb0b4975827868e043b0","0xbff754969d2edb69d2a4ec5eae9db82d51ee979625fb0b4975827868e043b07a"]
        const expected = [true, false, true]
        const isTx = (hash) => {
            return tx_Regex.test(hash) ? true : false
        }
        const areTx = input.map(hash => isTx(hash.toString()))
        expect(areTx).toEqual(expected)
    }); 

    test("it correctly verifies address regex", () => {
        const add_Regex = add_re;
        const input = ["hx8913f49afe7f01ff0d7318b98f7b4ae9d3cd0d61","0xbf0","hxc4193cda4a75526bf50896ec242d6713bb6b02a3"]
        const expected = [true, false, true]
        const isAdd = (hash) => {
            return add_Regex.test(hash) ? true : false
        }
        const areAdd = input.map(hash => isAdd(hash))
        expect(areAdd).toEqual(expected)
    }); 
});

// once store is complete:w
// describe("it correctly dispatches search functions", () => {
//     test("", () => {
//         searchByType()
//     });
// });

