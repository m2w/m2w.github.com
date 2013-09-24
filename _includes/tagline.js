if (!(document.cookie && /hide-tagline=true/.test(document.cookie))) {
	$("#tagline").show();
	document.cookie = "hide-tagline=true;";
}