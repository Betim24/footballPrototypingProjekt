import db from "$lib/db";

export const actions = {
    create: async ({request}) => {
        const data = await request.formData();
        // console.log(data);
        let match = {
            homeTeam: data.get("homeTeam"),
            awayTeam: data.get("awayTeam"),
            date: data.get("date"),
            stadium: data.get("stadium"),
            score: data.get("score"),
        }
        await db.createMatch(match);
        return {success: true};
    }
    }