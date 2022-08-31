var mainSzie = 9;
function plusSize(num){
  let root = document.documentElement;
  mainSzie += num;
  root.style.setProperty(`--main-size`,`${mainSzie}px`);
}
function minusSize(num){
  let root = document.documentElement;
  let data = root.style.getPropertyValue(`--main-size`);
  mainSzie -= num;
  root.style.setProperty(`--main-size`,`${mainSzie}px`);
}


function columnSetting(num) {
  let selectObj = document.querySelector('.c');
  selectObj.innerHTML = '';
  let newDiv = document.createElement('div');
  newDiv.classList.add('col');
  selectObj.append(newDiv);
  
  for(let i = 0;i <num; i++){
    document
  }
}

//canvas 
//https://goodsgoods.tistory.com/268
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
//https://stackoverflow.com/questions/18316065/set-quality-of-png-with-html2canvas