/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.texts');

goog.require('Blockly.JavaScript');

goog.provide('Blockly.Blocks.texts'); // Deprecated
goog.provide('Blockly.Constants.Text');

goog.require('Blockly.Blocks');

Blockly.Constants.Text.HUE = 160;
/** @deprecated Use Blockly.Constants.Text.HUE */
Blockly.Blocks.texts.HUE = Blockly.Constants.Text.HUE;

/* ##################################################
		###################	Block Definitions ###################
		##################################################
*/

Blockly.Blocks['variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("variabl4"), "variable");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['ifthen'] = {
  init: function() {
    this.appendValueInput("Condition")
        .setCheck(null)
        .appendField("IF");
    this.appendValueInput("Action")
        .setCheck(null)
        .appendField("THEN");
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ifthenelse'] = {
  init: function() {
    this.appendValueInput("Condition")
        .setCheck(null)
        .appendField("IF");
    this.appendValueInput("Action")
        .setCheck(null)
        .appendField("THEN");
    this.appendValueInput("AlternateAction")
        .setCheck(null)
        .appendField("ELSE");
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck(null);
    this.appendValueInput("Condition2")
        .setCheck(null)
        .appendField("AND");
    this.setOutput(true, null);
    this.setColour(202);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['or'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck(null);
    this.appendValueInput("Condition2")
        .setCheck(null)
        .appendField("OR");
    this.setOutput(true, null);
    this.setColour(202);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['not'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("NOT");
    this.setOutput(true, null);
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['stringliteral'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("'");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("val"), "NAME")
        .appendField("'");
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['numericliteral'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "numericInput");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['addition'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("+");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['subtraction'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("-");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['multiplication'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("*");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['division'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("/");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['power'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("^");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['modulo'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("modulo");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




/* ##################################################
		###################	Block Code Generations ###################
		##################################################
*/

Blockly.JavaScript['variable'] = function(block) {
  var text_variable = block.getFieldValue('variable');
  var code = text_variable;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ifthen'] = function(block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'Condition', Blockly.JavaScript.ORDER_ATOMIC);
  var action = Blockly.JavaScript.valueToCode(block, 'Action', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'IF ' + condition + ' THEN ' + action;
  return code;
};

Blockly.JavaScript['ifthenelse'] = function(block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'Condition', Blockly.JavaScript.ORDER_ATOMIC);
  var action = Blockly.JavaScript.valueToCode(block, 'Action', Blockly.JavaScript.ORDER_ATOMIC);
  var alternate_action = Blockly.JavaScript.valueToCode(block, 'AlternateAction', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'IF ' + condition + ' THEN ' + action + 'ELSE' + alternate_action;
  return code;
};

Blockly.JavaScript['and'] = function(block) {
  var value_name1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_name2 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name1 + ' AND ' + value_name2;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['or'] = function(block) {
  var value_name1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_name2 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name1 + ' OR ' + value_name2;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['not'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'NOT ' + value_name + ' ';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['stringliteral'] = function(block) {
  var text_stringinput = block.getFieldValue('stringInput');
  // TODO: Assemble JavaScript into code variable.
  var code = "'" + text_stringinput + "'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numericliteral'] = function(block) {
  var number_numericinput = block.getFieldValue('numericInput');
  // TODO: Assemble JavaScript into code variable.
  var code = number_numericinput;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['addition'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' + ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['subtraction'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' - ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['multiplication'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' * ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['division'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' / ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['power'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' ^ ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['modulo'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_operand1 + ' % ' + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};





