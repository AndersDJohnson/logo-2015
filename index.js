
var options = {
  // drawLines: true,
  // drawNodes: true
};

var mode;
var match = (window.location.search || '').match('mode=([^\&]+)');
if (! match) alert('mode=?');
mode = match[1];

var ratio;
var cols;
var rows;
if (mode.indexOf('penrose') > -1) {
  ratio = Math.sqrt(3) / 2;
  cols = 22;
  rows = 22;
}
else {
  ratio = 1 / 2;
  cols = 40;
  rows = 40;
}

var htow = ratio;

var width = 600;
var height = width * htow;

// var rh = 10;
// var cw = 10;
var rh = height / rows;
var cw = width / cols;

var even = function (n) {
  return n % 2 == 0;
};

var odd = function (n) {
  return ! even(n);
};

var getNodes = function () {
  var nodes = [];
  _.times(rows, function (r) {
    _.times(cols, function (c) {
      var node = {};
      var x, y;
      var cadj = c;
      if (odd(r)) {
        cadj += 0.5;
      }
      x = cadj * cw;
      y = r * rh;
      x = Math.round(x);
      y = Math.round(y);
      _.extend(node, {
        x: x,
        y: y,
        c: c,
        r: r
      });
      nodes.push(node);
    });
  });
  console.log('nodes', nodes);
  return nodes;
};

var svg = d3.select("#d3")
  .append("svg")
  .attr('width', width)
  .attr('height', height)
;

var nodes = getNodes();
var nodeMap = {};
_.each(nodes, function (node) {
  var rmap = nodeMap[node.r] = nodeMap[node.r] || {};
  rmap[node.c] = node;
});

var colors = {
  // lighter: 'rgba(0,0,0,0.2)',
  // light: 'rgba(0,0,0,0.4)',
  // medium: 'rgba(0,0,0,0.6)',
  // dark: 'rgba(0,0,0,0.8)',
  // lighter: '#fff',
  // light: '#ccc',
  // medium: '#999',
  // dark: '#666'
  lighter: '#fff',
  light: '#ccc',
  medium: '#888',
  dark: '#444'
};

var styles = {
  line: {
    'stroke-width': options.drawLines ? 1 : 0,
    'stroke': '#000'
  }
};

