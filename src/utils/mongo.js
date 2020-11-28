
import axios from 'axios'
const DATABASE_PATH = 'https://librostec.herokuapp.com/'

class Mongo {

    getUser = async ({firebaseId}) => {
        const result = await axios.get(`${DATABASE_PATH}user`, {params: {
            firebaseId
        }})
        return result
    }

    insertUser = async ({firebaseId, name, email}) => {
        const result = await axios.post(DATABASE_PATH + "user/", null, {params: {
            firebaseId,
            name,
            email
        }})
        return result
    }

    getUserBooks = async ({firebaseId}) => {
        const result = await axios.get(`${DATABASE_PATH}userBooks`, {params: {firebaseId}})
        return result
    }

    addReadingNowBook = async ({bookId, firebaseId}) => {
        const result = await axios.post(`${DATABASE_PATH}readingNow/`, null, {params: {
            firebaseId,
            bookId
        }})

        return result
    }

}

export default Mongo