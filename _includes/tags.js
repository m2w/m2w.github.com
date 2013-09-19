

$('.cloud').click(function(e){
	$('.hidden').hide();
	// get origin elem save its id as id
	var tag_name = id.split('-')[0];
	$('#' + tag_name + '-posts').show();
	e.preventDefault();
});
