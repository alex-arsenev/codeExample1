import React from "react";
import './Checkbox.css'
import check from './check.svg'

function Checkbox({text,id,processChosing}) {

    const [isChosen,setIsChosen] = React.useState(false)

    const processClick = ()=>{
        setIsChosen(!isChosen)
        processChosing(id)
    }

    return (
        <div onClick={processClick} className="Checkbox">
            {isChosen ? <div className={'Checkbox__chosenCheckbox'}><img src={check}/></div>
                : <div className={"Checkbox__notChosenCheckbox"}></div> }
            <div className="Checkbox__text">{text}</div>
        </div>
    )
}
export default Checkbox