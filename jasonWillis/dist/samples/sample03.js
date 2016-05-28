"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  var dummyDataGenerator, _class, _temp, _initialiseProps, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _export("sample01", sample01 = (_temp = _class = function () {
        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.number > 100) {
              data.numberColor = "green";
              data.numberFont = "normal";
            } else {
              data.numberColor = "lightgrey";
              data.numberFont = "bold";
            }
          }
          data = collectionData;
        };

        sample01.prototype.singleClick = function singleClick(e) {
          e.editable = true;
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        sample01.prototype.onDatePickerCreate = function onDatePickerCreate(element, that) {
          var picker = new pikaday({
            field: element,
            onSelect: function onSelect(date) {
              that.setValue(date);
              that.setCss();
            },
            onOpen: function onOpen() {
              if (!that.editMode()) {
                this.hide();
              }
            }
          });
        };

        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample01.prototype.editMode = function editMode() {

          if (this.lockStatus === "locked") {
            this.lockStatus = "unlocked";
            this.lockColor = "green";
            this.myGrid.ctx.setEditMode(true);
          } else {
            this.lockStatus = "locked";
            this.lockColor = "red";
            this.myGrid.ctx.setEditMode(false);
          }
        };

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        };

        sample01.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
            if (scrollBottom) {
              _this3.myGrid.ctx.scrollBottomNext();
            }

            _this3.collectionLength = _this3.myCollection.length;
          });
        };

        sample01.prototype.insertOneBtn = function insertOneBtn() {
          var _this4 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this4.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this5 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this5.myCollection.splice(2, 0, data[0]);
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.myCollection.splice(0, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.myCollection.splice(this.myCollection.length - x, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.miscBtn = function miscBtn() {
          var _this6 = this;

          this.myCollection.pop();

          this.myCollection.splice(2, 2);

          this.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this6.myCollection.push(data[0]);
            _this6.myCollection.push(data[1]);
          });
        };

        sample01.prototype.rowHeightBtn = function rowHeightBtn(x) {

          this.myGrid.ctx.setRowHeight(x);
          this.status.row25 = "";
          this.status.row50 = "";
          this.status.row75 = "";
          this.status.row100 = "";

          switch (x) {
            case 25:
              this.status.row25 = "lightgrey";
              break;
            case 50:
              this.status.row50 = "lightgrey";
              break;
            case 75:
              this.status.row75 = "lightgrey";
              break;
            case 100:
              this.status.row100 = "lightgrey";
              break;
          }
        };

        sample01.prototype.headerHeightBtn = function headerHeightBtn(x) {
          this.myGrid.ctx.setHeaderHeight(x);
          this.status.header0 = "";
          this.status.header25 = "";
          this.status.header50 = "";
          this.status.header75 = "";

          switch (x) {
            case 0:
              this.status.header0 = "lightgrey";
              break;
            case 25:
              this.status.header25 = "lightgrey";
              break;
            case 50:
              this.status.header50 = "lightgrey";
              break;
            case 75:
              this.status.header75 = "lightgrey";
              break;
          }
        };

        sample01.prototype.footerHeightBtn = function footerHeightBtn(x) {
          this.myGrid.ctx.setFooterHeight(x);
          this.status.footer0 = "";
          this.status.footer25 = "";
          this.status.footer50 = "";
          this.status.footer75 = "";

          switch (x) {
            case 0:
              this.status.footer0 = "lightgrey";
              break;
            case 25:
              this.status.footer25 = "lightgrey";
              break;
            case 50:
              this.status.footer50 = "lightgrey";
              break;
            case 75:
              this.status.footer75 = "lightgrey";
              break;
          }
        };

        sample01.prototype.saveStateBtn = function saveStateBtn() {
          this.oldState = this.myGrid.ctx.getColumns(this.oldState);
        };

        sample01.prototype.loadStateBtn = function loadStateBtn() {
          if (this.oldState) {
            this.myGrid.ctx.setColumns(this.oldState);
            this.myGrid.ctx.rebuildColumns();
          }
        };

        sample01.prototype.switchNameBtn = function switchNameBtn() {
          var oldState = this.myGrid.ctx.getColumns(this.oldState);
          var oldIndex = oldState.colAttrArray.indexOf("name");
          var newIndex = oldState.colAttrArray.indexOf("color");

          oldState.colAttrArray[oldIndex] = "color";
          oldState.colAttrArray[newIndex] = "name";

          oldState.colHeaderArray[oldIndex] = "Color";
          oldState.colHeaderArray[newIndex] = "Name";

          this.myGrid.ctx.setColumns(oldState);
          this.myGrid.ctx.rebuildColumns();
        };

        sample01.prototype.selectionBtn = function selectionBtn(x) {

          this.status.noSelect = "";
          this.status.singleSelect = "";
          this.status.multiSelect = "";

          switch (x) {
            case 0:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.disableSelection();
              this.status.noSelect = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setSingleSelection();
              this.status.singleSelect = "lightgrey";
              break;
            case 2:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setMultiSelection();
              this.status.multiSelect = "lightgrey";
              break;
          }
        };

        sample01.prototype.sortableBtn = function sortableBtn(x) {

          this.status.sortable0 = "";
          this.status.sortable1 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableSortableColumns();
              this.status.sortable0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableSortableColumns();
              this.status.sortable1 = "lightgrey";
              break;

          }
        };

        sample01.prototype.resizeBtn = function resizeBtn(x) {
          this.status.resize0 = "";
          this.status.resize1 = "";
          this.status.resize2 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableResizableColumns();
              this.status.resize0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableResizableColumns(true);
              this.status.resize1 = "lightgrey";
              break;
            case 2:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableResizableColumns();
              this.status.resize2 = "lightgrey";
              break;

          }
        };

        sample01.prototype.lockedBtn = function lockedBtn(x) {
          this.status.locked0 = "";
          this.status.locked1 = "";
          this.status.locked2 = "";
          this.status.locked3 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.setLockedColumns(0);
              this.status.locked0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.setLockedColumns(1);
              this.status.locked1 = "lightgrey";
              break;
            case 2:
              this.myGrid.ctx.setLockedColumns(2);
              this.status.locked2 = "lightgrey";
              break;
            case 3:
              this.myGrid.ctx.setLockedColumns(3);
              this.status.locked3 = "lightgrey";
              break;

          }
        };

        sample01.prototype.setFilterBtn = function setFilterBtn(x) {

          this.status.filter0 = "";
          this.status.filter1 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableHeaderFilter();
              this.status.filter0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableHeaderFilter();
              this.status.filter1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.setFilterAtBtn = function setFilterAtBtn(x) {

          this.status.filterAt0 = "";
          this.status.filterAt1 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.setHeaderFilterAtBottom();
              this.status.filterAt0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.setHeaderFilterAtTop();
              this.status.filterAt1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.setSortBtn = function setSortBtn(x) {

          this.status.sort0 = "";
          this.status.sort1 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.disableHeaderSort();
              this.status.sort0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.enableHeaderSort();
              this.status.sort1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.myCurrentEntity2 = {};
        this.myGrid2 = {
          configRowHeight: 85,
          configHeaderHeight: 40
        };
        this.collectionLength = 0;
        this.lockStatus = "locked";
        this.lockColor = "red";
        this.status = {
          header50: "lightgrey",
          row50: "lightgrey",
          footer0: "lightgrey",
          sortable1: "lightgrey",
          resize1: "lightgrey",
          multiSelect: "lightgrey",
          locked0: "lightgrey",
          filter1: "lightgrey",
          filterAt1: "lightgrey",
          sort1: "lightgrey"

        };
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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