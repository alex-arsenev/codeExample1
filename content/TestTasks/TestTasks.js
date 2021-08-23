import React from "react";
import TestTask from "./TestTask";
import './TestTasks.css'
import './TestTask.css'

function TestTasks() {

    const [currentTaskIndex,setCurrentTaskIndex] = React.useState(0)
    const [resultIsShown,setResultIsShown] = React.useState(false)
    const [rightAnswersCount,setRightAnswersCount] = React.useState(0)
    const [tasks,setTasks] = React.useState([
        {
            id: 103,
            status: "inProcess"
        },
        {
            id: 243,
            status: "notAnswered"
        },
        {
            id: 147,
            status: "notAnswered"
        },
        {
            id: 176,
            status: "notAnswered"
        },
        ])

    React.useEffect(()=>{

        // Prod
        // let temporaryUrl = "/tests/question/"+ id
        // Axios.get(temporaryUrl).then((res)=>{
        //      setTasks(res)
        //     ...
        // })


    },[])


    const searchFromCurrentElemTillEnd = (currentElIndex,rightOrWrong)=>{

            for (let i = currentElIndex+1;i<tasks.length;i++){
                if (i === tasks.length-1 && tasks[i].status !== "notAnswered"){
                    searchFromStartTillCurrentElem(currentElIndex)
                    break
                } else if (tasks[i].status === "notAnswered"){
                    setCurrentTaskIndex(i)
                    let items = [...tasks]

                    // меняем статус текущего элемента
                    let itemCurrent = {...items[currentTaskIndex]}
                    if (rightOrWrong !== undefined){
                        itemCurrent.status = rightOrWrong
                    } else {
                        itemCurrent.status = 'notAnswered'
                    }
                    items[currentTaskIndex] = itemCurrent

                    // меняем статус след элемента
                    let itemNext = {...items[i]}
                    itemNext.status = "inProcess"
                    items[i] = itemNext
                    setTasks(items)
                    break
                } else if (tasks[i].status !== "notAnswered"){
                    setCurrentTaskIndex(i)
                    let items = [...tasks]

                    // меняем статус текущего элемента
                    let itemCurrent = {...items[currentTaskIndex]}
                    if (rightOrWrong !== undefined){
                        itemCurrent.status = rightOrWrong
                    } else {
                        itemCurrent.status = 'notAnswered'
                    }
                    items[currentTaskIndex] = itemCurrent

                    // меняем статус след элемента
                    let itemNext = {...items[i]}
                    itemNext.status = "inProcess"
                    items[i] = itemNext
                    setTasks(items)
                    break
                }

            }

    }

    const searchFromStartTillCurrentElem = (currentElIndex,rightOrWrong)=>{

        for (let i = 0;i<currentElIndex;i++) {
            if (i === currentElIndex-1 && tasks[i].status !== "notAnswered"){
                setCurrentTaskIndex(i)
                let items = [...tasks]

                // меняем статус текущего элемента
                let itemCurrent = {...items[currentTaskIndex]}
                if (rightOrWrong !== undefined){
                    itemCurrent.status = rightOrWrong
                } else {
                    itemCurrent.status = 'notAnswered'
                }
                items[currentTaskIndex] = itemCurrent
                setTasks(items)
                setResultIsShown(true)
                break
            }
            if (tasks[i].status === "notAnswered"){
                setCurrentTaskIndex(i)
                let items = [...tasks]

                // меняем статус текущего элемента
                let itemCurrent = {...items[currentTaskIndex]}
                if (rightOrWrong !== undefined){
                    itemCurrent.status = rightOrWrong
                } else {
                    itemCurrent.status = 'notAnswered'
                }
                items[currentTaskIndex] = itemCurrent

                // меняем статус след элемента
                let itemNext = {...items[i]}
                itemNext.status = "inProcess"
                items[i] = itemNext
                setTasks(items)
                break
            }
        }
    }

    const goToNext = (id,rightOrWrong)=>{
        // Найти индекс задания с данным id
        let currentElIndex
        tasks.forEach((el,indx)=>{
            if (el.id === id){
                currentElIndex = indx
            }
        })

        // Учитывать ответ в результатах
        if (rightOrWrong !== undefined && rightOrWrong === 'right'){
            setRightAnswersCount(rightAnswersCount=>rightAnswersCount+1)
        }

        if (currentElIndex === tasks.length-1){
            searchFromStartTillCurrentElem(currentElIndex,rightOrWrong)
        } else {

            searchFromCurrentElemTillEnd(currentElIndex,rightOrWrong)
        }
        
    }






    return (
        <div className={'BackgroundOne'} >
                <div className={'testTasks'}>
                    <div className={'testTasks__header'}>
                        Домашнее задание. Математика
                    </div>
                    <div className={'testTasks__circles'}>
                        {tasks.map((el,idx)=>{
                            if (el.status === "right"){
                                return <div className={'testTasks__circle testTasks__circleRight'}>{idx+1}</div>
                            }
                            if (el.status === "wrong"){
                                return <div className={'testTasks__circle testTasks__circleWrong'}>{idx+1}</div>
                            }
                            if (el.status === "inProcess"){
                                return <div className={'testTasks__circle testTasks__circleInProcess'}>{idx+1}</div>
                            }
                            if (el.status === "notAnswered"){
                                return <div className={'testTasks__circle testTasks__circlenotAnswered'}>{idx+1}</div>
                            }
                        })}
                    </div>
                    {resultIsShown ? <div className={'testTasks__result'}>
                        <strong>Вы верно ответили на {rightAnswersCount} вопросов из {tasks.length}</strong><br/><br/>
                        Нажми кнопку «Завершить» чтобы вернуться к списку домашних заданий
                        <br/><br/>
                        <div className={'taskContainer__blueSmallButton'}>
                            Завершить
                        </div>
                    </div> : <TestTask key={tasks[currentTaskIndex].id} id={tasks[currentTaskIndex].id} goToNext={goToNext}/> }

                </div>
        </div>
    )
}
export default TestTasks