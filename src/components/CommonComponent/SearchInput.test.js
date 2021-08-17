// import handleClick from '../SearchInput'
// import select needed "dispatches" from store to run test
// STUB:
const blockTests = [38426517,38426540]
const addressTests = []

// check what type of query, for any structure of query 
// check that it returned correct dispatch for type

it("correctly verifies block regex", () => {
   const block_Regex = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
   blockTests.forEach(block => {
       expect(block.toString()).toMatch(block_Regex)
   })
})