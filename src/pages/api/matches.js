const authToken = await import.meta.env.FD_AUTH_TOKEN

// {{url}}/v4/competitions/PL/matches?season=2024&dateFrom=2024-10-26&dateTo=2024-10-27
// https://api.football-data.org/v4/competitions/PL/matches?season=2024
// https://api.football-data.org/v4/competitions/PL/matches?season=2024&dateFrom=2024-10-26&dateTo=2024-10-27


export async function getMatchData() {
    const uselocalData = true;
    let matches;

    if (uselocalData) {
        const localData = await import('./data/local_matches.json');
        console.log("Using local data")
        matches = localData.default.matches;
    } else {
        const response = await fetch(`https://api.football-data.org/v4/competitions/PL/matches?season=2024&dateFrom=2024-08-26&dateTo=2024-11-27`, {
            headers: {
                'X-Auth-Token': authToken
            }
        });
        const data = await response.json();
        matches = data.matches;
    }

    const sortedMatches = matches.sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

    const groupedMatches = {};
    sortedMatches.forEach(match => {
        const localDate = new Date(match.utcDate).toLocaleDateString();
        if (!groupedMatches[localDate]) {
            groupedMatches[localDate] = [];
        }
        groupedMatches[localDate].push(match);
    });

    return {
        body: groupedMatches,
        headers: {
            'Cache-Control': 'public, max-age=300' // Cache for 5 minutes (300 seconds)
        }
    };
}
