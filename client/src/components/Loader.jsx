import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
    return (
        <div style={{ position: "fixed", left: "50%", top: "20%", transform: "translate(-50%,-50%)", zIndex: "1"}}>
            <Oval
                ariaLabel="loading-indicator"
                height={43}
                width={200}
                strokeWidth={7}
                strokeWidthSecondary={5}
                color="teal"
                secondaryColor="black"
            />
        </div>
    );
};

export default Loader;