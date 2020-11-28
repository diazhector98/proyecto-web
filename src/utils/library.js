import axios from 'axios'
const DATABASE_PATH = 'https://librostec.herokuapp.com/'

class Library {

    searchBooks = async ({textQuery}) => {
        const result = await axios.get(DATABASE_PATH + "books", {params: {
            textQuery
        }})
        return result
    }

    getBook = async ({bookId}) => {
        const result = await axios.get(`${DATABASE_PATH}book`, {params: {
            bookId
        }})
        return result
    }
}

export default Library