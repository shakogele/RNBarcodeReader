import AsyncStorage from '@react-native-community/async-storage';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN,
  AUTH_SET_BARCODE, AUTH_SET_USERDATA } from "./actionTypes";
import gotoScreen from '../../components/UI/GotoScreen/gotoScreen';

import md5 from 'md5';
import { uiStartLoading, uiStopLoading } from "./index";

import App from "../../../App";

export const tryAuth = (authData, authMode, componentId) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "";
        if (authMode === "signin") {
          const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem("ap:auth:users")
                .catch(err => reject(err))
                .then(usersObject => {
                  if (!usersObject) {
                    reject("User not found, please register");
                  }else{
                    usersObject = [...JSON.parse(usersObject)];
                    for(let user of usersObject){
                      if(user.email === authData.email && user.password === md5(authData.password)){
                        delete user['password'];
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
                    dispatch(authStoreToken(user.token, 2592000));
                    dispatch(authSetUserData(user));
                    dispatch(uiStopLoading());
                    gotoScreen(componentId, 'liftApp.ProfileScreen');
                }
            });

        };
        if (authMode === "signup") {

          const promise = new Promise((resolve, reject) => {
            const dataToSave = {
              ...authData,
              password: md5(authData.password),
              barcodes: [],
              token: md5(authData.email+"."+authData.password)
            };
            AsyncStorage.getItem("ap:auth:users")
                .catch(err => reject(err))
                .then(usersObject => {
                  if (!usersObject) {
                    AsyncStorage.setItem("ap:auth:users", JSON.stringify([dataToSave]))
                      .then(() => resolve(authData) )
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
                    alert("user successfully registered!");
                    gotoScreen(componentId, 'liftApp.LoginScreen')
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
                fetchedToken = tokenFromStorage;

                if (!tokenFromStorage) {
                    reject("Token was not found");
                    return;
                }
                return AsyncStorage.getItem("ap:auth:expiryDate");
            })
            .then(expiryDate => {
                const parsedExpiryDate = new Date(parseInt(expiryDate));
                const now = new Date();
                if (parsedExpiryDate > now) {
                  AsyncStorage.getItem("ap:auth:users")
                      .catch(err => reject(err))
                      .then(usersObject => {
                        usersObject = [...JSON.parse(usersObject)];
                        for(let user of usersObject){
                          if(user.token === fetchedToken){
                            dispatch(authSetToken(fetchedToken, parsedExpiryDate));
                            delete user.password;
                            resolve(user);
                          }
                        }
                      })
                      .catch(err => reject(err));
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
        .then(user => {
            if (!user) {
                throw new Error();
            } else {
                dispatch(authSetUserData(user));
                resolve(fetchedToken);
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
  return (dispatch, getState) => {

    dispatch(uiStartLoading());
    const token = getState().auth.token;
    const promise = new Promise((resolve, reject) => {
      AsyncStorage.getItem("ap:auth:users")
          .catch(err => reject(err))
          .then(usersObject => {
            if (!usersObject) {
              reject("User is not authenticated");
            }else{
              usersObject = [...JSON.parse(usersObject)];
              for(let user of usersObject){
                if(user.token === token){
                  const userObj = user;
                  if(userObj.barcodes.includes(barCode)){
                    reject("barcode is already added, please add another one");
                  }else{
                    userObj.barcodes.push(barCode);
                  }
                  AsyncStorage.setItem("ap:auth:users", JSON.stringify(usersObject));
                  delete userObj["password"];
                  resolve(userObj);
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
      .then(userObj => {
          if (!userObj) {
              dispatch(uiStopLoading());
              console.log("error")
          } else {
              alert("Bar code saved")
              dispatch(authSetUserData(userObj));
              dispatch(authSetBarcode(barCode));
              dispatch(uiStopLoading());
          }
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

export const authSetUserData = userData => {
    return {
        type: AUTH_SET_USERDATA,
        userData: userData,
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
