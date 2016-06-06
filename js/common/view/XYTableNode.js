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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

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
      cellFont: new FBFont( 24 ),
      cellColor: 'white',
      cellXMargin: 3,
      cellYMargin: 3

    }, options );

    var thisNode = this;

    // @private {RationalNumber[]|string} inputs, in the order that they appear in the table
    this.inputs = [];

    // @private {number} maximum dimensions of cell content, used to set Node maxWidth property
    this.cellContentMaxWidth = ( options.size.width - 2 * options.cellXMargin ) / 2;
    this.cellContentMaxHeight = ( options.size.height - 2 * options.cellYMargin ) / 2;

    // table background
    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: options.cellColor,
      cornerRadius: options.cornerRadius
    } );

    // up/down buttons
    var upButton = new CarouselButton( {
      arrowDirection: 'up',
      minWidth: options.size.width,
      cornerRadius: options.cornerRadius
    } );
    var downButton = new CarouselButton( {
      arrowDirection: 'down',
      minWidth: options.size.width,
      cornerRadius: options.cornerRadius,
      bottom: backgroundNode.bottom
    } );

    // column headings
    var headingNode = new HeadingNode( options.xSymbol, options.ySymbol, {
      size: new Dimension2( options.size.width, 30 ),
      font: options.headingFont,
      fill: options.headingBackground,
      top: upButton.bottom
    } );

    //TODO scrolling area for cells, with clipArea

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, headingNode, upButton, downButton ];

    Node.call( this, options );

    // no need to removeListener, this instance exists for the lifetime of the sim
    builder.functionChangedEmitter.addListener( function() {
      thisNode.updateOutputCells();
    } );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  inherit( Node, XYTableNode, {

    // @private updates the output cells in the table
    updateOutputCells: function() {
      //functionBuilder.log && functionBuilder.log( 'XYTableNode.update' );
      //TODO implement updateOutputs
    },

    /**
     * Appends a row to the table.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    addEntry: function( input ) {

      //functionBuilder.log && functionBuilder.log( 'XYTableNode.addEntry ' + input );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( !this.containsEntry( input ) );

      // add to list
      this.inputs.push( input );

      //TODO add row with input cell visible, output cell invisible
    },

    /**
     * Removes the corresponding entry from the table.
     * If the entry is visible, results in rows below it moving up.
     * This happens when a card is returned to the input carousel.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    removeEntry: function( input ) {

      //functionBuilder.log && functionBuilder.log( 'XYTableNode.removeEntry ' + input );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( this.containsEntry( input ) );

      // remove from list
      this.inputs.splice( this.inputs.indexOf( input ), 1 );

      //TODO remove row, move rows below it up
    },

    /**
     * Does the table contain an entry for the specified input?
     *
     * @param {RationalNumber|string} input
     * @returns {boolean}
     * @public
     */
    containsEntry: function( input ) {
      //functionBuilder.log && functionBuilder.log( 'XYTableNode.containsEntry ' + input );
      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      return ( this.inputs.indexOf( input ) !== -1 );
    },

    /**
     * Makes the corresponding output cell visible.
     * This is called with true when a card is put in the output carousel.
     * This is called with false when a card is removed from the output carousel.
     *
     * @param {RationalNumber|string} input
     * @param {boolean} visible
     * @public
     */
    setOutputCellVisible: function( input, visible ) {

      //functionBuilder.log && functionBuilder.log( 'XYTableNode.setOutputVisible ' + input  + ', visible=' + visible );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( this.containsEntry( input ) );

      //TODO make corresponding output cell visible
    },

    /**
     * Scrolls the table to make the corresponding entry visible.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    scrollToEntry: function( input ) {
      //functionBuilder.log && functionBuilder.log( 'XYTableNode.scrollToEntry ' + input );
      //TODO implement scrollToEntry
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
      xMargin: 5,
      yMargin: 2,
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

    var xNode = new Text( xSymbol, {
      font: options.font,
      maxWidth: xyMaxWidth,
      maxHeight: xyMaxHeight,
      centerX: 0.25 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } );

    var yNode = new Text( ySymbol, {
      font: options.font,
      maxWidth: xyMaxWidth,
      maxHeight: xyMaxHeight,
      centerX: 0.75 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } );

    var verticalLine = new Line( 0, 0, 0, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      center: backgroundNode.center
    } );

    assert && assert( !options.children );
    options.children = [ backgroundNode, verticalLine, xNode, yNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableNode.HeadingNode', HeadingNode );

  inherit( Node, HeadingNode );

  return XYTableNode;
} );
