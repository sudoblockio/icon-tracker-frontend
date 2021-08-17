// import handleClick from '../SearchInput'
// import select needed "dispatches" from store to run test
// STUB:
const blockTests = [38426517,38426540,384]
const addressTests = []

// check what type of query, for any structure of query 
// check that it returned correct dispatch for type


describe("block_re", () => {
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
})



it("correctly verifies block regex", () => {
   const block_Regex = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
   blockTests.forEach(block => {
       expect(block.toString()).toMatch(block_Regex)
   })
})