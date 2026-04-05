let mockData = [
    {id:0, isDone:false, content:"React study", date: new Date().getTime()},
    {id:1, isDone:true, content:"친구만나기", date: new Date().getTime()},
    {id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()},
];

// 요일 출력을 위한 배열
let day =["일","월","화","수","목","금","토"];
const wrapper = document.querySelector(".todos_wrapper");

const initData = (printData)=>{
    wrapper.innerHTML="";
      printData.forEach((item)=> {
      const todoHTML = `
      <div class="TodoItem">
        <input type="radio" onchange="onUpdate(${item.id})" ${item.isDone ? "checked" : ""} />
        <div class="content">${item.content}</div>
        <div class="date">${new Date(item.date).toLocaleDateString()}</div>
        <button name="btnDelete" value="${item.id}"onclick=todoDel(this)>삭제</button>
      </div>
    `;
      //
      wrapper.innerHTML += todoHTML;
});
}
let idIndex= 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector(".Editor > button").onclick =() =>{
    event.preventDefault(); //전송기능 막음
    let newContent = document.querySelector("#newTodo").value;
    let arr = {id:idIndex++, isDone:false,content:newContent, date:new Date().getTime()};
    mockData.push(arr);
    initData(mockData); //호출한다.(다시 화면 랜더링)
}
const todoDel = (th) => {
    const id = parseInt(th.value); // value는 문자열이므로 숫자로 변환
    mockData = mockData.filter(item => item.id !== id);
    initData(mockData);
}
const onUpdate = (targetId)=>{ //TodoItem에서 호출할 때 전달한 id
    /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
       map함수를 이용한다. map함수의 결과를 mockData에 저장한다.
    */
    mockData = mockData.map(obj =>
        obj.id === targetId ? {...obj, isDone: !obj.isDone} : obj
    );

    //console.log(mockData);
     initData(mockData); //호출한다.(다시 화면 랜더링)
}

    document.querySelector("#keyword").onkeyup = (e) => {

        let searchedTodos = getFilterData(e.target.value);

        initData(searchedTodos);

    }
    const getFilterData = (search) => {
        //검색어가 없으면 mockData를 리턴한다.
        if (search === "") {
            return mockData;
        }

        //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다


//filter의 결과를 리턴 한다.
        return mockData.filter((e) => e.content.toUpperCase().includes(search.toUpperCase()));
    };

onload = function (){
    initData(mockData);
    let today = new Date();
    let yo = today.getDay();
    document.querySelector("#date").innerText =`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${day[yo]}요일`




}

