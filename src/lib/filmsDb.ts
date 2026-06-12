import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

type Film = {
    id: string,
    title: string;
    year: number;
    director: string;
}

const filePath = "./src/data/films.json"

// Low level

async function read(): Promise<Film[]> {
    try {
        const raw = await readFile(filePath, 'utf-8')
        return JSON.parse(raw)
    } catch(err: any) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function write(data: Film[]) {
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

// High level

export const db = {

    async getFilms(): Promise<Film[]> {
        return await read()
    },

    async addFilm(film: Omit<Film, "id">): Promise<Film[]> {
        const existing = await read()
        const newFilm: Film = {
            id: uuid(),
            ...film,
        }
        const updated = [...existing, newFilm]
        await write(updated)
        return updated
    },

    async deleteFilm(id: Partial<Film>): Promise<Film[]> {
        const existing = await read()
        const filtered = existing.filter(f => f.id !== id)
        console.log(filtered)
        await write(filtered)
        return filtered
    },

    async updateFilm(title: string, updates: Partial<Film>): Promise<Film[]> {
        const existing = await read()
        const updated = existing.map(f => f.title === title ? {...f, ...updates} : f)
        await write(updated)
        return updated
    }
}