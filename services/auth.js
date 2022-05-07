import firebase from "../config/firebase-config";

const socialMediaAuth = (provider) => {
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
