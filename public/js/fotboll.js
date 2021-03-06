function age(){
    var xhr =new XMLHttpRequest()
    //xhr.open("GET", "/js/data.json")
    xhr.open("GET", "http://localhost:3001/fotboll")
    //xhr.open("GET", "https://helena-backend.herokuapp.com/fotboll")
    xhr.onload = function(){
        var data = JSON.parse(this.response)
        createTable(data)
    }
    xhr.send()
}

function createTable(data){
    var appElement = document.getElementById("app")
    var aTable = document.createElement("table")
    appElement.appendChild(aTable)
    aTable.appendChild(createRow(data[0].name, data[0].points, data[0].logo))
    aTable.appendChild(createRow(data[1].name, data[1].points, data[1].logo))
    aTable.appendChild(createRow(data[2].name, data[2].points, data[2].logo))
    aTable.appendChild(createRow(data[3].name, data[3].points, data[3].logo))
}

function createRow(name, points, logo){
    var aRow = document.createElement("tr")
    aRow.appendChild(createLogoCell(logo))
    aRow.appendChild(createCell(name))
    aRow.appendChild(createCell(points))
    
    return aRow
}

function createCell(content){
    var aCell = document.createElement("td")
    aCell.innerHTML = content
    return aCell
}

function createLogoCell(logo){
    let aLogo = document.createElement("td")
    let anImg = document.createElement('img')
    anImg.src = logo
    anImg.classList.add("logo")
    aLogo.appendChild(anImg)
    return aLogo
   }

age()