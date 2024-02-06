export const getToken=()=>{
    let token = localStorage.getItem("token");
    return token
}

export const getRefreshToken=()=>{
    let refresh_token = localStorage.getItem("refreshToken")
    return refresh_token
}

export const updateToken=(accessToken)=>{
    localStorage.setItem("token", accessToken);
    return accessToken
}