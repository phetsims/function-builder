// Copyright 2015-2023, University of Colorado Boulder

/**
 * Visual representation of a Builder.
 * Cards pass through the builder horizontally.
 * An 'input' slot is on the left end, 'output' slot on the right end.
 * Functions appear from left to right, in the order that they are applied.
 * This node is the ancestor for function nodes when they are in the builder.
 *
 * Origin is at the center of the input slot.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../../kite/js/imports.js';
import merge from '../../../../../phet-core/js/merge.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import { LinearGradient, Node, NodeOptions, Path, TPaint } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import Builder from '../../model/builder/Builder.js';
import Card from '../../model/cards/Card.js';
import CardNode from '../cards/CardNode.js';
import MoleCardNode from '../cards/MoleCardNode.js';
import FunctionNode from '../functions/FunctionNode.js';
import BuilderEndNode from './BuilderEndNode.js';
import FunctionSlotNode from './FunctionSlotNode.js';

type SelfOptions = {

  // body
  bodyStroke?: TPaint;
  bodyLineWidth?: number;

  // ends
  endRadiusX?: number;
  endStroke?: TPaint;
  endLineWidth?: number;

  // slots
  slotFill?: TPaint;
  slotStroke?: TPaint;
  slotLineWidth?: number;

  // function placeholders
  functionStroke?: TPaint;
  functionLineWidth?: number;
  functionLineDash?: number[];
};

type BuilderNodeOptions = SelfOptions;

export default class BuilderNode extends Node {

  public readonly builder: Builder;
  public readonly hideFunctionsProperty: TReadOnlyProperty<boolean>;

  private readonly functionNodes: ( FunctionNode | null )[];
  private readonly functionsParent: Node;
  private readonly moleCardsLayer: Node;
  private seeInsideCardNode: CardNode | null; // 1 card that may occupy the 'see inside' windows, see issue #44

  /**
   * @param builder
   * @param hideFunctionsProperty - whether to hide the identity of functions in the builder
   * @param [providedOptions]
   */
  public constructor( builder: Builder, hideFunctionsProperty: TReadOnlyProperty<boolean>, providedOptions?: BuilderNodeOptions ) {

    const options = optionize<BuilderNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      bodyStroke: 'black',
      bodyLineWidth: 1,
      endRadiusX: 15,
      endStroke: 'black',
      endLineWidth: 1,
      slotFill: 'white',
      slotStroke: 'black',
      slotLineWidth: 2,
      functionStroke: 'white',
      functionLineWidth: 1,
      functionLineDash: [ 3, 3 ]
    }, providedOptions );

    options.x = builder.position.x;
    options.y = builder.position.y;

    // To improve readability of shape code
    const colorScheme = builder.colorScheme;
    const BODY_WIDTH = builder.width;
    const END_HEIGHT = builder.endHeight;
    const X_INSET = 0.15 * BODY_WIDTH;
    const Y_INSET = ( END_HEIGHT - builder.waistHeight ) / 2;

    // Gradient for the body
    const bodyGradient = new LinearGradient( 0, 0, 1, END_HEIGHT )
      .addColorStop( 0, colorScheme.top )
      .addColorStop( 0.5, colorScheme.middle )
      .addColorStop( 1, colorScheme.bottom );

    // Body of the builder, described starting at upper-left and moving clockwise
    const bodyNode = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH - X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH, 0 )
      .lineTo( BODY_WIDTH, END_HEIGHT )
      .lineTo( BODY_WIDTH - X_INSET, END_HEIGHT - Y_INSET )
      .lineTo( X_INSET, END_HEIGHT - Y_INSET )
      .lineTo( 0, END_HEIGHT )
      .close(), {
      fill: bodyGradient,
      stroke: options.bodyStroke,
      lineWidth: options.bodyLineWidth,

      // origin at center of input slot
      x: 0,
      centerY: 0
    } );

    // Options for the ends
    const END_OPTIONS = {
      radiusX: options.endRadiusX,
      radiusY: END_HEIGHT / 2,
      fill: colorScheme.ends,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      slotFill: options.slotFill,
      slotStroke: options.slotStroke,
      slotLineWidth: options.slotLineWidth,
      centerX: bodyNode.left,
      centerY: bodyNode.centerY
    };

    // Left end
    const leftEndNode = new BuilderEndNode( 'left',
      merge( {}, END_OPTIONS, {
        centerX: bodyNode.left,
        centerY: bodyNode.centerY
      } ) );

    // Right end
    const rightEndNode = new BuilderEndNode( 'right',
      merge( {}, END_OPTIONS, {
        centerX: bodyNode.right,
        centerY: bodyNode.centerY
      } ) );

    // slots and the function nodes that are in the slots
    const slotNodes: FunctionSlotNode[] = [];
    const functionNodes: ( FunctionNode | null )[] = [];
    for ( let i = 0; i < builder.numberOfSlots; i++ ) {

      slotNodes.push( new FunctionSlotNode( {
        // centered at slot positions
        center: builder.slots[ i ].position.minus( builder.position )
      } ) );

      functionNodes[ i ] = null; // empty functions are null
    }
    assert && assert( functionNodes.length === builder.numberOfSlots );
    const slotsParent = new Node( { children: slotNodes } );
    const functionsParent = new Node();

    // 'moles under the carpet' that represents a card being dragged through the builder
    const moleCardsLayer = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ bodyNode, slotsParent, functionsParent, moleCardsLayer, leftEndNode, rightEndNode ];

    assert && assert( !options.clipArea, 'clipArea cannot be customized' );
    options.clipArea = Shape.rect( 0, -END_HEIGHT / 2, BODY_WIDTH, END_HEIGHT );

    super( options );

    // Hide/reveal the identify of functions in the builder.
    // unlink unnecessary, instances exist for lifetime of the sim
    hideFunctionsProperty.link( hideFunctions => {
      functionNodes.forEach( functionNode => {
        if ( functionNode ) {
          functionNode.identityVisibleProperty.value = !hideFunctions;
        }
      } );
    } );

    //------------------------------------------------------------------------------------------------------------------
    // Define properties in one place, so we can see what's available and document visibility

    this.builder = builder; // (read-only)
    this.hideFunctionsProperty = hideFunctionsProperty;
    this.functionNodes = functionNodes;
    this.functionsParent = functionsParent;
    this.moleCardsLayer = moleCardsLayer;
    this.seeInsideCardNode = null; // {CardNode} 1 card that may occupy the 'see inside' windows, see issue #44
  }

  /**
   * Returns all functions to the carousel immediately, no animation.
   */
  public reset(): void {
    for ( let i = 0; i < this.functionNodes.length; i++ ) {
      const functionNode = this.functionNodes[ i ];
      if ( functionNode ) {
        this.removeFunctionNode( functionNode );
        functionNode && functionNode.moveToCarousel();
      }
    }
  }

  /**
   * Adds a FunctionNode to the builder.
   */
  public addFunctionNode( functionNode: FunctionNode, slotNumber: number ): void {

    assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
    assert && assert( !this.containsFunctionNode( functionNode ), 'function is already in builder' );
    assert && assert( !this.functionNodes[ slotNumber ], `slot ${slotNumber} is occupied` );

    // add to view
    this.functionNodes[ slotNumber ] = functionNode;
    this.functionsParent.addChild( functionNode );
    functionNode.center = this.builder.slots[ slotNumber ].position.minus( this.builder.position ); // center in slot

    // add to model
    this.builder.addFunctionInstance( functionNode.functionInstance, slotNumber );
    assert && assert( this.builder.containsFunctionInstance( functionNode.functionInstance ) );

    // hide the identity of function in the builder, if feature is enabled
    functionNode.identityVisibleProperty.value = !this.hideFunctionsProperty.value;
  }

  /**
   * Removes a FunctionNode from the builder.
   * @returns slot number that functionNode was removed from
   */
  public removeFunctionNode( functionNode: FunctionNode ): number {

    const slotNumber = this.functionNodes.indexOf( functionNode );
    assert && assert( slotNumber !== -1, 'functionNode is not in builder' );

    // remove from view, restore position in model coordinate frame
    this.functionNodes[ slotNumber ] = null;
    this.functionsParent.removeChild( functionNode );
    functionNode.center = functionNode.functionInstance.position;

    // remove from model
    this.builder.removeFunctionInstance( functionNode.functionInstance, slotNumber );
    assert && assert( !this.builder.containsFunctionInstance( functionNode.functionInstance ) );

    // reveal function's identity
    functionNode.identityVisibleProperty.value = true;

    return slotNumber;
  }

  /**
   * Gets the FunctionNode in the specified slot. Returns null if the slot is empty.
   */
  public getFunctionNode( slotNumber: number ): FunctionNode | null {
    assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
    return this.functionNodes[ slotNumber ];
  }

  /**
   * Does the builder contain the specified FunctionNode?
   */
  public containsFunctionNode( functionNode: FunctionNode ): boolean {
    return this.functionNodes.includes( functionNode );
  }

  /**
   * Adds the 'mole under the carpet' representation of a card.
   * Moles are added when cards are created, and persist for the lifetime of the sim.
   */
  public addMole( card: Card ): void {
    this.moleCardsLayer.addChild( new MoleCardNode( card, this.builder.position ) );
  }
}

functionBuilder.register( 'BuilderNode', BuilderNode );