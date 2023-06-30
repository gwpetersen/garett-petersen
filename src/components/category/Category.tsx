import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
export interface Node {
  name:string
}
export interface Edges {
node: Node
}
const Category = () => {
  const data = useStaticQuery(graphql`
      query {
        allWpCategory {
          edges {
            node {
              name
            }
          }
        },
        allWpPost{
          nodes{
            tags{
              nodes{
                name
              }
            }
          }
        }
      }
  `)
  const [filters, setFilters] = useState("all")
  const categories: Edges[] = data.allWpCategory.edges
  interface TageNodes {
    tags: {
      nodes: {
        name: string;
      }[]
    }
  }
  const tagNodes: TageNodes [] = data.allWpPost.nodes;
  const tags  = tagNodes.map(({ tags }) => tags.nodes.map(({ name }) => name)).flat()
  const allCategories: string[] = categories.map(({ node }) => node.name);
  const allFilters = tags.concat(allCategories)
  return (
      <div>
        <Tabs
        id="tab"
        activeKey={filters}
        className="myClass"
        onSelect={filters => setFilters(filters || "")}
      >
        {allFilters.map((filterName) => (
          <Tab className="tabs" key={`tab-${filterName}`}  eventKey={filterName} title={filterName.toUpperCase()}>
            {" "}
          </Tab>
        ))}
      </Tabs>
      </div>
    )

}

export default Category
