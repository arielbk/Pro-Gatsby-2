import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Img from 'gatsby-image';
import { useSpring, animated } from 'react-spring';

import Header from "./header"
import Archive from './Archive';
import "./layout.css"

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;


const Layout = ({ children, location }) => {
  const stretchIn = useSpring({ height: location.pathname === '/' ? 200 : 100, from: { height: location.pathname === '/' ? 100 : 200 } });
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { regex: "/bg/"  }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <animated.div style={{ overflow: 'hidden', ...stretchIn }}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </animated.div>
          {/* {location.pathname === '/' &&

        } */}
          <MainLayout>
            <div>
              {children}
            </div>
            <Archive />
            <footer>
              © {new Date().getFullYear()}, Built with
            {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </MainLayout>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
