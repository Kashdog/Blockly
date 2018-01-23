'use strict';

goog.provide('Blockly.DataRule.texts');

goog.require('Blockly.DataRule');

goog.provide('Blockly.Constants.Text');

goog.require('Blockly.Blocks');
goog.require('Blockly.Msg');

Blockly.Constants.Text.HUE = 160;
/** @deprecated Use Blockly.Constants.Text.HUE */
Blockly.Blocks.texts.HUE = Blockly.Constants.Text.HUE;



Blockly.Blocks['select'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl("");
        this.setColour(60);
        this.appendStatementInput("SELECT")
            .appendField("SELECT")
            .setCheck("column");
        this.appendValueInput("FROM")
            .setCheck("table")
            .appendField("FROM");
        this.whereCount_ = 0;
        this.group_ = 0;
        this.having_ = 0;
        this.order_ = 0;
        this.updateShape_();
        this.setMutator(new Blockly.Mutator(['where', 'groupby', 'having', 'orderByAscending', 'orderByDescending']));
        this.setTooltip("");
    }
    , /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('where', this.whereCount_);
        container.setAttribute('group', this.group_);
        container.setAttribute('having', this.having_);
        container.setAttribute('order', this.order_);

        return container;
    }
    , /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.whereCount_ = parseInt(xmlElement.getAttribute('where'), 10);
        this.group_ = parseInt(xmlElement.getAttribute('group'), 10);
        this.having_ = parseInt(xmlElement.getAttribute('having'), 10);
        this.order_ = parseInt(xmlElement.getAttribute('order'), 10);
        this.updateShape_();
    }
    , /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var topBlock = workspace.newBlock('container');
        topBlock.initSvg();

        var connection = topBlock.getInput('WHERE').connection;
        if (this.whereCount_ == 1) {
            var itemBlock = workspace.newBlock('where');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
        }

        var connection = topBlock.getInput('GROUPBY').connection;
        if (this.group_ == 1) {
            var itemBlock = workspace.newBlock('groupby');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
            if (this.having_ == 1) {
            connection = itemBlock.getInput('having').connection;
            var havingBlock = workspace.newBlock('having');
            havingBlock.initSvg();
            connection.connect(havingBlock.outputConnection);
        }
        }
        

        var connection = topBlock.getInput('ORDERBY').connection;
        if (this.order_ == 1) {
            var itemBlock = workspace.newBlock('orderByAscending');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
        } else if (this.order_ == 2) {
            var itemBlock = workspace.newBlock('orderByDescending');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
        }



        return topBlock;
    }
    , /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (topBlock) {
        var itemBlock = topBlock.getInputTargetBlock('WHERE');
        if (itemBlock == "WHERE") {
            this.whereCount_ = 1;
        } else {
            this.whereCount_ = 0;
        }

        itemBlock = topBlock.getInputTargetBlock('GROUPBY');
        if (itemBlock != null && itemBlock.toString().includes("GROUP BY")) {
            this.group_ = 1;
        } else {
            this.group_ = 0;
            this.having_ = 0;
        }
        if (itemBlock != null) {
            var havingBlock = itemBlock.getInputTargetBlock('having');
            if (havingBlock != null && havingBlock.toString().includes("HAVING")) {
                this.having_ = 1;
            } else {
                this.having_ = 0;
            }
        }

        itemBlock = topBlock.getInputTargetBlock('ORDERBY');
        if (itemBlock == "ASCENDING") {
            this.order_ = 1;
        } else if (itemBlock == "DESCENDING") {
            this.order_ = 2;
        } else {
            this.order_ = 0;
        }

        this.updateShape_();
    }
    , /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Add new inputs.
        if (this.whereCount_ == 1 && !this.getInput('WHERE')) {
            var input = this.appendValueInput('WHERE').setCheck("Boolean").appendField("WHERE");
        } else if (this.whereCount_ == 0) {
            this.removeInput('WHERE');
        }

        if (this.group_ == 1 && !this.getInput('GROUPBY')) {
            var input = this.appendValueInput('GROUPBY').setCheck(null).appendField("GROUP BY");
        } else if (this.group_ == 0) {
            this.removeInput('GROUPBY');
        }

        if (this.having_ == 1 && !this.getInput('HAVING')) {
            var input = this.appendValueInput('HAVING').setCheck(null).appendField("HAVING");
        } else if (this.having_ == 0) {
            this.removeInput('HAVING');
        }

        if (this.order_ == 1 && !this.getInput('ORDERBY')) {
            var input = this.appendStatementInput('ORDERBY').appendField("ORDER BY (ASCENDING)");
        } else if (this.order_ == 2 && !this.getInput('ORDERBY')) {
            var input = this.appendStatementInput('ORDERBY').appendField("ORDER BY (DESCENDING)");
        } else if (this.order_ == 0) {
            this.removeInput('ORDERBY');
        }
    }
};


