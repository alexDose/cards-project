import {AppThunk} from "../../../../sc1-main/m2-bll/store";
import {authAPI, LoginParamsType} from "../dal/login-api";
import {setProfileDataAC} from "../../../f2-profile/bll/profileReducer";

const initialState = {
    isLoggedIn: false
}

export const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case "login/LOGIN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const loginAC = (value: boolean) => ({type: "login/LOGIN", value } as const);

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    authAPI.login(data)
        .then(res => {
            console.log(res.data)
            dispatch(setProfileDataAC(res.data))
            dispatch(loginAC(true))
        })
        .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ", more details in the console")
                console.log(error)
            }
        )
}

export type LoginInitialStateType = typeof initialState;
export type LoginActionType = ReturnType<typeof loginAC>