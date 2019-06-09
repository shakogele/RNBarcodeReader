import AsyncStorage from '@react-native-community/async-storage';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN,
  AUTH_SET_BARCODE } from "./actionTypes";
import md5 from 'md5';
import { uiStartLoading, uiStopLoading } from "./index";

import App from "../../../App";

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "";
        if (authMode === "signin") {
          const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem("ap:auth:users")
                .catch(err => reject(err))
                .then(usersObject => {
                  if (!usersObject) {
                    reject("User not found");
                  }else{
                    usersObject = [...JSON.parse(usersObject)];
                    for(let user of usersObject){
                      if(user.email === authData.email && user.password === md5(authData.password)){
                        resolve(user);
                      }else{
                        reject("User was not found with given credentials, please register first");
                      }
                    }
                  }
                })
                .catch(err => reject(err));
          })

          return promise
            .catch(err => { dispatch(uiStopLoading()); alert(err); })
            .then(user => {
                if (!user) {
                    dispatch(uiStopLoading());
                    console.log("error")
                } else {
                    alert("user successfully logged in!")
                    const token = md5(user.email+"."+user.password);
                    dispatch(authStoreToken(token, 2592000));
                    dispatch(uiStopLoading());
                }
            });

        };
        if (authMode === "signup") {

          const promise = new Promise((resolve, reject) => {
            const dataToSave = {...authData, password: md5(authData.password)};
            AsyncStorage.getItem("ap:auth:users")
                .catch(err => reject(err))
                .then(usersObject => {
                  console.log("usersObject", usersObject);
                  if (!usersObject) {
                    AsyncStorage.setItem("ap:auth:users", JSON.stringify([dataToSave]));
                    resolve(authData);
                  }else{
                    usersObject = [...JSON.parse(usersObject)];
                    for(let user of usersObject){
                      if(user.email === authData.email){
                        reject('User Already Registered. Please try to login.')
                      }else{
                        usersObject.push(dataToSave);
                        AsyncStorage.setItem("ap:auth:users", JSON.stringify([...usersObject]));
                        resolve(authData);
                      }
                    }
                  }
                })
                .catch(err => reject(err));
          })

          return promise
            .catch(err => {dispatch(uiStopLoading()); alert(err);})
            .then(authData => {
                dispatch(uiStopLoading());
                if (!authData) {
                    console.log("error")
                } else {
                    alert("user successfully registered!")
                    return authData;
                }
            });

        };

    };
};

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
      const promise = new Promise((resolve, reject) => {
        const token       = getState().auth.token;
        const expiryDate  = getState().auth.expiryDate;

        if (!token || new Date(expiryDate) <= new Date()) {
          let fetchedToken, parsedExpiryDate;
          AsyncStorage.getItem("ap:auth:token")
              .catch(err => reject())
              .then(tokenFromStorage => {
                console.log("tokenFromStorage", tokenFromStorage);
                fetchedToken = tokenFromStorage;

                if (!tokenFromStorage) {
                    reject("Token was not found");
                    return;
                }
                return AsyncStorage.getItem("ap:auth:expiryDate");
            })
            .then(expiryDate => {
                console.log("expiryDate Here",expiryDate);
                const parsedExpiryDate = new Date(parseInt(expiryDate));
                const now = new Date();
                if (parsedExpiryDate > now) {
                    dispatch(authSetToken(fetchedToken, parsedExpiryDate));
                    resolve(fetchedToken);
                } else {
                    reject("token expired!! ");
                }

            })
            .catch( err => reject(err) );

        } else {
            resolve(token);
        }

      });

      return promise
        .catch(err => {console.log(err);})
        .then(token => {
            if (!token) {
                throw new Error();
            } else {
                return token;
            }
        });

    };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        dispatch(getUserProfileData(token));
        App();
      })
      .catch(err => console.log(err  + "Failed to fetch token!"));
  };
};

export const saveBarCode = barCode => {
  console.log("saveBarCode", saveBarCode);
  return dispatch => {
    dispatch(uiStartLoading());
    AsyncStorage.setItem("ap:auth:barCode", barCode)
      .then(() => {
        dispatch(authSetBarcode(barCode));
        dispatch(uiStopLoading());
      });
  };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        return AsyncStorage.removeItem("ap:auth:company");
    };
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage()).then(() => {
            App();
        });
        dispatch(authRemoveToken());
    };
};

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
    };
};

export const authSetBarcode = barcode => {
    return {
        type: AUTH_SET_BARCODE,
        barcode: barcode,
    };
};

export const authRemoveToken = () => {
  return {
      type: AUTH_REMOVE_TOKEN
  };
};
