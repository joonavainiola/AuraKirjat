import { URL_PATH } from '../constants';

// check if token is in local storage
export const checkToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export const checkAuth = (token: string) => {
    return fetch(`${URL_PATH}/login`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include",
    });
};

export const addProductToCart = (book_id: number, token: string) => {
    console.log('book_id', book_id);
    return fetch(`${URL_PATH}/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ book_id })
    });
};

// remove one product from cart by id
export const deleteProductFromCart = (cart_id: number, token: string) => {
    return fetch(`${URL_PATH}/cart/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ cart_id })
    });
};

// remove user's all products from cart
export const deleteAllProductsFromCart = (token: string) => {
    return fetch(`${URL_PATH}/cart/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include"
    });
};


export const getProductsFromCart = (token: string) => {
    return fetch(`${URL_PATH}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include"
    });
};

export const orderProducts = (delivery_address: string, postal_code: string, delivery_method: string, token: string) => {
    return fetch(`${URL_PATH}/order/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ delivery_address, postal_code, delivery_method })
    });
};

// get user by id (admin)
export const getUserById = (id: number): Promise<Response> => {
    return fetch(`${URL_PATH}/users/${id}`);
};

// get currently logged in user
export const getOwnProfile = (token: string): Promise<Response> => {
    return fetch(`${URL_PATH}/profile/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include"
    });
};

export const getOrderHistory = (token: string): Promise<Response> => {
    return fetch(`${URL_PATH}/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include"
    });
}

// search products by author or title
export const searchProducts = (searchWord: string): Promise<Response> => {
    return fetch(`${URL_PATH}/products?search=${searchWord}`);
};

// search products by genre.
export const searchProductsByGenre = (searchWord: number): Promise<Response> => {
    return fetch(`${URL_PATH}/products/genres?genre=${searchWord}`);
};

export const getProductById = (id: string): Promise<Response> => {
    return fetch(`${URL_PATH}/products/${id}`);
};

// login function
export const login = (email: string, password: string): Promise<Response> => {
    return fetch(`${URL_PATH}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
};

// sign up function
export const signUp = (full_name: string, email: string, password: string): Promise<Response> => {
    return fetch(`${URL_PATH}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ full_name, email, password })
    });
};

//upate user function
export const updateUser = (full_name: string, phone: string, address: string, postal_code: string, token: string): Promise<Response> => {
    return fetch(`${URL_PATH}/profile/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({ full_name, phone, address, postal_code })
    });
};