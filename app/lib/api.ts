import {message} from "antd";

const BASE_URL = "https://contact-api.dicoding.dev/v1";

export interface RegisterPayload{
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload{
    email: string;
    password: string;
}

export interface ContactPayload{
    name: string;
    phoneNumber:string;
    email:string;
    tag: string;
}

export interface ApiResponse<T = null> {
    error: boolean;
    message?: string;
    data?: T;
}

export interface User{
    id: string;
    name: string;
    email: string;
}

export interface Contact{
    id: string;
    name: string;
    phoneNumber:string;
    email:string;
    tag: string;
}

// TOKEN HANDLER
function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

function putAccessToken(token: string): void {
    localStorage.setItem("accessToken",token);
}

// FETCH WITH TOKEN
async function fetchWithToken(
    url: string,
    options: RequestInit = {}
): Promise<Response>{
    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}

// AUTH
async function register(
    payload: RegisterPayload
): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/register`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    const responseJson = await response.json();

    if(responseJson.status !== "success"){
        return {error: true, message: responseJson.message};
    }
    return {error: false};
}

async function login(
    payload: LoginPayload
): Promise<ApiResponse<{accessToken: string}>>
{
    const response = await fetch(`${BASE_URL}/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success"){
        return {
            error: true,
            message: responseJson.message,
        };
    }

    return {
        error: false,
        data: responseJson.data,
        message: responseJson.message
    };
}

async function getUserLogged(): Promise<ApiResponse<User>> 
{
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if(responseJson.status !== "success"){
        return {error: true};
    }

    return {error: false, data: responseJson.data};
}

// CONTACTS
async function addContact(
    payload: ContactPayload
): Promise<ApiResponse> 
{
    const response = await fetchWithToken(`${BASE_URL}/contacts`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success"){
         return{ message: responseJson.message, error: true}
    }
    return {message: responseJson.message, error: false}
}

async function getContacts(): Promise<ApiResponse<Contact[]>> 
{
    const response = await fetchWithToken(`${BASE_URL}/contacts`);
    const responseJson = await response.json();

    if(responseJson.status !== "success"){
        message.error(responseJson.message);
        return {error: true, data: []};
    }

    return {
        error: false,
        data: responseJson.data,
    };
}

async function deleteContact(id: string): Promise<ApiResponse> 
{
    const response = await fetchWithToken(`${BASE_URL}/contacts/${id}`,{
        method: "DELETE",
    });

    const responseJson = await response.json();

    if(responseJson.status !== "success"){
        return {error: true, message: responseJson.message};
    }

    return {error: false, message: responseJson.message};
}

// EXPORT

export{
    getAccessToken,
    putAccessToken,
    register,
    login,
    getUserLogged,
    addContact,
    getContacts,
    deleteContact,
}



