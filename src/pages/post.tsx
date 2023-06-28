import { ListGroup } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

const ListItem = styled.a`
  font-family: Lora, serif;
  font-weight: 400;
  font-size: 1.3rem;
  margin: 0rem;
  line-height: 1.3;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0.25rem;
  text-decoration: none !important;
  margin-left: 0px;
  font-weight: 600;
  cursor: pointer;
  border: 3px solid transparent;
  border-bottom-color: #f2f2f2;
`
const CustomDate = styled.div`
  font-size: 1rem;
  display: block;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  box-sizing: border-box;
`


const CategoryGroup = styled.div`
margin-top: 50px;
`

const CustomHeader = styled.h2`
  font-size: 1.3rem;
  line-height: 1.3;
  margin: 0 0 0.25rem;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0.25rem;
  margin-left: 0px;
  box-sizing: border-box;
`
const Button = styled.button`
background-color: #ebf1fe;
border-radius: 8px;
border-width: 0;
color: #5183f5;
cursor: pointer;
display: inline-block;
font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
font-size: 15px;
font-weight: 500;
line-height: 15px;
list-style: none;
margin: 5px;
padding: 10px 12px;
text-align: center;
transition: all 200ms;
vertical-align: baseline;
white-space: nowrap;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
  &:disabled {
    cursor: default;
  }
`;
const ButtonToggle = styled(Button)`
  ${(data: any) =>
    data['data-active'] &&
    `
    background-color: blue;
    color: white;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center
`;

export default function AllPost() {
  interface NodeInterface {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    categories: { nodes: { name: string }[] }
    tags: { nodes: { name: string }[] }
  }
  interface EdgesInterface {
    node: NodeInterface
  }[]
  const data = useStaticQuery(graphql`
    query {
      allWpPost {
        edges {
          node {
            id
            title
            slug
            excerpt
            content
            date
            categories{
            	nodes{
                name
              }
            }
            tags{
              nodes{
                name
              }
            }
          }
        }
      }
    }
  `)
  const edges: EdgesInterface[] = data.allWpPost.edges;
  const [category, setCategory] = useState("work")
  const [filters, setFilters] = useState<{ workFilters: string[]; personalFilters: string[] }>({
    workFilters: [''],
    personalFilters: [''],
  });
  const postData = edges.map(({ node }) => {
    return {
      category: node.categories.nodes.map(({ name }) => name)[0],
      tags: node.tags.nodes.map(({ name }) => name),
      date: new Date(node.date).toLocaleDateString("en-US"),
      title: node.title.replace(/&nbsp;/g, " "),
      slug: node.slug,
    }
  }).flat()
  const allTags = [...new Set(postData.map(({ tags }) => tags).flat())]
  const allCategories = [...new Set(postData.map(({ category }) => category).flat())]
  const handleCategoryClick = (event: any) => {
    const text = event.target.innerHTML
    if (allCategories.includes(text.toLowerCase())) {
      setCategory(text.toLowerCase())
    }
  };
  const handleFilterClick = (event: any) => {
    const filterText = event.target.value;
    const currentFilters = category === 'work' ? filters.workFilters : filters.personalFilters;
    if (allTags.includes(filterText.toLowerCase())) {
      // filter already applied
      // so remove it
      if (currentFilters.includes(filterText.toLowerCase())) {
        setFilters({
          workFilters: filters.workFilters.filter((fil) => fil !== filterText),
          personalFilters: filters.personalFilters.filter((fil) => fil !== filterText)
        })
      }
      // filter not added yet
      if (!currentFilters.includes(filterText.toLowerCase())) {
        if (category === "work") {
          setFilters({
            workFilters: [...filters.workFilters, filterText],
            personalFilters: [...filters.personalFilters]
          })
        } else {
          setFilters({
            workFilters: [...filters.workFilters],
            personalFilters: [...filters.personalFilters, filterText]
          })
        }

      }
    }
  };
  const categoryFilters = category === "work" ? filters.workFilters : filters.personalFilters;
  let filteredPost = postData.filter((data) => {
    return categoryFilters && categoryFilters.some(r => data.tags.includes(r)) && data.category === category
  })
  if (categoryFilters && categoryFilters.length == 1) {
    filteredPost = postData.filter((data) => {
      return data.category === category
    })
  }
  const filterTags = postData.filter((data) => {
    return data.category === category
  }).map(({ tags }) => tags).flat()
  const availableFilters = [...new Set(filterTags)]
  return (
    <div>
      <Layout>
        <ButtonGroup>
          {availableFilters.map(tag => (
            <ButtonToggle
              key={tag}
              data-active={categoryFilters.includes(tag)}
              value={tag}
              onClick={handleFilterClick}
            >
              {tag.toUpperCase()}
            </ButtonToggle>
          ))}
        </ButtonGroup>
        <CategoryGroup>
          <Tabs
            id="tab"
            activeKey={category}
            data-testid={`Post__category`}
            onClick={handleCategoryClick}
            className="mb-3"
          >
            {allCategories.map((cat) => (
              <Tab className="tabs" key={cat} data-index={cat} eventKey={cat} title={cat.toUpperCase()}>
                {" "}
              </Tab>
            ))}
          </Tabs>
        </CategoryGroup>
        <ListGroup>
          {filteredPost.map(
            ({ slug, title, date }) => (
              <ListItem href={`/post/${slug}`} key={slug}>
                <ListGroup.Item action>
                  <CustomHeader>
                    {title.replace(/&nbsp;/g, " ")}
                  </CustomHeader>
                  <CustomDate>
                    {new Date(date).toLocaleDateString("en-US")}
                  </CustomDate>
                </ListGroup.Item>
              </ListItem>
            )
          )}
        </ListGroup>
      </Layout>
    </div>
  )
}
