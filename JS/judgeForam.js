/*
 * Created by xiongshasha on 17-7-25.
 */
"use strict";
function InputStuInfo(inputStuInfo1,inputStuInfo2){
            let inputsStuInfo =inputStuInfo1;
            let reg1 = /^[\u4e00-\u9fa5]{2,}\s\d{10}\s[\u4e00-\u9fa5]{2,}\s\d*$/;
            let inputsStuGrade = inputStuInfo2;
            let reg2 = /^\d+(\.\d+)?\s\d+(\.\d+)?\s\d+(\.\d+)?\s\d+(\.\d+)?$/;
            if ((reg1.test(inputsStuInfo))&&(reg2.test(inputsStuGrade))) {
                alert("添加成功！");
            }
            else {
                alert(`-----------------------------
|格式输入不正确，请按照格式输入|
-----------------------------`);
            }
            let str=inputsStuInfo+" "+inputsStuGrade;
            inputsStuInfo=inputsStuInfo.split(' ');
            localStorage.setItem(inputsStuInfo[1],str);
        }
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("chengji-form").addEventListener("submit",function(event){
        event.preventDefault();
        InputStuInfo(testform.inputfield1.value,testform.inputfield2.value);
    });
});

function SearchGrade(StudentId){
    StudentId = StudentId.split(" ");
    let flag = 1;
    let reg = /^(\d{10}\s)*\d{10}$/;
    for(let per of StudentId){
        if(reg.test(per))
        {
            if(localStorage.getItem(per)==null){
                alert("学号为空！");
            }
            else{
                alert(localStorage.getItem(per));
            }
        }
        else
        {
            alert(`请按照格式输入：`);
            flag = 0;
            break;
        }
    }
}

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("search-form").addEventListener("submit",function(event){
        event.preventDefault();
        SearchGrade(Search.inputfield3.value);
        Search.inputfield3.value='';
    });
});
