export const libTransformer = (libraryBook) => {
    console.log('libTransformer')

    return {
        id: libraryBook.id,
        libraryId: libraryBook.library.id,
        libraryName: libraryBook.library.name,
        address: libraryBook.library.Address,
        latitude: libraryBook.library.latitude,
        longitude: libraryBook.library.longitude,
        info: libraryBook.library.info,
        amount: libraryBook.amount,
        amountAvailable: libraryBook.amountAvailable,
    }
}