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

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block for text value
    {
        "type": "text"
        , "message0": "%1"
        , "args0": [{
            "type": "field_input"
            , "name": "TEXT"
            , "text": ""
    }]
        , "output": "String"
        , "colour": "%{BKY_TEXTS_HUE}"
        , "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}"
        , "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}"
        , "extensions": [
      "text_quotes"
      
            , "parent_tooltip_when_inline"
    ]
  }
    
    , {
        "type": "text_join"
        , "message0": ""
        , "output": "String"
        , "colour": "%{BKY_TEXTS_HUE}"
        , "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}"
        , "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}"
        , "mutator": "text_join_mutator"

  }
    
    , {
        "type": "text_create_join_container"
        , "message0": "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2"
        , "args0": [{
                "type": "input_dummy"
    }
            
            , {
                "type": "input_statement"
                , "name": "STACK"
    }]
        , "colour": "%{BKY_TEXTS_HUE}"
        , "tooltip": "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}"
        , "enableContextMenu": false
  }
    
    , {
        "type": "text_create_join_item"
        , "message0": "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}"
        , "previousStatement": null
        , "nextStatement": null
        , "colour": "%{BKY_TEXTS_HUE}"
        , "tooltip": "{%BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}"
        , "enableContextMenu": false
  }
    
    , {
        "type": "text_append"
        , "message0": "%{BKY_TEXT_APPEND_TITLE}"
        , "args0": [{
                "type": "field_variable"
                , "name": "VAR"
                , "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
    }
            
            , {
                "type": "input_value"
                , "name": "TEXT"
    }]
        , "previousStatement": null
        , "nextStatement": null
        , "colour": "%{BKY_TEXTS_HUE}"
        , "extensions": [
      "text_append_tooltip"
    ]
  }
    
    , {
        "type": "text_length"
        , "message0": "%{BKY_TEXT_LENGTH_TITLE}"
        , "args0": [
            {
                "type": "input_value"
                , "name": "VALUE"
                , "check": ['String', 'Array']
      }
    ]
        , "output": 'Number'
        , "colour": "%{BKY_TEXTS_HUE}"
        , "tooltip": "%{BKY_TEXT_LENGTH_TOOLTIP}"
        , "helpUrl": "%{BKY_TEXT_LENGTH_HELPURL}"
  }
    
    , {
        "type": "text_isEmpty"
        , "message0": "%{BKY_TEXT_ISEMPTY_TITLE}"
        , "args0": [
            {
                "type": "input_value"
                , "name": "VALUE"
                , "check": ['String', 'Array']
      }
    ]
        , "output": 'Boolean'
        , "colour": "%{BKY_TEXTS_HUE}"
        , "tooltip": "%{BKY_TEXT_ISEMPTY_TOOLTIP}"
        , "helpUrl": "%{BKY_TEXT_ISEMPTY_HELPURL}"
  }
    
    , {
        "type": "text_indexOf"
        , "message0": "%{BKY_TEXT_INDEXOF_TITLE}"
        , "args0": [
            {
                "type": "input_value"
                , "name": "VALUE"
                , "check": "String"
      }
            
            , {
                "type": "field_dropdown"
                , "name": "END"
                , "options": [
          [
            "%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}"
            
                        , "FIRST"
          ]
          
                    , [
            "%{BKY_TEXT_INDEXOF_OPERATOR_LAST}"
            
                        , "LAST"
          ]
        ]
      }
            
            , {
                "type": "input_value"
                , "name": "FIND"
                , "check": "String"
      }
    ]
        , "output": "Property"
        , "colour": "%{BKY_TEXTS_HUE}"
        , "helpUrl": "%{BKY_TEXT_INDEXOF_HELPURL}"
        , "inputsInline": true
        , "extensions": [
      "text_indexOf_tooltip"
    ]
  }
    
    , {
        "type": "text_charAt"
        , "message0": "%{BKY_TEXT_CHARAT_TITLE}", // "in text %1 %2"
        "args0": [
            {
                "type": "input_value"
                , "name": "VALUE"
                , "check": "String"
      }
            
            , {
                "type": "input_dummy"
                , "name": "AT"
      }
    ]
        , "output": "String"
        , "colour": "%{BKY_TEXTS_HUE}"
        , "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}"
        , "inputsInline": true
        , "mutator": "text_charAt_mutator"
  }
]);

Blockly.Blocks['text_getSubstring'] = {
    /**
     * Block for getting substring.
     * @this Blockly.Block
     */
    init: function () {
        this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START']
      
            , [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END']
      
            , [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']
    ];
        this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START']
      
            , [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END']
      
            , [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']
    ];
        this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('STRING')
            .setCheck('String')
            .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, "Property");
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
    }
    , /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    }
    , /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    }
    , /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independant of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        // Move tail, if present, to end of block.
        if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
            this.removeInput('TAIL', true);
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n]
            , function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a
                // closure.
                if (newAt != isAt) {
                    var block = this.sourceBlock_;
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.
                    // Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });

        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
        }
    }
};

