
export interface IMondayAccessToken {
    token: any;
    backToUrl: string;
}

export interface IMondayAuth {
    userId: number;
    accountId: number;
    backToUrl: string;
}

export interface IMondayAuthCode {
    accessToken: any;
    accountId: number;
    backToUrl: string;
    userId: number;
}

export interface IAuthJwt {
    accountId: number;
    userId: number;
    backToUrl: string;
    shortLivedToken: string;
}
