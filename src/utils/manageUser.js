import app from "../base.js"

class ManageUser {
    
    logOutUser = async ({ history }) => {
        try {
            app.auth().signOut().then(() => {
                console.log("User has left")
            })
            history.push("/");
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

    allowAccess = async ({ history }) => {
        try {
            app.auth().onAuthStateChanged((user) => {
                if(user == null){
                    history.push("/login");
                }
              })      
        } catch (error) {
            alert(error);
        }
    }

    login = async ({ history, email, password}) => {
        try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/profile");
          } catch (error) {
            alert(error);
          }
    }


    alreadyLogged = async ({ history }) => {
        try {
            app.auth().onAuthStateChanged((user) => {
                if(user != null){
                    history.push("/profile");
                }
              })      
        } catch (error) {
            alert(error);
        }
    }


}

export default ManageUser