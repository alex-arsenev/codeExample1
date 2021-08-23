import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForEm ({textProp}) {

    return (
            <em>
                {textProp}
            </em>
    );
}

export default ComponentForEm