import React from 'react'

export default ({pageContext, content}) => (
    <div>
        <h1>
            {pageContext.title}
        </h1>

    <div
        dangerouslySetInnerHTML={{__html:pageContext.content}}
    />
    </div>
);