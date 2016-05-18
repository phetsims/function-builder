// Copyright 2016, University of Colorado Boulder

/**
 * XY table. Rows in the table are unique, duplicates are not allowed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'SUN/buttons/CarouselButton' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
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
      headingFont: new MathSymbolFont( 18 ),
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
    var headingOptions = {
      font: options.headingFont,
      maxWidth: 0.4 * backgroundNode
    };
    var xNode = new Text( options.xSymbol, headingOptions );
    var yNode = new Text( options.ySymbol, headingOptions );
    var headingHeight = Math.max( xNode.height, yNode.height ) + ( 2 * options.headingYMargin );
    var headingBackgroundNode = new Rectangle( 0, 0, options.size.width, headingHeight, {
      fill: options.headingBackground,
      top: upButton.bottom
    } );
    xNode.centerX = 0.25 * headingBackgroundNode.width;
    xNode.centerY = headingBackgroundNode.centerY;
    yNode.centerX = 0.75 * headingBackgroundNode.width;
    yNode.centerY = headingBackgroundNode.centerY;

    // grid, to delineate rows and columns
    var heightForCells = backgroundNode.height - headingBackgroundNode.height - upButton.height - downButton.height;
    var rowHeight = heightForCells / options.numberOfRows;
    var columnX = backgroundNode.width / 2;
    var gridShape = new Shape()
      .moveTo( columnX, upButton.bottom )
      .lineTo( columnX, downButton.top );
    for ( var row = 0; row < options.numberOfRows; row++ ) {
      var rowY = upButton.height + headingBackgroundNode.height + ( row * rowHeight );
      gridShape.moveTo( 0, rowY );
      gridShape.lineTo( backgroundNode.width, rowY );
    }
    var gridNode = new Path( gridShape, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, headingBackgroundNode, gridNode, xNode, yNode, upButton, downButton ];

    Node.call( this, options );

    // no need to removeListener, this instance exists for the lifetime of the sim
    builder.functionChangedEmitter.addListener( function() {
      thisNode.update();
    } );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  return inherit( Node, XYTableNode, {

    // @private updates the y values that are visible in the table
    update: function() {
      functionBuilder.log && functionBuilder.log( 'XYTableNode.update' );
      //TODO implement update
    },

    /**
     * Appends a row to the table. The table scrolls to show this as the last row.
     * This happens when a card is removed from the input carousel.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    addEntry: function( input ) {

      functionBuilder.log && functionBuilder.log( 'XYTableNode.addEntry ' + input );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( !this.containsEntry( input ) );

      // add to list
      this.inputs.push( input );

      //TODO implement addEntry
      //update some info that tells update which entries should be visible

      this.update();

      // scroll table to make corresponding row visible
      this.scrollToEntry( input );
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

      functionBuilder.log && functionBuilder.log( 'XYTableNode.removeEntry ' + input );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( this.containsEntry( input ) );

      // remove from list
      this.inputs.splice( this.inputs.indexOf( input ), 1 );

      //TODO implement removeEntry
      //update some info that tells update which entries should be visible

      this.update();
    },

    /**
     * Does the table contain an entry for the specified input?
     *
     * @param {RationalNumber|string} input
     * @returns {boolean}
     * @public
     */
    containsEntry: function( input ) {
      functionBuilder.log && functionBuilder.log( 'XYTableNode.containsEntry ' + input );
      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      return ( this.inputs.indexOf( input ) !== -1 );
    },

    /**
     * Makes the corresponding output value visible.
     * This is called with true when a card is put in the output carousel.
     * This is called with false when a card is removed from the output carousel.
     *
     * @param {RationalNumber|string} input
     * @param {boolean} visible
     * @public
     */
    setOutputVisible: function( input, visible ) {

      functionBuilder.log && functionBuilder.log( 'XYTableNode.setOutputVisible ' + input  + ', visible=' + visible );

      assert && assert( input instanceof RationalNumber || typeof input === 'string' );
      assert && assert( this.containsEntry( input ) );

      //TODO implement setYVisible
      // make corresponding output node visible, or create it

      // scroll table to make corresponding row visible
      this.scrollToEntry( input );
    },

    /**
     * Scrolls the table to make the corresponding entry visible.
     *
     * @param {RationalNumber|string} input
     * @public
     */
    scrollToEntry: function( input ) {
      functionBuilder.log && functionBuilder.log( 'XYTableNode.scrollToEntry ' + input );
      //TODO implement scrollToEntry
    }
  } );
} );
