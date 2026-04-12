exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/private/)) {
    page.matchPath = "/private/*"
    createPage(page)
  }
}
