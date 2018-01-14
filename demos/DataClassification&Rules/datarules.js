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
 * @fileoverview Generating DataRule for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.DataRule.texts');

goog.require('Blockly.DataRule');

goog.provide('Blockly.Blocks.texts'); // Deprecated
goog.provide('Blockly.Constants.Text');

goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDate');

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
        .appendField(new Blockly.FieldTextInput("variable"), "variable");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['ifthen'] = {
  init: function() {
    this.appendValueInput("Condition")
        .setCheck("Boolean")
        .appendField("IF");
    this.appendValueInput("Action")
        .setCheck("Boolean")
        .appendField("THEN");
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ifthenelse'] = {
  init: function() {
    this.appendValueInput("Condition")
        .setCheck("Boolean")
        .appendField("IF");
    this.appendValueInput("Action")
        .setCheck("Boolean")
        .appendField("THEN");
    this.appendValueInput("AlternateAction")
        .setCheck("Boolean")
        .appendField("ELSE");
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck("Boolean");
    this.appendValueInput("Condition2")
        .setCheck("Boolean")
        .appendField("AND");
    this.setOutput(true, "Boolean");
    this.setColour(202);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['or'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck("Boolean");
    this.appendValueInput("Condition2")
        .setCheck("Boolean")
        .appendField("OR");
    this.setOutput(true, "Boolean");
    this.setColour(202);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['not'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Boolean")
        .appendField("NOT");
    this.setOutput(true, "Boolean");
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
        .appendField(new Blockly.FieldTextInput("val"), "stringInput")
        .appendField("'");
    this.setInputsInline(true);
    this.setOutput(true, "string");
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['numericliteral'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "numericInput");
    this.setOutput(true, "numeric");
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['example_date'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('date:')
        .appendField(new Blockly.FieldDate('2015-02-05'), 'FIELDNAME');
  }
};


Blockly.Blocks['addition'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("+");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['subtraction'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("-");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['multiplication'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("*");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['division'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("/");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['power'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("^");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['modulo'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(["numeric"]);
    this.appendValueInput("operand2")
        .setCheck(["numeric"])
        .appendField("modulo");
    this.setInputsInline(true);
    this.setOutput(true, "numeric");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




/* ##################################################
		###################	Block Code Generations ###################
		##################################################
*/

Blockly.DataRule['variable'] = function(block) {
  var text_variable = block.getFieldValue('variable');
  var code = text_variable;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['ifthen'] = function(block) {
  var condition = Blockly.DataRule.valueToCode(block, 'Condition', Blockly.DataRule.ORDER_ATOMIC);
  var action = Blockly.DataRule.valueToCode(block, 'Action', Blockly.DataRule.ORDER_ATOMIC);
  var code = 'IF ' + condition + ' THEN ' + action;
  return code;
};

Blockly.DataRule['ifthenelse'] = function(block) {
  var condition = Blockly.DataRule.valueToCode(block, 'Condition', Blockly.DataRule.ORDER_ATOMIC);
  var action = Blockly.DataRule.valueToCode(block, 'Action', Blockly.DataRule.ORDER_ATOMIC);
  var alternate_action = Blockly.DataRule.valueToCode(block, 'AlternateAction', Blockly.DataRule.ORDER_ATOMIC);
  var code = 'IF ' + condition + ' THEN ' + action + 'ELSE' + alternate_action;
  return code;
};

Blockly.DataRule['and'] = function(block) {
  var value_name1 = Blockly.DataRule.valueToCode(block, 'Condition1', Blockly.DataRule.ORDER_ATOMIC);
  var value_name2 = Blockly.DataRule.valueToCode(block, 'Condition2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_name1 + ' AND ' + value_name2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['or'] = function(block) {
  var value_name1 = Blockly.DataRule.valueToCode(block, 'Condition1', Blockly.DataRule.ORDER_ATOMIC);
  var value_name2 = Blockly.DataRule.valueToCode(block, 'Condition2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_name1 + ' OR ' + value_name2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['not'] = function(block) {
  var value_name = Blockly.DataRule.valueToCode(block, 'NAME', Blockly.DataRule.ORDER_ATOMIC);
  var code = 'NOT ' + value_name + ' ';
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['stringliteral'] = function(block) {
  var text_stringinput = block.getFieldValue('stringInput');
  // TODO: Assemble DataRule into code variable.
  var code = "'" + text_stringinput + "'";
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['numericliteral'] = function(block) {
  var number_numericinput = block.getFieldValue('numericInput');
  // TODO: Assemble DataRule into code variable.
  var code = number_numericinput;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['addition'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' + ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['subtraction'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' - ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['multiplication'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' * ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['division'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' / ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['power'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' ^ ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.DataRule['modulo'] = function(block) {
  var value_operand1 = Blockly.DataRule.valueToCode(block, 'operand1', Blockly.DataRule.ORDER_ATOMIC);
  var value_operand2 = Blockly.DataRule.valueToCode(block, 'operand2', Blockly.DataRule.ORDER_ATOMIC);
  var code = value_operand1 + ' % ' + value_operand2;
  return [code, Blockly.DataRule.ORDER_ATOMIC];
};





