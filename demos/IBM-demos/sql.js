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
        this.gradient = new ColourGradient();
        this.setColour("#6594AB");
        this.appendStatementInput("SELECT")
            .appendField("SELECT")
            .setCheck("column");
        this.appendValueInput("FROM")
            .setCheck("table")
            .appendField("FROM");
        this.whereCount_ = 0;
        this.group_ = 0;
        this.having_ = 0;
        this.orderasc_ = 0;
        this.orderdesc_ = 0;
        this.updateShape_();
        this.setMutator(new Blockly.Mutator(['where', 'groupby', 'having', 'orderByAscending', 'orderByDescending']));
        this.setTooltip("");
    }
    , onchange: function () {
        /* Adding a vertical gradient to the example block */
        this.gradient.setVerticalGradient(
            this, {
                "start": "#8594AB"
                , "stop": this.getColour()
            }, ["FROM"]
        );
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
        container.setAttribute('orderasc', this.orderasc_);
        container.setAttribute('orderdesc', this.orderdesc_);
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
        this.orderasc_ = parseInt(xmlElement.getAttribute('orderasc'), 10);
        this.orderdesc_ = parseInt(xmlElement.getAttribute('orderdesc'), 10);
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

        var connection = topBlock.getInput('ORDERBYASC').connection;
        if (this.orderasc_ == 1) {
            var itemBlock = workspace.newBlock('orderByAscending');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
        }

        var connection = topBlock.getInput('ORDERBYDESC').connection;
        if (this.orderdesc_ == 1) {
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

        itemBlock = topBlock.getInputTargetBlock('ORDERBYASC');
        if (itemBlock == "ASCENDING") {
            this.orderasc_ = 1;
        } else {
            this.orderasc_ = 0;
        }

        itemBlock = topBlock.getInputTargetBlock('ORDERBYDESC');
        if (itemBlock == "DESCENDING") {
            this.orderdesc_ = 1;
        } else {
            this.orderdesc_ = 0;
        }

        this.updateShape_();
    }
    , /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {

        if (this.getInputTargetBlock('WHERE') != null) {
            var where_value_block_connection = this.getInputTargetBlock('WHERE').outputConnection;
        }
        if (this.getInputTargetBlock('GROUPBY') != null) {
            var groupby_value_block_connection = this.getInputTargetBlock('GROUPBY').previousConnection;
        }
        if (this.getInputTargetBlock('HAVING') != null) {
            var having_value_block_connection = this.getInputTargetBlock('HAVING').outputConnection;
        }
        if (this.getInputTargetBlock('ORDERBYASCENDING') != null) {
            var orderbyasc_value_block_connection = this.getInputTargetBlock('ORDERBYASCENDING').previousConnection;
        }
        if (this.getInputTargetBlock('ORDERBYDESCENDING') != null) {
            var orderbydesc_value_block_connection = this.getInputTargetBlock('ORDERBYDESCENDING').previousConnection;
        }

        if (this.getInput('WHERE')) {
            this.removeInput('WHERE');
        }
        if (this.getInput('GROUPBY')) {
            this.removeInput('GROUPBY');
        }
        if (this.getInput('HAVING')) {
            this.removeInput('HAVING');
        }
        if (this.getInput('ORDERBYASCENDING')) {
            this.removeInput('ORDERBYASCENDING');
        }
        if(this.getInput('DUMMYASC')){
            this.removeInput('DUMMYASC');
        }
        if (this.getInput('ORDERBYDESCENDING')) {
            this.removeInput('ORDERBYDESCENDING');
        }
        if(this.getInput('DUMMYDESC')){
            this.removeInput('DUMMYDESC');
        }


        if (this.whereCount_ == 1 && !this.getInput('WHERE')) {
            var input = this.appendValueInput('WHERE').setCheck("Boolean").appendField("WHERE");
            var where_input = this.getInput('WHERE').connection;
            if (where_value_block_connection != null) {
                where_input.connect(where_value_block_connection);
            }
        } else if (this.whereCount_ == 0) {
            this.removeInput('WHERE');
        }

        if (this.group_ == 1 && !this.getInput('GROUPBY')) {
            var input = this.appendStatementInput('GROUPBY').setCheck(null).appendField("GROUP BY");
            var groupby_input = this.getInput('GROUPBY').connection;
            if (groupby_value_block_connection != null) {
                groupby_input.connect(groupby_value_block_connection);
            }
        } else if (this.group_ == 0) {
            this.removeInput('GROUPBY');
        }

        if (this.having_ == 1 && !this.getInput('HAVING')) {
            var input = this.appendValueInput('HAVING').setCheck(null).appendField("HAVING");
            var having_input = this.getInput('HAVING').connection;
            if (having_value_block_connection != null) {
                having_input.connect(having_value_block_connection);
            }
        } else if (this.having_ == 0) {
            this.removeInput('HAVING');
        }

        if (this.orderasc_ == 1 && !this.getInput('ORDERBYASCENDING')) {
            var input = this.appendStatementInput('ORDERBYASCENDING').appendField("ORDER BY");
            input = this.appendDummyInput('DUMMYASC').appendField("ASCENDING");
            var orderbyasc_input = this.getInput('ORDERBYASCENDING').connection;
            if (orderbyasc_value_block_connection != null) {
                orderbyasc_input.connect(orderbyasc_value_block_connection);
            }
        } else if (this.orderasc_ == 0) {
            this.removeInput('ORDERBYASCENDING');
            this.removeInput('DUMMYASC');
        }

        if (this.orderdesc_ == 1 && !this.getInput('ORDERBYDESCENDING')) {
            var input = this.appendStatementInput('ORDERBYDESCENDING').appendField("ORDER BY");
            input = this.appendDummyInput('DUMMYDESC').appendField("DESCENDING");
            var orderbydesc_input = this.getInput('ORDERBYDESCENDING').connection;
            if (orderbydesc_value_block_connection != null) {
                orderbydesc_input.connect(orderbydesc_value_block_connection);
            }
        } else if (this.orderdesc_ == 0) {
            this.removeInput('ORDERBYDESCENDING');
            this.removeInput('DUMMYDESC');
        }
    }
};


