import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForH1 ({textProp}) {

    return (
            <h1>
                {textProp}
            </h1>
    );
}

export default ComponentForH1