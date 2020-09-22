class API {
    BASE_URL = 'http://flex.somnoynadno.ru/api';
    DEBUG = true;
    userID = null;
    gameID = null;
    headers = {
        'Content-Type': 'application/json'
    };

    RegisterUser = async (username, password) => {
        let body = JSON.stringify({username: username, password: password});
        let response = await fetch(this.BASE_URL + `/auth/register`,
            {method: 'POST', headers: this.headers, body: body});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    LoginUser = async (username, password) => {
        let body = JSON.stringify({username: username, password: password});
        let response = await fetch(this.BASE_URL + `/auth/login`,
            {method: 'POST', headers: this.headers, body: body});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            this.headers["Authorization"] = "Bearer " + data["token"];
            this.userID = data["user_id"];

            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    GetUserInfo = async (userID) => {
        let response = await fetch(this.BASE_URL + `/user/${userID}`,
            {method: 'GET', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    GetTopTenUsers = async () => {
        let response = await fetch(this.BASE_URL + `/user/top/10`,
            {method: 'GET', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    StartGame = async () => {
        let response = await fetch(this.BASE_URL + `/game/start`,
            {method: 'POST', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            this.gameID = data["id"];
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    GetGameStatus = async () => {
        let response = await fetch(this.BASE_URL + `/game/${this.gameID}/status`,
            {method: 'GET', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    CheckGameTurn = async () => {
        let response = await fetch(this.BASE_URL + `/game/${this.gameID}/check_turn`,
            {method: 'GET', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    MakeMove = async (move) => {
        let body = JSON.stringify({move: move});
        let response = await fetch(this.BASE_URL + `/game/${this.gameID}/move`,
            {method: 'POST', headers: this.headers, body: body});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        return data;
    }

    ConcedeGame = async () => {
        let response = await fetch(this.BASE_URL + `/game/${this.gameID}/concede`,
            {method: 'POST', headers: this.headers});

        let data = await response.json();
        if (this.DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    }
}

export const api = new API();
