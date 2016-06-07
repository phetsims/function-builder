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
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/EquationCard' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );

  /**
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @param {Builder} builder
   * @param options
   * @constructor
   */
  function XYTableRow( card, builder, options ) {

    assert && assert( card instanceof NumberCard || card instanceof EquationCard );

    options = _.extend( {
      size: new Dimension2( 100, 10 ),
      cellXMargin: 15,
      cellYMargin: 3
    }, options );

    Node.call( this );

    // don't stroke the cells, grid is drawn by XYTableNode
    var rowNode = new Rectangle( 0, 0, options.size.width, options.size.height );
    this.addChild( rowNode );

    // constrain values to cells
    var valueMaxWidth = ( options.size.width / 2 ) - ( 2 * options.cellXMargin );
    var valueMaxHeight = options.size.height - ( 2 * options.cellYMargin );

    // input value, static
    var inputValueNode = createCellValueNode( card, builder, {
      numberOfFunctions: 0,
      maxWidth: valueMaxWidth,
      maxHeight: valueMaxHeight,
      centerX: 0.25 * options.size.width,
      centerY: options.size.height / 2
    } );
    this.addChild( inputValueNode );

    // @private output value, set by updateOutputCell
    this.outputValueNode = null;

    var thisNode = this;
    var updateOutputCell = function() {

      // remove previous node
      var outputValueNodeWasVisible = false;
      if ( thisNode.outputValueNode ) {
        outputValueNodeWasVisible = thisNode.outputValueNode.visible;
        thisNode.removeChild( thisNode.outputValueNode );
      }

      // add new node
      thisNode.outputValueNode = createCellValueNode( card, builder, {
        numberOfFunctions: builder.slots.length,
        visible: outputValueNodeWasVisible,
        maxWidth: valueMaxWidth,
        maxHeight: valueMaxHeight,
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
   * Creates the cell representation for a specified card.
   *
   * @param {NumberCard|EquationCard} card
   * @param {Builder} builder
   * @param {Object} [options]
   * @returns {Node}
   */
  var createCellValueNode = function( card, builder, options ) {

    options = _.extend( {
      numberOfFunctions: 0, // number of functions to apply
      showLeftHandSide: false // don't show the left-hand side (y =) of equations
    }, options );
    assert && assert( options.numberOfFunctions <= builder.slots.length );

    //TODO remove type testing by making this a responsibility of card?
    var valueNode = null;
    if ( card instanceof NumberCard ) {
      var rationalNumber = builder.applyFunctions( card.rationalNumber, options.numberOfFunctions );
      valueNode = new RationalNumberNode( rationalNumber, options );
    }
    else if ( card instanceof EquationCard ) {
      var mathFunctions = builder.applyFunctions( [], options.numberOfFunctions ); // {MathFunction[]}
      var equation = new SlopeInterceptEquation( mathFunctions );
      valueNode = new SlopeInterceptEquationNode( equation.slope, equation.intercept, options );
    }
    else {
      throw new Error( 'invalid card type' );
    }
    return valueNode;
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
