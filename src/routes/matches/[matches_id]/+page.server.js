import db from "$lib/db.js";

export async function load({ params }) {
  return {
    match: await db.getMatch(params.match_id),
  };
}

export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    //console.log(data);
    let match = {
        _id: data.get("_id"),
        homeTeam: data.get("homeTeam"),
        awayTeam: data.get("awayTeam"),
        date: data.get("date"),
        stadium: data.get("stadium"),
        score: data.get("score"),
    };
    await db.updateMatch(match);
    return { success: true };
  },
};