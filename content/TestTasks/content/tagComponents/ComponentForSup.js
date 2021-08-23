import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForSup ({textProp}) {

    return (
            <sup>
                {textProp}
            </sup>

    );
}

export default ComponentForSup