function signinftg()
{
	$("#form-wrapper").toggle();
	$("#ipage").ready(function() {	$("#ipage").toggleClass("blurFx");	});
}


function signinRedirect()
{
		window.location.href="index.php?form=login";
}
