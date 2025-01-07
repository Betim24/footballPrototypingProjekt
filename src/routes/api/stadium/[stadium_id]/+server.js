import db from '$lib/db';
import { json } from '@sveltejs/kit';


// Deletes a stadium
export async function DELETE({ params }) {
	const id = params.stadium_id;
	const result = await db.deleteStadium(id);
	return json({ id: result });
}

// Updates a stadium
export async function PUT({ request }) {
    const stadium = await request.json();
	const result = await db.updateStadium(stadium);
	return json({ id: result });
}
