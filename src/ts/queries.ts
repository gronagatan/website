import { fetchAPI } from './fetchApi'

import type { RootQueryToPageConnection, RootQueryToMenuConnection, RootQueryToPostConnection, Page, Post } from '@src/generated/graphql'

export async function getMenuItems () {
  const query = `
    {
      menus(where: {location: TOP}) {
        nodes {
          menuItems(where: {parentDatabaseId: 0}) {
            nodes {
              label
              path
              connectedNode {
                node {
                  ... on Page {
                    id
                    slug
                    uri
                  }
                }
              }
              childItems(first: 50) {
                nodes {
                  label
                  path
                  connectedNode {
                    node {
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
      }
    }
  `
  const response = await fetchAPI<{menus: RootQueryToMenuConnection}>(query)
  return response.menus.nodes?.[0]?.menuItems?.nodes
  // if(response.menus.nodes && response.menus.nodes.length){
  //   return response.menus.nodes[0]?.menuItems?.nodes;
  // }
}
export async function getAllPageSlugs () {
  const query = `
    {
      pages(where: {parentIn: ""}) {
        nodes {
          slug
          id
          title
          uri
          children(where: {orderby: {field: MENU_ORDER, order: ASC}}, first: 50) {
            nodes {
              uri
              ... on Page {
                id
                title
                uri
                slug
              }
            }
          }
        }
      }
    }
  `
  const response = await fetchAPI<{pages: RootQueryToPageConnection}>(query)
  const nodes = response.pages.nodes
  if (nodes === undefined || nodes?.length === 0) {
    throw Error('empty response from graphql query')
  }
  return nodes as Page[]
}

export async function getPageFromId (id:string) {
  const query = `
    {
      page(id: "${id}") {
        id
        title
        slug
        uri
        content
        children(where:{orderby:{field: MENU_ORDER, order: ASC}}, first: 50) {
          nodes {
            ... on Page {
              id
              title
              slug
              uri
              content
            }
          }
        }
      }
    }
  `

  const response = await fetchAPI<{page: Page}>(query)
  return response.page
}

export async function getPageFromSlug (slug:string) {
  const query = `
    {
      page(idType: URI, id: "${slug}") {
        id
        title
        slug
        uri
        content
        children(where:{orderby:{field: MENU_ORDER, order: ASC}}, first: 50) {
          nodes {
            ... on Page {
              id
              title
              slug
              uri
              content
            }
          }
        }
      }
    }
  `
  const response = await fetchAPI<{page:Page}>(query)
  return response.page
}

export async function getMostRecentPosts (count: number) {
  const query = `
    {
      posts(where: {orderby: {field: DATE, order: DESC}}, first: ${count}) {
        nodes {
          title
          excerpt
          content
          date
        }
      }
    }
  `
  const response = await fetchAPI<{posts: RootQueryToPostConnection}>(query)
  return response.posts.nodes as Post[]
}
