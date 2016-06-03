
var context = ["Play Recommended", "Play Recently Uploaded"];
var command = ["pr", "pru"];

function handleContextMenu(event)
{
    if( event.userInfo )
    {
	console.log("global:" + event.userInfo);
	var items = event.userInfo.split("|");
	console.log(items);
	for( var i = 0 ; i < items.length; i++ )
	{
	    event.contextMenu.appendContextMenuItem(context[i], context[i], command[i]);
	}
    }
}

function handleCommand(event)
{
    //console.log("command clicked!!!");
    //console.log(event.command);
    /*if (event.command == "pr" )
    {
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage( "yt_theater", event.command );
	}*/
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage( "yt_theater", event.command );
}


function receiveMsg(event)
{
    if( event.name == "pr_data" )
    {
	//console.log(event.message);
	console.log(dataObject)
	var dataObject = event.message;
	localStorage.setItem("yt_ids", dataObject.videoIds);
	localStorage.setItem("yt_titles", dataObject.titles);
	localStorage.setItem("yt_users", dataObject.users);
	localStorage.setItem("yt_ulinks", dataObject.u_links);
	console.log(localStorage);
	safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "test.html";
    }
}


safari.application.addEventListener("message", receiveMsg, false);
safari.application.addEventListener("command", handleCommand, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
