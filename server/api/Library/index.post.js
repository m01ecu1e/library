import { createLibrary } from "~/server/db/book"

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)

    const{ name, info, Address } = body

    const libData = {
        name,
        info,
        Address
    }

    const library = await createLibrary(libData)

    return {
        library: library
    }

})