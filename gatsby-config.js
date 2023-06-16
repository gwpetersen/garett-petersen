require("dotenv").config({
  path: `.env`,
})
process.env["AWS_ACCESS_KEY_ID"] = process.env.NETLIFY_AWS_ACCESS_KEY_ID
process.env["AWS_SECRET_ACCESS_KEY"] = process.env.NETLIFY_AWS_SECRET_ACCESS_KEY

const {
  AWS_ACCESS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
  AWS_REGION: awsRegion,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-s3-image",
      options: {
        bucketName: "garett.petersen.media",
        aws: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
          region: awsRegion
        },
        
        protocol: "http", // [optional] Default to `https`.
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
      resolve: "gatsby-source-wordpress",
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'demo.wp-api.org' or 'www.example-site.com'
         */
        url: 'http://wp.garettpetersen.com/graphql' || `https://localhost/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        verbose: true,
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
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
