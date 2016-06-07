// Copyright 2016, University of Colorado Boulder

/**
 * A row in the XY table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );

  /**
   * @param {RationalNumber|string} input - value in the row's input cell
   * @param {Builder} builder
   * @param options
   * @constructor
   */
  function XYTableRow( input, builder, options ) {

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

    // don't stroke the cell, grid is drawn by XYTableNode
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
    this.disposeXYTableRow = function() {
      builder.functionChangedEmitter.removeListener( updateOutputCell );
      builder = null; // so things fail if we try to use this instance after dispose is called
    };
  }

  functionBuilder.register( 'XYTableRow', XYTableRow );

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

  return inherit( Node, XYTableRow, {

    // @public
    dispose: function() {
      this.disposeXYTableRow();
    },

    /**
     * @param visible
     * @public
     */
    setOutputCellVisible: function( visible ) {
      this.outputValueNode.visible = visible;
    }
  } );
} );