Blockly.DataRule['select'] = function (block) {

    var column_names = Blockly.DataRule.statementToCode(block, 'SELECT');
    if (column_names.includes("*")) {
        column_names = "*";
    }
    var table_name = Blockly.DataRule.valueToCode(block, 'FROM', Blockly.DataRule.ORDER_ATOMIC);
    var code = "SELECT " + column_names + " FROM " + table_name;
    if (this.getInput('WHERE')) {
        var condition = Blockly.DataRule.valueToCode(block, 'WHERE', Blockly.DataRule.ORDER_ATOMIC);
        code += " WHERE " + condition;
    }
    code += ";";

    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks.container = {
    init: function () {
        this.setColour(60);
        this.appendValueInput("WHERE")
            .setCheck("where")
            .appendField("WHERE");
        this.appendValueInput("GROUPBY")
            .setCheck("groupby")
            .appendField("GROUP BY");
        this.appendValueInput("ORDERBY")
            .setCheck("orderby")
            .appendField("ORDER BY");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks.where = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("WHERE");
        this.setOutput(true, "where");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks.groupby = {
    init: function () {
        this.appendDummyInput()
            .appendField("GROUP BY");
        this.appendValueInput("having")
            .setCheck("having");
        this.setInputsInline(true);
        this.setOutput(true, "groupby");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks.having = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("HAVING");
        this.setOutput(true, "having");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks.orderByAscending = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("ASCENDING");
        this.setOutput(true, "orderby");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks.orderByDescending = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("DESCENDING");
        this.setOutput(true, "orderby");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks['insert'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl("");
        this.setColour(60);
        this.appendValueInput("INSERT")
            .setCheck("table")
            .appendField("INSERT INTO (table)");
        this.appendStatementInput("COLUMNNAMES")
            .appendField("COLUMN NAMES")
            .setCheck("column");
        this.appendStatementInput("VALUES")
            .appendField("VALUES")
            .setCheck("valueInput");
        this.setTooltip("");
    }
};

Blockly.DataRule['insert'] = function (block) {
    var table_name = Blockly.DataRule.valueToCode(block, 'INSERT', Blockly.DataRule.ORDER_ATOMIC);
    var column_names = Blockly.DataRule.statementToCode(block, 'COLUMNNAMES');
    var value_names = Blockly.DataRule.statementToCode(block, 'VALUES');
    var code = "INSERT INTO " + table_name;
    if (column_names != "") {
        code += " (" + column_names + ")";
        console.log(column_names);
        console.log(column_names.length);
    }
    code += "VALUES (" + value_names + ")";
    code += ";";

    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['setList'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("ADD");
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['itemset'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("SET");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['update'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl("");
        this.setColour(60);
        this.appendValueInput("UPDATE")
            .setCheck("table")
            .appendField("UPDATE");
        this.appendValueInput("SET0")
            .setCheck(null)
            .appendField("SET");
        this.setColour(60);
        this.setInputsInline(false);
        this.itemCount_ = 0;
        this.farthest_int = 0;
        this.updateShape_();
        this.appendValueInput("WHERE")
            .setCheck(null)
            .appendField("WHERE");
        this.setMutator(new Blockly.Mutator(['itemset']));
        this.setTooltip("");
    }
    , /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    }
    , /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    }
    , /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var topBlock = workspace.newBlock('setList');
        topBlock.initSvg();
        var connection = topBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('itemset');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return topBlock;
    }
    , /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (topBlock) {
        var itemBlock = topBlock.getInputTargetBlock('STACK');
        //Count number of inputs
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
    }
    , /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Add new inputs.
        for (var i = this.farthest_int; i > (this.itemCount_); i--) {
            this.removeInput('SET' + i);
        }

        for (var i = 0; i < this.itemCount_; i++) {
            if (this.getInput('WHERE')) {
                this.removeInput('WHERE');
            }
            if (!this.getInput('SET' + (i + 1))) {
                var set_name = "SET" + (i + 1);
                var input = this.appendValueInput(set_name).setCheck(null).appendField("SET");
                this.farthest_int = i + 1;
            }
            if (i == this.itemCount_ - 1) {
                var input = this.appendValueInput("WHERE").setCheck(null).appendField("WHERE");
            }
        }


    }
};

Blockly.DataRule['update'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.DataRule.valueToCode(block, 'ADD' + i
            , Blockly.DataRule.ORDER_COMMA) || 'null';
    }
    var table_name = Blockly.DataRule.valueToCode(block, 'UPDATE', Blockly.DataRule.ORDER_ATOMIC);
    var condition_name = Blockly.DataRule.valueToCode(block, 'WHERE', Blockly.DataRule.ORDER_ATOMIC);
    var code = 'UPDATE ' + table_name + ' SET' + elements.join(', ') + ' WHERE ' + condition_name;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['andor'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl("");
        this.setColour(60);
        this.appendValueInput("Condition1")
            .setCheck("Boolean");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["AND", "AND"], ["OR", "OR"]]), "list0");
        this.appendValueInput("Condition2")
            .setCheck("Boolean");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.itemCount_ = 0;
        this.farthest_int = 0;
        this.updateShape_();
        this.setMutator(new Blockly.Mutator(['item']));
        this.setTooltip("");
    }
    , /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    }
    , /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    }
    , /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var topBlock = workspace.newBlock('containerList');
        topBlock.initSvg();
        var connection = topBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return topBlock;
    }
    , /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (topBlock) {
        var itemBlock = topBlock.getInputTargetBlock('STACK');
        //Count number of inputs
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
    }
    , /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Add new inputs.
        for (var i = this.farthest_int; i > (this.itemCount_ + 2); i--) {
            this.removeInput('Condition' + i);
            this.removeInput('Dummy' + i);
        }

        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('Condition' + (i + 3))) {
                var list_name = "list" + (i + 1);
                var input = this.appendDummyInput("Dummy" + (i + 3)).appendField(new Blockly.FieldDropdown([["AND", "AND"], ["OR", "OR"]]), list_name);
                input = this.appendValueInput("Condition" + (i + 3)).setCheck("Boolean");
                this.farthest_int = i + 3;
            }
        }


    }
};

