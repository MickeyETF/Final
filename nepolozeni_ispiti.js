document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() 
	{
		alert("device ready");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
   	 }

    function gotFS(fileSystem) {
    	alert("pristupam fajlu");
        fileSystem.root.getFile("prijava_ispita/nepolozeni_ispiti.json", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        //fileEntry.file(gotFile, fail);
        alert("Putanja je");
	   var adresa=fileEntry.fullPath;
	   alert(adresa);
    }