Blockly.DataRule['select'] = function (block) {

    var column_names_select = Blockly.DataRule.statementToCode(block, 'SELECT');
    if (column_names_select.includes("*")) {
        column_names_select = "*";
    }
    var table_name = Blockly.DataRule.valueToCode(block, 'FROM', Blockly.DataRule.ORDER_ATOMIC);
    var code = "SELECT " + column_names_select + " FROM " + table_name;
    if (this.getInput('WHERE')) {
        var condition_where = Blockly.DataRule.valueToCode(block, 'WHERE', Blockly.DataRule.ORDER_ATOMIC);
        code += " WHERE " + condition_where;
    }
    if (this.getInput('GROUPBY')) {
        var column_names_groupby = Blockly.DataRule.statementToCode(block, 'GROUPBY');
        code += " GROUP BY " + column_names_groupby;
    }
    if (this.getInput('HAVING')) {
        var condition_having = Blockly.DataRule.valueToCode(block, 'HAVING', Blockly.DataRule.ORDER_ATOMIC);
        code += " HAVING " + condition_having;
    }
    if (this.getInput('ORDERBYASCENDING')) {
        var column_names_orderbyascending = Blockly.DataRule.statementToCode(block, 'ORDERBYASCENDING');
        code += " ORDER BY " + column_names_orderbyascending + " ASC";
    }
    if (this.getInput('ORDERBYDESCENDING')) {
        var column_names_orderbydescending = Blockly.DataRule.statementToCode(block, 'ORDERBYDESCENDING');
        code += " ORDER BY " + column_names_orderbydescending + " DESC";
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
        this.appendValueInput("ORDERBYASC")
            .setCheck("orderbyasc")
            .appendField("ORDER BY ASC");
        this.appendValueInput("ORDERBYDESC")
            .setCheck("orderbydesc")
            .appendField("ORDER BY DESC");
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
        this.setOutput(true, "orderbyasc");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks.orderByDescending = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("DESCENDING");
        this.setOutput(true, "orderbydesc");
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
        this.gradient = new ColourGradient();
        this.setColour("#6594AB");
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
            .setCheck('assignment')
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
                var input = this.appendValueInput(set_name).setCheck('assignment').appendField("SET");
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
    for (var i = 0; i < block.itemCount_ + 1; i++) {
        elements[i] = Blockly.DataRule.valueToCode(block, 'SET' + i
            , Blockly.DataRule.ORDER_ATOMIC);
    }
    var table_name = Blockly.DataRule.valueToCode(block, 'UPDATE', Blockly.DataRule.ORDER_ATOMIC);
    var condition_name = Blockly.DataRule.valueToCode(block, 'WHERE', Blockly.DataRule.ORDER_ATOMIC);
    var code = 'UPDATE ' + table_name + ' SET ' + elements.join(', ') + ' WHERE ' + condition_name + ";";
    return [code, Blockly.DataRule.ORDER_ATOMIC];
};

Blockly.Blocks['andor'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl("");
        this.gradient = new ColourGradient();
        this.setColour("#9694AB");
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

Blockly.DataRule['andor'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_ + 2);
    var dropdown_elements = new Array(block.itemCount_+1);
    var code = "";
    for (var i = 0; i < block.itemCount_ + 2; i++) {
        elements[i] = Blockly.DataRule.valueToCode(block, 'Condition' + (i+1)
            , Blockly.DataRule.ORDER_ATOMIC);
    }
    for (var i = 0; i < block.itemCount_ + 1; i++) {
        dropdown_elements[i] = block.getFieldValue('list' + i);
    }
    for(var i = 0; i < block.itemCount_ + 1; i++){
        code += elements[i] + " " + dropdown_elements[i] + " ";
        if(i == block.itemCount_){
            code += elements[block.itemCount_+1];
        }
    }
    
    return [code, Blockly.DataRule.ORDER_ATOMIC];
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

Blockly.Blocks['not'] = {
    init: function () {
        this.appendValueInput("NOT")
            .setCheck(null)
            .appendField("NOT");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.gradient = new ColourGradient();
        this.setColour("#9694AB");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['not'] = function (block) {
    var value_not = Blockly.DataRule.valueToCode(block, 'NOT', Blockly.DataRule.ORDER_ATOMIC);
    var code = 'NOT ' + value_not;
    return [code, Blockly.DataRule.ORDER_ATOMIC];
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

Blockly.Blocks['distinct'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("DISTINCT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.DataRule['distinct'] = function (block) {
    var code = 'DISTINCT';
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


Blockly.defineBlocksWithJsonArray([
    {
        "type": "operator"
        , "message0": "%1 %2 %3 %4"
        , "args0": [
            {
                "type": "input_value"
                , "name": "Condition1",
            },
            {
                "type": "field_dropdown"
                , "name": "PROPERTY"
                , "options": [
                    ["=", "="],
                    ["<>", "<>"],
                    [">", ">"],
                    ["<", "<"],
                    ["≥", ">="],
                    ["≤", "<="],
                    ["BETWEEN", "BETWEEN"],
                    ["LIKE", "LIKE"],
                    ["IN", "IN"]
                ]

            },
            {
                "type": "input_dummy"
            }, {
                "type": "input_value",
                "name": "Condition2"
    }
    ],
        "inputsInline": false,
        "output": "Boolean",
        "colour": "#9694AB",
        "tooltip": "%{BKY_MATH_IS_TOOLTIP}",
        "mutator": "operator_mutator"
  }
]);


Blockly.Constants.IS_EQUAL_MUTATOR_MIXIN = {

    mutationToDom: function () {
        var container = document.createElement('mutation');
        var equalInput = (this.getFieldValue('PROPERTY') == '=');
        container.setAttribute('equal_input', equalInput);
        return container;
    },
    domToMutation: function (xmlElement) {
        var equalInput = (xmlElement.getAttribute('equal_input') == 'true');
        this.updateShape_(equalInput);
    }, 
    updateShape_: function (equalInput) {
        if (equalInput == true) {
            this.setOutput(true, ["Boolean", "assignment"]);
        } else {
            this.setOutput(true, "Boolean");
        }
    }
};

Blockly.Constants.IS_EQUAL_MUTATOR_EXTENSION = function () {
    this.getField('PROPERTY').setValidator(function (option) {
        var equalInput = (option == '=');
        this.sourceBlock_.updateShape_(equalInput);
    });
};

Blockly.Extensions.registerMutator('operator_mutator'
    , Blockly.Constants.IS_EQUAL_MUTATOR_MIXIN
    , Blockly.Constants.IS_EQUAL_MUTATOR_EXTENSION);


Blockly.DataRule['operator'] = function (block) {
    var value_condition1 = Blockly.DataRule.valueToCode(block, 'Condition1', Blockly.DataRule.ORDER_ATOMIC);
    var dropdown_operatorlist = block.getFieldValue('PROPERTY');
    var value_condition2 = Blockly.DataRule.valueToCode(block, 'Condition2', Blockly.DataRule.ORDER_ATOMIC);
    var code = value_condition1 + dropdown_operatorlist + value_condition2;
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