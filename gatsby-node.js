const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  // createRedirect({
  //   fromPath: "/",
  //   toPath: "/home/",
  //   redirectInBrowser: true,
  //   isPermanent: true,
  // })
  // query content for WordPress posts
  const {
    data: {
      allWpPost: { nodes: allPosts },
      allWpPage: { nodes: allPages },
    },
  } = await graphql(`
    query {
      allWpPage {
        nodes {
          title
          slug
          content
        }
      }
      allWpPost {
        nodes {
          title
          slug
          content
        }
      }
    }
  `)
  for (node of allPages) {
    const pageTemplate = path.resolve("./src/templates/page.tsx");
    await createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `${node.slug}/`,
      component: slash(pageTemplate),
      context: node,
    })
  }
  for (node of allPosts) {
    const postTemplate = path.resolve("./src/templates/post.tsx")
    await createPage({
      path: `/post/${node.slug}/`,
      component: slash(postTemplate),
      context: node,
    })
  }

  exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/private/)) {
      page.matchPath = "/private/*"
      // Update the page.
      createPage(page)
    }
  }
}
