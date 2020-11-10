
import axios from 'axios'
const DATABASE_PATH = 'https://librostec.herokuapp.com/'

class Mongo {
    insertUser = async ({firebaseId, name, email}) => {
        console.log({firebaseId, name, email})
        
        const result = await axios.post(DATABASE_PATH + "user/", null, {params: {
            firebaseId,
            name,
            email
        }})
        return result
    }
}

export default Mongo