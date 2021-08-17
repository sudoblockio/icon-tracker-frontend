// import handleClick from '../SearchInput'
// import select needed "dispatches" from store to run test
// STUB:
// make one array of inputs with all types and verify output array
const inputs = [/*address, block, tx, fail, fail*/]
// pt 1
// check what type of query, for any structure of query .
// pt 2 
// check that it returned correct dispatch for type


describe("Search Regex", () => {
    // pt 1 
    test("it correctly verifies block regex", () => {
        const block_Regex = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
        const input = [38426517,38426540,384,20000000000000000000,0]
        const expected = [true, true, true, false, false]
        const result = []
        input.forEach(block => {
            // built-in JS .test method for Regex
            if (block_Regex.test(block.toString())){
                result.push(true)
            } else{
                result.push(false)
            }
        })
        expect(expected).toEqual(result)
    })
    test("check types", () => {
        const input = [38426517,38426540,384,20000000000000000000,0]
        const expected = [true, true, true, false, false]
        const block_Regex = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
        const isBlock = (num) => {
            return block_Regex.test(num.toString()) ? true : false
        }
        const areBlocks = input.map(num => isBlock(num))
        expect(areBlocks).toEqual(expected)
    })

    test("it correctly dispatches the search input type", () => {

    })

    test("it correctly verifies tx regex", () => {
        const tx_Regex = new RegExp()
    })

    test("it correctly verifies address regex", () => {
        const add_Regex = new RegExp()
    })
})
