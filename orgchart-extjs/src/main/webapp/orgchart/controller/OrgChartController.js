Ext.define('kalix.orgchart.controller.OrgChartController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.orgChartController',
  imageAfterRender: function (target) {
    var st = this.getView().orgTree;

    target.ariaEl.dom.onclick = function () {
      target.disable(true);
      st.switchPosition(target.alt, "animate", {
        onComplete: function () {
          target.enable(true);
        }
      });
    };


  },

  orgChartContainerAfterRender: function (target) {
    String.prototype.gblen = function () {
      var len = 0;
      for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    }

    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');

    link.href = 'orgchart/resources/css/org-chart-node.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);

    var container = target.ariaEl.dom;

    //container.style.width=container.parentElement.parentElement.parentElement.parentElement.style.width;
    //container.style.height=container.parentElement.parentElement.parentElement.parentElement.style.height;
    //container.style.width = container.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.width;
    //container.style.height = container.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.height;
    
    var tempEl=container;
    
    for(var pCount=0;pCount<30;++pCount){
    		if(tempEl.style.width){
          container.style.width=tempEl.style.width;
          container.style.height=tempEl.style.height;

          break;
    		}
    		else{
    			tempEl=tempEl.parentElement;
    		}
    }

    $jit.ST.Plot.NodeTypes.implement({
      'stroke-rect': {
        'render': function (node, canvas) {
          var width = node.getData('width'),
            height = node.getData('height'),
            pos = this.getAlignedPos(node.pos.getc(true), width, height),
            posX = pos.x + width / 2,
            posY = pos.y + height / 2;
          this.nodeHelper.rectangle.render('fill', {x: posX, y: posY}, width, height, canvas);
          this.nodeHelper.rectangle.render('stroke', {x: posX, y: posY}, width, height, canvas);
        }
      }
    });

    var st = new $jit.ST({
      //id of viz container element
      injectInto: container,
      //set duration for the animation
      duration: 300,
      offsetX:Number(container.style.width.split('px')[0])/2- 200,
      //set animation transition type
      transition: $jit.Trans.Quart.easeInOut,
      //set distance between node and its children
      levelDistance: 50,
      levelsToShow: 10,
      constrained: false,
      //enable panning
      Navigation: {
        enable: true,
        panning: true
      },
      //set node and edge styles
      //set overridable=true for styling individual
      //nodes or edges
      Node: {
        height: 33,
        width: 150,
        type: 'stroke-rect',
        color: '#aaa',
        overridable: true,
        CanvasStyles: {
          strokeStyle: '#4b7fbc',
          lineWidth: 3
        }
      },

      Edge: {
        type: 'line',
        overridable: true,
        color: '#4b7fbc',
      },

      onBeforeCompute: function (node) {

      },

      onAfterCompute: function () {

      },

      //This method is called on DOM label creation.
      //Use this method to add event handlers and styles to
      //your node.
      onCreateLabel: function (label, node) {
        label.className = 'org-chart-node'
        label.id = container.id + '_' + node.id;
        label.innerHTML = node.name;

        //set label styles
        var style = label.style;
        style.width = 150 + 'px';
        style.height = 33 + 'px';
        style.cursor = 'pointer';
        style.color = '#333';
        style.fontSize = '0.8em';
        style.textAlign = 'center';

        if (node.name.gblen() <= 24) {
          style.paddingTop = '7px';
        }
        else {
          style.paddingTop = '0px';
        }
      },

      //This method is called right before plotting
      //a node. It's useful for changing an individual node
      //style properties before plotting it.
      //The data properties prefixed with a dollar
      //sign will override the global node style properties.
      onBeforePlotNode: function (node) {
        //add some color to the nodes in the path between the
        //root node and the selected node.

        node.data.$color = "#b9efff";

      },

      //This method is called right before plotting
      //an edge. It's useful for changing an individual edge
      //style properties before plotting it.
      //Edge data proprties prefixed with a dollar sign will
      //override the Edge global style properties.
      onBeforePlotLine: function (adj) {
        if (adj.nodeFrom.selected && adj.nodeTo.selected) {
          adj.data.$color = "#eed";
          adj.data.$lineWidth = 3;
        }
        else {
          delete adj.data.$color;
          delete adj.data.$lineWidth;
        }
      }
    });

    this.getView().orgTree = st;
  },
  orgChartAfterRender: function (target) {
    var view = this.getView();
    var st = view.orgTree;

    if (st && view.autoLoad && view.jsonData) {

      //load json data
      st.loadJSON(view.jsonData);
      //compute node positions and layout
      st.compute();
      //optional: make a translation of the tree
      st.geom.translate(new $jit.Complex(-200, 0), "current");
      //emulate a click on the root node.
      st.onClick(st.root);
    }
  }
});
