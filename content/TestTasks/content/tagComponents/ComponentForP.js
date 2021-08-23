import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForP ({textProp}) {

    return (
        <p>
                {textProp}
        </p>
    );
}

export default ComponentForP