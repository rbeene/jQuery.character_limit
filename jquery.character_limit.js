function limit_words(){
  jQuery(".word_limit").each(function(){
    var input = jQuery(this);
    var allowed = input.attr("maxwords");
    if(!allowed || allowed > 10000) {alert("you have to add a reasonable maxwords attribute");}
    var div_name = input.attr('id');
    var current  = word_count(input);
    input.parent().before("<div id='" + div_name + "_limit' class='words_remaining'>" + current + " of " + allowed + " words used</div>");
    input.parent().before("<div id='" + div_name + "_limit' class='characters_remaining' style='opacity:" + opacity + ";'>" + (allowed - current) + " characters left</div>");
  });

  jQuery(".word_limit").keyup(function(event){
    var input = jQuery(this);
    var message_container = jQuery(this).parent().prev();
    var allowed = input.attr("maxwords");
    var current_value = word_count(input);
    var remaining = allowed - current_value;
    if(remaining <= -1){
      message_container.addClass('red');
    } else {
      message_container.removeClass('red');
    }
    message_container.html(current_value + " of " + allowed + " words used");
  });
}

function word_count(obj){
  if(obj.val() == ""){
    var count =  0
  } else {
    var text  = jQuery.trim(obj.val()).replace(/\s+/g," ");
    var count = text.split(' ').length;
  }
  return count;
}


function limit_characters(){
  jQuery(".character_limit").each(function(){
    var input = jQuery(this);
    var allowed = input.attr("maxlength");
    if(!allowed || allowed > 10000) {alert("you have to add a reasonable maxlength attribute");}
    var div_name = input.attr('id');
    var current  = input.val().length;
    if(input.is('textarea')) { opacity = 1.00} else { opacity = 0.00 }
    input.parent().before("<div id='" + div_name + "_limit' class='characters_remaining' style='opacity:" + opacity + ";'>" + (allowed - current) + " characters left</div>");
  });

  jQuery(".character_limit").keyup(function(event){
    update_character_count(jQuery(this));
  });
}

function update_character_count(input){
  var message_container = input.parent().prev();
  var allowed = input.attr("maxlength");
  var current_value = input.val().length;
  var remaining = allowed - current_value;
  if(remaining < 0) { remaining = 0 }
  if(remaining <= 10) {
    message_container.addClass('red');
    if(!message_container.data("animated") && !input.is('textarea')){
      message_container.data("animated", true)        
      message_container.animate({ opacity: 1.00 }, 50);
    }  
  } else {
    message_container.removeClass('red'); 
    if(message_container.data("animated") && !input.is('textarea')){
      message_container.data("animated", false);
      message_container.animate({ opacity: 0.00}, 200);
    }
  }
  message_container.html(remaining  + " characters remaining");
  if(input.attr("tagName") == "TEXTAREA" && input.val().length > allowed){
    event.preventDefault();
    input.val(input.val().substr(0, allowed));
  }
}

jQuery(document).ready(function(){
  limit_characters();
  limit_words();
});