var shapeModes = {
  diamond: [
    {
      color: colors.dark,
      sects: [
        [
          {c: 14, r: 14},
          {c: 14, r: 12},
          {c: 18, r: 20},
          {c: 17, r: 20},
        ]
      ]
    },
    {
      color: colors.medium,
      sects: [
        [
          {c: 14, r: 26},
          {c: 14, r: 28},
          {c: 18, r: 20},
          {c: 17, r: 20},
        ]
      ]
    },
    {
      color: colors.light,
      sects: [
        [
          {c: 12, r: 5},
          {c: 12, r: 35},
          {c: 20, r: 20},
        ],
        [
          {c: 14, r: 12},
          {c: 14, r: 28},
          {c: 18, r: 20},
        ]
      ]
    },
    {
      name: 'A.face',
      color: colors.lighter,
      sects: [
        [
          {c: 7, r: 19},
          {c: 6, r: 22},
          {c: 5, r: 20},
          {c: 12, r: 5},
          {c: 12, r: 35},
          {c: 11, r: 32},
          {c: 11, r: 26},
        ],
        [
          {c: 11, r: 12},
          {c: 8, r: 17},
          {c: 11, r: 22},
          {c: 11, r: 12},
        ]
      ]
    },
    {
      color: colors.medium,
      sects: [
        [
          {c: 8, r: 17},
          {c: 9, r: 17},
          {c: 11, r: 20},
          {c: 11, r: 22},
        ]
      ]
    },
    {
      color: colors.dark,
      sects: [
        [
          {c: 8, r: 17},
          {c: 9, r: 17},
          {c: 11, r: 14},
          {c: 11, r: 12},
        ]
      ]
    },
    {
      color: colors.dark,
      sects: [
        [
          {c: 8, r: 20},
          {c: 7, r: 19},
          {c: 6, r: 22},
          {c: 7, r: 22},
        ]
      ]
    },
  ],
  s: [
    {
      name: 'J.hook.top',
      color: colors.medium,
      sects: [
        [
          {c: 6, r: 18},
          {c: 7, r: 18},
          {c: 11, r: 26},
          {c: 11, r: 28},
        ]
      ]
    },
    {
      name: 'J.face',
      color: colors.light,
      sects: [
        [
          {c: 12, r: 35},
          {c: 12, r: 5},
          {c: 11, r: 8},
          {c: 11, r: 28},
          {c: 6, r: 18},
          {c: 5, r: 20},
        ]
      ]
    },
    {
      name: 'A.bar.top',
      color: colors.medium,
      sects: [
        [
          {c: 16, r: 17},
          {c: 15, r: 17},
          {c: 14, r: 20},
          {c: 14, r: 22},
        ]
      ]
    },
    {
      name: 'A.leg.out.inner.upper',
      color: colors.dark,
      sects: [
        [
          {c: 15, r: 17},
          {c: 16, r: 17},
          {c: 14, r: 12},
          {c: 14, r: 14},
        ]
      ]
    },
    {
      name: 'A.leg.out.inner.lower',
      color: colors.dark,
      sects: [
        [
          {c: 17, r: 20},
          {c: 17, r: 19},
          {c: 19, r: 22},
          {c: 18, r: 22},
        ]
      ]
    },
    {
      name: 'A.face',
      color: colors.lighter,
      sects: [
        [
          {c: 17, r: 19},
          {c: 19, r: 22},
          {c: 20, r: 20},
          {c: 12, r: 5},
          {c: 12, r: 35},
          {c: 14, r: 32},
          {c: 14, r: 26},
        ],
        [
          {c: 14, r: 12},
          {c: 16, r: 17},
          {c: 14, r: 22},
          {c: 14, r: 12},
        ]
      ]
    },
  ],
  penroseThin: [
    {
      name: 'J.hook.top',
      color: colors.lighter,
      sects: [
        [
          {c: 15, r: 14},
          {c: 15, r: 13},
          {c: 17, r: 17},
          {c: 16, r: 17},
        ]
      ]
    },
    {
      name: 'J.hook.top',
      color: colors.lighter,
      sects: [
        [
          {c: 10, r: 2},
          {c: 2, r: 18},
          {c: 3, r: 20},
          {c: 10, r: 5},
          {c: 14, r: 12},
          {c: 15, r: 12},
        ]
      ]
    },
    {
      name: 'J.hook.top',
      color: colors.dark,
      sects: [
        [
          {c: 3, r: 19},
          {c: 3, r: 20},
          {c: 19, r: 20},
          {c: 20, r: 18},
          {c: 5, r: 18},
          {c: 7, r: 14},
          {c: 15, r: 14},
          {c: 15, r: 13},
          {c: 7, r: 13},
          {c: 11, r: 6},
          {c: 10, r: 5},
        ]
      ]
    },
    {
      name: 'J.hook.top',
      color: colors.medium,
      sects: [
        [
          {c: 5, r: 18},
          {c: 5, r: 17},
          {c: 17, r: 17},
          {c: 15, r: 13},
          {c: 7, r: 13},
          {c: 8, r: 12},
          {c: 15, r: 12},
          {c: 10, r: 2},
          {c: 12, r: 2},
          {c: 20, r: 18},
        ]
      ]
    },
  ],
  penroseSmallTriangle: [
    {
      name: 'left.strip',
      color: colors.lighter,
      sects: [
        [
          {c: 14, r: 14},
          {c: 15, r: 12},
          {c: 17, r: 16},
          {c: 15, r: 16},
        ]
      ]
    },
    {
      name: 'left',
      color: colors.lighter,
      sects: [
        [
          {c: 10, r: 2},
          {c: 2, r: 18},
          {c: 3, r: 20},
          {c: 10, r: 6},
          {c: 12, r: 10},
          {c: 14, r: 10},
        ]
      ]
    },
    {
      name: 'bottom',
      color: colors.dark,
      sects: [
        [
          {c: 3, r: 19},
          {c: 3, r: 20},
          {c: 19, r: 20},
          {c: 20, r: 18},
          {c: 6, r: 18},
          {c: 8, r: 14},
          {c: 14, r: 14},
          {c: 15, r: 12},
          {c: 9, r: 12},
          {c: 11, r: 8},
          {c: 10, r: 6},
        ]
      ]
    },
    {
      name: 'right',
      color: colors.medium,
      sects: [
        [
          {c: 6, r: 18},
          {c: 7, r: 16},
          {c: 17, r: 16},
          {c: 15, r: 12},
          {c: 9, r: 12},
          {c: 10, r: 10},
          {c: 14, r: 10},
          {c: 10, r: 2},
          {c: 12, r: 2},
          {c: 20, r: 18},
        ]
      ]
    },
  ],
  penroseSmallMouth: [
    {
      name: 'left.strip',
      color: colors.lighter,
      sects: [
        [
          {c: 14, r: 15},
          {c: 15, r: 13},
          {c: 17, r: 16},
          {c: 15, r: 16},
        ]
      ]
    },
    {
      name: 'left',
      color: colors.lighter,
      sects: [
        [
          {c: 10, r: 2},
          {c: 2, r: 18},
          {c: 3, r: 20},
          {c: 10, r: 6},
          {c: 12, r: 11},
          {c: 14, r: 11},
        ]
      ]
    },
    {
      name: 'bottom',
      color: colors.dark,
      sects: [
        [
          {c: 3, r: 19},
          {c: 3, r: 20},
          {c: 19, r: 20},
          {c: 20, r: 18},
          {c: 6, r: 18},
          {c: 7, r: 15},
          {c: 14, r: 15},
          {c: 15, r: 13},
          {c: 8, r: 13},
          {c: 11, r: 8},
          {c: 10, r: 6},
        ]
      ]
    },
    {
      name: 'right',
      color: colors.medium,
      sects: [
        [
          {c: 6, r: 18},
          {c: 7, r: 16},
          {c: 17, r: 16},
          {c: 15, r: 13},
          {c: 8, r: 13},
          {c: 9, r: 11},
          {c: 14, r: 11},
          {c: 10, r: 2},
          {c: 12, r: 2},
          {c: 20, r: 18},
        ]
      ]
    },
  ],
  penrose: [
    {
      name: 'left.strip',
      color: colors.lighter,
      sects: [
        [
          {c: 14, r: 15},
          {c: 15, r: 13},
          {c: 17, r: 17},
          {c: 15, r: 17},
        ]
      ]
    },
    {
      name: 'left',
      color: colors.lighter,
      sects: [
        [
          {c: 10, r: 2},
          {c: 1, r: 19},
          {c: 2, r: 21},
          {c: 10, r: 6},
          {c: 12, r: 11},
          {c: 14, r: 11},
        ]
      ]
    },
    {
      name: 'bottom',
      color: colors.dark,
      sects: [
        [
          {c: 3, r: 19},
          {c: 2, r: 21},
          {c: 19, r: 21},
          {c: 20, r: 19},
          {c: 5, r: 19},
          {c: 7, r: 15},
          {c: 14, r: 15},
          {c: 15, r: 13},
          {c: 8, r: 13},
          {c: 11, r: 8},
          {c: 10, r: 6},
        ]
      ]
    },
    {
      name: 'right',
      color: colors.medium,
      sects: [
        [
          {c: 5, r: 19},
          {c: 6, r: 17},
          {c: 17, r: 17},
          {c: 15, r: 13},
          {c: 8, r: 13},
          {c: 9, r: 11},
          {c: 14, r: 11},
          {c: 10, r: 2},
          {c: 12, r: 2},
          {c: 20, r: 19},
        ]
      ]
    },
  ],
};



