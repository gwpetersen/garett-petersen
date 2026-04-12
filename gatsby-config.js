require("dotenv").config({
  path: `.env`,
})
process.env["AWS_ACCESS_KEY_ID"] = process.env.NETLIFY_AWS_ACCESS_KEY_ID
process.env["AWS_SECRET_ACCESS_KEY"] = process.env.NETLIFY_AWS_SECRET_ACCESS_KEY
process.env["AWS_REGION"] = process.env.NETLIFY_AWS_REGION


const {
  AWS_ACCESS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
} = process.env

module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: `Garett Petersen`,
    description: `Interactive Experience With Modern Tech`,
    author: `Garett Petersen`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["SITE_USER", "SITE_PASSWORD"],
      },
    },
    {
      resolve: "gatsby-source-s3",
      options: {
        aws: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
        buckets: ["garett.petersen.media"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    `gatsby-plugin-netlify`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
