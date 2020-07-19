export interface IceCream {
    id: string,
    name: string,
    price: string,
    photoURL: string
    status: string
}

export interface Admin {
    uid,
    sentInvite: boolean,
    name: string,
    admin: boolean,
    profileLogoURL: string
    waiting: boolean,
}