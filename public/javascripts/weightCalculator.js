var site = 'https://www.calculators.tech/';
var siteName = 'calculators.tech';
var CalculatorSlug = document.getElementById("ppsWidgetCode").getAttribute('data-calculator-slug');
var widget = site + CalculatorSlug + '?widget=1';
var backlinkURL = site + CalculatorSlug;
var keyword = document.getElementById("ppsWidgetCode").getAttribute('data-calculator-keyword');
var widgetHtml = '<iframe id="ifr" src="' + widget + '" style="border:0;width:100%;height:"></iframe>';
var isNew = document.getElementById("ppsWidgetCode");


document.getElementById("ppsWidgetCode").innerHTML = widgetHtml;
(function () {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = "https://www.calculators.tech/assets/lib/third-party-plugins/ir/ir.min.js";
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
})();
document.getElementById('ifr').onload = function () {
  iFrameResize({ log: true });
  var ifr = document.getElementById('ifr').contentWindow;
  var b = document.getElementById("ppsWidgetCode").getAttribute("data-config");
  ifr.postMessage(b, domain);
}