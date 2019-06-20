window.addEventListener("load",function begin(event){
  window.removeEventListener("load", begin, false);
  tab_handler();
  // alert(window.innerWidth)
  window.currElt = $('#home_tab');
  scroll_spy_init();
  if(window.innerWidth<700)
    sponsors_slidehow();
},false);

function tab_handler(){
  $('#home_tab').click(function() {
    // currElt = activate_tab($(this),currElt);
    $('html,body').animate({scrollTop :$('#home').offset().top-$('.navbar').outerHeight(true)},500);
  });
  $('#reach_tab').click(function() {
    // currElt = activate_tab($(this),currElt);
    $('html,body').animate({scrollTop :$('#reach').offset().top},500);
  });
  $('#exp_tab').click(function() {
    // currElt = activate_tab($(this),currElt);
    if(window.innerWidth<700)
      $('html,body').animate({scrollTop :$('#experience').offset().top},500);
    else
      $('html,body').animate({scrollTop :$('#experience').offset().top - $('.tab-view').outerHeight(true)},500);
  });
  $('#spon_tab').click(function() {
    // currElt = activate_tab($(this),currElt);
    $('html,body').animate({scrollTop :$('#sponsors').offset().top},500);
  });
  $('#cont_tab').click(function(){
    // currElt = activate_tab($(this),currElt);
    $('html,body').animate({scrollTop :$('#contact').offset().top},500);
  });
}

function activate_tab(activ, current){
  // console.log(current);
  if(activ!=current){
    var currStr = current.find('img').attr('src');
    if(!currStr.includes('(1).png')){
      currStr = currStr.replace('.png','(1).png');
      current.find('img').attr('src',currStr);
      current.removeClass('active-tab');
      var actStr = activ.find('img').attr('src');
      actStr = actStr.replace('(1).png','.png');
      activ.find('img').attr('src',actStr);
      activ.addClass('active-tab');
      return activ;
    }
    return current;
  }
}

function sponsors_slidehow(){
  var slides = document.querySelector('.sponsors-content').children;
  var iter = 0,iter_max = slides.length-1;
  var show = setInterval(function(){
      slides[iter].classList.remove('active-slide');
      if(iter == iter_max)
        iter = -1;
      slides[++iter].classList.add('active-slide');
  },1000);
}

function scroll_spy_init(){
  var scrollPos = $('body').scrollTop(),i=0;
  var devHeight = window.innerHeight;
  var revheight = 3*Math.ceil((devHeight - $('.tabview-container').height())/4);
  // alert(revheight);
  var scrolls = [
    $('#home').offset().top + $('#home').outerHeight(true),
    $('#reach').offset().top + $('#reach').outerHeight(true),
    $('#experience').offset().top + $('#experience').outerHeight(true),
    $('#sponsors').offset().top + $('#sponsors').outerHeight(true)
  ];
  var spyScroll = setInterval(function(){
    scrollPos = $('body').scrollTop();
    // console.log(scrolls[2]-scrollPos);
    if(scrollPos<=$('.navbar').outerHeight(true)){
      currElt = activate_tab($('#home_tab'),currElt);
    }
    else if(scrolls[3]-scrollPos<=revheight||scrollPos==devHeight){
      // handle_reach();
      currElt = activate_tab($('#cont_tab'),currElt);
      console.log('cont');
    }
    else if(scrolls[2]-scrollPos<=revheight){
      // handle_experience();
      currElt = activate_tab($('#spon_tab'),currElt);
      console.log('spon');
    }
    else if(scrolls[1]-scrollPos<=revheight){
      // handle_contact();
      currElt = activate_tab($('#exp_tab'),currElt);
      console.log('exp');
    }
    else if(scrolls[0]-scrollPos<=revheight){
      currElt = activate_tab($('#reach_tab'),currElt);
      console.log('reach');
    }
    // console.log('something');
  },500);
  console.log(scrolls);
}

// function smoothScroll(to){
//   var currScrollPos = doc
//   var scrollToElement = document.querySelector('#')
//   alert(scrollToPos)
// }
