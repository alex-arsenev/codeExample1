import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';
import {InlineMath} from "react-katex";

function ComponentForFormula ({textProp}) {

    return (
        <span> <InlineMath>{textProp}</InlineMath> </span>
    );
}

export default ComponentForFormula