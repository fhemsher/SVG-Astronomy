<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var remove=sendXML.documentElement
    var myId=remove.getAttribute("myId")
    var myEmail=remove.getAttribute("myEmail")
    var updateSchematicSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Schematic.svg'
    var svgMap=Server.MapPath(svgFile)
    updateSchematicSVG.load(svgMap)

    var docSVG=updateSchematicSVG.documentElement
    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var svg=docSVG.childNodes.item(k)
       var id=svg.getAttribute("id")
       var email=svg.getAttribute("email")
       if(id==myId&&email==myEmail)
       {
         docSVG.removeChild(svg)
          Response.Write("OK")
            updateSchematicSVG.save(svgMap)
          break;


       }


    }





%>