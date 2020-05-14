import React from 'react';
import {graphql, StaticQuery } from 'gatsby';
import styled,{ createGlobalStyle } from 'styled-components';

const SiteInfoWrapper = styled.div`
flex-grow:1;
color: white;
margin: auto 0;
`

const SiteTitle = styled.div`
font-weight: bold;
`

const SiteInfo = () => (
    <StaticQuery 
    query={graphql`{
      site {
        siteMetadata {
          description
          title
        }
      }
    }
`} 
render={data => (
    <SiteInfoWrapper>
            <SiteTitle>
                {data.site.siteMetadata.title}
            </SiteTitle>
            <div>
                {data.site.siteMetadata.description}
            </div>
    </SiteInfoWrapper>)
}/>
)

export default SiteInfo;