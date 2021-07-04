import firebase, { database } from "../../firebase";

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const dataUser = {
          email: result.user.email,
          uid: result.user.uid,
          emailVerified: result.user.emailVerified,
          refreshToken: result.user.refreshToken,
        };
        console.log(dataUser);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function (snapshot) {
      console.log("snapshot", snapshot.val());
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      console.log("data", data);

      dispatch({ type: "SET_NOTES", value: data });
      resolve(snapshot.val());
    });
  });
};

export const updateDataAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (error) => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const removeDataAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};
