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

Blockly.Blocks['ifthen'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck(null)
        .appendField("if");
    this.appendStatementInput("action")
        .setCheck(null)
        .appendField("then");
    this.setNextStatement(true, null);
    this.setDeletable(false);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['or'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck("");
    this.appendValueInput("Condition2")
        .setCheck("")
        .appendField("OR");
    this.setOutput(true, "");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['asset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Asset is assigned to")
        .appendField(new Blockly.FieldDropdown([["Term1","Term1"], ["Term2","Term2"], ["Term3","Term3"]]), "NAME");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['setdataqualitythreshold'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Data Quality Score Threshold to")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "NAME")
        .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['enablealldataqualitydimensions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enable All Data Quality Dimensions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

var disabledataqualitydimensionlist = [
        ["Data Class Violation","DataClassViolation"],
        ["Data Type Violation","DataTypeViolation"],
        ["Duplicate Values","UniquenessViolation"],
        ["Format Violations","FormatViolation"],
        ["Inconsistent missing value representation","NonStandardMissingValue"],
        ["Inconsistent usage of upper and lower cases","CaseViolation"],
        ["Missing Values","MissingValue"],
        ["Rule Violations","RuleViolation"],
        ["Suspect Values","SuspectValues"],
        ["Suspect Values (Classification Violations)","SuspectClassifiedValue"],
        ["Suspect Values (Correlation Violations)","SuspectCorrelatedValue"],
        ["Value Range Violations","ValueRangeViolation"]
        ];

Blockly.Blocks['disabledataqualitydimension'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Disable Data Quality Dimension")
        .appendField(new Blockly.FieldDropdown(disabledataqualitydimensionlist), "dataquality");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['disablealldataqualitydimensions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Disable All Data Quality Dimensions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

var enabledataqualitydimensionlist = [
    ["Missing Values","MissingValue"],
    ["Data Type Violation","DataTypeViolation"],
    ["Data Class Violation","DataClassViolation"],
    ["Value Range Violations","ValueRangeViolation"],
    ["Format Violations","FormatViolation"],
    ["Suspect Values","SuspectValues"],
    ["Inconsistent missing value representation","NonStandardMissingValue"],
    ["Duplicate Values","UniquenessViolation"],
    ["Rule Violations","RuleViolation"],
    ["Inconsistent usage of upper and lower cases","CaseViolation"],
    ["Suspect Values (Correlation Violations)","SuspectCorrelatedValue"], 
    ["Suspect Values (Classification Violations)","SuspectClassifiedValue"]
    ];

Blockly.Blocks['enabledataqualitydimension'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enable Data Quality Dimension")
        .appendField(new Blockly.FieldDropdown(enabledataqualitydimensionlist), "dataquality");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['automaticallybinddataruledefinition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Automatically bind Data Rule Definition")
        .appendField(new Blockly.FieldDropdown([["Rule 1","rule1"], ["Rule 2","rule2"], ["Rule 3","rule3"]]), "rules");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(186);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// BLOCK CODE GENERATION
/*
{
   "name":"ActionableRule_1",
   "condition_":{"type_":"OR",
                   "left_":{"type_":"TermAssignment", "value_":"term1"},
                    "right_":{"type_":"TermAssignment", "value_":"term2"}
               },
   "actions_":[
   {"type_":"EnableDQDimension", "value_":"MissingValues"},
   {"type_":"EnableDQDimension", "value_":"FormatValues"},
   {"type_":"BindDataRule", "value_":"rule1"},
   {"type_":"BindDataRule", "value_":"rule2"},
   {"type_":"SetDQThreshold", "value_":"90"}
   ]
}  


{
   "name":"ActionableRule_1",
   "condition_": {"type_":"TermAssignment", "value_":"term1"},
   "actions_":[
   {"type_":"EnableDQDimension", "value_":"MissingValues"},
   {"type_":"EnableDQDimension", "value_":"FormatValues"},
   {"type_":"BindDataRule", "value_":"rule1"},
   {"type_":"BindDataRule", "value_":"rule2"},
   {"type_":"SetDQThreshold", "value_":"90"}
   ]
   
}   


 + '\n]\n}'
 
 
*/
Blockly.JavaScript['ifthen'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"condition_":{' + value_condition + ',"actions_":[' + statements_action;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['or'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = '"type_":"OR","left_":' + value_condition1 + ',"right_":' + value_condition2 + "}" ;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['asset'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"TermAssignment","value_":"' + text_name + '"}';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['setdataqualitythreshold'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"SetDQThreshold","value_":"' + number_name + '"},';
  return code;
};

Blockly.JavaScript['enablealldataqualitydimensions'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"EnableAllDataQualityDmensions"},';
  return code;
};

Blockly.JavaScript['disabledataqualitydimension'] = function(block) {
  var dropdown_dataquality = block.getFieldValue('dataquality');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"DisableDQDimension","value_":"' + dropdown_dataquality + '"},';
  return code;
};

Blockly.JavaScript['disablealldataqualitydimensions'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"DisableAllDataQualityDimensions"},';
  return code;
};

Blockly.JavaScript['enabledataqualitydimension'] = function(block) {
  var dropdown_dataquality = block.getFieldValue('dataquality');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"EnableDQDimension","value_":"' + dropdown_dataquality + '"},';
  return code;
};

Blockly.JavaScript['automaticallybinddataruledefinition'] = function(block) {
  var dropdown_rules = block.getFieldValue('rules');
  // TODO: Assemble JavaScript into code variable.
  var code = '{"type_":"BindDataRule","value_":"' + dropdown_rules + '"},';
  return code;
};


