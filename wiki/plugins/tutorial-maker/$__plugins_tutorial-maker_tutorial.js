(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  var Widget = require("$:/core/modules/widgets/widget.js").widget;

  var TutorialWidget = function(parseTreeNode,options) {
    this.initialise(parseTreeNode,options);
  };

  /*
  Inherit from the base widget class
  */
  TutorialWidget.prototype = new Widget();
  
  TutorialWidget.prototype.render = function (parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
  };
  
  TutorialWidget.prototype.execute = function () {
    var t = this.getAttribute("tiddler");
    var trigger = this.getAttribute("trigger") || "start-tutorial";
    var o = $tw.wiki.getTiddlerData(t) || {};
    $tw.rootWidget.addEventListener(trigger, function () {
      try {
        hopscotch.startTour(o);
      } catch (err) {
        return $tw.utils.error(err);
      }
    });
  };
  
  TutorialWidget.prototype.refresh = function (changedTiddlers) {
    this.refreshSelf();
    return true;
  };
  
  exports.tutorial = TutorialWidget;
})();