"use strict";

System.register([], function (_export, _context) {
  var VGridGenerator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridGenerator", VGridGenerator = function () {
        function VGridGenerator(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection) {
          _classCallCheck(this, VGridGenerator);

          this._private = {};

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
          this.vGridInterpolate = vGridInterpolate;
          this.vGridElement = vGridElement;
          this.vGridSortable = vGridSortable;
          this.setConfig(vGridConfig);
          this.init(false);
        }

        VGridGenerator.prototype.setConfig = function setConfig(options) {
          this._private = {
            node: this.vGridElement,
            headerHeight: options.headerHeight || 0,
            rowHeight: options.rowHeight || 50,
            footerHeight: options.footerHeight || 0,
            dataScrollDelay: options.dataScrollDelay || 200,
            headerArray: options.headerArray || [],
            attributeArray: options.attributeArray || [],
            columnWidthArray: options.columnWidthArray || [],
            colStyleArray: options.colStyleArray || [],
            isSortableHeader: options.isSortableHeader,
            sortOnHeaderClick: options.sortOnHeaderClick,
            isResizableHeaders: options.isResizableHeaders,
            predefinedScrolltop: options.predefinedScrolltop,
            requestAnimationFrame: options.requestAnimationFrame,
            internalDragDropCount: 10,
            resizableHeadersAndRows: options.resizableHeadersAndRows,
            isMultiSelect: options.isMultiSelect,
            renderOnScrollbarScroll: options.renderOnScrollbarScroll,
            columnWidthArrayOverride: options.columnWidthArrayOverride,
            lockedColumns: options.lockedColumns || 0,
            sortOrder: [],
            contentHeight: 0,
            gridHeight: 0,
            gridWidth: 0,
            queryStringCheck: {},
            disableRowClick: false,
            largeScrollLimit: options.largeScrollLimit,
            scrollBodyHeight: 0,
            htmlCache: {
              grid: null,
              header: null,
              content: null,
              footer: null,
              rowsArray: [],
              scrollBody: null,
              rowTemplate: null },
            queryHelper: {
              addFilter: options.addFilter,
              doNotAddFilterTo: options.doNotAddFilterTo || [],
              filterOnKey: options.filterOnKey,
              filterOnAtTop: options.filterOnAtTop,
              filterArray: options.filterArray || []
            },
            configFunctions: {
              getCollectionLength: options.getSourceLength || function () {
                return 0;
              },

              getDataElement: options.getDataElement || function () {
                return {};
              },

              clickHandler: options.clickHandler || function () {},

              onOrderBy: options.onOrderBy || function () {},

              onFilterRun: options.onFilterRun || function () {},
              getFilterName: options.getFilterName || function () {
                return "";
              },
              onCellDraw: options.onCellDraw,

              onRowMarkupCreate: options.onRowMarkupCreate
            },
            scrollVars: {
              lastScrollTop: 0,
              firstTop: 0,
              lastScrollLeft: 0,
              halt: false,
              timer: null,
              clickTimersArray: [] },
            atts: {
              dataAttribute: "v-grid-data-attribute",
              dataAttributeFilter: "v-grid-data-attribute-filter"
            },
            css: {
              wrapper: "vGrid",
              row: "vGrid-row",
              mainHeader: "vGrid-header",
              mainContent: "vGrid-body",
              mainFooter: "vGrid-footer",
              scrollBody: "vGrid-body-scroll",
              rowCell: "vGrid-row-cell",
              rowColumn: "vGrid-row-column",
              rowHeaderCell: "vGrid-row-cell-header",
              rowHeaderColumn: "vGrid-row-column-header",
              gridColumn: "vGrid-column",
              rowHeader: "vGrid-row-header",
              rowSelected: "vGrid-row-selected",
              rowContainer: "vGrid-row-container",
              rowAlt: "vGrid-row-alt",
              rowEven: "vGrid-row-even",
              editCell: "vGrid-editCell",
              editCellWrite: "vGrid-editCell-write",
              editCellFocus: "vGrid-editCell-focus",
              filterLabelTop: "vGrid-filterLabelAtTop",
              filterLabelBottom: "vGrid-filterLabelAtBottom",
              filterInputTop: "vGrid-filterInputAtTop",
              filterInputBottom: "vGrid-filterInputAtBottom",
              cellContent: "vGrid-content",
              dragHandle: "vGrid-vGridDragHandle",
              filterHandle: "vGrid-queryField",
              orderHandle: "v-grid-header-orderBy",
              resizeHeaderDragHandle: "vGrid-draggable-handler",
              sortIcon: "vGrid-glyphicon",
              sortIconSort: "vGrid-glyphicon-sort",
              sortIconAsc: "vGrid-glyphicon-sort-asc",
              sortIconDesc: "vGrid-glyphicon-sort-desc",
              sortIconNo: "vGrid-glyphicon-",
              noData: "vGrid-row-no-data"
            }
          };
        };

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
            var row = this._private.htmlCache.rowsArray[i];
            if (clearAllRows) {
              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
            }
            this.insertRowMarkup(currentRow, row.div, true, true);
          }
        };

        VGridGenerator.prototype.getSortIcon = function getSortIcon(attribute) {
          var _this = this;

          var result;

          var lineHeigthStyleTag;
          if (!this._private.queryHelper.addFilter) {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight + "px;\"";
          } else {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight / 2 + "px;\"";
          }

          if (this._private.sortOnHeaderClick) {
            var main = "<span class=\"\"><span " + lineHeigthStyleTag + " class=\"" + this._private.css.sortIcon + " " + this._private.css.sortIconSort + "\"></span></span>";
            if (this._private.sortOrder.length === 0) {
              result = main;
            } else {
              this._private.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var isAsc = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconAsc + "\"></span>";
                  var isDesc = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconDesc + "\"></span>";

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconNo + x.no + "\">";
                  var end = '</span>';
                  result = main + end + asc;
                }
              });
            }
            if (!result) {
              result = main;
            }
          } else {
            result = "";
          }
          return result;
        };

        VGridGenerator.prototype.fillDataIntoRow = function fillDataIntoRow(rowno, clearRow) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
            if (rowno === currentRow) {
              var row = this._private.htmlCache.rowsArray[i];
              if (clearRow) {
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
              }
              this.insertRowMarkup(currentRow, row.div, true, true);
            }
          }
        };

        VGridGenerator.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {
          var i;
          for (i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
            if (this.vGridSelection.isSelected(currentRow)) {
              this._private.htmlCache.rowsArray[i].div.classList.add(this._private.css.rowSelected);
            } else {
              this._private.htmlCache.rowsArray[i].div.classList.remove(this._private.css.rowSelected);
            }
          }
        };

        VGridGenerator.prototype.getHeaderTemplate = function getHeaderTemplate(headerNamesArray, attributeNamesArray) {
          var rowTemplate = "";
          var dragHandle = this._private.isSortableHeader ? this._private.css.dragHandle : "";
          var css = dragHandle + " " + this._private.css.cellContent + " " + this._private.css.orderHandle;
          for (var i = 0; i < headerNamesArray.length; i++) {
            var sortIcon = this.getSortIcon(attributeNamesArray[i]);
            rowTemplate = rowTemplate + ("<div><div class=\"" + css + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\">" + headerNamesArray[i] + sortIcon + "</div></div>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate(attributeNamesArray) {
          var rowTemplate = "";
          if (this._private.htmlCache.rowTemplate !== null) {
            rowTemplate = this._private.htmlCache.rowTemplate;
          } else {
            if (this._private.configFunctions.onRowMarkupCreate) {
              rowTemplate = this._private.configFunctions.onRowMarkupCreate(attributeNamesArray);
            } else {
              for (var i = 0; i < attributeNamesArray.length; i++) {
                rowTemplate = rowTemplate + ("<div><input class=\"" + this._private.css.cellContent + "\" tabindex=\"0\" readonly=\"true\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
              }
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          var stringTemplate = template || this.getRowTemplate(this._private.attributeArray);
          this.vGridInterpolate.parse(stringTemplate);
          this._private.htmlCache.rowTemplate = stringTemplate;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this._private.attributeArray.length; i++) {
            total = total + parseInt(this._private.columnWidthArray[i], 10);
          }
          return total;
        };

        VGridGenerator.prototype.createHeaderMarkup = function createHeaderMarkup() {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.getHeaderTemplate(this._private.headerArray, this._private.attributeArray);
          var i;
          for (i = 0; i < tempColumns.children.length; i++) {
            tempColumns.children[i].setAttribute("column-no", i);

            if (!this._private.queryHelper.addFilter) {
              tempColumns.children[i].style["line-height"] = this._private.headerHeight + "px";
            }

            tempColumns.children[i].style.height = "100%";
            tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
            tempColumns.children[i].classList.add(this._private.css.rowHeaderCell);
            tempColumns.children[i].classList.add(this._private.css.rowHeaderColumn + i);
            tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
          }

          var row = document.createElement("DIV");
          row.className = this._private.css.row + " " + this._private.css.rowHeader;

          row.style.height = this._private.headerHeight + "px";
          row.style.width = this.getTotalColumnWidth() + "px";
          row.innerHTML = tempColumns.innerHTML;

          var container = document.createElement("DIV");
          container.className = this._private.css.rowContainer;
          container.appendChild(row);

          return container;
        };

        VGridGenerator.prototype.createRowMarkup = function createRowMarkup(entity, attributeNames) {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.vGridInterpolate.render(this.getRowTemplate(attributeNames), entity);
          if (!this._private.columnWidthArrayOverride) {
            var i;
            for (i = 0; i < tempColumns.children.length; i++) {
              tempColumns.children[i].style.height = "100%";

              tempColumns.children[i].style["line-height"] = this._private.rowHeight + "px";

              tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
              tempColumns.children[i].classList.add(this._private.css.rowCell);
              tempColumns.children[i].classList.add(this._private.css.rowColumn + i);
              tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
              if (this._private.lockedColumns > i) {
                tempColumns.children[i].style.left = this._private.scrollVars.lastScrollLeft + "px";
                tempColumns.children[i].style.zIndex = this._private.internalDragDropCount;
                tempColumns.children[i].style.position = "relative";
              }
            }
          }
          return tempColumns.innerHTML;
        };

        VGridGenerator.prototype.setEmptyTemplate = function setEmptyTemplate() {
          return "";
        };

        VGridGenerator.prototype.getRowCacheLength = function getRowCacheLength() {
          return this._private.htmlCache.rowsArray.length;
        };

        VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
          rowArray[elementNo].div.style.transform = "translate3d(0px," + topValue + "px, 0px)";
          rowArray[elementNo].top = topValue;
        };

        VGridGenerator.prototype.createGridHtmlWrapper = function createGridHtmlWrapper() {
          var x = document.createElement("DIV");
          this._private.node.appendChild(x);
          this._private.htmlCache.grid = x;

          this._private.htmlCache.grid.className = this._private.css.wrapper;
          this._private.htmlCache.grid.style.position = "relative";
          this._private.htmlCache.grid.style.height = this._private.node.style.height || "100%";
          this._private.htmlCache.grid.style.width = this._private.node.style.width || "100%";

          this._private.gridHeight = this._private.htmlCache.grid.clientHeight;
          this._private.gridWidght = this._private.htmlCache.grid.clientWidth;
        };

        VGridGenerator.prototype.createGridHtmlHeaderWrapper = function createGridHtmlHeaderWrapper() {
          this._private.htmlCache.header = document.createElement("DIV");
          this._private.htmlCache.header.className = this._private.css.mainHeader;
          this._private.htmlCache.header.style.height = this._private.headerHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.header);

          var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
          if (this._private.queryHelper.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this._private.attributeArray[i],
                headerName: this._private.headerArray[i],
                defaultFilter: this._private.queryHelper.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this._private.htmlCache.header.appendChild(headerDivs);
        };

        VGridGenerator.prototype.rebuildGridHeaderHtml = function rebuildGridHeaderHtml() {
          var getScrollLeft = this._private.htmlCache.header.firstChild.firstChild.style.left;
          this._private.htmlCache.header.removeChild(this._private.htmlCache.header.firstChild);

          var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
          if (this._private.queryHelper.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this._private.attributeArray[i],
                headerName: this._private.headerArray[i],
                defaultFilter: this._private.queryHelper.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this._private.htmlCache.header.appendChild(headerDivs);
          this.addResizableAndSortableEvent();

          this._private.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
        };

        VGridGenerator.prototype.createGridHtmlContentWrapper = function createGridHtmlContentWrapper() {
          var gridWrapperHeight = this._private.gridHeight;
          var headerAndFooterHeight = this._private.headerHeight + this._private.footerHeight;
          this._private.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this._private.htmlCache.content = document.createElement("DIV");
          this._private.htmlCache.content.className = this._private.css.mainContent;
          this._private.htmlCache.content.style.height = this._private.contentHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.content);
        };

        VGridGenerator.prototype.createGridHtmlFooterWrapper = function createGridHtmlFooterWrapper() {
          this._private.htmlCache.footer = document.createElement("DIV");
          this._private.htmlCache.footer.className = this._private.css.mainFooter;
          this._private.htmlCache.footer.style.height = this._private.footerHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.footer);
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this._private.configFunctions.getCollectionLength();
          this._private.scrollBodyHeight = collectionLength * this._private.rowHeight;
        };

        VGridGenerator.prototype.createGridHtmlScrollBodyWrapper = function createGridHtmlScrollBodyWrapper() {
          this.setScrollBodyHeightToVar();

          this._private.htmlCache.scrollBody = document.createElement("DIV");
          this._private.htmlCache.scrollBody.className = this._private.css.scrollBody;
          this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this._private.htmlCache.content.appendChild(this._private.htmlCache.scrollBody);
        };

        VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
            this._private.htmlCache.rowsArray[i].div.style.width = this.getTotalColumnWidth() + "px";
          }
          this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.createGridHtmlRowWrapper = function createGridHtmlRowWrapper() {
          var minimumRowsNeeded = parseInt(this._private.contentHeight / this._private.rowHeight, 10) * 2;

          if (minimumRowsNeeded % 2 === 1) {
            minimumRowsNeeded = minimumRowsNeeded + 9;
          } else {
            minimumRowsNeeded = minimumRowsNeeded + 8;
          }

          var top = 0;
          for (var i = 0; i < minimumRowsNeeded; i++) {

            var row = document.createElement("DIV");

            row.className = this._private.css.row;

            if (i % 2 === 1) {
              row.classList.add(this._private.css.rowAlt);
            } else {
              row.classList.add(this._private.css.rowEven);
            }

            row.style.height = this._private.rowHeight + "px";

            this.setRowTopValue([{
              div: row,
              top: 0
            }], 0, top);

            row.style.minWidth = this._private.htmlCache.grid.offsetWidth + "px";
            row.style.width = this.getTotalColumnWidth() + "px";

            row.innerHTML = this.setEmptyTemplate();

            this._private.htmlCache.scrollBody.appendChild(row);

            this._private.htmlCache.rowsArray.push({
              div: row,
              top: top
            });

            top = top + this._private.rowHeight;
          }
        };

        VGridGenerator.prototype.insertRowMarkup = function insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
          var _this2 = this;

          this._private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {
            var container = document.createElement("DIV");
            container.className = _this2._private.css.rowContainer;

            if (_this2._private.columnWidthArrayOverride) {
              container.style.width = "100%";
            }

            var innerHtml = "";
            if (entity) {
              innerHtml = _this2.createRowMarkup(entity, _this2._private.attributeArray);
            }
            if (!entity) {
              rowHtmlElement.classList.add(_this2._private.css.noData);
            } else {
              rowHtmlElement.classList.remove(_this2._private.css.noData);
            }

            if (rowNo % 2 === 1) {
              if (rowHtmlElement.classList.contains(_this2._private.css.rowEven)) {
                rowHtmlElement.classList.remove(_this2._private.css.rowEven);
                rowHtmlElement.classList.add(_this2._private.css.rowAlt);
              }
            } else {
              if (rowHtmlElement.classList.contains(_this2._private.css.rowAlt)) {
                rowHtmlElement.classList.remove(_this2._private.css.rowAlt);
                rowHtmlElement.classList.add(_this2._private.css.rowEven);
              }
            }

            try {
              if (_this2.vGridSelection.isSelected(rowNo)) {
                rowHtmlElement.classList.add(_this2._private.css.rowSelected);
              } else {
                rowHtmlElement.classList.remove(_this2._private.css.rowSelected);
              }
            } catch (e) {}

            container.innerHTML = innerHtml;
            if (rowHtmlElement.firstChild) {
              if (rowHtmlElement.firstChild.innerHTML !== innerHtml) {
                rowHtmlElement.appendChild(container);
              }
            } else {
              rowHtmlElement.appendChild(container);
            }

            if (_this2._private.configFunctions.onCellDraw) {
              var rowCells = rowHtmlElement.lastElementChild.children;
              for (var i = 0; i < rowCells.length; i++) {
                _this2._private.configFunctions.onCellDraw({
                  attributeName: _this2._private.attributeArray[i],
                  div: rowCells[i],
                  row: rowNo
                });
              }
            }
          });
        };

        VGridGenerator.prototype.addFilterToHeaderCell = function addFilterToHeaderCell(event) {
          var _this3 = this;

          var attributeName = event.attributeName;
          var headerName = event.headerName;
          var defaultFilter = event.defaultFilter;

          var onChangeEventOnFilter = function onChangeEventOnFilter(e) {

            if (e.keyCode !== 9) {
              var queryHtmlInput = _this3._private.node.querySelectorAll("." + _this3._private.css.filterHandle);

              var queryParams = [];
              for (var i = 0; i < queryHtmlInput.length; i++) {
                if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3._private.atts.dataAttribute);
                  var operator = _this3._private.queryHelper.filterArray[_this3._private.attributeArray.indexOf(dataSourceAttribute)];

                  var value = queryHtmlInput[i].value;

                  queryParams.push({
                    attribute: dataSourceAttribute,
                    value: value,
                    operator: operator
                  });

                  _this3._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
                } else {

                  if (queryHtmlInput[i].value === "") {
                    var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3._private.atts.dataAttribute);
                    _this3._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
                  }
                }
              }
              _this3._private.configFunctions.onFilterRun(queryParams);
            }
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var dragHandle = _this3._private.isSortableHeader ? _this3._private.css.dragHandle : "";

            var cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelBottom + " " + dragHandle + " " + _this3._private.css.orderHandle;
            var cssInput = _this3._private.css.cellContent + " " + _this3._private.css.filterInputBottom + " " + _this3._private.css.filterHandle;

            if (_this3._private.queryHelper.filterOnAtTop) {
              cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelTop + " " + dragHandle + " " + _this3._private.css.orderHandle;
              cssInput = _this3._private.css.cellContent + " " + _this3._private.css.filterInputTop + " " + _this3._private.css.filterHandle;
            }

            var sortIcon = _this3.getSortIcon(attribute);

            var filter = _this3._private.queryHelper.filterArray[_this3._private.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this3._private.configFunctions.getFilterName(filter);

            var lineHeigth = "line-height:" + _this3._private.headerHeight / 2 + "px;";

            var cellLabel = "<div style=\"" + lineHeigth + "\" class=\"" + cssLabel + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\">" + labelTopCell + " " + sortIcon + "</div>";
            var cellInput = "<input style=\"" + lineHeigth + "\" placeholder=\"" + filterName + "\" class=\"" + cssInput + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\" value=\"" + valueInput + "\"/>";

            if (_this3._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = "<div class=\"" + cssLabel + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\"></div>";
            }

            var result;
            if (_this3._private.queryHelper.filterOnAtTop) {
              result = cellInput + cellLabel;
            } else {
              result = cellLabel + cellInput;
            }
            return result;
          };

          var value = "";

          if (this._private.queryStringCheck[attributeName] !== undefined) {
            value = this._private.queryStringCheck[attributeName];
          }

          var onFocus = function onFocus(e) {
            var currentScrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
            _this3._private.htmlCache.content.scrollLeft = currentScrollLeft;
          };

          event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);

          var cellInputElement = event.div.querySelectorAll("." + this._private.css.filterHandle);
          if (this._private.queryHelper.filterOnKey !== true) {
            for (var i = 0; i < cellInputElement.length; i++) {
              cellInputElement[i].onchange = onChangeEventOnFilter;
              cellInputElement[i].onkeyup = onKeyUpEventOnFilter;
              cellInputElement[i].onfocus = onFocus;
            }
          } else {
            for (var i = 0; i < cellInputElement.length; i++) {
              cellInputElement[i].onkeyup = onChangeEventOnFilter;
              cellInputElement[i].onfocus = onFocus;
            }
          }
        };

        VGridGenerator.prototype.onNormalScrollingLarge = function onNormalScrollingLarge() {
          var _this4 = this;

          this._private.scrollVars.lastScrollTop = this._private.htmlCache.content.scrollTop;

          if (this._private.htmlCache.content.scrollTop === 0 && this._private.scrollVars.lastScrollTop !== this._private.htmlCache.content.scrollTop) {
            this._private.scrollVars.lastScrollTop = 0;
          }

          if (this._private.configFunctions.getCollectionLength() <= this._private.htmlCache.rowsArray.length) {
            this._private.scrollVars.lastScrollTop = 0;
          }

          var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
          this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
          var currentRowTop = this._private.rowHeight * currentRow;
          var bottomHitCount;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
              var row = _this4._private.htmlCache.rowsArray[cacheRowNumber];
              _this4.setRowTopValue([row], 0, currentRowTop);

              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
              currentRowTop = currentRowTop + _this4._private.rowHeight;
            };

            if (currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            if (currentRow === this._private.configFunctions.getCollectionLength() - 1 && this.getRowCacheLength() < this._private.configFunctions.getCollectionLength() - 1) {
              bottomHitCount = i;
            }

            if (currentRow > this._private.configFunctions.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            if (currentRow >= this._private.configFunctions.getCollectionLength() && currentRowTop >= this._private.htmlCache.content.clientHeight) {
              var row = this._private.htmlCache.rowsArray[i];
              this.setRowTopValue([row], 0, currentRowTop - 5000);
              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
            }

            currentRow++;
          }

          if (bottomHitCount) {
            var firstTop = parseInt(this._private.htmlCache.rowsArray[0].top, 10);
            for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
              var row = this._private.htmlCache.rowsArray[i];
              firstTop = firstTop - this._private.rowHeight;
              this.setRowTopValue(this._private.htmlCache.rowsArray, i, firstTop);
              try {
                row.div.removeChild(row.div.firstChild);
              } catch (e) {}
            }
          }

          this._private.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });

          this.fillDataInRows(false);
        };

        VGridGenerator.prototype.onNormalScrolling = function onNormalScrolling(isDownScroll, currentScrollTop) {
          var currentScrollTop = this._private.htmlCache.content.scrollTop;
          if (this._private.scrollVars.halt === false) {
            var newTopValue;
            var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
            this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;

            for (var i = 0; i < this.getRowCacheLength(); i++) {

              var row = this._private.htmlCache.rowsArray[i];
              var rowTop = parseInt(row.top, 10);
              var update = false;

              if (isDownScroll) {
                if (rowTop < currentScrollTop - this._private.rowHeight) {
                  update = true;
                  newTopValue = rowTop + this._private.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop + this._private.rowHeight * this.getRowCacheLength()) / this._private.rowHeight;
                }
                if (rowTop > (this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight && rowTop > parseInt(this._private.htmlCache.content.style.height)) {
                  this.setRowTopValue([row], 0, -5000 + i);
                }
              } else {
                if (rowTop > currentScrollTop + this._private.contentHeight) {
                  update = true;
                  newTopValue = rowTop - this._private.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop - this._private.rowHeight * this.getRowCacheLength()) / this._private.rowHeight;
                }
              }

              if (update === true && currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
                this.setRowTopValue([row], 0, newTopValue);
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
                this.insertRowMarkup(currentRow, row.div, isDownScroll, false);
              }
            }
            this._private.htmlCache.rowsArray.sort(function (a, b) {
              return parseInt(a.top) - parseInt(b.top);
            });
          } else {
            this.onScrollbarScrolling();
          }
        };

        VGridGenerator.prototype.hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
          var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
          this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var row = this._private.htmlCache.rowsArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight && rowTop > parseInt(this._private.htmlCache.content.style.height) - this._private.rowHeight) {
              this.setRowTopValue([row], 0, -5000 + i);
            }
          }

          this._private.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        VGridGenerator.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
          var _this5 = this;

          this._private.scrollVars.halt = true;

          var timeout = this._private.dataScrollDelay;

          clearTimeout(this._private.scrollVars.timer);

          this._private.scrollVars.timer = setTimeout(function () {
            _this5.onNormalScrollingLarge();
            _this5._private.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {
          var _this6 = this;

          this._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });

          if (this._private.scrollVars.clickTimersArray.length > 0) {
            setTimeout(function () {
              _this6._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
                clearTimeout(xTimer);
              });
            }, 0);
          }
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this7 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this7._private.htmlCache.content.scrollTop;
            var currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this7._private.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this7._private.htmlCache.content.scrollLeft = _this7._private.scrollVars.lastScrollLeft;
                _this7._private.htmlCache.header.scrollLeft = _this7._private.scrollVars.lastScrollLeft;
              }

              _this7.onScrollClickCancel();

              var isDownScroll = true;
              if (currentScrollTop < _this7._private.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;

              switch (true) {
                case currentScrollTop > _this7._private.scrollVars.lastScrollTop + _this7._private.largeScrollLimit:
                case currentScrollTop < _this7._private.scrollVars.lastScrollTop - _this7._private.largeScrollLimit:
                  isLargeScroll = true;
                  break;

                default:
                  isLargeScroll = false;
              }

              _this7._private.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this7._private.renderOnScrollbarScroll) {
                  _this7.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  _this7.onScrollbarScrolling();
                }
              } else {
                _this7.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this7._private.htmlCache.content.style.overflowX === "hidden") {
                _this7._private.htmlCache.content.scrollLeft = 0;
                _this7._private.scrollVars.lastScrollLeft = 0;
                _this7._private.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this7._private.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;
                  _this7._private.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this7._private.htmlCache.header.scrollLeft = currentScrollLeft;
                }
              }

              if (_this7._private.lockedColumns > 0) {
                currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this7._private.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this7._private.node.querySelectorAll("." + _this7._private.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this7._private.node.querySelectorAll("." + _this7._private.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this7._private.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this7._private.internalDragDropCount;
                    fixRow[i].style.position = "relative";
                  }
                }
              }
            }
          };

          if (this._private.requestAnimationFrame) {
            requestAnimationFrame(function () {
              doScroll();
            });
          } else {
            doScroll();
          }
        };

        VGridGenerator.prototype.getRowNumberFromClickedOn = function getRowNumberFromClickedOn(e) {
          var thisTop;
          var x = 10;
          var node = e.target;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
                    thisTop = this._private.htmlCache.rowsArray[y].top;
                  }
                }
              }
              node = node.offsetParent;
            } catch (x) {}
          }

          var rowHeight = this._private.rowHeight;
          var currentRow = Math.round(thisTop / rowHeight);
          return currentRow;
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {

          var collectionHeight = this._private.configFunctions.getCollectionLength() * this._private.rowHeight + this._private.rowHeight / 2;
          var bodyHeight = this._private.htmlCache.content.offsetHeight;


          if (collectionHeight <= bodyHeight) {
            this._private.htmlCache.content.scrollTop = 0;

            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "hidden";
            this._private.htmlCache.content.style.overflowX = "hidden";
            this._private.htmlCache.header.style.overflowY = "hidden";
          } else {
            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "scroll";
            this._private.htmlCache.content.style.overflowX = "hidden";
            this._private.htmlCache.header.style.overflowY = "scroll";
          }

          if (this._private.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this._private.htmlCache.content.style.overflowX = "scroll";
          }
        };

        VGridGenerator.prototype.addResizableAndSortableEvent = function addResizableAndSortableEvent() {
          var _this8 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this._private.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this8._private.configFunctions.onOrderBy(event, function (sortorder) {
                  _this8._private.sortOrder = sortorder;
                  _this8.rebuildGridHeaderHtml();
                });
              }
            };

            var orderBy = this._private.node.querySelectorAll("." + this._private.css.orderHandle);
            for (var i = 0; i < orderBy.length; i++) {
              orderBy[i].addEventListener("click", orderByClick.bind(this), false);
            }
          }

          if (this._private.isResizableHeaders) {
            var x = this._private.htmlCache.header.querySelectorAll("." + this._private.css.rowHeaderCell);
            for (var i = 0; i < x.length; i++) {

              var temp = document.createElement("DIV");
              temp.classList.add(this._private.css.resizeHeaderDragHandle);

              temp.onmousedown = function (e) {
                resizable = true;

                if (_this8._private.isSortableHeader) {
                  _this8._private.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = e.target;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                _this8._private.htmlCache.header.onmousemove = function (e) {
                  _this8._private.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (_this8._private.isSortableHeader) {
                        _this8._private.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this8._private.htmlCache.header.onmouseleave = "";
                    _this8._private.htmlCache.header.onmousemove = "";
                    _this8._private.htmlCache.header.onmouseup = "";


                    _this8._private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this8._private.htmlCache.rowTemplate = null;
                    _this8.correctRowAndScrollbodyWidth();

                    _this8.cacheRowTemplate(null);
                    _this8.updateGridScrollbars();
                    _this8.fillDataInRows(true);
                  };

                  _this8._private.htmlCache.header.onmouseleave = function (e) {
                    _this8._private.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this8._private.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this8._private.resizableHeadersAndRows) {
                      var columnsToFix = _this8._private.htmlCache.content.firstChild.querySelectorAll("." + _this8._private.css.rowColumn + index);

                      for (var col = 0; col < columnsToFix.length; col++) {
                        columnsToFix[col].style.width = newWidth;
                      }

                      _this8.correctRowAndScrollbodyWidth();
                      _this8.updateGridScrollbars();
                    }
                  } else {
                    _this8.correctHeaderAndScrollbodyWidth();
                  }
                };
              };

              x[i].appendChild(temp);
            }
          }

          var canMove = false;
          var dragHandles = this._private.htmlCache.grid.querySelectorAll("." + this._private.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl) {
            itemEl.onmouseenter = function () {
              canMove = true;
            };
            itemEl.onmouseleave = function () {
              canMove = false;
            };
          });

          if (this._private.isSortableHeader) {
            this._private.sortableCtx = new this.vGridSortable(this._private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
              var children = _this8._private.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this8._private.attributeArray[oldIndex];
              _this8._private.attributeArray.splice(oldIndex, 1);
              _this8._private.attributeArray.splice(newIndex, 0, x);

              x = _this8._private.queryHelper.filterArray[oldIndex];
              _this8._private.queryHelper.filterArray.splice(oldIndex, 1);
              _this8._private.queryHelper.filterArray.splice(newIndex, 0, x);

              x = _this8._private.headerArray[oldIndex];
              _this8._private.headerArray.splice(oldIndex, 1);
              _this8._private.headerArray.splice(newIndex, 0, x);

              x = _this8._private.columnWidthArray[oldIndex];
              _this8._private.columnWidthArray.splice(oldIndex, 1);
              _this8._private.columnWidthArray.splice(newIndex, 0, x);

              x = _this8._private.colStyleArray[oldIndex];
              _this8._private.colStyleArray.splice(oldIndex, 1);
              _this8._private.colStyleArray.splice(newIndex, 0, x);

              _this8._private.htmlCache.rowTemplate = null;
              _this8.cacheRowTemplate(null);
              _this8.rebuildColumns();
              sortable = false;
            }, function (n) {
              sortable = true;
            }, function (n) {
              sortable = false;
            }, function () {
              return canMove;
            });
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this9 = this;

          var handleClick = function handleClick(e) {
            var currentRow = _this9.getRowNumberFromClickedOn(e);
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, _this9);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = _this9.getRowNumberFromClickedOn(e);
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, _this9);
            }
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {}
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this._private.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("contextmenu", onMouseDownRow.bind(this), false);
          }

          this._private.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.correctColumnsWidthArray = function correctColumnsWidthArray() {
          var newColumnWidth = [];
          for (var i = 0; i < this._private.attributeArray.length; i++) {
            var columnWidth = this._private.columnWidthArray[i] || 100;
            newColumnWidth.push(columnWidth);
          }
          this._private.columnWidthArray = newColumnWidth;
        };

        VGridGenerator.prototype.setLargeScrollLimit = function setLargeScrollLimit() {
          if (!this._private.largeScrollLimit) {
            this._private.largeScrollLimit = this._private.contentHeight * 3.3;
          }
        };

        VGridGenerator.prototype.addHtml = function addHtml() {
          this.cacheRowTemplate(null);

          this.createGridHtmlWrapper();
          this.createGridHtmlHeaderWrapper();
          this.createGridHtmlContentWrapper();
          this.createGridHtmlFooterWrapper();
          this.createGridHtmlScrollBodyWrapper();
          this.createGridHtmlRowWrapper();
          this.updateGridScrollbars();
        };

        VGridGenerator.prototype.init = function init(isRebuild) {
          this.correctColumnsWidthArray();
          this.addHtml();
          this.addEvents();
          if (!isRebuild) {
            this.vGridSelection.setMode(this._private.isMultiSelect);
          }

          if (this._private.predefinedScrolltop) {
            this.setScrollTop(this._private.predefinedScrolltop);
          }

          this.fillDataInRows(false);

          this.setLargeScrollLimit();
        };

        VGridGenerator.prototype.redrawGrid = function redrawGrid() {
          this._private.node.getElementsByClassName(this._private.css.wrapper)[0].remove();
          this._private.htmlCache.rowsArray = [];
          this._private.htmlCache.header = null;
          this._private.htmlCache.content = null;
          this._private.htmlCache.footer = null;
          this._private.htmlCache.scrollBody = null;
          this._private.htmlCache.rowTemplate = null;

          this.init(true);
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
          var currentScrollLeft = this._private.htmlCache.content.scrollLeft;
          var header = this._private.htmlCache.header.children[0].children[0];
          header.style.left = -currentScrollLeft + "px";
          if (this._private.lockedColumns > 0) {
            currentScrollLeft = this._private.htmlCache.content.scrollLeft;
            for (var lockedColNo = this._private.lockedColumns; lockedColNo--;) {
              var fix = this._private.node.querySelectorAll("." + this._private.css.gridColumn + lockedColNo);

              for (var i = fix.length; i--;) {
                fix[i].style.left = currentScrollLeft + "px";
                fix[i].style.zIndex = this._private.internalDragDropCount;
                fix[i].style.position = "relative";
              }
            }
          }
        };

        VGridGenerator.prototype.rebuildColumns = function rebuildColumns() {
          this.correctColumnsWidthArray();
          this._private.htmlCache.rowTemplate = null;
          this.cacheRowTemplate(null);
          this.rebuildGridHeaderHtml();
          this.fillDataInRows(true);
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.updateGridScrollbars();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.correctColumnsWidthArray();
          this._private.htmlCache.rowTemplate = null;
          this.cacheRowTemplate(null);
          this.rebuildGridHeaderHtml();
          this.fillDataInRows(true);
          this.updateSelectionOnAllRows();
          this.collectionChange(resetScrollToTop);
        };

        VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
          this.setScrollBodyHeightToVar();
          this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
          var reset = false;
          if (resetScrollToTop === true) {
            this._private.htmlCache.content.scrollTop = 0;
          }
          if (this._private.scrollBodyHeight < this._private.htmlCache.content.scrollTop || scrollBottom) {
            var collectionLength = this._private.configFunctions.getCollectionLength();
            var contentRows = parseInt(this._private.htmlCache.content.offsetHeight / this._private.rowHeight);
            var scrollOffsetHeight = contentRows * this._private.rowHeight;
            this._private.htmlCache.content.scrollTop = collectionLength * this._private.rowHeight - scrollOffsetHeight;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.onNormalScrollingLarge();
          this.fillDataInRows(true);
          if (scrollBottom) {
            this._private.htmlCache.content.scrollTop = this._private.htmlCache.content.scrollTop + this._private.rowHeight;
          }
        };

        VGridGenerator.prototype.setRowHeight = function setRowHeight(newHeight) {
          this._private.rowHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setHeaderHeight = function setHeaderHeight(newHeight) {
          this._private.headerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setFooterHeight = function setFooterHeight(newHeight) {
          this._private.footerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.disableHeaderFilter = function disableHeaderFilter() {
          this._private.queryHelper.addFilter = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderFilter = function enableHeaderFilter() {
          this._private.queryHelper.addFilter = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtBottom = function setHeaderFilterAtBottom() {
          this._private.queryHelper.filterOnAtTop = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtTop = function setHeaderFilterAtTop() {
          this._private.queryHelper.filterOnAtTop = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this._private.headerArray = paramObj.headerArray;
          this._private.attributeArray = paramObj.attributeArray;
          this._private.columnWidthArray = paramObj.columnWidthArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "headerArray": this._private.headerArray,
            "attributeArray": this._private.attributeArray,
            "columnWidthArray": this._private.columnWidthArray
          };
        };

        VGridGenerator.prototype.setLockedColumns = function setLockedColumns(numberOfLockedColumns) {
          this._private.lockedColumns = numberOfLockedColumns;
          this.rebuildColumns();
        };

        VGridGenerator.prototype.enableResizableColumns = function enableResizableColumns(option) {
          this._private.isResizableHeaders = true;
          this._private.resizableHeadersAndRows = option;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableResizableColumns = function disableResizableColumns() {
          this._private.isResizableHeaders = false;
          this._private.resizableHeadersAndRows = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableSortableColumns = function enableSortableColumns() {
          this._private.isSortableHeader = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableSortableColumns = function disableSortableColumns() {
          this._private.isSortableHeader = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setMultiSelection = function setMultiSelection(keepSelection) {
          this.vGridSelection.setMode("multible");
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.setSingleSelection = function setSingleSelection(keepSelection) {
          this.vGridSelection.setMode("single");
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.disableSelection = function disableSelection(keepSelection) {
          this.vGridSelection.setMode(null);
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.getSelectedRows = function getSelectedRows() {
          return this.vGridSelection.getSelectedRows();
        };

        VGridGenerator.prototype.setSelectedRows = function setSelectedRows(sel) {
          this.vGridSelection.setSelectedRows(sel);
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.scrollBottom = function scrollBottom() {
          var collectionLength = this._private.configFunctions.getCollectionLength();
          this._private.htmlCache.content.scrollTop = collectionLength * this._private.rowHeight;
        };

        VGridGenerator.prototype.scrollTop = function scrollTop() {
          this._private.htmlCache.content.scrollTop = 0;
        };

        VGridGenerator.prototype.setScrollTop = function setScrollTop(newTop) {
          this._private.htmlCache.content.scrollTop = newTop;
        };

        VGridGenerator.prototype.getScrollTop = function getScrollTop() {
          return this._private.htmlCache.content.scrollTop;
        };

        VGridGenerator.prototype.updateRow = function updateRow(no, clear) {
          this.fillDataIntoRow(no, clear);
        };

        VGridGenerator.prototype.clearHeaderSortFilter = function clearHeaderSortFilter() {
          this._private.sortOrder = [];
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderSortFilter = function setHeaderSortFilter(sortOrder) {
          this._private.sortOrder = sortOrder;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderSort = function enableHeaderSort() {
          this._private.sortOnHeaderClick = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableHeaderSort = function disableHeaderSort(sortOrder) {
          this._private.sortOnHeaderClick = false;
          this.rebuildGridHeaderHtml();
        };

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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