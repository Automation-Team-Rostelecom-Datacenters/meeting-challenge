const userA = [
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
  ]
  const userB = [{
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
]
const start  =  new Date('2019-12-20T08:00:00+03:00');
const end  =  new Date('2019-12-20T18:00:00+03:00');

function getTime(){
    let inputTime = document.getElementById('time').value
    let rangeStart = start
    let rangeStop = new Date('2019-12-20T08:00:00+03:00')
    let i = 1
    let units = 0
      do{
        start.setHours(8)
        start.setMinutes(0)
        rangeStop.setHours(8)
        rangeStop.setMinutes(0)
        rangeStart.setMinutes(start.getMinutes() + inputTime*(i-1))
        rangeStop.setMinutes(rangeStop.getMinutes() + inputTime*i)
        let A = userA.filter(e => ((rangeStart <= new Date(e.start)) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end))) ||
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end))) ||
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && rangeStop > new Date(e.end) || 
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end)))))
        let B = userB.filter(e => ((rangeStart <= new Date(e.start)) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end))) ||
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end))) ||
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && rangeStop > new Date(e.end) || 
                                  ((rangeStart >= new Date(e.start)) && (rangeStart < new Date(e.end))) && ((rangeStop > new Date(e.start)) && (rangeStop <= new Date(e.end)))))
        
        if (A.length == 0 && B.length == 0){
          let startHour = rangeStart.getHours()
          if (startHour < 10){
            startHour = `0${startHour}`
          }
          let startMin = rangeStart.getMinutes()
          if (startMin < 10 ){
            startMin = `0${startMin}`
          }
          let endHour = rangeStop.getHours()
          if (endHour < 10){
            endHour = `0${endHour}`
          }
          let endMin = rangeStop.getMinutes()
          if (endMin < 10 ){
            endMin = `0${endMin}`
          }
          let div = document.createElement('div')
          div.className = `col-3 `
          div.innerHTML = `<button type="button" class="btn btn-success" style="margin-bottom: 20px;">${startHour}:${startMin}-${endHour}:${endMin}</button>`
          let unitRow = document.getElementById('freetime')
          unitRow.append(div)
          units++
        }        
        console.log(rangeStart, rangeStop)
        console.log(A, B)
        i++
        rangeStop.setHours(8)
        rangeStop.setMinutes(0)
        rangeStop.setMinutes(rangeStop.getMinutes() + inputTime*i)
    }while((rangeStop <= end) == true)
    if (units == 0){
      let div = document.createElement('div')
      div.className = `col-10 `
      div.innerHTML = `<div class="alert alert-danger text-center" role="alert">Превышает заданный диапазон</div>`
      let unitRow = document.getElementById('freetime')
      unitRow.append(div)
    }
}