export const load = async ({ fetch }) => {
    const responseDemand = await fetch(`/api/demandData`)
    const demand = await responseDemand.json()
    
    const responseMPS = await fetch(`/api/mpsData`)
    const mps = await responseMPS.json()

    const responseCol = await fetch(`/api/columnData`)
    const columns = await responseCol.json()
  
    return {
        demand,
        mps,
        columns
    };
}