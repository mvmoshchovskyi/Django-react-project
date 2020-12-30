import React from 'react';
import Navbar from "../components/Navbar";

const layout = (props) => (
    <div className="grid-container">
        <Navbar/>
        {props.children}
    </div>
);

export default layout;