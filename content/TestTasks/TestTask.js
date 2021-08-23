import React from "react";
import './TestTask.css'
import htmlParsingFunction from './content/HtmlParsingFunction'
import ComponentGenerator from "./content/ComponentGenerator";
import Checkbox from "../Checkbox/Checkbox";
import testDataTasks from "./content/testdata/testDataTasks";


function TestTask({id,goToNext}) {

    const [currentTaskData,setCurrentTaskData] = React.useState({})
    const [currentAnswers,setCurrentAnswers] = React.useState([])
    const [isError,setIsError] = React.useState(false)

    React.useEffect(()=>{

            let tempData
            // Prod
            // let temporaryUrl = "/tests/question/"+ id
            // Axios.get(temporaryUrl).then((res)=>{
            //     tempData = res
            //     ...
            // })

            // Dev test
            tempData = testDataTasks[id]
            let tempCurrentTaskData = {
                questionType: "",
                question: [],
                answers: []
            }
            if(tempData.question.includes('[')){
                tempCurrentTaskData.questionType = "downlist"
            } else {
                let numberOfRightAnswers = 0
                for (let i in tempData.answers){
                    if (tempData.answers[i].is_correct) numberOfRightAnswers++
                }
                if (numberOfRightAnswers>1){
                    tempCurrentTaskData.questionType = "multipleChoice"
                } else {
                    tempCurrentTaskData.questionType = "singleChoice"
                }
            }

            let objects = htmlParsingFunction(tempData.question)
            tempCurrentTaskData.question = objects
            let curAns = tempData.answers.map(el=>{
                return {...el,currentAnswer: false}
            })
            tempCurrentTaskData.answers = curAns
            setCurrentTaskData(tempCurrentTaskData)


    },[id])

    const processChosing = (id,isRightIfDropdown)=>{
        // Модифицирует массив ответов

        if (currentTaskData.questionType === "singleChoice"){
            let temp = currentTaskData.answers.map(el=>{
                return el.id === id ? {...el,currentAnswer: !el.currentAnswer} : el
            })
            setCurrentTaskData({...currentTaskData,answers: temp})
        }
        if (currentTaskData.questionType === "multipleChoice"){
            let temp = currentTaskData.answers.map(el=>{
                return el.id === id ? {...el,currentAnswer: !el.currentAnswer} : el
            })
            setCurrentTaskData({...currentTaskData,answers: temp})
        }
        if (currentTaskData.questionType === "downlist") {
            // Находим в этом массиве ответ с тем id, который был передан в функцию
            // и заносим его в поле currentAnswer
            let temp = currentTaskData.answers.map(el=>{
                if (el.id === id){
                    return {...el,currentAnswerIsRight: isRightIfDropdown}
                } else {
                    return el
                }
            })
            setCurrentTaskData({...currentTaskData,answers: temp})
        }


    }
    const checkAnswers = ()=>{
        // Проверяет массив ответов

        if (currentTaskData.questionType === "singleChoice"){
            let temp = false
            currentTaskData.answers.forEach(el=>{
                    if(el.is_corrent === true && el.currentAnswer === true){
                        temp = true
                    }
                })
            if (temp){
                goToNext(id,"right")
            } else {
                goToNext(id,"wrong")
            }

        }
        if (currentTaskData.questionType === "multipleChoice"){
            // Считаем количество правильных вариантов в вопросе
            let numberOfRightAnswers = 0
            let numberOfChoices = 0
            currentTaskData.answers.forEach(el=>{
                if(el.is_correct === true){
                    numberOfRightAnswers++
                }
            })

            // Считаем количество правильных ответов пользователя
            let numberOfRightUserAnswers = 0
            currentTaskData.answers.forEach(el=>{
                if(el.is_correct === true && el.currentAnswer === true){
                    numberOfRightUserAnswers++
                    numberOfChoices++
                } else if (el.currentAnswer === true){
                    numberOfChoices++
                }
            })

            // Информируем пользователя правильно он ответил или нет
            if (numberOfRightAnswers === numberOfRightUserAnswers && numberOfChoices === numberOfRightAnswers){
                goToNext(id,"right")
            } else {
                goToNext(id,"wrong")
            }

        }

        if (currentTaskData.questionType === "downlist") {
            // Проверяем поле currentAnswerIsRight у каждого currentAnswers
            // Если есть хоть один не верный или равный null
            // то информируем пользователя о том что ответ не верен
            // иначе о том что ответ верен
            let rightAnswersCount = 0
            currentTaskData.answers.forEach(el=>{
                if (el.currentAnswerIsRight){
                    rightAnswersCount++
                }
            })
            if (rightAnswersCount<currentAnswers.length){
                goToNext(id,"right")
            } else {
                goToNext(id,"wrong")
            }

        }

    }

    const checkAnswerIsGiven = ()=>{
        if (currentTaskData.questionType === "singleChoice"){
            let numberOfAnswers = 0
            currentTaskData.answers.forEach(el=>{
                if (el.currentAnswer === true){
                    numberOfAnswers++
                }
            })
            if (numberOfAnswers>0) {
                checkAnswers()

            } else {
                setIsError(true)
            }
        }
        if (currentTaskData.questionType === "multipleChoice"){
            let numberOfAnswers = 0
            currentTaskData.answers.forEach(el=>{
                if (el.currentAnswer === true){
                    numberOfAnswers++
                }
            })
            if (numberOfAnswers>0) {
                checkAnswers()
            } else {
                setIsError(true)
            }
        }

    }



    return (
        <>
            <div className={isError ? 'taskContainer taskContainer-error' : 'taskContainer'}>
                {isError ? <div className={'taskContainer__errorMessage'}>
                    Выберите хотя бы один вариант ответа
                </div> : null }
                    {currentTaskData.questionType === 'downlist' ? <div className={'taskContainer__downlist'}>
                 <span>{currentTaskData.question.map((el)=>{
                     return ComponentGenerator(el,currentTaskData.answers,processChosing)
                 })}</span>
                    </div>:null }


                {currentTaskData.questionType === 'multipleChoice' ? <>
                    <div className={'taskContainer__question'}>
                  <span>{currentTaskData.question.map((el)=>{
                      return ComponentGenerator(el,currentTaskData.answers,processChosing)
                  })}</span>
                    </div>
                    <div className={'taskContainer__answers'}>
                        {currentTaskData.answers.map(el=>{
                            return <Checkbox
                                key={el.id}
                                text={el.text}
                                id={el.id}
                                processChosing={processChosing}
                            />
                        })}
                    </div>
                </>:null }

                {currentTaskData.questionType === 'singleChoice' ? <>
                    <div className={'taskContainer__question'}>
                  <span>{currentTaskData.question.map((el)=>{
                      return ComponentGenerator(el,currentTaskData.answers,processChosing)
                  })}</span>
                    </div>
                    <div className={'taskContainer__answers'}>

                    </div>
                </>:null }

            </div>
            <div className={'taskContainer__buttons'}>
                <div onClick={()=>{goToNext(id)}} className={'taskContainer__lightSmallButton'}>
                    Пропустить
                </div>
                <div onClick={checkAnswerIsGiven} className={'taskContainer__blueSmallButton'}>
                    Ответить
                </div>
            </div>
        </>

    )
}
export default TestTask