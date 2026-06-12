import type { APIRoute } from "astro";
import { db } from "../../lib/filmsDb";


export const GET: APIRoute = async () => {
  const films = await db.getFilms()
  return Response.json(films)
}

export const POST: APIRoute = async({request} : {request: Request}) => {
  const film = await request.json()
  const updated = await db.addFilm(film)
  return Response.json(updated)
}

export const DELETE: APIRoute = async({request} : {request: Request}) => {
  const { id } = await request.json()
  console.log('api hit', id)
  const updated = await db.deleteFilm(id)
  return Response.json(updated)
}

export const PUT: APIRoute = async({request} : {request: Request}) => {
  const {title, ...changes} = await request.json()
  const updated = await db.updateFilm(title, changes)
  return Response.json(updated)
}