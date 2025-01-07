import db from '$lib/db';
import { json } from '@sveltejs/kit';


// Deletes a match
export async function DELETE({ params }) {
    const id = params.match_id;
    const result = await db.deleteMatch(id);
    return json({ id: result });
}

// Updates a match
export async function PUT({ request }) {
    const match = await request.json();
    const result = await db.updateMatch(match);
    return json({ id: result });
}