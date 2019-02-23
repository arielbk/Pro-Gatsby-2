import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Archive = () => (
  <StaticQuery
    query={graphql`
      query markdownQuery {
        allMarkdownRemark {
          totalCount
          edges {
            node {
              id
              excerpt
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <aside>
          <h3>Archive</h3>
          <div>
            {data.allMarkdownRemark.edges.map(post => <h3 key={post.id}>{post.node.frontmatter.title}</h3>)}
          </div>
        </aside>
      </>
    )}
  />
)

export default Archive
