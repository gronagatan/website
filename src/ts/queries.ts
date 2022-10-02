import { fetchAPI } from "./fetchApi"

export async function getMenuItems(){
  const query = `
    {
      menus(where: {location: TOP}) {
        nodes {
          menuItems {
            nodes {
              label
              connectedNode {
                node {
                  uri
                  ... on Page {
                    id
                    slug
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const response = await fetchAPI(query);
  return response.menus.nodes[0].menuItems.nodes;
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