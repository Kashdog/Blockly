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
    init: function () {
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
    init: function () {
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
    init: function () {
        this.appendDummyInput()
            .appendField("Asset is assigned to")
            .appendField(new Blockly.FieldDropdown([["Term1", "Term1"], ["Term2", "Term2"], ["Term3", "Term3"]]), "NAME");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['setdataqualitythreshold'] = {
    init: function () {
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
    init: function () {
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
    ["Data Class Violation", "DataClassViolation"],
    ["Data Type Violation", "DataTypeViolation"],
    ["Duplicate Values", "UniquenessViolation"],
    ["Format Violations", "FormatViolation"],
    ["Inconsistent missing value representation", "NonStandardMissingValue"],
    ["Inconsistent usage of upper and lower cases", "CaseViolation"],
    ["Missing Values", "MissingValue"],
    ["Rule Violations", "RuleViolation"],
    ["Suspect Values", "SuspectValues"],
    ["Suspect Values (Classification Violations)", "SuspectClassifiedViolation"],
    ["Suspect Values (Correlation Violations)", "SuspectCorrelatedViolation"],
    ["Value Range Violations", "ValueRangeViolation"]
];

var disableDQList = [
    "DataClassViolation",
    "DataTypeViolation",
    "UniquenessViolation",
    "FormatViolation",
    "NonStandardMissingValue",
    "CaseViolation",
    "MissingValue",
    "RuleViolation",
    "SuspectValues",
    "SuspectClassifiedViolation",
    "SuspectCorrelatedViolation",
    "ValueRangeViolation"
];

Blockly.defineBlocksWithJsonArray([{
    "type": "disabledataqualitydimension"
    , "message0": "Disable Data Quality Dimension %1"
    , "args0": [
        {
            "type": "field_dropdown"
            , "name": "DIMENSIONS"
            , "options": disabledataqualitydimensionlist
        }
    ]
    , "previousStatement": null
    , "nextStatement": null
    , "colour": 186
    , "tooltip": ""
    , "helpUrl": ""
    , "mutator": "disable_dataquality_dimension_mutator"
}]);


Blockly.Constants.DISABLE_DQ_DIM_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    fieldValue: "",

    mutationToDom: function () {
        var container = document.createElement('mutation');
        return container;
    }
    , /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {

    }
    , /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateList_: function (dimensions) {



        disabledataqualitydimensionlist = [
            ["Data Class Violation", "DataClassViolation"],
            ["Data Type Violation", "DataTypeViolation"],
            ["Duplicate Values", "UniquenessViolation"],
            ["Format Violations", "FormatViolation"],
            ["Inconsistent missing value representation", "NonStandardMissingValue"],
            ["Inconsistent usage of upper and lower cases", "CaseViolation"],
            ["Missing Values", "MissingValue"],
            ["Rule Violations", "RuleViolation"],
            ["Suspect Values", "SuspectValues"],
            ["Suspect Values (Classification Violations)", "SuspectClassifiedViolation"],
            ["Suspect Values (Correlation Violations)", "SuspectCorrelatedViolation"],
            ["Value Range Violations", "ValueRangeViolation"]
        ];

        disableDQList = [
            "DataClassViolation",
            "DataTypeViolation",
            "UniquenessViolation",
            "FormatViolation",
            "NonStandardMissingValue",
            "CaseViolation",
            "MissingValue",
            "RuleViolation",
            "SuspectValues",
            "SuspectClassifiedViolation",
            "SuspectCorrelatedViolation",
            "ValueRangeViolation"
        ];

        var disableDQListX = [
            "Data Class Violation",
            "Data Type Violation",
            "Duplicate Values",
            "Format Violations",
            "Inconsistent missing value representation",
            "Inconsistent usage of upper and lower cases",
            "Missing Values",
            "Rule Violations",
            "Suspect Values",
            "Suspect Values (Classification Violations)",
            "Suspect Values (Correlation Violations)",
            "Value Range Violations"
        ];

        this.fieldValue = this.getFieldValue("DIMENSIONS");

        [].forEach.call(dimensions, function (dimension, index) {
            var dimension_index = disableDQList.indexOf(dimension);
            if (dimension_index != -1) {
                disabledataqualitydimensionlist.splice(dimension_index, 1);
                disableDQList.splice(dimension_index, 1);
            }
        });
        this.removeInput("");
        this.appendDummyInput().appendField("Disable Data Quality Dimension").appendField(new Blockly.FieldDropdown(disabledataqualitydimensionlist), "DIMENSIONS");
        if (disableDQList.indexOf(this.fieldValue) != -1) {
            this.setFieldValue(this.fieldValue, "DIMENSIONS");
        }
    }
};

Blockly.Extensions.registerMutator('disable_dataquality_dimension_mutator'
    , Blockly.Constants.DISABLE_DQ_DIM_MUTATOR_MIXIN);

Blockly.Blocks['disablealldataqualitydimensions'] = {
    init: function () {
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
    ["Data Class Violation", "DataClassViolation"],
    ["Data Type Violation", "DataTypeViolation"],
    ["Duplicate Values", "UniquenessViolation"],
    ["Format Violations", "FormatViolation"],
    ["Inconsistent missing value representation", "NonStandardMissingValue"],
    ["Inconsistent usage of upper and lower cases", "CaseViolation"],
    ["Missing Values", "MissingValue"],
    ["Rule Violations", "RuleViolation"],
    ["Suspect Values", "SuspectValues"],
    ["Suspect Values (Classification Violations)", "SuspectClassifiedViolation"],
    ["Suspect Values (Correlation Violations)", "SuspectCorrelatedViolation"],
    ["Value Range Violations", "ValueRangeViolation"]
];

Blockly.Blocks['enabledataqualitydimension'] = {
    init: function () {
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
    init: function () {
        this.appendDummyInput()
            .appendField("Automatically bind Data Rule Definition")
            .appendField(new Blockly.FieldDropdown([["Rule 1", "rule1"], ["Rule 2", "rule2"], ["Rule 3", "rule3"]]), "rules");
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
Blockly.JavaScript['ifthen'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"condition_":{' + value_condition + ',"actions_":[' + statements_action;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['or'] = function (block) {
    var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_condition2 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
    //  Assemble JavaScript into code variable.
    var code = '"type_":"OR","left_":' + value_condition1 + ',"right_":' + value_condition2 + "}";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['asset'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"TermAssignment","value_":"' + text_name + '"}';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['setdataqualitythreshold'] = function (block) {
    var number_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"SetDQThreshold","value_":"' + number_name + '"},';
    return code;
};

Blockly.JavaScript['enablealldataqualitydimensions'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"EnableAllDataQualityDmensions"},';
    return code;
};

Blockly.JavaScript['disabledataqualitydimension'] = function (block) {
    var dropdown_dataquality = block.getFieldValue('DIMENSIONS');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"DisableDQDimension","value_":"' + dropdown_dataquality + '"},';
    return code;
};

Blockly.JavaScript['disablealldataqualitydimensions'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"DisableAllDataQualityDimensions"},';
    return code;
};

Blockly.JavaScript['enabledataqualitydimension'] = function (block) {
    var dropdown_dataquality = block.getFieldValue('dataquality');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"EnableDQDimension","value_":"' + dropdown_dataquality + '"},';
    return code;
};

Blockly.JavaScript['dummydatalist'] = function (block) {
    var dropdown_dataquality = block.getFieldValue('dataquality');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"EnableDQDimension","value_":"' + dropdown_dataquality + '"},';
    return code;
};

Blockly.JavaScript['automaticallybinddataruledefinition'] = function (block) {
    var dropdown_rules = block.getFieldValue('rules');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type_":"BindDataRule","value_":"' + dropdown_rules + '"},';
    return code;
};