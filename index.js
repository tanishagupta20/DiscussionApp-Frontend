let quesArr = [];
let added_ques = document.getElementById("addedQues");
let add_ques = document.getElementById("addQ");

if(localStorage.getItem("question")){
  quesArr = JSON.parse(localStorage.getItem("question"));
  renderQues();
}

function submit(){
  let subject = document.getElementsByClassName("sub")[0].value;
  let question = document.getElementsByClassName("ques")[0].value;

  if(subject != "" || question != ""){
    let obj = {};
    obj.subject = subject;
    obj.question = question;
    obj.id = Date.now();
    obj.resolve = false;
    obj.response = [];
    quesArr.push(obj);
    localStorage.setItem("question", JSON.stringify(quesArr));
    renderQues();
  }

  document.getElementsByClassName("sub")[0].value = "";
  document.getElementsByClassName("ques")[0].value = "";

}

function renderDefault(){
  add_ques.innerHTML = `
  <div id = "addQuesForm">
    <h1 id = "welcome">Welcome to Discussion Portal!</h1><br>
    <p id = "desc">Enter a subject and question to get started</p><br>
    <input type = "text" class = "sub search" placeholder = "Subject" /><br><br>
    <textarea rows = "10" cols = "55" class = "ques" placeholder="Question"></textarea><br><br>
    <button id = "submit" onclick="submit()">Submit</button>
  </div>
  `
}

function renderQues(){
  added_ques.innerHTML = "";
  quesArr.forEach(function(ques, index){
    added_ques.innerHTML += `
    <div id = "${ques.id}" onclick = "renderResponse(${ques.id})">
      <h3 id = "subTitle">${ques.subject}<br><br></h3>
      <p id = "quesDet">${ques.question}<br></p>
      <hr>
    </div>
    `
  })
}

function renderResponse(id){
  let qArr = quesArr.filter(function(ques){
    if(id == ques.id){
      return true;
    }
  })
  
  add_ques.innerHTML = `
  <div id = "responsePage">
    <h3 class = "question">Question</h3><br>
    <div id = "resQ" style = "height : 60px;">
      <h3>${qArr[0].subject}</h3><br>
      <p>${qArr[0].question}</p><br><br>
    </div>
    <br>
    <input type = "button" id = "response"  value = "Resolve" onclick = "resolve_ques(${qArr[0].id})"/>
    <h3 id = "resp">Response</h3><br>
    <div id = "responses_to_ques"></div><br>
    <h3 id = "addResp">Add Response</h3>
    <input type = "text" id = "name" placeholder = "Enter Name" required/><br><br>
    <textarea rows = "10" cols = "55" placeholder = "Enter Comment" id = "comment" required></textarea><br><br>
    <input type = "button" value = "Submit" id = "res-btn" class = "subm" onclick = "addResp(${qArr[0].id})"/>
  </div>
  `
}

function addResp(id){
  let name = document.getElementById("name").value;
  let com = document.getElementById("comment").value;
  let respArr = quesArr.filter(function(resp){
    if(id == resp.id){
      return true;
    }
  })
  
  if(name != "" || com != ""){
    let respObj = {};
    respObj.name = name;
    respObj.comment = com;

    respArr[0].response.push(respObj);

    localStorage.setItem("question", JSON.stringify(quesArr));

    let respToQ = document.getElementById("responses_to_ques");
    respToQ.innerHTML += `
    <div id = "name-com">
      <h4>${name}</h4><br><br>
      ${com}<br><br>
      <hr>
    </div>
    `
  }
}

function resolve_ques(id){
  let status = quesArr.filter(function(ques){
    if(id == ques.id){
      return true;
    }
  })

  status[0].resolve = true;
  localStorage.setItem("question", JSON.stringify(quesArr));
}

renderDefault();