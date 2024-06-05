import { userTransformer } from "../transformers/user"

export default defineEventHandler(async (event) => {
   
    console.log('user get')
    return {
        user: userTransformer(event.context.auth?.user)
    }

})