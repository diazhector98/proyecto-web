import app from "../base.js"

class ManageUser {
    
    logOutUser = async ({ history }) => {
        try {
            app.auth().signOut().then(() => {
                console.log("User has left")
            })
            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }

    deleteUser = async ({ history }) => {
        try {
            app.auth().currentUser.delete().then(function () {
                console.log("User deleted")
            }).catch(function (error) {
                // An error happened.
            });

            history.push("/");
        } catch (error) {
            alert(error);
        }
    }

}

export default ManageUser