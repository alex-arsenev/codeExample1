function htmlParsingFunction (incomingStr) {

    let allSegments = []

    function segmentConstructor (id,type,content) {
        return {
            id: id,
            type: type,
            content: content
        }
    }

    function handleStringStep1 (str,prevId){

        let startOfFirstTag, endOfFirstTag, startOfSecondTag,
            endOfSecondTag, contentBetween, typeOfTag, id

        id = prevId+1
        startOfFirstTag = str.indexOf('<')

        if (startOfFirstTag > -1) {

            if (startOfFirstTag !== 0) {
                let modifiedString = "<p>"+str+"</p>"
                handleStringStep1(modifiedString,0)


            } else {
                endOfFirstTag = str.indexOf('>',startOfFirstTag)
                typeOfTag = str.substring(startOfFirstTag+1,endOfFirstTag)
                startOfSecondTag = str.indexOf("</"+typeOfTag, endOfFirstTag)
                contentBetween = str.substring(endOfFirstTag+1,startOfSecondTag)
                endOfSecondTag = startOfSecondTag + typeOfTag.length + 1

                let segmentInstance = segmentConstructor(id,typeOfTag,contentBetween)

                let squareChar = contentBetween.indexOf('[')
                if (contentBetween.indexOf("<")>-1){
                    splitOnThree(contentBetween,typeOfTag,id)
                    if (endOfSecondTag < str.length ){
                        let allToTheRight = str.substring(endOfSecondTag+2,str.length)
                        handleStringStep1(allToTheRight,id)
                    } else {
                        return
                    }

                } else if (squareChar>-1){
                    SplitOnThreeSquareBrackets(contentBetween,typeOfTag,id)
                    return
                } else {
                    allSegments.push(segmentInstance)
                    if (endOfSecondTag < str.length ){
                        let allToTheRight = str.substring(endOfSecondTag+2,str.length)
                        handleStringStep1(allToTheRight,id)
                    } else {
                        return
                    }
                }
                return
            }



        } else {
            allSegments.push(segmentConstructor(id,'span',str))
            return
        }


    }

    function splitOnThree (str, parentType, parentId) {

        let firstpart,secondpart,thirdpart
        let firstSegment,secondSegment,thirdSegment

        let startOfFirstTag, endOfFirstTag, startOfSecondTag,
            endOfSecondTag, contentBetween, typeOfTag, id

        startOfFirstTag = str.indexOf('<')
        endOfFirstTag = str.indexOf('>',startOfFirstTag)
        typeOfTag = str.substring(startOfFirstTag+1,endOfFirstTag)

        if (typeOfTag.substring(0,5) == "media"){
            let imgNumber,idStart,idEnd
            idStart = typeOfTag.indexOf('id=')
            idEnd = typeOfTag.indexOf('"',idStart+5)
            imgNumber = typeOfTag.substring(idStart+4,idEnd)
            firstpart = str.substring(0,startOfFirstTag)
            secondpart = imgNumber
            thirdpart = str.substring(idEnd+2,str.length)
            typeOfTag = 'img'
        } else {
            startOfSecondTag = str.indexOf("</"+typeOfTag, endOfFirstTag)
            contentBetween = str.substring(endOfFirstTag+1,startOfSecondTag)
            endOfSecondTag = startOfSecondTag + typeOfTag.length + 1
            if(contentBetween.indexOf('[')===0){
                let a = contentBetween.indexOf(']')
                firstpart = str.substring(0,startOfFirstTag)
                secondpart = contentBetween.substring(1,a)
                thirdpart = str.substring(endOfSecondTag+2,str.length)
                typeOfTag = "dropdownOrInput"
            } else {
                firstpart = str.substring(0,startOfFirstTag)
                secondpart = contentBetween
                thirdpart = str.substring(endOfSecondTag+2,str.length)
            }

        }
        let firstId = parentId.toString()+1
        let secondId = parentId.toString()+2
        let thirdId = parentId.toString()+3

        firstSegment = segmentConstructor(firstId,parentType,firstpart)
        secondSegment = segmentConstructor(secondId,typeOfTag,secondpart)
        thirdSegment = segmentConstructor(parentId.toString()+3,parentType,thirdpart)


        let isThereTagInFirstPart = firstpart.indexOf('<')
        let isThereTagInSecondPart = secondpart.indexOf('<')
        let isThereTagInThirdPart = thirdpart.indexOf('<')

        if(isThereTagInFirstPart > -1){
            splitOnThree(firstpart,parentType,firstId)
        } else {
            allSegments.push(firstSegment)
        }

        if(isThereTagInSecondPart > -1){
            splitOnThree(secondpart,typeOfTag,secondId)
        } else {
            allSegments.push(secondSegment)
        }

        if(isThereTagInThirdPart > -1){
            splitOnThree(thirdpart,parentType,thirdId)
        } else {
            allSegments.push(thirdSegment)
        }


    }



    function SplitOnThreeSquareBrackets (str, parentType, parentId){

        let firstpart,secondpart,thirdpart
        let firstSegment,secondSegment,thirdSegment
        let startOfFirstTag, endOfFirstTag, startOfSecondTag,
            endOfSecondTag, contentBetween, typeOfTag, id

        startOfFirstTag = str.indexOf('[')

        startOfSecondTag = str.indexOf("]", endOfFirstTag)
        contentBetween = str.substring(startOfFirstTag+1,startOfSecondTag)
        typeOfTag = "dropdownOrInput"
        firstpart = str.substring(0,startOfFirstTag)
        secondpart = contentBetween
        thirdpart = str.substring(startOfSecondTag+2,str.length)


        let firstId = parentId.toString()+1
        let secondId = parentId.toString()+2
        let thirdId = parentId.toString()+3

        firstSegment = segmentConstructor(firstId,parentType,firstpart)
        secondSegment = segmentConstructor(secondId,typeOfTag,secondpart)
        thirdSegment = segmentConstructor(parentId.toString()+3,parentType,thirdpart)


        let isThereTagInFirstPart = firstpart.indexOf('<')
        let isThereTagInSecondPart = secondpart.indexOf('<')
        let isThereTagInThirdPart = thirdpart.indexOf('<')

        if(isThereTagInFirstPart > -1){
            SplitOnThreeSquareBrackets(firstpart,parentType,firstId)
        } else {
            allSegments.push(firstSegment)
        }

        if(isThereTagInSecondPart > -1){
            SplitOnThreeSquareBrackets(secondpart,typeOfTag,secondId)
        } else {
            allSegments.push(secondSegment)
        }

        if(isThereTagInThirdPart > -1){
            SplitOnThreeSquareBrackets(thirdpart,parentType,thirdId)
        } else {
            allSegments.push(thirdSegment)
        }


    }






    function compare( a, b ) {
        if ( a.id < b.id ){
            return -1;
        }
        if ( a.id > b.id ){
            return 1;
        }
        return 0;
    }

    allSegments.sort(compare)


    handleStringStep1(incomingStr,0)

    return allSegments



}

export default htmlParsingFunction