function filterProjectList () {
  strSearchtext = $("#ge-search").val().toLowerCase();
	strCover =  $("#ge-cover-filter").val()

	//loop and show matches then hide others
	$("#project_browser li").each(function(i,v) {
  	var currentProjectItem = $(this).attr("id");
    var currentProjectText = $("#" + currentProjectItem + " .pname").text().toLowerCase();

    if (currentProjectText.indexOf(strSearchtext) > -1)  {
    	$(this).removeClass("hide");
    }
    else
    {
    	$(this).addClass("hide");
    }
  });
  
  //hide the remaining projects that don't match the cover fitler
  $("#project_browser li:not(."+ strCover +")").addClass('hide');
  
}

function getCoverName(strClassname) {
	strClassname = strClassname.slice(5);
  strClassname = strClassname.replace("_"," ");
  strClassname = titleCase(strClassname);
  return strClassname;
}

function initProjectFilter () {
		//Add the search bar
    $("#project-browser").before("<div id='ge-filter-bar' placeholder='Filter by project name'><input id='ge-search' ><select id='ge-cover-filter'><option value=''>All</option></select></div>");
    
    //Add the events to the filter inputs
    $("#ge-search").keyup(function(e) {
			filterProjectList();
    });

    $("#ge-cover-filter").change(function(e) {
      filterProjectList();
    });
    
    //Build out covers selectbox with listed covers and check for dups. 
		$("#project_browser li").each(function(key, value) {
    		//ingore the new project list item
    		if (!$(this).hasClass("ts_newproject")) {
        	//Check to make sure the cover hasn't been added.
          if (isUniqueforSelect($(this).attr("class"))) {
            $('#ge-cover-filter').append($("<option></option>")
              .attr("value",$(this).attr("class").slice(2))
              .text(getCoverName($(this).attr("class")))); 
          }        
        }
      });
}

function isUniqueforSelect (strClass) {
	strClass = strClass.slice(2);
	if (!$("#ge-cover-filter option[value='" + strClass + "']").length) 
  	{
  	return true;
    }
  else 
  	{
  	return false;
 		}
}

function titleCase(str) {
    str = str.toLowerCase();

    var strArray = str.split(" ");
    for(var i = 0; i < strArray.length; i++){
        strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].substr(1);
    }
    var result = strArray.join(" ");
    return result;
}


initProjectFilter ();
