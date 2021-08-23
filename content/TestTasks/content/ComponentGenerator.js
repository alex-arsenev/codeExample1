import React from "react";
import ComponentForEm from "./tagComponents/ComponentForEm";
import ComponentForFormula from "./tagComponents/ComponentForFormula";
import ComponentForP from "./tagComponents/ComponentForP";
import ComponentForSub from "./tagComponents/ComponentForSub";
import ComponentForSup from "./tagComponents/ComponentForSup";
import ComponentForH1 from "./tagComponents/ComponentForH1";
import ComponentForSpan from "./tagComponents/ComponentForSpan";
import ComponentForImg from "./tagComponents/ComponentForImg";
import ComponentForDiv from './tagComponents/ComponentForDiv'
import ComponentForNobr from './tagComponents/ComponentForNobr'
import ComponentForFigcaption from './tagComponents/ComponentForFigcaption'
import ComponentForA from './tagComponents/ComponentForA'
import ComponentForTable from './tagComponents/ComponentForTable'
import ComponentForTr from './tagComponents/ComponentForTr'
import ComponentForTd from './tagComponents/ComponentForTd'

function ComponentGenerator (segment,answers,processChosing) {
    if (segment.type === 'h1') {
        return <ComponentForH1 textProp={segment.content}/>
    } else if (segment.type === 'p') {
        return <ComponentForP textProp={segment.content}/>
    } else if (segment.type === 'sub') {
        return <ComponentForSub textProp={segment.content}/>
    } else if (segment.type === 'sup') {
        return <ComponentForSup textProp={segment.content}/>
    } else if (segment.type === 'em') {
        return <ComponentForEm textProp={segment.content}/>
    } else if (segment.type === 'formula') {
        return <ComponentForFormula textProp={segment.content}/>
    } else if (segment.type === 'span') {
        return <ComponentForSpan textProp={segment.content}/>
    } else if (segment.type === 'img') {
        return <ComponentForImg textProp={segment.content}/>
    }   else if (segment.type === 'div') {
        return <ComponentForDiv textProp={segment.content}/>
    } else if (segment.type === 'nobr') {
        return <ComponentForNobr textProp={segment.content}/>
    } else if (segment.type === 'figcaption') {
        return <ComponentForFigcaption textProp={segment.content}/>
    } else if (segment.type === 'a') {
        return <ComponentForA textProp={segment.content}/>
    } else if (segment.type === 'table') {
        return <ComponentForTable textProp={segment.content}/>
    } else if (segment.type === 'tr') {
        return <ComponentForTr textProp={segment.content}/>
    } else if (segment.type === 'td') {
        return <ComponentForTd textProp={segment.content}/>
    }


}

export default ComponentGenerator