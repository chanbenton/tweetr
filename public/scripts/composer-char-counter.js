function charCount(){
  let chars = 140 - this.value.length;
  if (chars < 0){
    $(this).parent().find('.counter').addClass('invalid').text(chars);
  } else {
    $(this).parent().find('.counter').removeClass('invalid').text(chars);
  }
}

$(() => {
  $("section.new-tweet textarea").keyup(charCount).change(charCount);  
});