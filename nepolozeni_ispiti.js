			var pom;
			var nepolozeni_ispiti;
			document.addEventListener("online", onOnline, false);
			document.addEventListener("deviceready", onDeviceReady, false);
			
	function onOnline()
			{
			pom=1;
			}
			
    function onDeviceReady() 
	{
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }
	
    function gotFS(fileSystem) {
        fileSystem.root.getFile("prijava_ispita/nepolozeni_ispiti.json", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }


    function gotFile(file)
    {
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
           alert("Read as text");
           nepolozeni_ispiti=evt.target.result;
            alert(nepolozeni_ispiti);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        alert(evt.target.error.code);
    }
