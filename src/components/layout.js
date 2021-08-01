/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react"
 import PropTypes from "prop-types"
 import { StaticQuery, graphql, Link } from "gatsby"
 import styled from "styled-components"
 
 import "./layout.css"
 
 const Main = styled.main`
   max-width: 800px;
   margin: 0 auto;
 `;
 
 const Header = styled.header`
  display: flex;
  background: black;
  height: 66px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`;

const NavLink = styled.div`
  margin: auto 0;
  a {
    color: white;
    padding: 0 16px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    &:hover {
      color: orange;
    }
  }
`; 
 
 const navigationQuery = graphql`
 {
   prismic {
     allNavigations {
       edges {
         node {
           navigation_links {
             label
             link {
               ... on PRISMIC_Page {
                 _meta {
                   uid
                 }
               }
             }
           }
         }
       }
     }
   }
 }
 `;
 
 const Layout = ({ children }) => {
 
  return (
    <>
      <Header>
        <NavLinks>
          <StaticQuery 
            query={`${navigationQuery}`} 
            render={(data) => {
              const node = data.prismic.allNavigations.edges[0].node;
              
              return (
                <>
                  {node.navigation_links.map((item, idx) => {
                    return (
                      <NavLink key={idx}>
                        <Link to={`/${item.link._meta.uid}`}>{item.label}</Link>
                      </NavLink>
                    )
                  })}
                </>
              )
            }} 
          />
        </NavLinks>
      </Header>
      <Main>{children}</Main>
    </>
  )  
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout 