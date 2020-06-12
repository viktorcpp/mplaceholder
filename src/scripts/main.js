
'use strict';

import "core-js";
//import "regenerator-runtime/runtime";

import MPlaceholder from './MPlaceholder';

function Main(e)
{
    window.mplaceholder = new MPlaceholder();

} // Main


function OnLoaded(e)
{
    window.mplaceholder.Init(null);

} // OnLoaded


window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );
