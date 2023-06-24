export const load = async ({ fetch }) => {
    const responseMPS = await fetch(`/api/gridData`)
    const grid = await responseMPS.json()

    const responseCol = await fetch(`/api/columnData`)
    const columns = await responseCol.json()
  
    return {
        grid,
        columns
    };
}