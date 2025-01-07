import db from '$lib/db';
import { json } from '@sveltejs/kit';


// Creates a match
export async function POST({ request }) {
    const match = await request.json();
    const result = await db.createMatch(match);
    return json({ id: result });
}