var shapes = shapeModes[mode];


_.each(shapes, function (shape) {
  var sects = shape.sects;
  _.each(sects, function (sect) {
    var pts = sect;
    _.each(pts, function (pt) {
      // pt.x = _.findWhere(nodes, {c: pt.c}).x;
      // pt.y = _.findWhere(nodes, {r: pt.r}).y;
      console.log('pt', pt);
      pt.x = nodeMap[pt.r][pt.c].x;
      pt.y = nodeMap[pt.r][pt.c].y;
    });
  });
});

console.log('shapes', shapes);

var draw = function () {
  var paths = svg.selectAll('.path')
    .data(shapes)
    .enter()
    .append('path')
    .attr('class', 'path')
    .attr("d",function(d) {
        // return _.map(d.pts, function (pt) {
        //   console.log('pt', pt);
        //   return pt.x + ',' + pt.y;
        // }).join(' ');
        var p = _.map(d.sects, function (sect) {
          var pts = sect;
          return _.map(pts, function (pt, i) {
            console.log('pt', pt);
            var pre;
            if (i == 0) {
              pre = 'M';
            }
            else {
              pre = 'L';
            }
            return pre + ' ' + pt.x + ' ' + pt.y;
          }).join(' ');
        }).join(' Z ') + ' Z ';
        console.log('d', p);
        return p;
    })
    .style(styles.line)
    .style('fill', function (d) { return d.color; })
  ;
  console.log('paths', paths);

  if (options.drawNodes) {
    svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1)
      .style('fill', function (d) { return 'black'; })
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; })
      .on('mouseenter', function (d) {
        console.log(d);
      })
    ;
  }
};

draw();
