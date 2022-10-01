import { fetchAPI } from "./fetchApi"

export async function getMenuItems(){
  const query = `
    {
      menus(where: {location: TOP}) {
        nodes {
          menuItems {
            nodes {
              label
              path
              connectedNode {
                node {
                  ... on Page {
                    slug
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  return fetchAPI(query);
}
export async function getAllPageSlugs() {
  const query = `
    {
      pages {
        nodes {
          slug
          id
          title
          uri
        }
      }
    }
  `
  return fetchAPI(query);
}

export async function getPageFromSlug(slug:string){
  const query = `
    {
      page(idType: URI, id: "${slug}") {
        content
        title
        slug
        uri
      }
    }
  `
  return fetchAPI(query);
}