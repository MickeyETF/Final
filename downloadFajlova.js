window.appRootDirName = "prijava_ispita";
var korisnicko_ime = window.localStorage.getItem("korisnicko_ime");
var lozinka = window.localStorage.getItem("lozinka");
document.addEventListener("online", onOnline, false);

function onOnline()
            {
            		alert("pokusavam update");
			ProvjeraPristupaServeru();
            }
			
function ProvjeraPristupaServeru()
{
alert("provjera pristupa serveru");
    adresa="http://wstest.etf.unssa.rs.ba/studenti/status/etf/"+korisnicko_ime+"/"+lozinka;
		$.ajax({
		 url:adresa,
		type:"GET",
		timeout:3000,
		crossDomain: true,
		dataType:"jsonp",
		success: function(data)
			{
			alert("uspio sam prustupiti");
			if(data!="")
			{
			OsvjeziBazu();
			}	
			}		
			});
}		
function OsvjeziBazu()
 {
    alert("Osvjezava se baza podataka");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    if (korisnicko_ime != null && lozinka != null) {
        downloadFile(korisnicko_ime, lozinka);
        window.location.replace('pocetna.html');
    }
}

function fail() {
    //alert("failed to get filesystem");
}

function gotFS(fileSystem) {
    //alert("filesystem got");
    window.fileSystem = fileSystem;
    fileSystem.root.getDirectory(window.appRootDirName, {
        create: true,
        exclusive: false
    }, dirReady, fail);
}

function dirReady(entry) {
    window.appRootDir = entry;
    //alert("application dir is ready");
}
downloadFile = function (br_ind, loz) {
    //alert("poziva se download"+br_ind+" "+loz)
    var url = new Array();
    url[0] = "http://wstest.etf.unssa.rs.ba/studenti/nepolozeni_ispiti/etf/" + br_ind + "/" + loz;
    url[1] = "http://wstest.etf.unssa.rs.ba/studenti/polozeni_ispiti/etf/" + br_ind + "/" + loz;
    url[2] = "http://wstest.etf.unssa.rs.ba/studenti/ispiti/etf/" + br_ind + "/" + loz;
    url[3] = "http://wstest.etf.unssa.rs.ba/studenti/status/etf/" + br_ind + "/" + loz;
    var file = new Array();
    file[0] = "/nepolozeni_ispiti.json";
    file[1] = "/polozeni_ispiti.json";
    file[2] = "/ispiti_za_polaganje.json";
    file[3] = "/status_studenta.json";
    for (var i = 0; i < 4; i++) {
        var fileTransfer = new FileTransfer();
        var adresa = url[i].toString();
        var ime_fajla = file[i].toString();
        //alert(adresa);
        //alert(ime_fajla);
        var filePath = window.appRootDir.fullPath + ime_fajla;
        fileTransfer.download(
            adresa,
            filePath, function (entry) {
            //alert("download complete: " + entry.fullPath);
        }, function (error) {
            //alert("download error" + error.source);
        });
    }
}
