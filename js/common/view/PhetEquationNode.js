// Copyright 2016, University of Colorado Boulder

//TODO better name for PhetEquationNode
/**
 * PhET-specific format of the equation that corresponds to functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {PhetEquation} equation
   * @param {Object} [options]
   * @constructor
   */
  function PhetEquationNode( equation, options ) {

    options = _.extend( {

      xSymbol: FBSymbols.X, // {string} symbol for input
      ySymbol: FBSymbols.Y, // {string} symbol for output

      // colors
      xColor: 'black', // {Color|string} for x symbol
      yColor: 'black', // {Color|string} for y symbol
      color: 'black' // {Color|string} for everything else

    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    //TODO temporary
    var textNode = new Text( FBSymbols.Y + ' = ' + equation.toString(), {
      font: new FBFont( 20 )
    } );
    options.children.push( textNode );

    Node.call( this, options );
  }

  functionBuilder.register( 'PhetEquationNode', PhetEquationNode );

  return inherit( Node, PhetEquationNode );
} );
