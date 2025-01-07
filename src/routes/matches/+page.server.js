import db from "$lib/db";


export async function load() {
    return{
        matches: await db.getMatches(),
    }
}

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        // console.log(data);
        await db.deleteMatch(data.get("id"));
    }
}