import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import RichText from '../components/richText';

export const query = graphql`
  query PageQuery($id: String) {
    prismic {
      allPages(id: $id) {
        edges {
          node {
            page_title
            content
            _meta {
              uid
              id
            }
          }
        }
      }
    }
  }
`;

const Page = (props) => {
  const node = props.data.prismic.allPages.edges[0].node;
  const pageTitle = node.page_title;
  const content = node.content;
  
  return (
    <Layout>
      <RichText render={pageTitle} />
      <RichText render={content} />
    </Layout>
  )
}

export default Page;