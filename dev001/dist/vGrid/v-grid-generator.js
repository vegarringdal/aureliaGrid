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
        function VGridGenerator(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection, vGridCellEdit) {
          _classCallCheck(this, VGridGenerator);

          this._private = {};

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
          this.vGridCellEdit = vGridCellEdit;
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
            colTypeArray: options.colTypeArray || [],
            isSortableHeader: options.isSortableHeader,
            sortOnHeaderClick: options.sortOnHeaderClick,
            sortNotOnHeader: options.sortNotOnHeader,
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
              onScrolled: options.onScrolled || function () {},
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
              clickTimersArray: [],
              scrollCallbackTimer: null
            },
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

          if (this._private.sortNotOnHeader.indexOf(attribute) !== -1) {
            return "";
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
                if (this._private.colTypeArray[i] === "image") {
                  rowTemplate = rowTemplate + ("<div><img class=\"" + this._private.css.cellContent + "\" tabindex=\"0\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" src=\"{{" + attributeNamesArray[i] + "}}\" ></div>");
                } else {
                  rowTemplate = rowTemplate + ("<div><input class=\"" + this._private.css.cellContent + "\"  readonly=\"true\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
                }
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

              tempColumns.children[i].style["line-height"] = this._private.rowHeight - 2 + "px";

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

            rowHtmlElement.setAttribute("row", rowNo);

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

            var cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelTop + " " + dragHandle + " " + _this3._private.css.orderHandle;
            var cssInput = _this3._private.css.cellContent + " " + _this3._private.css.filterInputBottom + " " + _this3._private.css.filterHandle;

            if (_this3._private.queryHelper.filterOnAtTop) {
              cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelBottom + " " + dragHandle + " " + _this3._private.css.orderHandle;
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

          this.vGridCellEdit.onScroll();

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
          clearTimeout(this._private.scrollVars.scrollCallbackTimer);
          if (this._private.requestAnimationFrame) {
            requestAnimationFrame(function () {
              doScroll();
            });
          } else {
            doScroll();
          }
          this._private.scrollVars.scrollCallbackTimer = setTimeout(function () {
            _this7._private.configFunctions.onScrolled();
          }, 250);
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

              x = _this8._private.colTypeArray[oldIndex];
              _this8._private.colTypeArray.splice(oldIndex, 1);
              _this8._private.colTypeArray.splice(newIndex, 0, x);

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
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, currentRow, _this9);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this9._private.configFunctions.clickHandler(e, currentRow);
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
          this._private.htmlCache.header.scrollLeft = currentScrollLeft;
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
//# sourceMappingURL=data:application/json;base64,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QixpQ0FvMURYLDZDQUFrQjtBQUNoQixpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsZUFBcEIsRUFBUCxDQURnQjs7O0FBcDFEUCxpQ0F5MURYLDJDQUFnQixLQUFLO0FBQ25CLGVBQUssY0FBTCxDQUFvQixlQUFwQixDQUFvQyxHQUFwQyxFQURtQjtBQUVuQixlQUFLLHdCQUFMLEdBRm1COzs7QUF6MURWLGlDQSsxRFgsdUNBQWU7QUFDYixjQUFJLG1CQUFtQixLQUFLLFFBQUwsQ0FBYyxlQUFkLENBQThCLG1CQUE5QixFQUFuQixDQURTO0FBRWIsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxtQkFBbUIsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUZsRDs7O0FBLzFESixpQ0FxMkRYLGlDQUFZO0FBQ1YsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxDQUE1QyxDQURVOzs7QUFyMkRELGlDQTAyRFgscUNBQWEsUUFBUTtBQUNuQixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLE1BQTVDLENBRG1COzs7QUExMkRWLGlDQSsyRFgsdUNBQWU7QUFDYixpQkFBTyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLENBRE07OztBQS8yREosaUNBbzNEWCwrQkFBVSxJQUFJLE9BQU87QUFDbkIsZUFBSyxlQUFMLENBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLEVBRG1COzs7QUFwM0RWLGlDQXczRFgseURBQXdCO0FBQ3RCLGVBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsRUFBMUIsQ0FEc0I7QUFFdEIsZUFBSyxxQkFBTCxHQUZzQjs7O0FBeDNEYixpQ0E2M0RYLG1EQUFvQixXQUFXO0FBQzdCLGVBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsU0FBMUIsQ0FENkI7QUFFN0IsZUFBSyxxQkFBTCxHQUY2Qjs7O0FBNzNEcEIsaUNBazREWCwrQ0FBbUI7QUFDakIsZUFBSyxRQUFMLENBQWMsaUJBQWQsR0FBa0MsSUFBbEMsQ0FEaUI7QUFFakIsZUFBSyxxQkFBTCxHQUZpQjs7O0FBbDREUixpQ0F1NERYLCtDQUFrQixXQUFXO0FBQzNCLGVBQUssUUFBTCxDQUFjLGlCQUFkLEdBQWtDLEtBQWxDLENBRDJCO0FBRTNCLGVBQUsscUJBQUwsR0FGMkI7OztlQXY0RGxCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
