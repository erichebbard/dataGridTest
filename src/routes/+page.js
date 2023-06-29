export const load = async ({ fetch }) => {
    const responseMPS = await fetch(`/api/mpsData`)
    const mps = await responseMPS.json()

    const responseCol = await fetch(`/api/columnData`)
    const columns = await responseCol.json()
  
    return {
        mps,
        columns
    };
}