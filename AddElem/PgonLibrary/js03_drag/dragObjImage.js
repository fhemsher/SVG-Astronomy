//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var ImageUL =[]
//---mouse down over element---
function startDragImage(evt)
{

    if(activeElem&&!DraggingObj&&addElemImageViz==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.parentNode.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot")
        {

            //if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---g--

          if(evt.target.getAttribute("id")=="dragDot")
                objDragTarget = evt.target
           else if(evt.target.parentNode.getAttribute("id")=="activeElem")
                objDragTarget = evt.target.parentNode

        }
        if(objDragTarget)
        {
            addNoSelectAtText()

            var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = SVGx;
            pnt.y = SVGy;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            //---used for align of projection/zoom on end drag---
            if(objDragTarget.getAttribute("id")=="activeElem")
            {
                ActiveElemStartTrans =[SVGx, SVGy]

            }

               // domWrapper.style.display = "block"
               // domWrapper.appendChild(activeElem)
                //var x = domWrapper.getBBox().x
                //var y = domWrapper.getBBox().y
                //domActiveElemG.appendChild(activeElem)
                //ImageUL =[x, y]


            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            if(objDragTarget.getAttribute("id")=="dragDot")
            {
                    var cw = addElemImageCw
                var w = +activeElem.firstChild.getAttribute("width")
                var h = +activeElem.firstChild.getAttribute("height")
                cw.bgImageWidthValue.value = w.toFixed(0)
                cw.bgImageHeightValue.value = h.toFixed(0)


            }


        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragImage(evt)
{
    if(DraggingObj)
    {

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = SVGx;
        pnt.y = SVGy;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartX;
        Pnt.y -= ObjStartY;

        if(objDragTarget.getAttribute("id")=="dragDot")
        {
            var width = Pnt.x +parseFloat(activeElem.firstChild.getAttribute("width"))
            var height = Pnt.y +parseFloat(activeElem.firstChild.getAttribute("height"))

                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                activeElem.firstChild.setAttribute("width", width)
                 activeElem.firstChild.setAttribute("height", height)

                var cw = addElemImageCw


                var w = +activeElem.firstChild.getAttribute("width")
                var h = +activeElem.firstChild.getAttribute("height")
                 cw.bgImageWidthValue.value = w.toFixed(0)
                cw.bgImageHeightValue.value = h.toFixed(0)



        }
        else if (objDragTarget.getAttribute("id")=="activeElem")
        {
            objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
            objTransList.appendItem(objTransformRequestObj)
            objTransList.consolidate()
            DrawX.attr("transform", ActiveElem.attr("transform"))
            /*
            var width =+activeElem.firstChild.getAttribute("width")
            var height = +activeElem.firstChild.getAttribute("height")
           var tfmObj= decomposeMatrix(activeElem.getCTM())
            var tfmX=tfmObj.translateX+width
            var tfmY=tfmObj.translateY+height
            DragDot.attr("transform", "translate("+(tfmX)+" "+(tfmY)+")")
            */
        }

        //if(ActiveElem)
        //DrawX.attr("transform",ActiveElem.attr("transform"))

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragImage(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false


    }
}
