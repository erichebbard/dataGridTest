export const load = async ({ fetch }) => {
    const response = await fetch(`/api/gridData`)
    const grid = await response.json()
  
      return {
        grid
      };
    }