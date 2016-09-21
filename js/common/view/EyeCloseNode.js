// Copyright 2016, University of Colorado Boulder

/**
 * Wrapper around a single instance of a FontAwesome( 'eye_closed' ) node.
 * See https://github.com/phetsims/function-builder/issues/102
 *
 * Parsing the SVG to create a FontAwesomeNode has a significant performance penalty.  Here we reuse a
 * single instance of FontAwesomeNode( 'eye_close'), and take advantage of scenery's DAG feature, which
 * allows a Node to have multiple parents and therefore appear in the scenegraph more than once.
 * Such a Node should not be transformed directly, so we wrap the FontAwesomeNode instance in a Node.
 * Clients can then instantiate and transform an EyeCloseNode without worrying about the fact that
 * a single FontAwesomeNode instance is reused.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  // constants
  var EYE_CLOSE_NODE = new FontAwesomeNode( 'eye_close' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EyeCloseNode( options ) {
    options = options || {};
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ EYE_CLOSE_NODE ];
    Node.call( this, options );
  }

  functionBuilder.register( 'EyeCloseNode', EyeCloseNode );

  return inherit( Node, EyeCloseNode );
} );
