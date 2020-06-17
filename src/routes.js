import React from 'react';

const Main= React.lazy(()=>import("./views/Main"));

const routes=[
{path:'/',exact:true,name:'Main', component:Main},
];

export default routes;