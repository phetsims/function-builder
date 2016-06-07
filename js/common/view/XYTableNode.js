// Copyright 2016, University of Colorado Boulder

//TODO performance: update only when XYTableNode is visible
/**
 * XY table.
 * Each row consists of input (x) and output (y) cells.
 * When a row is added, it is added to the end of the table, it's input cell is visible, it's output cell is invisible.
 * When a row is deleted, rows below it move up.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'SUN/buttons/CarouselButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {Builder} builder
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( builder, options ) {

    options = _.extend( {

      size: FBConstants.TABLE_DRAWER_SIZE,
      numberOfRows: 3,
      cornerRadius: 0,

      // column headings
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: FBConstants.TABLE_XY_HEADING_FONT,
      headingYMargin: 2,
      headingBackground: 'rgb( 144, 226, 252 )',

      // cells
      cellColor: 'white',
      cellXMargin: 3,
      cellYMargin: 3

    }, options );

    var thisNode = this;

    // @private
    this.builder = builder;

    // @private {RationalNumber[]|string} inputs, in the order that they appear in the table
    this.inputs = [];

    // @private {RowNode} rows, in the same order as inputs[]
    this.rowNodes = [];

    // options for scroll buttons
    var BUTTON_OPTIONS = {
      fireOnHold: false, // because scrolling is animated
      minWidth: options.size.width,
      cornerRadius: options.cornerRadius
    };

    // up button
    var upButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      arrowDirection: 'up'
    } ) );

    // down button
    var downButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      arrowDirection: 'down'
    } ) );

    // column headings
    var headingNode = new HeadingNode( options.xSymbol, options.ySymbol, {
      size: new Dimension2( options.size.width, 30 ),
      font: options.headingFont,
      fill: options.headingBackground
    } );

    // window that rows scroll in
    var scrollingRegionHeight = options.size.height - headingNode.height - upButton.height - downButton.height;
    var scrollingRegion = new Rectangle( 0, 0, options.size.width, scrollingRegionHeight, {
      fill: options.cellColor
    } );
    scrollingRegion.clipArea = Shape.bounds( scrollingRegion.localBounds );

    // @private parent for all rows
    this.rowsParent = new VBox();
    scrollingRegion.addChild( this.rowsParent ); // add after setting clipArea

    // @private
    this.rowOptions = _.pick( options, 'cellXMargin', 'cellYMargin' );
    this.rowOptions.size = new Dimension2( options.size.width, scrollingRegionHeight / options.numberOfRows );

    assert && assert( !options.children, 'decoration not supported' );
    //TODO consider putting upButton below headingNode, so that user doesn't accidentally close drawer
    options.children = [ upButton, headingNode, scrollingRegion, downButton ];

    VBox.call( this, options );

    //TODO animate scrolling
    upButton.addListener( function() {
      thisNode.rowsParent.y = thisNode.rowsParent.y + thisNode.rowOptions.size.height;
    } );

    downButton.addListener( function() {
      thisNode.rowsParent.y = thisNode.rowsParent.y - thisNode.rowOptions.size.height;
    } );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  inherit( VBox, XYTableNode, {

    /**
     * Appends a row to the table.
     *
     * @param {RationalNumber|string} input - value in the row's input cell
     * @public
     */
    addRow: function( input ) {

      functionBuilder.log && functionBuilder.log( 'XYTableNode.addRow ' + input );

      assert && assert( !this.containsRow( input ) );
      assert && assert( input instanceof RationalNumber || typeof input === 'string' );

      // add input value
      this.inputs.push( input );

      // add row
      var rowNode = new RowNode( input, this.builder, this.rowOptions );
      this.rowNodes.push( rowNode );
      this.rowsParent.addChild( rowNode );
    },

    /**
     * Removes a row from the table.
     * If the entry is visible, results in rows below it moving up.
     * This happens when a card is returned to the input carousel.
     *
     * @param {RationalNumber|string} input - value in the row's input cell
     * @public
     */
    removeRow: function( input ) {

      functionBuilder.log && functionBuilder.log( 'XYTableNode.removeRow ' + input );

      var inputIndex = this.inputs.indexOf( input );
      assert && assert( inputIndex !== -1 );

      // remove input value
      this.inputs.splice( inputIndex, 1 );

      // remove row, rows below it move up automatically since rowsParent is a VBox
      var rowNode = this.rowNodes[ inputIndex ];
      rowNode.dispose();
      this.rowsParent.removeChild( rowNode );
      this.rowNodes.splice( inputIndex, 1 );
    },

    /**
     * Does the table contain an entry for the specified input?
     *
     * @param {RationalNumber|string} input - value in the row's input cell
     * @returns {boolean}
     * @public
     */
    containsRow: function( input ) {
      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      return ( this.inputs.indexOf( input ) !== -1 );
    },

    /**
     * Makes the corresponding output cell visible.
     * This is called with true when a card is put in the output carousel.
     * This is called with false when a card is removed from the output carousel.
     *
     * @param {RationalNumber|string} input - value in the row's input cell
     * @param {boolean} visible
     * @public
     */
    setOutputCellVisible: function( input, visible ) {
      var inputIndex = this.inputs.indexOf( input );
      assert && assert( inputIndex !== -1 );
      this.rowNodes[ inputIndex ].setOutputCellVisible( visible );
    },

    /**
     * Scrolls the table to make the corresponding entry visible.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    scrollToRow: function( input ) {
      //functionBuilder.log && functionBuilder.log( 'XYTableNode.scrollToRow ' + input );
      //TODO implement scrollToRow
    }
  } );

  /**
   * @param {string} xSymbol
   * @param {string} ySymbol
   * @param {Object} [options]
   * @constructor
   */
  function HeadingNode( xSymbol, ySymbol, options ) {

    options = _.extend( {
      size: new Dimension2( 100, 25 ),
      font: FBConstants.TABLE_XY_HEADING_FONT,
      xMargin: 6,
      yMargin: 4,
      fill: 'rgb( 144, 226, 252 )'
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      fill: options.fill
    } );

    // constrain column labels to fit in cells
    var xyMaxWidth = ( backgroundNode.width / 2 ) - ( 2 * options.xMargin );
    var xyMaxHeight = backgroundNode.height - ( 2 * options.yMargin );

    var LABEL_OPTIONS = {
      font: options.font,
      maxWidth: xyMaxWidth,
      maxHeight: xyMaxHeight
    };

    var xLabelNode = new Text( xSymbol, _.extend( {}, LABEL_OPTIONS, {
      centerX: 0.25 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } ) );

    var yLabelNode = new Text( ySymbol, _.extend( {}, LABEL_OPTIONS, {
      centerX: 0.75 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } ) );

    var verticalLine = new Line( 0, 0, 0, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      center: backgroundNode.center
    } );

    assert && assert( !options.children );
    options.children = [ backgroundNode, verticalLine, xLabelNode, yLabelNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableNode.HeadingNode', HeadingNode );

  inherit( Node, HeadingNode );

  /**
   * @param {RationalNumber|SlopeInterceptEquation} value - value in the cell
   * @param {Object} [options]
   * @returns {Node}
   */
  var createCellValueNode = function( value, options ) {

    options = _.extend( {
      showLeftHandSide: false // don't show the left-hand side (y =) of equations
    }, options );

    var cellNode = null;
    if ( value instanceof RationalNumber ) {
      cellNode = new RationalNumberNode( value, options );
    }
    else if ( value instanceof SlopeInterceptEquation ) {
      cellNode = new SlopeInterceptEquationNode( value.slope, value.intercept, options );
    }
    else {
      throw new Error( 'invalid output type' );
    }
    return cellNode;
  };

  /**
   * @param {RationalNumber|string} input - value in the row's input cell
   * @param {Builder} builder
   * @param options
   * @constructor
   */
  function RowNode( input, builder, options ) {

    assert && assert( input instanceof RationalNumber || typeof input === 'string' );

    options = _.extend( {
      size: new Dimension2( 100, 10 ),
      cellFont: new FBFont( 24 ),
      cellXMargin: 6,
      cellYMargin: 3
    }, options );

    Node.call( this );

    // @private
    this.size = options.size;
    this.cellMaxWidth = ( options.size.width / 2 ) - ( 2 * options.cellXMargin );
    this.cellMaxHeight = options.size.height - ( 2 * options.cellYMargin );

    var rowNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5
    } );
    this.addChild( rowNode );

    var verticalLine = new Line( 0, 0, 0, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      center: rowNode.center
    } );
    this.addChild( verticalLine );

    //TODO this is ugly
    var actualInput = null;
    if ( input instanceof RationalNumber ) {
      actualInput = input;
    }
    else {
      actualInput = new SlopeInterceptEquation( [] ); //TODO this is obtuse
    }

    // input value, static
    var inputValueNode = createCellValueNode( actualInput, {
      maxWidth: this.cellMaxWidth,
      maxHeight: this.cellMaxHeight,
      centerX: 0.25 * options.size.width,
      centerY: options.size.height / 2
    } );
    this.addChild( inputValueNode );

    // @private output value, set by updateOutputCell
    this.outputValueNode = null;

    var thisNode = this;
    var updateOutputCell = function() {

      var outputValueNodeWasVisible = false;

      // remove previous node
      if ( thisNode.outputValueNode ) {
        outputValueNodeWasVisible = thisNode.outputValueNode.visible;
        thisNode.removeChild( thisNode.outputValueNode );
      }

      // compute new output value
      var output = null;
      if ( input instanceof RationalNumber ) {
        output = builder.applyAllFunctions( input ); // {RationalNumber}
      }
      else {
        output = new SlopeInterceptEquation( builder.applyAllFunctions( [] ) ); //TODO this is obtuse
      }

      // add new node
      thisNode.outputValueNode = createCellValueNode( output, {
        maxWidth: thisNode.cellMaxWidth,
        maxHeight: thisNode.cellMaxHeight,
        visible: outputValueNodeWasVisible,
        centerX: 0.75 * options.size.width,
        centerY: options.size.height / 2
      } );
      thisNode.addChild( thisNode.outputValueNode );
    };

    builder.functionChangedEmitter.addListener( updateOutputCell );
    updateOutputCell();

    this.mutate( options );

    // @private
    this.disposeRowNode = function() {
      builder.functionChangedEmitter.removeListener( updateOutputCell );
      builder = null; // so things fail if we try to use this instance after dispose is called
    };
  }

  functionBuilder.register( 'XYTableNode.RowNode', RowNode );

  inherit( Node, RowNode, {

    // @public
    dispose: function() {
       this.disposeRowNode();
    },

    /**
     * @param visible
     * @public
     */
    setOutputCellVisible: function( visible ) {
      this.outputValueNode.visible = visible;
    }
  } );

  return XYTableNode;
} );
