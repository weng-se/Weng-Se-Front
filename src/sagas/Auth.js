import {
    all,
    call,
    fork,
    put,
    takeEvery,
    takeLatest
} from "redux-saga/effects";
import {
    auth,
    facebookAuthProvider,
    githubAuthProvider,
    googleAuthProvider,
    twitterAuthProvider
} from "../firebase/firebase";
import {
    SIGNIN_FACEBOOK_USER,
    SIGNIN_GITHUB_USER,
    SIGNIN_GOOGLE_USER,
    SIGNIN_TWITTER_USER,
    SIGNIN_USER,
    SIGNOUT_USER,
    SIGNUP_USER,
    USER_LOGIN
} from "constants/ActionTypes";
import {
    showAuthMessage,
    userSignInSuccess,
    userSignOutSuccess,
    userSignUpSuccess
} from "actions/Auth";
import {
    userFacebookSignInSuccess,
    userGithubSignInSuccess,
    userGoogleSignInSuccess,
    userTwitterSignInSuccess,
    userLogInSuccess,
    userLogInError
} from "../actions/Auth";
import {
    Properties
} from './../constants/Properties';
import axios from 'axios';

const createUserWithEmailPasswordRequest = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);


const signOutRequest = async () =>
    await auth.signOut()
    .then(authUser => authUser)
    .catch(error => error);


const signInUserWithGoogleRequest = async () =>
    await auth.signInWithPopup(googleAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithFacebookRequest = async () =>
    await auth.signInWithPopup(facebookAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithGithubRequest = async () =>
    await auth.signInWithPopup(githubAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithTwitterRequest = async () =>
    await auth.signInWithPopup(twitterAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

function* createUserWithEmailPassword({
    payload
}) {
    const {
        email,
        password
    } = payload;
    try {
        const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
        if (signUpUser.message) {
            yield put(showAuthMessage(signUpUser.message));
        } else {
            localStorage.setItem('user_id', signUpUser.user.uid);
            yield put(userSignUpSuccess(signUpUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* signInUserWithGoogle() {
    try {
        const signUpUser = yield call(signInUserWithGoogleRequest);
        if (signUpUser.message) {
            yield put(showAuthMessage(signUpUser.message));
        } else {
            localStorage.setItem('user_id', signUpUser.user.uid);
            yield put(userGoogleSignInSuccess(signUpUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* signInUserWithFacebook() {
    try {
        const signUpUser = yield call(signInUserWithFacebookRequest);
        if (signUpUser.message) {
            yield put(showAuthMessage(signUpUser.message));
        } else {
            localStorage.setItem('user_id', signUpUser.user.uid);
            yield put(userFacebookSignInSuccess(signUpUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* signInUserWithGithub() {
    try {
        const signUpUser = yield call(signInUserWithGithubRequest);
        if (signUpUser.message) {
            yield put(showAuthMessage(signUpUser.message));
        } else {
            localStorage.setItem('user_id', signUpUser.user.uid);
            yield put(userGithubSignInSuccess(signUpUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* signInUserWithTwitter() {
    try {
        const signUpUser = yield call(signInUserWithTwitterRequest);
        if (signUpUser.message) {
            if (signUpUser.message.length > 100) {
                yield put(showAuthMessage('Your request has been canceled.'));
            } else {
                yield put(showAuthMessage(signUpUser.message));
            }
        } else {
            localStorage.setItem('user_id', signUpUser.user.uid);
            yield put(userTwitterSignInSuccess(signUpUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* signInUserWithEmailPassword({
    payload
}) {
    const {
        email,
        password
    } = payload;
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
        if (signInUser.message) {
            yield put(showAuthMessage(signInUser.message));
        } else {
            localStorage.setItem('user_id', signInUser.user.uid);
            yield put(userSignInSuccess(signInUser.user.uid));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser === undefined) {

            localStorage.removeItem('user_id');
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_username');
            localStorage.removeItem('user_role');

            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(showAuthMessage(signOutUser.message));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

export function* createUserAccount() {
    yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInWithGoogle() {
    yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
}

export function* signInWithFacebook() {
    yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
}

export function* signInWithTwitter() {
    yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
}

export function* signInWithGithub() {
    yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}


// ================================================

function* userLogin(action) {

    let payload = null,
        error = null,
        formData = action.formData;

    try {
        yield axios.post(`http://${Properties.host}:${Properties.port}/api/Users/login?include=user`, formData)
            .then((authUser) => payload = authUser)
            .catch((error) => error = error.response)

            console.log(`playload from saga`, payload)

        if (payload) {
            if (!payload.data.user.disabled) {
                localStorage.setItem(`credentials`, JSON.stringify({ 
                        'USER_ID': payload.data.userId, 
                        'USER_ROLE': payload.data.user.role,
                        'USER_TOKEN': payload.data.id
                    }
                ))
                localStorage.setItem(`user_id`, payload.data.userId);
                localStorage.setItem(`user_role`, payload.data.user.role);
                if (payload.data.user.username)
                    localStorage.setItem(`user_username`, payload.data.user.username);
                else
                    localStorage.setItem(`user_username`, payload.data.user.email);
                    localStorage.setItem(`user_token`, payload.data.id);
                yield put(userLogInSuccess(payload.data))
            } else {
                yield put(userLogInError(true));
            }
        } else
            yield put(userLogInError(error));

    } catch (error) {
        yield put(userLogInError(error));
    }
}

export function* watchUserLogin() {
    yield takeLatest(USER_LOGIN, userLogin);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(createUserAccount),
        fork(watchUserLogin),
        fork(signInWithGoogle),
        fork(signInWithFacebook),
        fork(signInWithTwitter),
        fork(signInWithGithub),
        fork(signOutUser)
    ]);
}