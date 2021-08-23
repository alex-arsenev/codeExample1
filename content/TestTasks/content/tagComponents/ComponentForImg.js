import React, {useEffect} from "react";
import 'katex/dist/katex.min.css';

function ComponentForImg ({textProp}) {
    const [imgSrc2,setImgSrc2] = React.useState('')

    useEffect(()=>{
        let url = "/tests/question/media/"+textProp
        setImgSrc2(url)

    },[])

    return (
            <img width={300} src={imgSrc2}/>
    );
}

export default ComponentForImg