export const load = async ({ fetch }) => {
    const response = await fetch(`/api/mps`)
    const data = await response.json()
  
    // const categories = posts.map(post => post.meta.categories)
    //                    .reduce((acc, categories) => [...acc, ...categories], [])
    //                    .filter((category, index, self) => self.indexOf(category) === index);
  
      return {
        data
      }
    }