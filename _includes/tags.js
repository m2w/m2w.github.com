$('a.tag-name').click(function(e){
	var tag_name;
	$('.hidden').hide(); // hide any visible data
	tag_name = e.target.id.split('-')[0];
	$('#tag-name-placeholder').text(tag_name); // populate the details header
	$('#tag-data-header').show();
	$('#' + tag_name + '-posts').show(); // show recent posts
	e.preventDefault();
	return false;
});