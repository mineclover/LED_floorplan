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
