const centra = require('centra');

class Zuikaku {
    constructor(token) {
        Object.defineProperty(this, 'token', { value: token });
        this.baseurl = 'https://osu.ppy.sh/api';
    }

    // Beatmap
    getBeatmaps(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_beatmaps', parameters);
    }

    // User
    getUser(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user', parameters);
    }

    // Scores
    getScores(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_scores', parameters);
    }

    // Best Performance
    getUserBest(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user_best', parameters);
    }

    // Recently Played
    getUserRecent(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_user_recent', parameters);
    }

    // Multiplayer
    getMatch(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_match', parameters);
    }

    // Replay Data
    getReplay(parameters) {
        if (!parameters) throw new Error('Zuikaku_Error: Parameters is not specified');
        return this._fetch('/get_replay', parameters);
    }

    _fetch(endpoint, options) {
        const url = new URL(this.baseurl + endpoint);
        options.k = this.token;
        url.search = new URLSearchParams(options);
        return centra(url.toString())
            .query(options)
            .timeout(15000)
            .send()
            .then(response => {
                if (response.statusCode !== 200)
                    throw new Error(`Zuikaku_Error: Code ${response.statusCode}`);
                return JSON.stringify(response.body.toString());
            })
            .catch(error => {
                const err = error.message.startsWith('connect ETIMEDOUT') ? new Error('Zuikaku_Error: Request Timed Out') : new Error(`Zuikaku_Error: ${error}`);
                throw err;
            });
    }
}

module.exports = Zuikaku;