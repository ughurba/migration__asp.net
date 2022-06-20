const selectLocation = document.querySelector(".select-location-text");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal-window");
const btnCategories = document.querySelector(".all-categories");
const subCategories = document.querySelector(".dropdown-categories");



function modalWindowClassAddHandler() {
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
  
  function modalWindowClassRemoveHandler() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  
  function categoriesWindowRemoveHandler() {
    if (subCategories.classList.contains("categories-hidden")) {
      subCategories.classList.remove("categories-hidden");
    } else {
      subCategories.classList.add("categories-hidden");
    }
  }
  
  closeBtn.addEventListener("click", modalWindowClassRemoveHandler);
  selectLocation.addEventListener("click", modalWindowClassAddHandler);
  btnCategories.addEventListener("click", categoriesWindowRemoveHandler);




 
  //----------------------------- main-slide-img-------------------------//


  const mainImgs = document.querySelectorAll('.main-img')
  const slideImgs = document.querySelectorAll('.child-img')

  slideImgs.forEach(imgChild =>{

      imgChild.addEventListener('click', showsHandler);
  
        function showsHandler(){


          const dataIdImg =  imgChild.getAttribute('data-id');

          slideImgs.forEach((item=>{
            item.parentElement.classList.remove('slide-img-border')
          }))
         

          imgChild.parentElement.classList.add('slide-img-border')
      
          mainImgs.forEach(mainImg =>{
      
            const dataIdMainImg =  mainImg.getAttribute('data-id')
                      if (dataIdImg === dataIdMainImg){                    
                        mainImg.classList.remove('hidden')
                        imgChild.parentElement.classList.add('slide-img-border')
                       
                          
                      }else if(dataIdImg !== dataIdMainImg){
                        mainImg.classList.add('hidden')
                                      
                      } 
                      
          })
        }
      
    
    
  })


  //-------------------------------------- count-product -----------------------------//

const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const count = document.querySelector('.count');



let num =1;
function minusHandler(){
 

  if(num >= 2){
    num--;
    count.textContent = num
  }
  

}

function plusHandler(){
  num++ 
  count.textContent = num
}


minus.addEventListener('click',minusHandler)
plus.addEventListener('click',plusHandler)





//-------------------------------description----------------------------------//

const descriptionBtns = document.querySelectorAll('.title-description')

const descriptionsInfo = document.querySelectorAll('.descriptions')


descriptionBtns.forEach(btn =>{


function showInfo(){
  const dataIdDescription = btn.getAttribute('data-id')


  descriptionBtns.forEach(item=>{
    item.style.color = '#c2c2d3'
  })
  btn.style.color='black'




  descriptionsInfo.forEach(info=>{

    const infoId = info.getAttribute('data-id')
    if(infoId === dataIdDescription){

      info.classList.remove('hidden')

    }else if (infoId !== dataIdDescription){
      info.classList.add('hidden')
    }

  })

}



  btn.addEventListener('click',showInfo);


})