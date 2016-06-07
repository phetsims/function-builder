// Copyright 2016, University of Colorado Boulder

//TODO performance: update only when XYTableNode is visible
//TODO if there are multiple instances of input cards, rows are not unique
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
  var MoveTo = require( 'TWIXT/MoveTo' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Builder} builder
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( builder, options ) {

    options = _.extend( {

      size: FBConstants.TABLE_DRAWER_SIZE,
      numberOfRowsVisible: 3, // {number} number of rows visible in the scrolling area
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

    this.builder = builder; // @private
    this.numberOfRowsVisible = options.numberOfRowsVisible; // @private

    // @private {RationalNumber[]|string} inputs, in the order that they appear in the table
    this.inputs = [];

    // @private {RowNode} rows, in the same order as inputs[]
    this.rowNodes = new ObservableArray( [] );

    // options for scroll buttons
    var BUTTON_OPTIONS = {
      fireOnHold: false, // because scrolling is animated
      minWidth: options.size.width
    };

    // up button
    var upButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      cornerRadius: 0,
      arrowDirection: 'up'
    } ) );

    // down button
    var downButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      cornerRadius: options.cornerRadius,
      arrowDirection: 'down'
    } ) );

    // button touchAreas
    upButton.touchArea = upButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );
    downButton.touchArea = downButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );

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

    // @private
    this.rowOptions = _.pick( options, 'cellXMargin', 'cellYMargin' );
    this.rowOptions.size = new Dimension2( options.size.width, scrollingRegionHeight / options.numberOfRowsVisible );

    // @private parent for all rows
    this.rowsParent = new VBox();

    // @private grid is drawn separately so we don't have weirdness with cell strokes overlapping
    this.gridNode = new Path( null, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    // contents of the scrolling region
    var scrollingContents = new Node( {
      children: [ this.rowsParent, this.gridNode ]
    } );
    scrollingRegion.addChild( scrollingContents ); // add after setting clipArea

    assert && assert( !options.children, 'decoration not supported' );
    //TODO consider putting upButton below headingNode, so that user doesn't accidentally close drawer
    options.children = [ headingNode, upButton, scrollingRegion, downButton ];

    VBox.call( this, options );

    // private the row number that appears at the top of the table
    this.rowNumberAtTopProperty = new Property( 0 );

    var animation = null; // {MoveTo} animation that scrolls the rows

    var updateScrollingRegion = function() {

      var rowNumberAtTop = thisNode.rowNumberAtTopProperty.get();
      var numberOfRows = thisNode.rowNodes.lengthProperty.get();

      upButton.enabled = ( rowNumberAtTop !== 0 );
      downButton.enabled = ( numberOfRows - rowNumberAtTop ) > options.numberOfRowsVisible;

      thisNode.updateGrid(); //TODO sometimes this needs to be done at end of animation so we don't see row disappear

      // stop any animation that's in progress
      animation && animation.stop();

      // animate scrolling
      var destination = new Vector2( 0, -( rowNumberAtTop * thisNode.rowOptions.size.height ) );
      animation = new MoveTo( scrollingContents, destination, {
        constantSpeed: false,
        duration: 500, // ms
        onComplete: function() {
          animation = null;
        }
      } );
      animation.start();
    };
    this.rowNumberAtTopProperty.link( updateScrollingRegion );
    this.rowNodes.addItemAddedListener( updateScrollingRegion );
    this.rowNodes.addItemRemovedListener( updateScrollingRegion );

    upButton.addListener( function() {
      thisNode.rowNumberAtTopProperty.set( thisNode.rowNumberAtTopProperty.get() - 1 );
    } );

    downButton.addListener( function() {
      thisNode.rowNumberAtTopProperty.set( thisNode.rowNumberAtTopProperty.get() + 1 );
    } );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  inherit( VBox, XYTableNode, {

    /**
     * Updates the grid that delineates rows and columns.  This grid is drawn separately from cells,
     * so that we don't have to deal with issues related to overlapping strokes around cells.
     *
     * @private
     */
    updateGrid: function() {

      // always show 1 page of cells, even if some are empty
      var numberOfRows = Math.max( this.numberOfRowsVisible, this.rowNodes.lengthProperty.get() );

      var gridShape = new Shape();

      // horizontal lines between rows
      for ( var i = 1; i < numberOfRows; i++ ) {
        var y = i * this.rowOptions.size.height;
        gridShape.moveTo( 0, y ).lineTo( this.rowOptions.size.width, y );
      }

      // vertical line between columns
      var centerX = this.rowOptions.size.width / 2;
      gridShape.moveTo( centerX, 0 ).lineTo( centerX, numberOfRows * this.rowOptions.size.height );

      this.gridNode.shape = gridShape;
    },

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
      this.rowNodes.add( rowNode );
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

      //TODO should rows below animate up?
      // remove row, rows below it move up automatically since rowsParent is a VBox
      var rowNode = this.rowNodes.get( inputIndex );
      rowNode.dispose();
      this.rowsParent.removeChild( rowNode );
      this.rowNodes.remove( rowNode );

      // scroll if there is an empty row at the bottom of the table
      var numberOfRows = this.rowNodes.lengthProperty.get();
      var rowNumberAtTop = this.rowNumberAtTopProperty.get();
      if ( rowNumberAtTop !== 0 && ( numberOfRows - this.numberOfRowsVisible < rowNumberAtTop ) ) {
         this.rowNumberAtTopProperty.set( numberOfRows - this.numberOfRowsVisible );
      }
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
      var rowNode = this.rowNodes.get( inputIndex );
      rowNode.setOutputCellVisible( visible );
    },

    /**
     * Scrolls the table to make the corresponding row visible.
     * Does the minimal amount of scrolling necessary for the row to be visible.
     *
     * @param {RationalNumber|string} input - value in the row's input cell
     * @public
     */
    scrollToRow: function( input ) {

      var inputIndex = this.inputs.indexOf( input );
      assert && assert( inputIndex !== -1 );

      var rowNumberAtTop = this.rowNumberAtTopProperty.get();

      if ( inputIndex < rowNumberAtTop ) {
        this.rowNumberAtTopProperty.set( inputIndex );
      }
      else if ( inputIndex > rowNumberAtTop + this.numberOfRowsVisible - 1 ) {
        this.rowNumberAtTopProperty.set( inputIndex - this.numberOfRowsVisible + 1 );
      }
      else {
        // row is already visible
      }
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
      xMargin: 10,
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

    // don't stroke the cell, grid is handled by XYTableNode
    var rowNode = new Rectangle( 0, 0, options.size.width, options.size.height );
    this.addChild( rowNode );

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
