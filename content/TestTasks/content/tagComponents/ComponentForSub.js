import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForSub ({textProp}) {

    return (
            <sub>
                {textProp}
            </sub>
    );
}

export default ComponentForSub