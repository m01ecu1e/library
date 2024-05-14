export const libTransformer = (lib) => {
    console.log('libTransformer')

    return {
        id: lib.library.id,
        name: lib.library.name,
        address: lib.library.Address,
        info: lib.library.info,
        amount: lib.amount,
        amountAvailable: lib.amountAvailable,
    }
}