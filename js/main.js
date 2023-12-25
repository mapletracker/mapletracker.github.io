const API_KEY = "test_3f60c0d5446a4d2ed2ed00ecb9c4941f747eb18af3864fe225acc958736a41d979216f37f08306f921342269b43e2bb5";

const nexonAPIURL = "https://open.api.nexon.com/";
const mapleAPIocidURL = nexonAPIURL + "maplestory/v1/id?character_name=";
const mapleAPIunionRankURL = nexonAPIURL + "maplestory/v1/ranking/union?";

const testrequrl2 = mapleAPIunionRankURL + "date=2023-12-24&ocid=";

function findMainCharacter(){
    const character_name = document.getElementById('character_name').value;
    reqCharacterOcid(character_name);
}

function reqCharacterOcid(character_name){
    let ocid;
    const answer = fetch(mapleAPIocidURL + character_name, {
        headers:{
            "x-nxopen-api-key":API_KEY
        }})
        .then(response => {
            return response.json();
        })
        .then(data => {
            ocid = data["ocid"];
            reqUnionRanking(getBaseDate(), ocid);
            })
        .catch(error => { errorResponse(error); });
}

function getBaseDate(){
    let today = new Date();
    let baseDate = new Date();
    baseDate.setDate(today.getDate() - 1);
    if(today.getHours == 0){
        baseDate.setDate(baseDate.getDate() - 1);
    }
    let year = baseDate.getFullYear();
    let month = baseDate.getMonth() + 1;
    let date = baseDate.getDate();
    
    baseDateStr = year + "-" + month + "-" + date;
    return baseDateStr;
}

function reqUnionRanking(baseDate, ocid){
    let requestURL = mapleAPIunionRankURL + "date=" + baseDate + "&ocid=" + ocid;
    answer = fetch(
        requestURL, {
        headers:{
            "x-nxopen-api-key":API_KEY
        }})
        .then(response => response.json())
        .then(data => { printUnionData(data); })
        .catch(error => { errorResponse(error); });
}

function printUnionData(json){
    document.getElementById("result").innerText = "";
    for(let i = 0; i < json["ranking"].length; i++){
        document.getElementById("result").innerText += ("\n-----------");
        document.getElementById("result").innerText += ("\n월드 : " + json["ranking"][i]["world_name"]);
        document.getElementById("result").innerText += ("\n캐릭터명 : " + json["ranking"][i]["character_name"]);
        let classname = json["ranking"][i]["sub_class_name"];
        if(classname == ""){
            classname = json["ranking"][i]["class_name"];
        }
        document.getElementById("result").innerText += ("\n직업 : " + classname);
    }
}

function errorResponse(err){
    alert(err);
}

