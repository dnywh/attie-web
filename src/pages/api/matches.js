const authToken = await import.meta.env.FD_AUTH_TOKEN

// {{url}}/v4/competitions/PL/matches?season=2024&dateFrom=2024-10-26&dateTo=2024-10-27
// https://api.football-data.org/v4/competitions/PL/matches?season=2024
// https://api.football-data.org/v4/competitions/PL/matches?season=2024&dateFrom=2024-10-26&dateTo=2024-10-27

export async function get(context) {
    const response = await fetch(`https://api.football-data.org/v4/competitions/PL/matches?season=2024&dateFrom=2024-10-26&dateTo=2024-10-26`, {
        headers: {
            'X-Auth-Token': authToken
        }
    });

    const data = await response.json();
    // console.log(data.matches)
    return data.matches;
}
