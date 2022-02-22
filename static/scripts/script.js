const startLimit =  new Date('2019-12-20T08:00:00+03:00');
const endLimit  =  new Date('2019-12-20T18:00:00+03:00');
const limitDelta = findLimitDelta(startLimit, endLimit);

const scheduleUserA=[
    {
      "title": "Встреча А",
      "start": "2019-12-20T13:00:00+03:00",
      "end": "2019-12-20T14:00:00+03:00"
    },
    {
      "title": "Встреча Б",
      "start": "2019-12-20T14:00:00+03:00",
      "end": "2019-12-20T14:45:00+03:00"
    },
    {
      "title": "Встреча В",
      "start": "2019-12-20T17:00:00+03:00",
      "end": "2019-12-20T18:00:00+03:00"
    }
  ];

const scheduleUserB=[{
    "title": "Встреча А",
    "start": "2019-12-20T08:00:00+03:00",
    "end": "2019-12-20T08:30:00+03:00"
},
{
    "title": "Встреча Б",
    "start": "2019-12-20T10:00:00+03:00",
    "end": "2019-12-20T11:00:00+03:00"
},
{
    "title": "Встреча В",
    "start": "2019-12-20T16:00:00+03:00",
    "end": "2019-12-20T16:30:00+03:00"
},
{
    "title": "Встреча Г",
    "start": "2019-12-20T16:30:00+03:00",
    "end": "2019-12-20T17:00:00+03:00"
}
];

const borderedUserASchedule=addDayBorders(scheduleUserA);
const borderedUserBSchedule=addDayBorders(scheduleUserB);
const splitedUserASchedule=splitMeetupList(borderedUserASchedule);
const splitedUserBSchedule=splitMeetupList(borderedUserBSchedule);
const userAfreeTime=splitedUserASchedule.map(findFreeTime);
const userBfreeTime=splitedUserBSchedule.map(findFreeTime);
const crossedFreeTime = crossIntervals(userAfreeTime,userBfreeTime);


function parseJson(path){
    /*Локальные файлы не парсятся в современных браузерах*/ 
    fetch(path)
        .then(response => {
        return response.json();
        })
    .then(data => console.log(data));
}
function showValidateBoard(){
    const validateBoard=document.getElementById("error-board")
    if (validateBoard.classList.contains("hidden")){
        validateBoard.classList.toggle('hidden')
    }
}
function hideValidateBoard(){
    const validateBoard=document.getElementById("error-board")
    if (!validateBoard.classList.contains("hidden")){
        validateBoard.classList.toggle('hidden')
    }
}
function inputIsValid(value){

    let parsed =parseInt(value)
    if (isNaN(parsed)) { 
        return  false
    }
    else if (parsed>limitDelta){
        
        return false
        }
    return true    
}    

function findLimitDelta(start, end, minutes=true){
    /*Возвращает дельту между датами(по умолчанию в минутах)*/ 
    if (minutes){
        return parseInt(end-start)/1000/60
    }
    return parseInt(end-start)
}
function findFreeTime(pairList){
    /*Находит свободный промежуток времени между двумя встречами и возвращает его в виде словаря */
    return {'start': pairList[0].end, 'end': pairList[1].start}
}
function listCopy(list){
    let copy=[]
    copy.push(...list )
    return copy  
}


function addDayBorders(meetupList){

    /*Добавляет границы рабочего дня */

    let meetupListCopy=listCopy(meetupList)
    const start = new Date(meetupListCopy[0].start)
    const end = new Date(meetupListCopy[meetupListCopy.length-1].end)
    if (start>startLimit){
        meetupListCopy.unshift({"title" : "dayStart", "end" : '2019-12-20T08:00:00+03:00'})
    }
    if (end<endLimit){
        meetupListCopy.push({"title" : "dayEnd", "start" : '2019-12-20T18:00:00+03:00'})
    }
    return meetupListCopy
}
function splitMeetupList(meetupList){

    /* Пилим лист встреч на пары*/

    let meetupPairs = []
    
    for (let i=0; i<meetupList.length;i++){
        item1=meetupList[i]
        item2=meetupList[i+1]
        if (item2){
            meetupPairs.push([item1,item2])
        }
     
    }
    return meetupPairs
}
function findOldestInterval(freetime1, freetime2){
   /*Находит более ранний промежуток времени*/

    if (freetime1.start <= freetime2.start){
        return [freetime1,freetime2]
    }
    else{
        return [freetime2,freetime1]
    }
}


function crossMeetups(freetime1, freetime2){
    /*Находит пересечение  свободного времени*/ 
    const result=findOldestInterval(freetime1,freetime2)
    const oldest=result[0]
    const newest=result[1]
    if (oldest.end<=newest.start){
        return null
    }
    else if (oldest.end<=newest.end){
        return {"start":newest.start, "end":oldest.end}
    }
    else if (oldest.end>newest.end){
        return {"start":newest.start, "end":newest.end}
    }
}
function crossIntervals(freeTimeList1, freeTimeList2){
   /*Скрещивает свободные интервалы двух пользователей */ 
    let output=[]
    for (let i= 0; i<freeTimeList1.length; i++){
        for (let j=0; j<freeTimeList2.length;j++){
            const crossed = crossMeetups(freeTimeList1[i],freeTimeList2[j])
            if (crossed){
                output.push(crossed)
            }
        }
    }
    return output
} 
function tryInputInterval(freetime, inputStr){ 
    /*Примеряет ввденное  значение к свободному интервалу*/

    const start = new Date(freetime.start)
    const end = new Date(freetime.end)
    const delta = findLimitDelta(start,end)
    const inputMinutes = parseInt(inputStr)
    if (delta>=inputMinutes){
        return freetime
    }
    return false
}

function addIntervalBlock(freetime) {

    const div = document.createElement('div')
    const p = document.createElement('p')
    const board = document.getElementById('results-board')
    const startDate = formatTime(freetime.start)
    const endDate = formatTime(freetime.end)
    p.innerText=startDate + " - " + endDate
    div.classList.toggle('result-block')
    div.appendChild(p)
    board.appendChild(div)
}
function formatTime(date) {
    /*Форматирует время в формат hh:mm */
    const dateObj = new Date(date)
    let hours = dateObj.getHours().toString()
    let minutes = dateObj.getMinutes().toString()
    let timeArray=[]
    timeArray.push(hours,minutes)
    timeArray.forEach(function(element, index) {
        if (element.length<2) {
            timeArray[index]="0"+element
        }
    })
    return timeArray[0] + ":" + timeArray[1]

}

function showResults(inputStr, freetimeList){
    for (let i=0;i<freetimeList.length; i++){
        const result=tryInputInterval(freetimeList[i],inputStr)
        if (result) {
            addIntervalBlock(result)
        }
    }
}
function clearResults(){
    const resultBlocks = document.querySelectorAll('.result-block')
    const board = document.getElementById('results-board');
    [].forEach.call(resultBlocks, function (el) {
       board.removeChild(el) 
    })   
}

function findButtonClick(){
    hideValidateBoard()
    clearResults()
    const inputField = document.getElementById('input-field')
    const inputStr = inputField.value
   if (inputIsValid(inputStr)){
        showResults(inputStr,crossedFreeTime)
   }
   else {
       showValidateBoard()
       inputField.value=''
   }

}

document.addEventListener('DOMContentLoaded', () => {
    const findButton= document.getElementById('submit')
    findButton.addEventListener('click',findButtonClick)
   
    
    
});