Blockly.Blocks['containerList'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("List");
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("Item");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['column_name'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("column_name"), "columnName");
        this.setPreviousStatement(true, "column");
        this.setNextStatement(true, "column");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['column_name'] = function (block) {
    var text_columnname = block.getFieldValue('columnName');
    if (this.nextConnection.isConnected()) {
        var code = text_columnname + ", ";
    } else {
        var code = text_columnname;
    }

    return code;
};

Blockly.Blocks['all_columns'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("All Columns");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['all_columns'] = function (block) {
    var code = '*';
    return code;
};

Blockly.Blocks['table_name'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("table_name"), "tableName");
        this.setOutput(true, "table");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['table_name'] = function (block) {
    var text_tablename = block.getFieldValue('tableName');
    var code = text_tablename;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['operator'] = {
    init: function () {
        this.appendValueInput("Condition1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["=", "="], ["<>", "<>"], [">", ">"], ["<", "<"], ["≥ ", ">="], ["≤", "<="], ["BETWEEN", "BETWEEN"], ["LIKE", "LIKE"], ["IN", "IN"]]), "operatorlist");
        this.appendValueInput("Condition2")
            .setCheck(null);
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['operator'] = function (block) {
    var value_condition1 = Blockly.DataRule.valueToCode(block, 'Condition1', Blockly.DataRule.ORDER_ATOMIC);
    var dropdown_operatorlist = block.getFieldValue('operatorlist');
    var value_condition2 = Blockly.DataRule.valueToCode(block, 'Condition2', Blockly.DataRule.ORDER_ATOMIC);
    var code = value_condition1 + ' ' + dropdown_operatorlist + ' ' + value_condition2;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("variable"), "variable");
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['variable'] = function (block) {
    var text_variable = block.getFieldValue('variable');
    var code = text_variable;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['stringliteral'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("'");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("val"), "stringInput")
            .appendField("'");
        this.setInputsInline(true);
        this.setOutput(true, "string");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['stringliteral'] = function (block) {
    var text_stringinput = block.getFieldValue('stringInput');
    var code = "'" + text_stringinput + "'";
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['valueliteral'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("val"), "valueInput")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setOutput(true, "value");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['valueliteral'] = function (block) {
    var text_valueinput = block.getFieldValue('valueInput');
    if (this.nextConnection.isConnected()) {
        var code = "'" + text_valueinput + "'" + ", ";
    } else {
        var code = "'" + text_valueinput + "'";
    }
    return code;
};

Blockly.Blocks['numericliteral'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "numericInput");
        this.setOutput(true, "numeric");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['numericliteral'] = function (block) {
    var number_numericinput = block.getFieldValue('numericInput');
    var code = number_numericinput;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};