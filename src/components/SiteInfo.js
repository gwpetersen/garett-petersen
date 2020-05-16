import React from 'react';
import {graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

const SiteInfoWrapper = styled.div`
flex-grow:1;
color: white;
margin: auto 0;
`

const SiteTitle = styled.div`
font-weight: bold;
font-size: 2em;
text-align: left;


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
              Garett Petersen
            </SiteTitle>
    </SiteInfoWrapper>)
}/>
)

export default SiteInfo;