Blockly.Blocks['text_changeCase'] = {
    /**
     * Block for changing capitalization.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE']
      
            , [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE']
      
            , [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']
    ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('StringtoChangeCase')
            .setCheck('Value')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
        this.setOutput(true, 'Property');
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
    }
};

Blockly.Blocks['text_trim'] = {
    /**
     * Block for trimming spaces.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
      [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, 'BOTH']
      
            , [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, 'LEFT']
      
            , [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']
    ];
        this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('StringToTrim')
            .setCheck('Value')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.setOutput(true, 'Pro');
        this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP);
    }
};

Blockly.JavaScript['forloop'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var variable = block.getFieldValue('variable');
  var code = 'var ' + variable + '; \n' + 'for (' + variable + '=0; ' + variable + '<columns.length-1;'+ variable + '++){ \n \t' + value_name +"\n}";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['ifthen'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_action1 = Blockly.JavaScript.valueToCode(block, 'Action1', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = 'if(' + value_condition1 + '){\n \t' + value_action1 +";\n}";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['elseifthen'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_action1 = Blockly.JavaScript.valueToCode(block, 'Action1', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="\nelse if(" + value_condition1 + ")\n\t" + value_action1 +";\n";
  return code;
};

Blockly.JavaScript['elsethen'] = function(block) {
  var value_action1 = Blockly.JavaScript.valueToCode(block, 'Action1', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '\nelse \n\t' +value_action1 +";\n";
  return code;
};

Blockly.JavaScript['and'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_condition1 + ' && ' + value_condition2;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['or'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'Condition1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'Condition2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_condition1 + ' || ' + value_condition2;
  return code;
};

Blockly.JavaScript['positiveclassification'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'return true';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['negativeclassification'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'return false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['textvalue'] = function(block) {
  var text_textinput = block.getFieldValue('textInput');
  //  Assemble JavaScript into code variable.
  var code = '"' + text_textinput + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['format'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'valueProperties.format ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['nameofcolumn'] = function(block) {
  var text_columnname = block.getFieldValue('columnName');
  //  Assemble JavaScript into code variable.
  var code = 'column.name ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ridofcolumn'] = function(block) {
  var number_columnrid = block.getFieldValue('columnRID');
  //  Assemble JavaScript into code variable.
  var code = 'column.rid';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['is'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg2 = Blockly.JavaScript.valueToCode(block, 'arg2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + ' == ' + value_arg2;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['isnot'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg2 = Blockly.JavaScript.valueToCode(block, 'arg2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + ' != ' + value_arg2;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['exists'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + ' != null';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['doesnotexist'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + ' == null';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['contains'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg2 = Blockly.JavaScript.valueToCode(block, 'arg2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + '.indexOf(' +value_arg2 + ')>=0';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['startswith'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg2 = Blockly.JavaScript.valueToCode(block, 'arg2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = value_arg1 + '.indexOf(' +value_arg2 + ')==0';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['endswith'] = function(block) {
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'arg1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg2 = Blockly.JavaScript.valueToCode(block, 'arg2', Blockly.JavaScript.ORDER_ATOMIC);
  //  Assemble JavaScript into code variable.
  var code = '...';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['comparison'] = function(block) {
  var value_name1 = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_name2 = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name1 + dropdown_operator + " "  + value_name2;
  return code;
};


Blockly.JavaScript['numberofnullvalues'] = function(block) {
  var code = 'column.nbOfNullValues ';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofemptyvalues'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.nbOfEmptyValues ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofmissingvalues'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = '(column.nbOfNullValues+column.nbOfEmptyValues) ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofnonmissingvalues'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = '(column.nbOfValues-column.nbOfNullValues-column.nbOfEmptyValues) ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofuniquevalues'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.nbOfUniqueValues ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['inferredformatofthecolumn'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.inferredFormat ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferreddataclassofthecolumn'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.inferredDataClass ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['inferreddataclassisposition'] = function(block) {
  var number_number = block.getFieldValue('columnposition');
  var dropdown_dataclass = block.getFieldValue('DataClass');
  var code = 'columns' + "[" + number_number + "].inferredDataClass == '" + dropdown_dataclass + "'";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferreddatatypeofthecolumn'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.inferredDataType ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['nameofcolumnposition'] = function(block) {
  var number_number = block.getFieldValue('number');
  var code = 'columns' + "[" + number_number + "].name";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ridofcolumnposition'] = function(block) {
  var number_number = block.getFieldValue('number');
  var code = 'columns' + "[" + number_number + "].rid";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferredformatofthecolumnposition'] = function(block) {
  var number_number = block.getFieldValue('number');
  var code = 'columns' + "[" + number_number + "].inferredFormat";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferreddataclassofthecolumnposition'] = function(block) {
  var number_number = block.getFieldValue('number');
  var code = 'columns' + "[" + number_number + "].inferredDataClass";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferreddatatypeofthecolumnposition'] = function(block) {
  var number_number = block.getFieldValue('number');
  var code = 'columns' + "[" + number_number + "].inferredDataType";
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['minimumstringvalue'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.minStringValue ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maximumstringvalue'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.maxStringValue ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['minimumnumericvalue'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.minNumber ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maximumnumericvalue'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'column.maxNumber ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['frequencyofthevalue'] = function(block) {
  //  Assemble JavaScript into code variable.
  var code = 'valueProperties.frequency ';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['dataclass'] = function(block) {
  var dropdown_dataclass = block.getFieldValue('DataClass');
  var code = "'" + dropdown_dataclass + "'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['inferreddataclassis'] = function(block) {
  var dropdown_dataclass = block.getFieldValue('DataClass');
  var code = 'column.inferredDataClass == ' + dropdown_dataclass;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['number'] = function(block) {
  var number_number = block.getFieldValue('number');
  // TODO: Assemble JavaScript into code variable.
  var code = number_number;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['arithmetic'] = function(block) {
  var number_name1 = block.getFieldValue('input1');
  var dropdown_name = block.getFieldValue('Dropdown');
  var number_name2 = block.getFieldValue('input2');
  var code = number_name1 + " " + dropdown_name + " " + number_name2;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['round'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var number_roundednumber = block.getFieldValue('roundedNumber');
  var code = dropdown_name + number_roundednumber + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['constrain'] = function(block) {
  var number_name1 = block.getFieldValue('constrain');
  var number_name2 = block.getFieldValue('low');
  var number_name3 = block.getFieldValue('high');
  var code = "Math.min(Math.max(" + number_name1 + "," + number_name2 + "), " + number_name3 + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['classifycolumn'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var number_confidence = block.getFieldValue('confidence');
  var dataclass = block.getFieldValue('DataClass');
  var code = 'classify(columns[' + number_columnposition + "], '" + dataclass + "', " + number_confidence + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['minimumstringvalueposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.minStringValue[' + number_columnposition + ']' ;
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maximumstringvalueposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.maxStringValue[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['minimumnumericvalueposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.minNumber[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maximumnumericvalueposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.maxNumber[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['frequencyofthevalueposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'valueProperties.frequency[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofnullvaluesposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');    
  var code = 'column.nbOfNullValues[' + number_columnposition + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofemptyvaluesposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.nbOfEmptyValues[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofmissingvaluesposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = '(column.nbOfNullValues+column.nbOfEmptyValues)[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofnonmissingvaluesposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = '(column.nbOfValues-column.nbOfNullValues-column.nbOfEmptyValues)[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['numberofuniquevaluesposition'] = function(block) {
  var number_columnposition = block.getFieldValue('columnposition');
  var code = 'column.nbOfUniqueValues[' + number_columnposition + ']';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'value';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['forloop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("For each column at position  ")
        .appendField(new Blockly.FieldTextInput("i"), "variable");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['ifthen'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck("Boolean","Check")
        .appendField("If");
    this.appendValueInput("Action1")
        .setCheck("Action")
        .appendField("Then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(202);
    this.setTooltip('');
    this.setHelpUrl('');;
  }
};

Blockly.Blocks['elseifthen'] = {
  init: function() {
    this.appendValueInput("Condition1")
        .setCheck(null)
        .appendField("else if");
    this.appendValueInput("Action1")
        .setCheck(null)
        .appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['elsethen'] = {
  init: function() {
    this.appendValueInput("Action1")
        .setCheck(null)
        .appendField("else then");
    this.setPreviousStatement(true, null);
    this.setColour(202);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("Condition2")
        .setCheck("Boolean",)
        .appendField("");
    this.appendValueInput("Condition1")
        .setCheck("Boolean")
        .appendField("AND");
    this.setOutput(true, "Boolean");
    this.setColour(202);
    this.setTooltip('Vertical And Condition');
    this.setHelpUrl('');
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
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['positiveclassification'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classification is Positive");
    this.setOutput(true, "Action");
    this.setColour(186);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['negativeclassification'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classification is negative");
    this.setOutput(true, "Action");
    this.setColour(186);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['classificationconfidence'] = function(block) {
  var number_confidence = block.getFieldValue('confidence');
  var code = 'return ' + number_confidence;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['textvalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("default"), "textInput");
    this.setOutput(true, "Value");
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "number");
    this.setOutput(true, "Value");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['arithmetic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "input1")
        .appendField(" ");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["x","*"], ["÷","/"], ["^","^"]]), "Dropdown")
        .appendField(" ")
        .appendField(new Blockly.FieldNumber(0), "input2");
    this.setInputsInline(true);
    this.setOutput(true, "Property");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['round'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["round","Math.round("], ["round up","Math.ceil("], ["round down","Math.floor("]]), "NAME")
        .appendField(new Blockly.FieldNumber(0), "roundedNumber");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['constrain'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("constrain ")
        .appendField(new Blockly.FieldNumber(50), "constrain")
        .appendField(" low ")
        .appendField(new Blockly.FieldNumber(1), "low")
        .appendField("high ")
        .appendField(new Blockly.FieldNumber(100), "high");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['format'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Format of the Value");
    this.setOutput(true, "Property");
    this.setColour(42);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};




Blockly.Blocks['is'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendValueInput("arg2")
        .setCheck("Value")
        .appendField("Is");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['isnot'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendValueInput("arg2")
        .setCheck("Value")
        .appendField("is not");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['exists'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendDummyInput()
        .appendField("exists");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['doesnotexist'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendDummyInput()
        .appendField("does not exist");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['contains'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendValueInput("arg2")
        .setCheck("Value")
        .appendField("contains");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['startswith'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendValueInput("arg2")
        .setCheck("Value")
        .appendField("Starts With");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['endswith'] = {
  init: function() {
    this.appendValueInput("arg1")
        .setCheck("Property");
    this.appendValueInput("arg2")
        .setCheck("Value")
        .appendField("ends with");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(218);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['comparison'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["Greater Than",">"], ["Less Than","<"], ["Greater Than or Equal To",">="], ["Less Than or Equal to","<="]]), "operator");
    this.setInputsInline(true);
    this.setColour(218);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['numberofnullvalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of null values");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofemptyvalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of empty values");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofmissingvalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of missing values");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofnonmissingvalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of non missing values");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofuniquevalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of unique values");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofnullvaluesposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of null values at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofemptyvaluesposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of empty values at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofmissingvaluesposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of missing values at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofnonmissingvaluesposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of non missing values at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['numberofuniquevaluesposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("number of unique values at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['nameofcolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Name of Column");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['ridofcolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Rid Of Column");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferredformatofthecolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred format of the column");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferreddataclassofthecolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data class of the column");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferreddatatypeofthecolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data type of the column");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['nameofcolumnposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Name of Column at position")
        .appendField(new Blockly.FieldTextInput("default"), "number");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['ridofcolumnposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Rid Of Column at position")
        .appendField(new Blockly.FieldTextInput("default"), "number");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferredformatofthecolumnposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred format of the column at position")
        .appendField(new Blockly.FieldTextInput("default"), "number");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferreddataclassofthecolumnposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data class of the column at position")
        .appendField(new Blockly.FieldTextInput("default"), "number");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inferreddatatypeofthecolumnposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data type of the column at position")
        .appendField(new Blockly.FieldTextInput("default"), "number");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['minimumstringvalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("minimum string value");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['maximumstringvalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("maximum string value");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['minimumnumericvalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("minimum numeric value");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['maximumnumericvalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("maximum numeric value");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['frequencyofthevalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("frequency of the value");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['minimumstringvalueposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("minimum string value at position ")
      .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['maximumstringvalueposition'] = {
  init: function() {
    this.appendDummyInput()
         .appendField("maximum string value at position ")
         .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['minimumnumericvalueposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("minimum numeric value at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['maximumnumericvalueposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("maximum numeric value at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['frequencyofthevalueposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("frequency of the value at position ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition");
    this.setOutput(true, "Property");
    this.setColour(146);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['dataclass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Data Class")
        .appendField(new Blockly.FieldDatalist("",
        [
        ["Email Address","EA"],
        ["Date","D"],
        ["Date of Birth","DOB"],
        ["Indicator","X"],
        ["Code","C"],
        ["Identifier","I"],
        ["Quantity","Q"],
        ["Text","T"],
        ["NoClassDetected","U"],
        ["French INSEE Number","INSEE"],
        ["Internet Protocol Address","IP"],
        ["Internet Protocol Version 6 Address","IPv6Address"],
        ["Italian Fiscal Code","CF"],
        ["Passport Number","PAN"],
        ["Spanish Fiscal Identification Number","NIF"],
        ["UK National Insurance Number","NINO"],
        ["Uniform Resource Locator","URL"],
        ["US Phone Number","USPHN"],
        ["US Social Security Number","SSN"], 
        ["US Social Security Number Last 4","SSN4"],
        ["US Zip","USZC"],
        ["Canada Post Code","CAPostCode"],
        ["UK Post Code","UKPostCode"],
        ["Ireland Eircode","IEPostCode"],
        ["City","CITY"],
        ["Canadian Social Insurance Number","SIN"],
        ["Computer Host Name","HN"],
        ["International Standard Book Number","ISBN"],
        ["International Securities Identification Number","ISIN"],
        ["Routing Transit Number","RTN"],
        ["Universal Product Code","UPC"], 
        ["Credit Card Number","CCN"],
        ["American Express Card","AMEX"],
        ["Diners Club Card","DC"], 
        ["Discover Card","DSC"], 
        ["Japan CB","JCB"],
        ["Master Card","MC"],
        ["VISA Card","VISA"],
        ["Country Code","CC"],
        ["Gender","GEN"],
        ["Boolean","BOOL"],
        ["US State Code","USSC"],
        ["US State Name","USSN"],
        ["US State Capital Name","USSCP"],
        ["Canada Province Code","CAPC"],
        ["Canada Province Name","CAPN"], 
        ["Country Name","COUNTRY"],
        ["Currency","CURRENCY"],
        ["Temperature","TEMP"],
        ["Percentage","PERCENT"],
        ["Month","MONTH"],
        ["Germany car registration number","CARDE"],
        ["IBAN","IBAN"],
        ["BIC","BIC"],
        ["Latitude","LAT"], 
        ["Longitude","LONG"],
        ["Geographic Coordinates","COORD"],
        ["Airport Code","IATA"],
        ["US National Drug Code","USNDC"],
        ["Address Line 1","AddressLine1"], 
        ["Address Line 2","AddressLine2"],
        ["Address Line 3","AddressLine3"], 
        ["US Employer Identification Number","USEIN"],
        ["UK Province Code","UKPC"],
        ["Individual Taxpayer Identification Number","ITIN"],
        ["Vehicle Identification Number","VIN"],
        ["ICD-10","ICD10"],
        ["Commercial and Government Entity Code","CAGECode"],
        ["Honorific","HONORIFIC"],
        ["US County","USCounty"],
        ["Person Name","PersonName"],
        ["First Name","FirstName"],
        ["Name Suffix","NameSuffix"],
        ["ISO 3166-2 Code","ISOSPCODE"],
        ["State/Province name","STATEPROVNAME"],
        ["DUNS Number","DUNS"],
        ["Driver's License","DL"],
        ["Alabama State Driver's License","ALDL"],
        ["Alaska State Driver's License","AKDL"], 
        ["Arizona State Driver's License","AZDL"],
        ["Arkansas State Driver's License","ARDL"],
        ["California State Driver's License","CADL"],
        ["Colorado State Driver's License","CODL"],
        ["Connecticut State Driver's License","CTDL"],
        ["Delaware State Driver's License","DEDL"],
        ["Florida State Driver's License","FLDL"],
        ["Georgia State Driver's License","GADL"],
        ["Hawaii State Driver's License","HIDL"],
        ["Idaho State Driver's License","IDDL"],
        ["Illinois State Driver's License","ILDL"],
        ["Indiana State Driver's License","INDL"],
        ["Iowa State Driver's License","IADL"],
        ["Kansas State Driver's License","KSDL"],
        ["Kentucky State Driver's License","KYDL"], 
        ["Louisiana State Driver's License","LADL"],
        ["Maine State Driver's License","MEDL"],
        ["Maryland State Driver's License","MDDL"],
        ["Massachusetts State Driver's License","MADL"], 
        ["Michigan State Driver's License","MIDL"], 
        ["Minnesota State Driver's License","MNDL"],
        ["Mississippi State Driver's License","MSDL"],
        ["Missouri State Driver's License","MODL"], 
        ["Montana State Driver's License","MTDL"],
        ["Nebraska State Driver's License","NEDL"],
        ["Nevada State Driver's License","NVDL"],
        ["New Foundland and Labrador Province Driver's License","NLDL"],
        ["New Brunswick Province Driver's License","NBDL"], 
        ["New Hampshire State Driver's License","NHDL"], 
        ["New Jersey State Driver's License","NJDL"],
        ["New Mexico State Driver's License","NMDL"],
        ["New York State Driver's License","NYDL"], 
        ["North Carolina State Driver's License","NCDL"],
        ["North Dakota State Driver's License","NDDL"],
        ["Ohio State Driver's License","OHDL"], 
        ["Oklahoma State Driver's License","OKDL"], 
        ["Oregon State Driver's License","ORDL"],
        ["Pennsylvania State Driver's License","PADL"],
        ["Rhode Island State Driver's License","RIDL"], 
        ["South Carolina State Driver's License","SCDL"],
        ["South Dakota State Driver's License","SDDL"], 
        ["Tennessee State Driver's License","TNDL"], 
        ["Texas State Driver's License","TXDL"],
        ["Utah State Driver's License","UTDL"], 
        ["Vermont State Driver's License","VTDL"], 
        ["Virginia State Driver's License","VADL"], 
        ["Washington State Driver's License","WADL"], 
        ["Washington DC Driver's License","WADCDL"], 
        ["West Virginia State Driver's License","WVDL"],
        ["Wisconsin State Driver's License","WIDL"], 
        ["Wyoming State Driver's License","WYDL"], 
        ["INCO Terms (International Commercial Terms)","INCOTerms"],
        ["Nova Scotia Province Driver's License","NSDL"],
        ["Ontario Province Driver's License","ONDL"],
        ["Alberta Province Driver's License","ABDL"],
        ["Saskatchewan Province Driver's License","SKDL"],
        ["Quebec Province Driver's License","QCDL"],
        ["British Columbia Province Driver's License","BCDL"],
        ["Manitoba Province Driver's License","CPT"], 
        ["Prince Edward Island Province Driver's License","PEDL"],
        ["Current Procedural Terminology","CPT"],
        ["US Standard Industrial Classification","USSIC"],
        ["International Standard Industrial Classification","ISIC"],
        ["Account number","ACCNUM"],
        ["Customer number","CUSTNUM"],
        ["Name of an Organization","Organisation"],
        ["Fortune 1000 company","Fortune1000"],
        ["US street name","STREET"],
        ["Legal marital/civil status.","MARITALSTATUS"],
        ["Color","COLOR"], 
        ["Eye color","EYECOLOR"],
        ["Hair color","HAIRCOLOR"],
        ["International Mobile Equipment Identity","IMEI"],
        ["Mac Address","MAC"], 
        ["Religion","RELIGION"],
        ["Ethnicity","ETHNICITY"],
        ["Political Party","POLITICALPARTY"],
        ["Credit Card Expiration Date","CCEXP"],
        ["Credit Card Validation Number","CCVAL"],
        ["Hobby/Leisure Activity","HOBBY"],
        ["Relationship","RELATIONSHIP"],
        ["Language Code or Name","LANG"], 
        ["Employment Status","EMPLOYMENTSTATUS"]
      ]
    ),
        "DataClass");
    this.setOutput(true,"Value");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['inferreddataclassis'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data class of the column is ")
        .appendField(new Blockly.FieldDropdown([
        ["Email Address","EA"],
        ["Date","D"],
        ["Date of Birth","DOB"],
        ["Indicator","X"],
        ["Code","C"],
        ["Identifier","I"],
        ["Quantity","Q"],
        ["Text","T"],
        ["NoClassDetected","U"],
        ["French INSEE Number","INSEE"],
        ["Internet Protocol Address","IP"],
        ["Internet Protocol Version 6 Address","IPv6Address"],
        ["Italian Fiscal Code","CF"],
        ["Passport Number","PAN"],
        ["Spanish Fiscal Identification Number","NIF"],
        ["UK National Insurance Number","NINO"],
        ["Uniform Resource Locator","URL"],
        ["US Phone Number","USPHN"],
        ["US Social Security Number","SSN"], 
        ["US Social Security Number Last 4","SSN4"],
        ["US Zip","USZC"],
        ["Canada Post Code","CAPostCode"],
        ["UK Post Code","UKPostCode"],
        ["Ireland Eircode","IEPostCode"],
        ["City","CITY"],
        ["Canadian Social Insurance Number","SIN"],
        ["Computer Host Name","HN"],
        ["International Standard Book Number","ISBN"],
        ["International Securities Identification Number","ISIN"],
        ["Routing Transit Number","RTN"],
        ["Universal Product Code","UPC"], 
        ["Credit Card Number","CCN"],
        ["American Express Card","AMEX"],
        ["Diners Club Card","DC"], 
        ["Discover Card","DSC"], 
        ["Japan CB","JCB"],
        ["Master Card","MC"],
        ["VISA Card","VISA"],
        ["Country Code","CC"],
        ["Gender","GEN"],
        ["Boolean","BOOL"],
        ["US State Code","USSC"],
        ["US State Name","USSN"],
        ["US State Capital Name","USSCP"],
        ["Canada Province Code","CAPC"],
        ["Canada Province Name","CAPN"], 
        ["Country Name","COUNTRY"],
        ["Currency","CURRENCY"],
        ["Temperature","TEMP"],
        ["Percentage","PERCENT"],
        ["Month","MONTH"],
        ["Germany car registration number","CARDE"],
        ["IBAN","IBAN"],
        ["BIC","BIC"],
        ["Latitude","LAT"], 
        ["Longitude","LONG"],
        ["Geographic Coordinates","COORD"],
        ["Airport Code","IATA"],
        ["US National Drug Code","USNDC"],
        ["Address Line 1","AddressLine1"], 
        ["Address Line 2","AddressLine2"],
        ["Address Line 3","AddressLine3"], 
        ["US Employer Identification Number","USEIN"],
        ["UK Province Code","UKPC"],
        ["Individual Taxpayer Identification Number","ITIN"],
        ["Vehicle Identification Number","VIN"],
        ["ICD-10","ICD10"],
        ["Commercial and Government Entity Code","CAGECode"],
        ["Honorific","HONORIFIC"],
        ["US County","USCounty"],
        ["Person Name","PersonName"],
        ["First Name","FirstName"],
        ["Name Suffix","NameSuffix"],
        ["ISO 3166-2 Code","ISOSPCODE"],
        ["State/Province name","STATEPROVNAME"],
        ["DUNS Number","DUNS"],
        ["Driver's License","DL"],
        ["Alabama State Driver's License","ALDL"],
        ["Alaska State Driver's License","AKDL"], 
        ["Arizona State Driver's License","AZDL"],
        ["Arkansas State Driver's License","ARDL"],
        ["California State Driver's License","CADL"],
        ["Colorado State Driver's License","CODL"],
        ["Connecticut State Driver's License","CTDL"],
        ["Delaware State Driver's License","DEDL"],
        ["Florida State Driver's License","FLDL"],
        ["Georgia State Driver's License","GADL"],
        ["Hawaii State Driver's License","HIDL"],
        ["Idaho State Driver's License","IDDL"],
        ["Illinois State Driver's License","ILDL"],
        ["Indiana State Driver's License","INDL"],
        ["Iowa State Driver's License","IADL"],
        ["Kansas State Driver's License","KSDL"],
        ["Kentucky State Driver's License","KYDL"], 
        ["Louisiana State Driver's License","LADL"],
        ["Maine State Driver's License","MEDL"],
        ["Maryland State Driver's License","MDDL"],
        ["Massachusetts State Driver's License","MADL"], 
        ["Michigan State Driver's License","MIDL"], 
        ["Minnesota State Driver's License","MNDL"],
        ["Mississippi State Driver's License","MSDL"],
        ["Missouri State Driver's License","MODL"], 
        ["Montana State Driver's License","MTDL"],
        ["Nebraska State Driver's License","NEDL"],
        ["Nevada State Driver's License","NVDL"],
        ["New Foundland and Labrador Province Driver's License","NLDL"],
        ["New Brunswick Province Driver's License","NBDL"], 
        ["New Hampshire State Driver's License","NHDL"], 
        ["New Jersey State Driver's License","NJDL"],
        ["New Mexico State Driver's License","NMDL"],
        ["New York State Driver's License","NYDL"], 
        ["North Carolina State Driver's License","NCDL"],
        ["North Dakota State Driver's License","NDDL"],
        ["Ohio State Driver's License","OHDL"], 
        ["Oklahoma State Driver's License","OKDL"], 
        ["Oregon State Driver's License","ORDL"],
        ["Pennsylvania State Driver's License","PADL"],
        ["Rhode Island State Driver's License","RIDL"], 
        ["South Carolina State Driver's License","SCDL"],
        ["South Dakota State Driver's License","SDDL"], 
        ["Tennessee State Driver's License","TNDL"], 
        ["Texas State Driver's License","TXDL"],
        ["Utah State Driver's License","UTDL"], 
        ["Vermont State Driver's License","VTDL"], 
        ["Virginia State Driver's License","VADL"], 
        ["Washington State Driver's License","WADL"], 
        ["Washington DC Driver's License","WADCDL"], 
        ["West Virginia State Driver's License","WVDL"],
        ["Wisconsin State Driver's License","WIDL"], 
        ["Wyoming State Driver's License","WYDL"], 
        ["INCO Terms (International Commercial Terms)","INCOTerms"],
        ["Nova Scotia Province Driver's License","NSDL"],
        ["Ontario Province Driver's License","ONDL"],
        ["Alberta Province Driver's License","ABDL"],
        ["Saskatchewan Province Driver's License","SKDL"],
        ["Quebec Province Driver's License","QCDL"],
        ["British Columbia Province Driver's License","BCDL"],
        ["Manitoba Province Driver's License","CPT"], 
        ["Prince Edward Island Province Driver's License","PEDL"],
        ["Current Procedural Terminology","CPT"],
        ["US Standard Industrial Classification","USSIC"],
        ["International Standard Industrial Classification","ISIC"],
        ["Account number","ACCNUM"],
        ["Customer number","CUSTNUM"],
        ["Name of an Organization","Organisation"],
        ["Fortune 1000 company","Fortune1000"],
        ["US street name","STREET"],
        ["Legal marital/civil status.","MARITALSTATUS"],
        ["Color","COLOR"], 
        ["Eye color","EYECOLOR"],
        ["Hair color","HAIRCOLOR"],
        ["International Mobile Equipment Identity","IMEI"],
        ["Mac Address","MAC"], 
        ["Religion","RELIGION"],
        ["Ethnicity","ETHNICITY"],
        ["Political Party","POLITICALPARTY"],
        ["Credit Card Expiration Date","CCEXP"],
        ["Credit Card Validation Number","CCVAL"],
        ["Hobby/Leisure Activity","HOBBY"],
        ["Relationship","RELATIONSHIP"],
        ["Language Code or Name","LANG"], 
        ["Employment Status","EMPLOYMENTSTATUS"]]),
        "DataClass");
    this.setOutput(true,"Boolean");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['inferreddataclassisposition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inferred data class of the column at position  ")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition")
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([
        ["Email Address","EA"],
        ["Date","D"],
        ["Date of Birth","DOB"],
        ["Indicator","X"],
        ["Code","C"],
        ["Identifier","I"],
        ["Quantity","Q"],
        ["Text","T"],
        ["NoClassDetected","U"],
        ["French INSEE Number","INSEE"],
        ["Internet Protocol Address","IP"],
        ["Internet Protocol Version 6 Address","IPv6Address"],
        ["Italian Fiscal Code","CF"],
        ["Passport Number","PAN"],
        ["Spanish Fiscal Identification Number","NIF"],
        ["UK National Insurance Number","NINO"],
        ["Uniform Resource Locator","URL"],
        ["US Phone Number","USPHN"],
        ["US Social Security Number","SSN"], 
        ["US Social Security Number Last 4","SSN4"],
        ["US Zip","USZC"],
        ["Canada Post Code","CAPostCode"],
        ["UK Post Code","UKPostCode"],
        ["Ireland Eircode","IEPostCode"],
        ["City","CITY"],
        ["Canadian Social Insurance Number","SIN"],
        ["Computer Host Name","HN"],
        ["International Standard Book Number","ISBN"],
        ["International Securities Identification Number","ISIN"],
        ["Routing Transit Number","RTN"],
        ["Universal Product Code","UPC"], 
        ["Credit Card Number","CCN"],
        ["American Express Card","AMEX"],
        ["Diners Club Card","DC"], 
        ["Discover Card","DSC"], 
        ["Japan CB","JCB"],
        ["Master Card","MC"],
        ["VISA Card","VISA"],
        ["Country Code","CC"],
        ["Gender","GEN"],
        ["Boolean","BOOL"],
        ["US State Code","USSC"],
        ["US State Name","USSN"],
        ["US State Capital Name","USSCP"],
        ["Canada Province Code","CAPC"],
        ["Canada Province Name","CAPN"], 
        ["Country Name","COUNTRY"],
        ["Currency","CURRENCY"],
        ["Temperature","TEMP"],
        ["Percentage","PERCENT"],
        ["Month","MONTH"],
        ["Germany car registration number","CARDE"],
        ["IBAN","IBAN"],
        ["BIC","BIC"],
        ["Latitude","LAT"], 
        ["Longitude","LONG"],
        ["Geographic Coordinates","COORD"],
        ["Airport Code","IATA"],
        ["US National Drug Code","USNDC"],
        ["Address Line 1","AddressLine1"], 
        ["Address Line 2","AddressLine2"],
        ["Address Line 3","AddressLine3"], 
        ["US Employer Identification Number","USEIN"],
        ["UK Province Code","UKPC"],
        ["Individual Taxpayer Identification Number","ITIN"],
        ["Vehicle Identification Number","VIN"],
        ["ICD-10","ICD10"],
        ["Commercial and Government Entity Code","CAGECode"],
        ["Honorific","HONORIFIC"],
        ["US County","USCounty"],
        ["Person Name","PersonName"],
        ["First Name","FirstName"],
        ["Name Suffix","NameSuffix"],
        ["ISO 3166-2 Code","ISOSPCODE"],
        ["State/Province name","STATEPROVNAME"],
        ["DUNS Number","DUNS"],
        ["Driver's License","DL"],
        ["Alabama State Driver's License","ALDL"],
        ["Alaska State Driver's License","AKDL"], 
        ["Arizona State Driver's License","AZDL"],
        ["Arkansas State Driver's License","ARDL"],
        ["California State Driver's License","CADL"],
        ["Colorado State Driver's License","CODL"],
        ["Connecticut State Driver's License","CTDL"],
        ["Delaware State Driver's License","DEDL"],
        ["Florida State Driver's License","FLDL"],
        ["Georgia State Driver's License","GADL"],
        ["Hawaii State Driver's License","HIDL"],
        ["Idaho State Driver's License","IDDL"],
        ["Illinois State Driver's License","ILDL"],
        ["Indiana State Driver's License","INDL"],
        ["Iowa State Driver's License","IADL"],
        ["Kansas State Driver's License","KSDL"],
        ["Kentucky State Driver's License","KYDL"], 
        ["Louisiana State Driver's License","LADL"],
        ["Maine State Driver's License","MEDL"],
        ["Maryland State Driver's License","MDDL"],
        ["Massachusetts State Driver's License","MADL"], 
        ["Michigan State Driver's License","MIDL"], 
        ["Minnesota State Driver's License","MNDL"],
        ["Mississippi State Driver's License","MSDL"],
        ["Missouri State Driver's License","MODL"], 
        ["Montana State Driver's License","MTDL"],
        ["Nebraska State Driver's License","NEDL"],
        ["Nevada State Driver's License","NVDL"],
        ["New Foundland and Labrador Province Driver's License","NLDL"],
        ["New Brunswick Province Driver's License","NBDL"], 
        ["New Hampshire State Driver's License","NHDL"], 
        ["New Jersey State Driver's License","NJDL"],
        ["New Mexico State Driver's License","NMDL"],
        ["New York State Driver's License","NYDL"], 
        ["North Carolina State Driver's License","NCDL"],
        ["North Dakota State Driver's License","NDDL"],
        ["Ohio State Driver's License","OHDL"], 
        ["Oklahoma State Driver's License","OKDL"], 
        ["Oregon State Driver's License","ORDL"],
        ["Pennsylvania State Driver's License","PADL"],
        ["Rhode Island State Driver's License","RIDL"], 
        ["South Carolina State Driver's License","SCDL"],
        ["South Dakota State Driver's License","SDDL"], 
        ["Tennessee State Driver's License","TNDL"], 
        ["Texas State Driver's License","TXDL"],
        ["Utah State Driver's License","UTDL"], 
        ["Vermont State Driver's License","VTDL"], 
        ["Virginia State Driver's License","VADL"], 
        ["Washington State Driver's License","WADL"], 
        ["Washington DC Driver's License","WADCDL"], 
        ["West Virginia State Driver's License","WVDL"],
        ["Wisconsin State Driver's License","WIDL"], 
        ["Wyoming State Driver's License","WYDL"], 
        ["INCO Terms (International Commercial Terms)","INCOTerms"],
        ["Nova Scotia Province Driver's License","NSDL"],
        ["Ontario Province Driver's License","ONDL"],
        ["Alberta Province Driver's License","ABDL"],
        ["Saskatchewan Province Driver's License","SKDL"],
        ["Quebec Province Driver's License","QCDL"],
        ["British Columbia Province Driver's License","BCDL"],
        ["Manitoba Province Driver's License","CPT"], 
        ["Prince Edward Island Province Driver's License","PEDL"],
        ["Current Procedural Terminology","CPT"],
        ["US Standard Industrial Classification","USSIC"],
        ["International Standard Industrial Classification","ISIC"],
        ["Account number","ACCNUM"],
        ["Customer number","CUSTNUM"],
        ["Name of an Organization","Organisation"],
        ["Fortune 1000 company","Fortune1000"],
        ["US street name","STREET"],
        ["Legal marital/civil status.","MARITALSTATUS"],
        ["Color","COLOR"], 
        ["Eye color","EYECOLOR"],
        ["Hair color","HAIRCOLOR"],
        ["International Mobile Equipment Identity","IMEI"],
        ["Mac Address","MAC"], 
        ["Religion","RELIGION"],
        ["Ethnicity","ETHNICITY"],
        ["Political Party","POLITICALPARTY"],
        ["Credit Card Expiration Date","CCEXP"],
        ["Credit Card Validation Number","CCVAL"],
        ["Hobby/Leisure Activity","HOBBY"],
        ["Relationship","RELATIONSHIP"],
        ["Language Code or Name","LANG"], 
        ["Employment Status","EMPLOYMENTSTATUS"]]),
        "DataClass");
    this.setOutput(true,"Boolean");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['classifycolumn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classify the column at position")
        .appendField(new Blockly.FieldTextInput("default"), "columnposition")
        .appendField("as")
                .appendField(new Blockly.FieldDropdown([
        ["Email Address","EA"],
        ["Date","D"],
        ["Date of Birth","DOB"],
        ["Indicator","X"],
        ["Code","C"],
        ["Identifier","I"],
        ["Quantity","Q"],
        ["Text","T"],
        ["NoClassDetected","U"],
        ["French INSEE Number","INSEE"],
        ["Internet Protocol Address","IP"],
        ["Internet Protocol Version 6 Address","IPv6Address"],
        ["Italian Fiscal Code","CF"],
        ["Passport Number","PAN"],
        ["Spanish Fiscal Identification Number","NIF"],
        ["UK National Insurance Number","NINO"],
        ["Uniform Resource Locator","URL"],
        ["US Phone Number","USPHN"],
        ["US Social Security Number","SSN"], 
        ["US Social Security Number Last 4","SSN4"],
        ["US Zip","USZC"],
        ["Canada Post Code","CAPostCode"],
        ["UK Post Code","UKPostCode"],
        ["Ireland Eircode","IEPostCode"],
        ["City","CITY"],
        ["Canadian Social Insurance Number","SIN"],
        ["Computer Host Name","HN"],
        ["International Standard Book Number","ISBN"],
        ["International Securities Identification Number","ISIN"],
        ["Routing Transit Number","RTN"],
        ["Universal Product Code","UPC"], 
        ["Credit Card Number","CCN"],
        ["American Express Card","AMEX"],
        ["Diners Club Card","DC"], 
        ["Discover Card","DSC"], 
        ["Japan CB","JCB"],
        ["Master Card","MC"],
        ["VISA Card","VISA"],
        ["Country Code","CC"],
        ["Gender","GEN"],
        ["Boolean","BOOL"],
        ["US State Code","USSC"],
        ["US State Name","USSN"],
        ["US State Capital Name","USSCP"],
        ["Canada Province Code","CAPC"],
        ["Canada Province Name","CAPN"], 
        ["Country Name","COUNTRY"],
        ["Currency","CURRENCY"],
        ["Temperature","TEMP"],
        ["Percentage","PERCENT"],
        ["Month","MONTH"],
        ["Germany car registration number","CARDE"],
        ["IBAN","IBAN"],
        ["BIC","BIC"],
        ["Latitude","LAT"], 
        ["Longitude","LONG"],
        ["Geographic Coordinates","COORD"],
        ["Airport Code","IATA"],
        ["US National Drug Code","USNDC"],
        ["Address Line 1","AddressLine1"], 
        ["Address Line 2","AddressLine2"],
        ["Address Line 3","AddressLine3"], 
        ["US Employer Identification Number","USEIN"],
        ["UK Province Code","UKPC"],
        ["Individual Taxpayer Identification Number","ITIN"],
        ["Vehicle Identification Number","VIN"],
        ["ICD-10","ICD10"],
        ["Commercial and Government Entity Code","CAGECode"],
        ["Honorific","HONORIFIC"],
        ["US County","USCounty"],
        ["Person Name","PersonName"],
        ["First Name","FirstName"],
        ["Name Suffix","NameSuffix"],
        ["ISO 3166-2 Code","ISOSPCODE"],
        ["State/Province name","STATEPROVNAME"],
        ["DUNS Number","DUNS"],
        ["Driver's License","DL"],
        ["Alabama State Driver's License","ALDL"],
        ["Alaska State Driver's License","AKDL"], 
        ["Arizona State Driver's License","AZDL"],
        ["Arkansas State Driver's License","ARDL"],
        ["California State Driver's License","CADL"],
        ["Colorado State Driver's License","CODL"],
        ["Connecticut State Driver's License","CTDL"],
        ["Delaware State Driver's License","DEDL"],
        ["Florida State Driver's License","FLDL"],
        ["Georgia State Driver's License","GADL"],
        ["Hawaii State Driver's License","HIDL"],
        ["Idaho State Driver's License","IDDL"],
        ["Illinois State Driver's License","ILDL"],
        ["Indiana State Driver's License","INDL"],
        ["Iowa State Driver's License","IADL"],
        ["Kansas State Driver's License","KSDL"],
        ["Kentucky State Driver's License","KYDL"], 
        ["Louisiana State Driver's License","LADL"],
        ["Maine State Driver's License","MEDL"],
        ["Maryland State Driver's License","MDDL"],
        ["Massachusetts State Driver's License","MADL"], 
        ["Michigan State Driver's License","MIDL"], 
        ["Minnesota State Driver's License","MNDL"],
        ["Mississippi State Driver's License","MSDL"],
        ["Missouri State Driver's License","MODL"], 
        ["Montana State Driver's License","MTDL"],
        ["Nebraska State Driver's License","NEDL"],
        ["Nevada State Driver's License","NVDL"],
        ["New Foundland and Labrador Province Driver's License","NLDL"],
        ["New Brunswick Province Driver's License","NBDL"], 
        ["New Hampshire State Driver's License","NHDL"], 
        ["New Jersey State Driver's License","NJDL"],
        ["New Mexico State Driver's License","NMDL"],
        ["New York State Driver's License","NYDL"], 
        ["North Carolina State Driver's License","NCDL"],
        ["North Dakota State Driver's License","NDDL"],
        ["Ohio State Driver's License","OHDL"], 
        ["Oklahoma State Driver's License","OKDL"], 
        ["Oregon State Driver's License","ORDL"],
        ["Pennsylvania State Driver's License","PADL"],
        ["Rhode Island State Driver's License","RIDL"], 
        ["South Carolina State Driver's License","SCDL"],
        ["South Dakota State Driver's License","SDDL"], 
        ["Tennessee State Driver's License","TNDL"], 
        ["Texas State Driver's License","TXDL"],
        ["Utah State Driver's License","UTDL"], 
        ["Vermont State Driver's License","VTDL"], 
        ["Virginia State Driver's License","VADL"], 
        ["Washington State Driver's License","WADL"], 
        ["Washington DC Driver's License","WADCDL"], 
        ["West Virginia State Driver's License","WVDL"],
        ["Wisconsin State Driver's License","WIDL"], 
        ["Wyoming State Driver's License","WYDL"], 
        ["INCO Terms (International Commercial Terms)","INCOTerms"],
        ["Nova Scotia Province Driver's License","NSDL"],
        ["Ontario Province Driver's License","ONDL"],
        ["Alberta Province Driver's License","ABDL"],
        ["Saskatchewan Province Driver's License","SKDL"],
        ["Quebec Province Driver's License","QCDL"],
        ["British Columbia Province Driver's License","BCDL"],
        ["Manitoba Province Driver's License","CPT"], 
        ["Prince Edward Island Province Driver's License","PEDL"],
        ["Current Procedural Terminology","CPT"],
        ["US Standard Industrial Classification","USSIC"],
        ["International Standard Industrial Classification","ISIC"],
        ["Account number","ACCNUM"],
        ["Customer number","CUSTNUM"],
        ["Name of an Organization","Organisation"],
        ["Fortune 1000 company","Fortune1000"],
        ["US street name","STREET"],
        ["Legal marital/civil status.","MARITALSTATUS"],
        ["Color","COLOR"], 
        ["Eye color","EYECOLOR"],
        ["Hair color","HAIRCOLOR"],
        ["International Mobile Equipment Identity","IMEI"],
        ["Mac Address","MAC"], 
        ["Religion","RELIGION"],
        ["Ethnicity","ETHNICITY"],
        ["Political Party","POLITICALPARTY"],
        ["Credit Card Expiration Date","CCEXP"],
        ["Credit Card Validation Number","CCVAL"],
        ["Hobby/Leisure Activity","HOBBY"],
        ["Relationship","RELATIONSHIP"],
        ["Language Code or Name","LANG"], 
        ["Employment Status","EMPLOYMENTSTATUS"]]),
        "DataClass")
        .appendField("with a confidence of")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "confidence")
        .appendField("%");
        this.setOutput(true, "Action");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
  }
};

Blockly.Blocks['classificationconfidence'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classification is positive with a confidence of")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "confidence")
        .appendField("%");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Value");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

