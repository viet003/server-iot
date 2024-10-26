
// export const createCardService = ({ id, type }) => new Promise(async (resolve, reject) => {
//     try {
//         const res = await db.collection('Cards').doc(id.toString()).set({
//             id: id,
//             type: type
//         });

//         resolve({
//             err: res ? 0 : 2,
//             msg: res ? 'Tạo thành công!' : 'Tạo không thành công!'
//         })
//     } catch (error) {
//         reject(error)
//     }
// })