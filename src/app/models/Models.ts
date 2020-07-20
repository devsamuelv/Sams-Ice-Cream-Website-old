export interface IceCream {
    id: string,
    name: string,
    price: string,
    photoURL: string
    status: string
}

export interface AlgoliaObject {
    name: string,
    id: string,
    photoURL: string,
    status: boolean,
    price: string
}

export interface Admin {
    uid,
    sentInvite: boolean,
    name: string,
    admin: boolean,
    profileLogoURL: string
    waiting: boolean,
}