import db from '$lib/db';
import { json } from '@sveltejs/kit';


// Creates a stadium
export async function POST({ request }) {
	const stadium = await request.json();
	const result = await db.createStadium(stadium);
	return json({ id: result });
}
