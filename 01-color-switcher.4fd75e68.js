!function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),o=document.body;e.addEventListener("click",(function(){t=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),e.setAttribute("disabled","true")}),1e3)})),n.addEventListener("click",(function(){clearInterval(t),e.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.4fd75e68.js.map
