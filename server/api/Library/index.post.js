import { createLibrary } from "~/server/db/library"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ name, info, Address, latitude, longitude } = body

    const libData = {
        name,
        info,
        Address,
        latitude,
        longitude
    }

    const library = await createLibrary(libData)

    return {
        library: library
    }

})