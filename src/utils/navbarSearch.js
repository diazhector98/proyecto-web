import Library from '../utils/library'


class SearchParent {
  searchBooks = ({history, textQuery}) => {
    const library = new Library()
    library.searchBooks({
      textQuery
    }).then(result => {
      console.log({
        result
      })
      const {
        books
      } = result.data
      return books
    })
  }
}




export default SearchParent;