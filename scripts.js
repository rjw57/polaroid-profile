function trim (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function gravatar_url(email, size) {
  var size_query = '?';
  if(size) {
    size_query += 's=' + parseInt(size)+'&';
  }
  
  var d = new Date();
  var cacheBuster = 'date='+d.getTime().toString()

  email = hex_md5(trim(email).toLowerCase());
  
  return '<img src="https://www.gravatar.com/avatar/' + email + size_query + cacheBuster + '">';
}

$(document).ready(function() {
  $('.avatar .caption').editable(
    function(value, settings) { return value; },
    {
      onblur: 'submit',
      submit: 'OK',
      height: 20,
    }
  );

  var gravatar_size = 256;
  var gravatar_email = 'name@example.com';
  $('.avatar-image').html(gravatar_url(gravatar_email, gravatar_size));

  var md_contents = $('.description').text();
  $('.description').html(markdown.toHTML(md_contents));

  $('.description').editable(
    function(value, settings) {
      settings.data = value;
      return markdown.toHTML(value);
    },
    {
      type: 'textarea',
      onblur: 'submit',
      submit: 'OK',
      data: md_contents,
      width: 560,
      height: 220,
    }
  );

  $('.avatar-image').editable(
    function(value, settings) {
      settings.data = value;
      return gravatar_url(value, gravatar_size);
    },
    {
      submit: 'OK',
      onblur: 'submit',
      data: gravatar_email,
      height: 20,
    }
  );
});
