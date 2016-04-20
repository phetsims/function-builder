// Copyright 2016, University of Colorado Boulder

/**
 * XY table
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( options ) {

    options = _.extend( {
      size: FBConstants.TABLE_DRAWER_SIZE,
      xString: FBSymbols.X,
      yString: FBSymbols.Y,
      headingFont: new FBFont( 24 )
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, { fill: 'white' } );

    // column headings
    var xNode = new Text( options.xString, {
      font: options.headingFont,
      centerX: 0.25 * backgroundNode.width,
      top: backgroundNode.top + 6
    } );
    var yNode = new Text( options.yString, {
      font: options.headingFont,
      centerX: 0.75 * backgroundNode.width,
      top: backgroundNode.top + 6
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, xNode, yNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  return inherit( Node, XYTableNode );
} );
