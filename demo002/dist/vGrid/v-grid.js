'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      noView = _aureliaFramework.noView;
      processContent = _aureliaFramework.processContent;
      ObserverLocator = _aureliaFramework.ObserverLocator;
      customAttribute = _aureliaFramework.customAttribute;
      bindable = _aureliaFramework.bindable;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridInterpolate) {
      VGridInterpolate = _vGridInterpolate.VGridInterpolate;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = processContent(false), _dec2 = customAttribute("config"), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGrid(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.scrollBottomNext = false;
          this.sgkey = "sgKey" + Math.floor(Math.random() * 1000 + 1);
          this.gridContextMissing = false;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.collectionFiltered = [];
          this.subscriptionsArray = [];
          this.rowEditMode = false;
          this.skipNextUpdateProperty = [];
          this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
        }

        VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

          var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
            this.disableObservablesArray();

            this.collectionFiltered = this.collection.slice(0);
            this.resetKeys();

            this.vGridSort.reset();
            this.gridContext.ctx.clearHeaderSortFilter();
            this.gridContext.ctx.selection.reset();
            this.gridContext.ctx.collectionChange();

            for (var k in this.currentEntity) {
              if (this.currentEntity.hasOwnProperty(k)) {
                this.currentEntity[k] = undefined;
                this.skipNextUpdateProperty.push(k);
              }
            }

            this.enableObservablesArray();
          });
          this.collectionSubscription = this.__observers__.collection;
        };

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this = this;

          var key = 0;
          this.collection.forEach(function (row) {
            row[_this.sgkey] = key;
            key++;
          });
        };

        VGrid.prototype.getSelectionKeys = function getSelectionKeys() {
          var _this2 = this;

          var curSel = this.gridContext.ctx.selection.getSelectedRows();
          var selKeys = [];
          var collectionFiltered = this.collectionFiltered;
          curSel.forEach(function (x) {
            selKeys.push(collectionFiltered[x][_this2.sgkey]);
          });
          return selKeys;
        };

        VGrid.prototype.setSelectionFromKeys = function setSelectionFromKeys(selKeys) {
          var _this3 = this;

          var newSelection = [];
          var count = 0;
          this.collectionFiltered.forEach(function (x) {
            if (selKeys.indexOf(x[_this3.sgkey]) !== -1) {
              newSelection.push(count);
            }
            count++;
          });
          this.gridContext.ctx.selection.setSelectedRows(newSelection);
        };

        VGrid.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this4 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
          arrayObserver.subscribe(function (changes) {

            var result = changes[0];
            var colFiltered = _this4.collectionFiltered;
            var col = _this4.collection;
            var grid = _this4.gridContext.ctx;

            var selKeys = _this4.getSelectionKeys();

            var curKey = -1;
            if (_this4.currentRowEntity) {
              curKey = _this4.currentRowEntity[_this4.sgkey];
            }
            var curEntityValid = true;

            if (result) {
              if (result.addedCount > 0) {
                col.forEach(function (x) {
                  if (x[_this4.sgkey] === undefined) {
                    colFiltered.push(x);
                  }
                });
              }

              if (result.removed.length > 0) {
                var toRemove = [];
                result.removed.forEach(function (x) {
                  toRemove.push(x[_this4.sgkey]);
                });

                var i = colFiltered.length - 1;
                while (i !== -1) {
                  if (toRemove.indexOf(curKey) !== -1) {
                    curEntityValid = false;
                  }

                  if (toRemove.indexOf(colFiltered[i][_this4.sgkey]) !== -1) {
                    var x = colFiltered.splice(i, 1);
                    var selKey = selKeys.indexOf(x[0][_this4.sgkey]);

                    if (selKey !== -1) {
                      selKeys.splice(selKey, 1);
                    }
                  }

                  i--;
                }
              }

              if (!curEntityValid) {
                for (var k in _this4.currentEntity) {
                  if (_this4.currentEntity.hasOwnProperty(k)) {
                    _this4.currentEntity[k] = undefined;
                    _this4.skipNextUpdateProperty.push(k);
                  }
                }
              } else {
                var newRowNo = -1;
                if (curKey) {
                  _this4.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this4.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }
              }

              _this4.setSelectionFromKeys(selKeys);

              _this4.resetKeys();

              if (newRowNo > -1) {
                _this4.currentRowEntity = _this4.collectionFiltered[newRowNo];
                _this4.currentEntity[_this4.sgkey] = _this4.currentRowEntity[_this4.sgkey];
                _this4.filterRow = newRowNo;
              }

              grid.collectionChange(false, _this4.scrollBottomNext);
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this5 = this;

          this.gridOptions.attributeArray.forEach(function (property) {
            var propertyObserver = _this5.observerLocator.getObserver(_this5.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this5.skipNextUpdateProperty.indexOf(property) === -1) {
                  _this5.currentRowEntity[property] = newValue;
                  _this5.gridContext.ctx.updateRow(_this5.filterRow, true);
                } else {
                  _this5.skipNextUpdateProperty.splice(_this5.skipNextUpdateProperty.indexOf(property), 1);
                }
              }
            });
            _this5.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGrid.prototype.bind = function bind(parent) {
          this.$parent = parent;

          if (!this.gridContext) {
            this.gridContext = {};
            this.gridContextMissing = true;
          }

          this.collectionFiltered = this.collection.slice(0);

          this.resetKeys();
        };

        VGrid.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe();
          this.collectionSubscription = null;
        };

        VGrid.prototype.disableObservablesArray = function disableObservablesArray() {
          this.subscriptionsArray.unsubscribe();
          this.subscriptionsArray = null;
        };

        VGrid.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
          for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
            try {
              this.subscriptionsAttributes[i].unsubscribe();
            } catch (e) {}
          }
          this.subscriptionsAttributes = [];
        };

        VGrid.prototype.attached = function attached() {
          var _this6 = this;

          var gridOptions = {};

          if (!this.rowData) {
            throw "error, you need to add the row for the grid to work atm";
          }
          if (this.gridContextMissing && !this.rowData) {
            throw "grid needs context under config attributes, or row element";
          }

          this.rowData.style.display = "none";

          var type = {
            "true": true,
            "false": false
          };

          var setValue = function setValue(contextValue, htmlAttributeValue, defaultValue) {
            var value = defaultValue;
            if (contextValue !== undefined && contextValue !== null) {
              value = contextValue;
            } else {
              if (htmlAttributeValue !== undefined && htmlAttributeValue !== null) {
                value = htmlAttributeValue;
              }
            }
            return value;
          };

          if (this.columns.length === 0) {
            gridOptions.columnWidthArrayOverride = true;

            gridOptions.onRowMarkupCreate = function () {
              return _this6.rowData.innerHTML;
            };

            gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",");
          } else {
            gridOptions.attributeArray = [];
            gridOptions.columnWidthArray = [];
            gridOptions.headerArray = [];
            gridOptions.filterArray = [];
            gridOptions.readOnlyArray = [];
            gridOptions.colStyleArray = [];

            for (var i = 0; i < this.columns.length; i++) {
              gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
              gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
              gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
              gridOptions.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
              gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
              gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
            }

            gridOptions.attributeArray = this.gridContext.attributeArray || gridOptions.attributeArray;
            gridOptions.columnWidthArray = this.gridContext.columnWidthArray || gridOptions.columnWidthArray;
            gridOptions.headerArray = this.gridContext.headerArray || gridOptions.headerArray;
            gridOptions.filterArray = this.gridContext.filterArray || gridOptions.filterArray;
            gridOptions.readOnlyArray = this.gridContext.readOnlyArray || gridOptions.readOnlyArray;
            gridOptions.colStyleArray = this.gridContext.colStyleArray || gridOptions.colStyleArray;
          }

          gridOptions.rowHeight = setValue(this.gridContext.rowHeight, parseInt(this.element.getAttribute("row-height")), 50);
          gridOptions.headerHeight = setValue(this.gridContext.headerHeight, parseInt(this.element.getAttribute("header-height")), 0);
          gridOptions.footerHeight = setValue(this.gridContext.footerHeight, parseInt(this.element.getAttribute("footer-height")), 0);
          gridOptions.isResizableHeaders = setValue(this.gridContext.resizableHeaders, type[this.element.getAttribute("resizable-headers")], false);
          gridOptions.isMultiSelect = setValue(this.gridContext.multiSelect, type[this.element.getAttribute("multi-select")], undefined);
          gridOptions.isSortableHeader = setValue(this.gridContext.sortableHeader, type[this.element.getAttribute("sortable-headers")], false);
          gridOptions.requestAnimationFrame = setValue(this.gridContext.requestAnimationFrame, type[this.element.getAttribute("request-animation-frame")], true);
          gridOptions.resizableHeadersAndRows = setValue(this.gridContext.resizeAlsoRows, type[this.element.getAttribute("resize-also-rows")], false);
          gridOptions.renderOnScrollbarScroll = setValue(this.gridContext.renderOnScrollbarScroll, type[this.element.getAttribute("render-on-scrollbar-scroll")], true);
          gridOptions.lockedColumns = setValue(this.gridContext.lockedColumns, parseInt(this.element.getAttribute("locked-columns")), 0);
          gridOptions.addFilter = setValue(this.gridContext.headerFilter, type[this.element.getAttribute("header-filter")], false);
          gridOptions.filterOnAtTop = setValue(this.gridContext.headerFilterTop, type[this.element.getAttribute("header-filter-top")], false);
          gridOptions.filterOnKey = setValue(this.gridContext.headerFilterOnkeydown, type[this.element.getAttribute("header-filter-onkeydown")], false);
          gridOptions.sortOnHeaderClick = setValue(this.gridContext.sortOnHeaderClick, type[this.element.getAttribute("sort-on-header-click")], false);

          if (this.element.getAttribute("header-filter-not-to")) {
            gridOptions.doNotAddFilterTo = this.element.getAttribute("header-filter-not-to").split(",");
          } else {
            if (this.gridContext.headerFilterNotTo) {
              gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo.split(",");
            } else {
              gridOptions.doNotAddFilterTo = [];
            }
          }

          if (gridOptions.addFilter) {
            gridOptions.onFilterRun = function (filterObj) {

              if (filterObj.length !== 0 || _this6.collectionFiltered.length !== _this6.collection.length) {

                if (filterObj.length === 0 && _this6.collectionFiltered.length !== _this6.collection.length) {
                  _this6.collectionFiltered = _this6.collection.slice(0);
                } else {
                  var selKeys = _this6.getSelectionKeys();
                  var curKey = -1;
                  if (_this6.currentRowEntity) {
                    curKey = _this6.currentRowEntity[_this6.sgkey];
                  }

                  _this6.collectionFiltered = _this6.vGridFilter.run(_this6.collection, filterObj);
                  _this6.vGridSort.run(_this6.collectionFiltered);

                  _this6.setSelectionFromKeys(selKeys);

                  var newRowNo = -1;
                  if (curKey) {
                    _this6.collectionFiltered.forEach(function (x, index) {
                      if (curKey === x[_this6.sgkey]) {
                        newRowNo = index;
                      }
                    });
                  }

                  if (newRowNo > -1) {
                    _this6.currentRowEntity = _this6.collectionFiltered[newRowNo];
                    _this6.currentEntity[_this6.sgkey] = _this6.currentRowEntity[_this6.sgkey];
                    _this6.filterRow = newRowNo;
                  }
                }

                _this6.gridContext.ctx.collectionChange(true);
              }
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this6.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this6.gridContext.onRowDraw) {
              _this6.gridContext.onRowDraw(_this6.collectionFiltered[row]);
              callback(_this6.collectionFiltered[row]);
            } else {
              callback(_this6.collectionFiltered[row]);
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute("v-grid-data-attribute");
            }

            if (_this6.collectionFiltered.length > 0 && attribute) {
              _this6.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this6.vGridSort.getFilter());

              var selKeys = _this6.getSelectionKeys();

              _this6.vGridSort.run(_this6.collectionFiltered);

              _this6.setSelectionFromKeys(selKeys);
              _this6.gridContext.ctx.collectionChange();

              _this6.collectionFiltered.forEach(function (x, index) {
                if (_this6.currentEntity[_this6.sgkey] === x[_this6.sgkey]) {
                  _this6.filterRow = index;
                }
              });
            }
          };

          gridOptions.clickHandler = function (event, row, cellEditHelper) {

            var isDoubleClick = true;
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            var readonly = _this6.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this6.filterRow = row;

            _this6.currentRowEntity = _this6.collectionFiltered[row];

            var data = _this6.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                if (_this6.currentEntity[k] !== data[k]) {
                  _this6.currentEntity[k] = data[k];
                  _this6.skipNextUpdateProperty.push(k);
                }
              }
            }

            if (isDoubleClick) {
              cellEditHelper(event, readonly, function (obj) {
                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
              }, function (obj) {
                _this6.skipNextUpdateProperty.push(obj.attribute);

                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
              });
            }
          };

          gridOptions.getSourceLength = function () {
            if (gridOptions.addFilter) {
              return _this6.collectionFiltered.length;
            } else {
              return _this6.collection.length;
            }
          };

          this.gridOptions = gridOptions;

          this.enableObservablesCollection();
          this.enableObservablesArray();
          this.enableObservablesAttributes();

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

          this.gridContext.ctx.getSelectionKeys = function () {
            return _this6.getSelectionKeys();
          };

          this.gridContext.ctx.setSelectionFromKeys = function (x) {
            _this6.setSelectionFromKeys(x);
          };

          this.gridContext.ctx.scrollBottomNext = function () {
            _this6.scrollBottomNext = true;
          };
        };

        VGrid.prototype.detached = function detached() {
          this.disableObservablesAttributes();
          this.disableObservablesCollection();
          this.disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridFilter, VGridSort, VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'collection', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'currentEntity', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9RO0FBQVE7QUFBZ0I7QUFBaUI7QUFBaUI7O0FBQzFEOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7dUJBTUssZ0JBRlosZUFBZSxLQUFmLFdBQ0EsZ0JBQWdCLFFBQWhCLEdBRkE7QUFVQyxpQkFQVyxLQU9YLENBQVksT0FBWixFQUFxQixlQUFyQixFQUFzQyxXQUF0QyxFQUFtRCxTQUFuRCxFQUE4RCxnQkFBOUQsRUFBZ0Y7Z0NBUHJFLE9BT3FFOzs7Ozs7OztBQUU5RSxlQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FGOEU7QUFHOUUsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBSDhFO0FBSTlFLGVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCLENBSjhFO0FBSzlFLGVBQUssZUFBTCxHQUF1QixlQUF2QixDQUw4RTtBQU05RSxlQUFLLE9BQUwsR0FBZSxPQUFmLENBTjhFO0FBTzlFLGVBQUssZ0JBQUwsR0FBd0IsSUFBeEIsQ0FQOEU7QUFROUUsZUFBSyxTQUFMLEdBQWlCLENBQUMsQ0FBRCxDQVI2RDtBQVM5RSxlQUFLLGdCQUFMLEdBQXdCLEtBQXhCLENBVDhFO0FBVTlFLGVBQUssS0FBTCxHQUFhLFVBQVUsS0FBSyxLQUFMLENBQVcsSUFBQyxDQUFLLE1BQUwsS0FBZ0IsSUFBaEIsR0FBd0IsQ0FBekIsQ0FBckIsQ0FWaUU7QUFXOUUsZUFBSyxrQkFBTCxHQUEwQixLQUExQixDQVg4RTtBQVk5RSxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBWjhFO0FBYTlFLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FiOEU7QUFjOUUsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQWQ4RTtBQWU5RSxlQUFLLGtCQUFMLEdBQTBCLEVBQTFCLENBZjhFO0FBZ0I5RSxlQUFLLFdBQUwsR0FBbUIsS0FBbkIsQ0FoQjhFO0FBaUI5RSxlQUFLLHNCQUFMLEdBQThCLEVBQTlCLENBakI4RTtBQWtCOUUsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsb0JBQWIsQ0FBa0MsWUFBbEMsRUFBZ0QsQ0FBaEQsQ0FBZixDQWxCOEU7QUFtQjlFLGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLG9CQUFiLENBQWtDLFlBQWxDLENBQWYsQ0FuQjhFO1NBQWhGOztBQVBXLHdCQW9DWCxxRUFBOEI7O0FBRTVCLGNBQUkseUJBQXlCLEtBQUssYUFBTCxDQUFtQixVQUFuQixDQUE4QixTQUE5QixDQUF3QyxJQUF4QyxFQUE4QyxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBR3pGLGlCQUFLLHVCQUFMLEdBSHlGOztBQU96RixpQkFBSyxrQkFBTCxHQUEwQixLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBc0IsQ0FBdEIsQ0FBMUIsQ0FQeUY7QUFRekYsaUJBQUssU0FBTCxHQVJ5Rjs7QUFZekYsaUJBQUssU0FBTCxDQUFlLEtBQWYsR0FaeUY7QUFhekYsaUJBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixxQkFBckIsR0FieUY7QUFjekYsaUJBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixTQUFyQixDQUErQixLQUEvQixHQWR5RjtBQWV6RixpQkFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGdCQUFyQixHQWZ5Rjs7QUFtQnpGLGlCQUFLLElBQUksQ0FBSixJQUFTLEtBQUssYUFBTCxFQUFvQjtBQUNoQyxrQkFBSSxLQUFLLGFBQUwsQ0FBbUIsY0FBbkIsQ0FBa0MsQ0FBbEMsQ0FBSixFQUEwQztBQUN4QyxxQkFBSyxhQUFMLENBQW1CLENBQW5CLElBQXdCLFNBQXhCLENBRHdDO0FBRXhDLHFCQUFLLHNCQUFMLENBQTRCLElBQTVCLENBQWlDLENBQWpDLEVBRndDO2VBQTFDO2FBREY7O0FBUUEsaUJBQUssc0JBQUwsR0EzQnlGO1dBQWhCLENBQXZFLENBRndCO0FBaUM1QixlQUFLLHNCQUFMLEdBQThCLEtBQUssYUFBTCxDQUFtQixVQUFuQixDQWpDRjs7O0FBcENuQix3QkFnRlgsaUNBQVk7OztBQUNWLGNBQUksTUFBTSxDQUFOLENBRE07QUFFVixlQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsVUFBQyxHQUFELEVBQVM7QUFDL0IsZ0JBQUksTUFBSyxLQUFMLENBQUosR0FBa0IsR0FBbEIsQ0FEK0I7QUFFL0Isa0JBRitCO1dBQVQsQ0FBeEIsQ0FGVTs7O0FBaEZELHdCQThGWCwrQ0FBbUI7OztBQUNqQixjQUFJLFNBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFNBQXJCLENBQStCLGVBQS9CLEVBQVQsQ0FEYTtBQUVqQixjQUFJLFVBQVUsRUFBVixDQUZhO0FBR2pCLGNBQUkscUJBQXFCLEtBQUssa0JBQUwsQ0FIUjtBQUlqQixpQkFBTyxPQUFQLENBQWUsVUFBQyxDQUFELEVBQU87QUFDcEIsb0JBQVEsSUFBUixDQUFhLG1CQUFtQixDQUFuQixFQUFzQixPQUFLLEtBQUwsQ0FBbkMsRUFEb0I7V0FBUCxDQUFmLENBSmlCO0FBT2pCLGlCQUFPLE9BQVAsQ0FQaUI7OztBQTlGUix3QkE4R1gscURBQXFCLFNBQVM7OztBQUM1QixjQUFJLGVBQWUsRUFBZixDQUR3QjtBQUU1QixjQUFJLFFBQVEsQ0FBUixDQUZ3QjtBQUc1QixlQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLGdCQUFJLFFBQVEsT0FBUixDQUFnQixFQUFFLE9BQUssS0FBTCxDQUFsQixNQUFtQyxDQUFDLENBQUQsRUFBSTtBQUN6QywyQkFBYSxJQUFiLENBQWtCLEtBQWxCLEVBRHlDO2FBQTNDO0FBR0Esb0JBSnFDO1dBQVAsQ0FBaEMsQ0FINEI7QUFTNUIsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFNBQXJCLENBQStCLGVBQS9CLENBQStDLFlBQS9DLEVBVDRCOzs7QUE5R25CLHdCQWlJWCwyREFBeUI7OztBQUV2QixjQUFJLGdCQUFnQixLQUFLLGVBQUwsQ0FBcUIsZ0JBQXJCLENBQXNDLEtBQUssVUFBTCxDQUF0RCxDQUZtQjtBQUd2Qix3QkFBYyxTQUFkLENBQXdCLFVBQUMsT0FBRCxFQUFhOztBQUVuQyxnQkFBSSxTQUFTLFFBQVEsQ0FBUixDQUFULENBRitCO0FBR25DLGdCQUFJLGNBQWMsT0FBSyxrQkFBTCxDQUhpQjtBQUluQyxnQkFBSSxNQUFNLE9BQUssVUFBTCxDQUp5QjtBQUtuQyxnQkFBSSxPQUFPLE9BQUssV0FBTCxDQUFpQixHQUFqQixDQUx3Qjs7QUFRbkMsZ0JBQUksVUFBVSxPQUFLLGdCQUFMLEVBQVYsQ0FSK0I7O0FBV25DLGdCQUFJLFNBQVMsQ0FBQyxDQUFELENBWHNCO0FBWW5DLGdCQUFJLE9BQUssZ0JBQUwsRUFBdUI7QUFDekIsdUJBQVMsT0FBSyxnQkFBTCxDQUFzQixPQUFLLEtBQUwsQ0FBL0IsQ0FEeUI7YUFBM0I7QUFHQSxnQkFBSSxpQkFBaUIsSUFBakIsQ0FmK0I7O0FBcUJuQyxnQkFBSSxNQUFKLEVBQVk7QUFHVixrQkFBSSxPQUFPLFVBQVAsR0FBb0IsQ0FBcEIsRUFBdUI7QUFDekIsb0JBQUksT0FBSixDQUFZLFVBQUMsQ0FBRCxFQUFPO0FBQ2pCLHNCQUFJLEVBQUUsT0FBSyxLQUFMLENBQUYsS0FBa0IsU0FBbEIsRUFBNkI7QUFDL0IsZ0NBQVksSUFBWixDQUFpQixDQUFqQixFQUQrQjttQkFBakM7aUJBRFUsQ0FBWixDQUR5QjtlQUEzQjs7QUFTQSxrQkFBSSxPQUFPLE9BQVAsQ0FBZSxNQUFmLEdBQXdCLENBQXhCLEVBQTJCO0FBRzdCLG9CQUFJLFdBQVcsRUFBWCxDQUh5QjtBQUk3Qix1QkFBTyxPQUFQLENBQWUsT0FBZixDQUF1QixVQUFDLENBQUQsRUFBTztBQUM1QiwyQkFBUyxJQUFULENBQWMsRUFBRSxPQUFLLEtBQUwsQ0FBaEIsRUFENEI7aUJBQVAsQ0FBdkIsQ0FKNkI7O0FBUTdCLG9CQUFJLElBQUksWUFBWSxNQUFaLEdBQXFCLENBQXJCLENBUnFCO0FBUzdCLHVCQUFPLE1BQU0sQ0FBQyxDQUFELEVBQUk7QUFHZixzQkFBSSxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsTUFBNkIsQ0FBQyxDQUFELEVBQUk7QUFDbkMscUNBQWlCLEtBQWpCLENBRG1DO21CQUFyQzs7QUFJQSxzQkFBSSxTQUFTLE9BQVQsQ0FBaUIsWUFBWSxDQUFaLEVBQWUsT0FBSyxLQUFMLENBQWhDLE1BQWlELENBQUMsQ0FBRCxFQUFJO0FBQ3ZELHdCQUFJLElBQUksWUFBWSxNQUFaLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQUosQ0FEbUQ7QUFFdkQsd0JBQUksU0FBUyxRQUFRLE9BQVIsQ0FBZ0IsRUFBRSxDQUFGLEVBQUssT0FBSyxLQUFMLENBQXJCLENBQVQsQ0FGbUQ7O0FBSXZELHdCQUFJLFdBQVcsQ0FBQyxDQUFELEVBQUk7QUFDakIsOEJBQVEsTUFBUixDQUFlLE1BQWYsRUFBdUIsQ0FBdkIsRUFEaUI7cUJBQW5CO21CQUpGOztBQVNBLHNCQWhCZTtpQkFBakI7ZUFURjs7QUE4QkEsa0JBQUksQ0FBQyxjQUFELEVBQWlCO0FBQ25CLHFCQUFLLElBQUksQ0FBSixJQUFTLE9BQUssYUFBTCxFQUFvQjtBQUNoQyxzQkFBSSxPQUFLLGFBQUwsQ0FBbUIsY0FBbkIsQ0FBa0MsQ0FBbEMsQ0FBSixFQUEwQztBQUN4QywyQkFBSyxhQUFMLENBQW1CLENBQW5CLElBQXdCLFNBQXhCLENBRHdDO0FBRXhDLDJCQUFLLHNCQUFMLENBQTRCLElBQTVCLENBQWlDLENBQWpDLEVBRndDO21CQUExQztpQkFERjtlQURGLE1BT087QUFDTCxvQkFBSSxXQUFXLENBQUMsQ0FBRCxDQURWO0FBRUwsb0JBQUksTUFBSixFQUFZO0FBQ1YseUJBQUssa0JBQUwsQ0FBd0IsT0FBeEIsQ0FBZ0MsVUFBQyxDQUFELEVBQUksS0FBSixFQUFjO0FBQzVDLHdCQUFJLFdBQVcsRUFBRSxPQUFLLEtBQUwsQ0FBYixFQUEwQjtBQUM1QixpQ0FBVyxLQUFYLENBRDRCO3FCQUE5QjttQkFEOEIsQ0FBaEMsQ0FEVTtpQkFBWjtlQVRGOztBQW1CQSxxQkFBSyxvQkFBTCxDQUEwQixPQUExQixFQTdEVTs7QUFnRVYscUJBQUssU0FBTCxHQWhFVTs7QUFtRVYsa0JBQUksV0FBVyxDQUFDLENBQUQsRUFBSTtBQUNqQix1QkFBSyxnQkFBTCxHQUF3QixPQUFLLGtCQUFMLENBQXdCLFFBQXhCLENBQXhCLENBRGlCO0FBRWpCLHVCQUFLLGFBQUwsQ0FBbUIsT0FBSyxLQUFMLENBQW5CLEdBQWlDLE9BQUssZ0JBQUwsQ0FBc0IsT0FBSyxLQUFMLENBQXZELENBRmlCO0FBR2pCLHVCQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FIaUI7ZUFBbkI7O0FBT0EsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsT0FBSyxnQkFBTCxDQUE3QixDQTFFVTthQUFaO1dBckJzQixDQUF4QixDQUh1QjtBQXVHdkIsZUFBSyxrQkFBTCxHQUEwQixhQUExQixDQXZHdUI7OztBQWpJZCx3QkFrUFgscUVBQThCOzs7QUFFNUIsZUFBSyxXQUFMLENBQWlCLGNBQWpCLENBQWdDLE9BQWhDLENBQXdDLFVBQUMsUUFBRCxFQUFjO0FBQ3BELGdCQUFJLG1CQUFtQixPQUFLLGVBQUwsQ0FBcUIsV0FBckIsQ0FBaUMsT0FBSyxhQUFMLEVBQW9CLFFBQXJELENBQW5CLENBRGdEO0FBRXBELDZCQUFpQixTQUFqQixDQUEyQixVQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXdCO0FBQ2pELGtCQUFJLGFBQWEsUUFBYixFQUF1QjtBQUV6QixvQkFBSSxPQUFLLHNCQUFMLENBQTRCLE9BQTVCLENBQW9DLFFBQXBDLE1BQWtELENBQUMsQ0FBRCxFQUFJO0FBQ3hELHlCQUFLLGdCQUFMLENBQXNCLFFBQXRCLElBQWtDLFFBQWxDLENBRHdEO0FBRXhELHlCQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsU0FBckIsQ0FBK0IsT0FBSyxTQUFMLEVBQWdCLElBQS9DLEVBRndEO2lCQUExRCxNQUdPO0FBRUwseUJBQUssc0JBQUwsQ0FBNEIsTUFBNUIsQ0FBbUMsT0FBSyxzQkFBTCxDQUE0QixPQUE1QixDQUFvQyxRQUFwQyxDQUFuQyxFQUFrRixDQUFsRixFQUZLO2lCQUhQO2VBRkY7YUFEeUIsQ0FBM0IsQ0FGb0Q7QUFjcEQsbUJBQUssdUJBQUwsQ0FBNkIsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBZG9EO1dBQWQsQ0FBeEMsQ0FGNEI7OztBQWxQbkIsd0JBNlFYLHFCQUFLLFFBQVE7QUFHWCxlQUFLLE9BQUwsR0FBZSxNQUFmLENBSFc7O0FBT1gsY0FBSSxDQUFDLEtBQUssV0FBTCxFQUFrQjtBQUNyQixpQkFBSyxXQUFMLEdBQW1CLEVBQW5CLENBRHFCO0FBRXJCLGlCQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBRnFCO1dBQXZCOztBQU1BLGVBQUssa0JBQUwsR0FBMEIsS0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLENBQXRCLENBQTFCLENBYlc7O0FBZ0JYLGVBQUssU0FBTCxHQWhCVzs7O0FBN1FGLHdCQXdTWCx1RUFBK0I7QUFDN0IsZUFBSyxzQkFBTCxDQUE0QixXQUE1QixHQUQ2QjtBQUU3QixlQUFLLHNCQUFMLEdBQThCLElBQTlCLENBRjZCOzs7QUF4U3BCLHdCQW9UWCw2REFBMEI7QUFDeEIsZUFBSyxrQkFBTCxDQUF3QixXQUF4QixHQUR3QjtBQUV4QixlQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBRndCOzs7QUFwVGYsd0JBZ1VYLHVFQUErQjtBQUM3QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLHVCQUFMLENBQTZCLE1BQTdCLEVBQXFDLEdBQXpELEVBQThEO0FBQzVELGdCQUFJO0FBQ0YsbUJBQUssdUJBQUwsQ0FBNkIsQ0FBN0IsRUFBZ0MsV0FBaEMsR0FERTthQUFKLENBRUUsT0FBTyxDQUFQLEVBQVUsRUFBVjtXQUhKO0FBTUEsZUFBSyx1QkFBTCxHQUErQixFQUEvQixDQVA2Qjs7O0FBaFVwQix3QkFpVlgsK0JBQVc7OztBQUdULGNBQUksY0FBYyxFQUFkLENBSEs7O0FBTVQsY0FBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQ2pCLGtCQUFNLHlEQUFOLENBRGlCO1dBQW5CO0FBR0EsY0FBSSxLQUFLLGtCQUFMLElBQTJCLENBQUMsS0FBSyxPQUFMLEVBQWM7QUFDNUMsa0JBQU0sNERBQU4sQ0FENEM7V0FBOUM7O0FBS0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QixDQWRTOztBQW9CVCxjQUFJLE9BQU87QUFDVCxvQkFBUSxJQUFSO0FBQ0EscUJBQVMsS0FBVDtXQUZFLENBcEJLOztBQTBCVCxjQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsWUFBRCxFQUFlLGtCQUFmLEVBQW1DLFlBQW5DLEVBQW9EO0FBQ2pFLGdCQUFJLFFBQVEsWUFBUixDQUQ2RDtBQUVqRSxnQkFBSSxpQkFBaUIsU0FBakIsSUFBOEIsaUJBQWlCLElBQWpCLEVBQXVCO0FBQ3ZELHNCQUFRLFlBQVIsQ0FEdUQ7YUFBekQsTUFFTztBQUNMLGtCQUFJLHVCQUF1QixTQUF2QixJQUFvQyx1QkFBdUIsSUFBdkIsRUFBNkI7QUFDbkUsd0JBQVEsa0JBQVIsQ0FEbUU7ZUFBckU7YUFIRjtBQU9BLG1CQUFPLEtBQVAsQ0FUaUU7V0FBcEQsQ0ExQk47O0FBeUNULGNBQUksS0FBSyxPQUFMLENBQWEsTUFBYixLQUF3QixDQUF4QixFQUEyQjtBQUk3Qix3QkFBWSx3QkFBWixHQUF1QyxJQUF2QyxDQUo2Qjs7QUFPN0Isd0JBQVksaUJBQVosR0FBZ0MsWUFBTTtBQUNwQyxxQkFBTyxPQUFLLE9BQUwsQ0FBYSxTQUFiLENBRDZCO2FBQU4sQ0FQSDs7QUFXN0Isd0JBQVksY0FBWixHQUE2QixLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLGdCQUExQixFQUE0QyxLQUE1QyxDQUFrRCxHQUFsRCxDQUE3QixDQVg2QjtXQUEvQixNQVlPO0FBR0wsd0JBQVksY0FBWixHQUE2QixFQUE3QixDQUhLO0FBSUwsd0JBQVksZ0JBQVosR0FBK0IsRUFBL0IsQ0FKSztBQUtMLHdCQUFZLFdBQVosR0FBMEIsRUFBMUIsQ0FMSztBQU1MLHdCQUFZLFdBQVosR0FBMEIsRUFBMUIsQ0FOSztBQU9MLHdCQUFZLGFBQVosR0FBNEIsRUFBNUIsQ0FQSztBQVFMLHdCQUFZLGFBQVosR0FBNEIsRUFBNUIsQ0FSSzs7QUFXTCxpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxPQUFMLENBQWEsTUFBYixFQUFxQixHQUF6QyxFQUE4QztBQUM1QywwQkFBWSxjQUFaLENBQTJCLElBQTNCLENBQWdDLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsWUFBaEIsQ0FBNkIsV0FBN0IsQ0FBaEMsRUFENEM7QUFFNUMsMEJBQVksZ0JBQVosQ0FBNkIsSUFBN0IsQ0FBa0MsS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixZQUFoQixDQUE2QixXQUE3QixDQUFsQyxFQUY0QztBQUc1QywwQkFBWSxXQUFaLENBQXdCLElBQXhCLENBQTZCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsWUFBaEIsQ0FBNkIsUUFBN0IsS0FBMEMsRUFBMUMsQ0FBN0IsQ0FINEM7QUFJNUMsMEJBQVksYUFBWixDQUEwQixJQUExQixDQUErQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLFlBQWhCLENBQTZCLFNBQTdCLEtBQTJDLEVBQTNDLENBQS9CLENBSjRDO0FBSzVDLDBCQUFZLFdBQVosQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixZQUFoQixDQUE2QixnQkFBN0IsS0FBa0QsR0FBbEQsQ0FBN0IsQ0FMNEM7QUFNNUMsMEJBQVksYUFBWixDQUEwQixJQUExQixDQUErQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLFlBQWhCLENBQTZCLFdBQTdCLE1BQThDLE1BQTlDLEdBQXVELEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsWUFBaEIsQ0FBNkIsV0FBN0IsQ0FBdkQsR0FBbUcsS0FBbkcsQ0FBL0IsQ0FONEM7YUFBOUM7O0FBVUEsd0JBQVksY0FBWixHQUE2QixLQUFLLFdBQUwsQ0FBaUIsY0FBakIsSUFBbUMsWUFBWSxjQUFaLENBckIzRDtBQXNCTCx3QkFBWSxnQkFBWixHQUErQixLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLElBQXFDLFlBQVksZ0JBQVosQ0F0Qi9EO0FBdUJMLHdCQUFZLFdBQVosR0FBMEIsS0FBSyxXQUFMLENBQWlCLFdBQWpCLElBQWdDLFlBQVksV0FBWixDQXZCckQ7QUF3Qkwsd0JBQVksV0FBWixHQUEwQixLQUFLLFdBQUwsQ0FBaUIsV0FBakIsSUFBZ0MsWUFBWSxXQUFaLENBeEJyRDtBQXlCTCx3QkFBWSxhQUFaLEdBQTRCLEtBQUssV0FBTCxDQUFpQixhQUFqQixJQUFrQyxZQUFZLGFBQVosQ0F6QnpEO0FBMEJMLHdCQUFZLGFBQVosR0FBNEIsS0FBSyxXQUFMLENBQWlCLGFBQWpCLElBQWtDLFlBQVksYUFBWixDQTFCekQ7V0FaUDs7QUFnREEsc0JBQVksU0FBWixHQUF3QixTQUFTLEtBQUssV0FBTCxDQUFpQixTQUFqQixFQUE0QixTQUFTLEtBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsWUFBMUIsQ0FBVCxDQUFyQyxFQUF3RixFQUF4RixDQUF4QixDQXpGUztBQTBGVCxzQkFBWSxZQUFaLEdBQTJCLFNBQVMsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEVBQStCLFNBQVMsS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixlQUExQixDQUFULENBQXhDLEVBQThGLENBQTlGLENBQTNCLENBMUZTO0FBMkZULHNCQUFZLFlBQVosR0FBMkIsU0FBUyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsRUFBK0IsU0FBUyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLGVBQTFCLENBQVQsQ0FBeEMsRUFBOEYsQ0FBOUYsQ0FBM0IsQ0EzRlM7QUE0RlQsc0JBQVksa0JBQVosR0FBaUMsU0FBUyxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEVBQW1DLEtBQUssS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixtQkFBMUIsQ0FBTCxDQUE1QyxFQUFrRyxLQUFsRyxDQUFqQyxDQTVGUztBQTZGVCxzQkFBWSxhQUFaLEdBQTRCLFNBQVMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLEVBQThCLEtBQUssS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixjQUExQixDQUFMLENBQXZDLEVBQXdGLFNBQXhGLENBQTVCLENBN0ZTO0FBOEZULHNCQUFZLGdCQUFaLEdBQStCLFNBQVMsS0FBSyxXQUFMLENBQWlCLGNBQWpCLEVBQWlDLEtBQUssS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixrQkFBMUIsQ0FBTCxDQUExQyxFQUErRixLQUEvRixDQUEvQixDQTlGUztBQStGVCxzQkFBWSxxQkFBWixHQUFvQyxTQUFTLEtBQUssV0FBTCxDQUFpQixxQkFBakIsRUFBd0MsS0FBSyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLHlCQUExQixDQUFMLENBQWpELEVBQTZHLElBQTdHLENBQXBDLENBL0ZTO0FBZ0dULHNCQUFZLHVCQUFaLEdBQXNDLFNBQVMsS0FBSyxXQUFMLENBQWlCLGNBQWpCLEVBQWlDLEtBQUssS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixrQkFBMUIsQ0FBTCxDQUExQyxFQUErRixLQUEvRixDQUF0QyxDQWhHUztBQWlHVCxzQkFBWSx1QkFBWixHQUFzQyxTQUFTLEtBQUssV0FBTCxDQUFpQix1QkFBakIsRUFBMEMsS0FBSyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLDRCQUExQixDQUFMLENBQW5ELEVBQWtILElBQWxILENBQXRDLENBakdTO0FBa0dULHNCQUFZLGFBQVosR0FBNEIsU0FBUyxLQUFLLFdBQUwsQ0FBaUIsYUFBakIsRUFBZ0MsU0FBUyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLGdCQUExQixDQUFULENBQXpDLEVBQWdHLENBQWhHLENBQTVCLENBbEdTO0FBbUdULHNCQUFZLFNBQVosR0FBd0IsU0FBUyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsRUFBK0IsS0FBSyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLGVBQTFCLENBQUwsQ0FBeEMsRUFBMEYsS0FBMUYsQ0FBeEIsQ0FuR1M7QUFvR1Qsc0JBQVksYUFBWixHQUE0QixTQUFTLEtBQUssV0FBTCxDQUFpQixlQUFqQixFQUFrQyxLQUFLLEtBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsbUJBQTFCLENBQUwsQ0FBM0MsRUFBaUcsS0FBakcsQ0FBNUIsQ0FwR1M7QUFxR1Qsc0JBQVksV0FBWixHQUEwQixTQUFTLEtBQUssV0FBTCxDQUFpQixxQkFBakIsRUFBd0MsS0FBSyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLHlCQUExQixDQUFMLENBQWpELEVBQTZHLEtBQTdHLENBQTFCLENBckdTO0FBc0dULHNCQUFZLGlCQUFaLEdBQWdDLFNBQVMsS0FBSyxXQUFMLENBQWlCLGlCQUFqQixFQUFvQyxLQUFLLEtBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsc0JBQTFCLENBQUwsQ0FBN0MsRUFBc0csS0FBdEcsQ0FBaEMsQ0F0R1M7O0FBeUdULGNBQUksS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixzQkFBMUIsQ0FBSixFQUF1RDtBQUNyRCx3QkFBWSxnQkFBWixHQUErQixLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLHNCQUExQixFQUFrRCxLQUFsRCxDQUF3RCxHQUF4RCxDQUEvQixDQURxRDtXQUF2RCxNQUVPO0FBQ0wsZ0JBQUksS0FBSyxXQUFMLENBQWlCLGlCQUFqQixFQUFvQztBQUN0QywwQkFBWSxnQkFBWixHQUErQixLQUFLLFdBQUwsQ0FBaUIsaUJBQWpCLENBQW1DLEtBQW5DLENBQXlDLEdBQXpDLENBQS9CLENBRHNDO2FBQXhDLE1BRU87QUFDTCwwQkFBWSxnQkFBWixHQUErQixFQUEvQixDQURLO2FBRlA7V0FIRjs7QUFpQkEsY0FBSSxZQUFZLFNBQVosRUFBdUI7QUFDekIsd0JBQVksV0FBWixHQUEwQixVQUFDLFNBQUQsRUFBZTs7QUFFdkMsa0JBQUksVUFBVSxNQUFWLEtBQXFCLENBQXJCLElBQTBCLE9BQUssa0JBQUwsQ0FBd0IsTUFBeEIsS0FBbUMsT0FBSyxVQUFMLENBQWdCLE1BQWhCLEVBQXdCOztBQUV2RixvQkFBSSxVQUFVLE1BQVYsS0FBcUIsQ0FBckIsSUFBMEIsT0FBSyxrQkFBTCxDQUF3QixNQUF4QixLQUFtQyxPQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDdkYseUJBQUssa0JBQUwsR0FBMEIsT0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLENBQXRCLENBQTFCLENBRHVGO2lCQUF6RixNQUVPO0FBR0wsc0JBQUksVUFBVSxPQUFLLGdCQUFMLEVBQVYsQ0FIQztBQUlMLHNCQUFJLFNBQVMsQ0FBQyxDQUFELENBSlI7QUFLTCxzQkFBSSxPQUFLLGdCQUFMLEVBQXVCO0FBQ3pCLDZCQUFTLE9BQUssZ0JBQUwsQ0FBc0IsT0FBSyxLQUFMLENBQS9CLENBRHlCO21CQUEzQjs7QUFJQSx5QkFBSyxrQkFBTCxHQUEwQixPQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsT0FBSyxVQUFMLEVBQWlCLFNBQXRDLENBQTFCLENBVEs7QUFVTCx5QkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixPQUFLLGtCQUFMLENBQW5CLENBVks7O0FBWUwseUJBQUssb0JBQUwsQ0FBMEIsT0FBMUIsRUFaSzs7QUFlTCxzQkFBSSxXQUFXLENBQUMsQ0FBRCxDQWZWO0FBZ0JMLHNCQUFJLE1BQUosRUFBWTtBQUNWLDJCQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBQWdDLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUM1QywwQkFBSSxXQUFXLEVBQUUsT0FBSyxLQUFMLENBQWIsRUFBMEI7QUFDNUIsbUNBQVcsS0FBWCxDQUQ0Qjt1QkFBOUI7cUJBRDhCLENBQWhDLENBRFU7bUJBQVo7O0FBUUEsc0JBQUksV0FBVyxDQUFDLENBQUQsRUFBSTtBQUNqQiwyQkFBSyxnQkFBTCxHQUF3QixPQUFLLGtCQUFMLENBQXdCLFFBQXhCLENBQXhCLENBRGlCO0FBRWpCLDJCQUFLLGFBQUwsQ0FBbUIsT0FBSyxLQUFMLENBQW5CLEdBQWlDLE9BQUssZ0JBQUwsQ0FBc0IsT0FBSyxLQUFMLENBQXZELENBRmlCO0FBR2pCLDJCQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FIaUI7bUJBQW5CO2lCQTFCRjs7QUFxQ0EsdUJBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixnQkFBckIsQ0FBc0MsSUFBdEMsRUF2Q3VGO2VBQXpGO2FBRndCLENBREQ7V0FBM0I7O0FBdURBLHNCQUFZLGFBQVosR0FBNEIsVUFBQyxJQUFELEVBQVU7QUFDcEMsbUJBQU8sT0FBSyxXQUFMLENBQWlCLGVBQWpCLENBQWlDLElBQWpDLENBQVAsQ0FEb0M7V0FBVixDQWpMbkI7O0FBNkxULHNCQUFZLGNBQVosR0FBNkIsVUFBQyxHQUFELEVBQU0sTUFBTixFQUFjLGFBQWQsRUFBNkIsUUFBN0IsRUFBMEM7QUFDckUsZ0JBQUksT0FBSyxXQUFMLENBQWlCLFNBQWpCLEVBQTRCO0FBRTlCLHFCQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsT0FBSyxrQkFBTCxDQUF3QixHQUF4QixDQUEzQixFQUY4QjtBQUc5Qix1QkFBUyxPQUFLLGtCQUFMLENBQXdCLEdBQXhCLENBQVQsRUFIOEI7YUFBaEMsTUFJTztBQUNMLHVCQUFTLE9BQUssa0JBQUwsQ0FBd0IsR0FBeEIsQ0FBVCxFQURLO2FBSlA7V0FEMkIsQ0E3THBCOztBQStNVCxzQkFBWSxTQUFaLEdBQXdCLFVBQUMsS0FBRCxFQUFRLFVBQVIsRUFBdUI7QUFHN0MsZ0JBQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLHVCQUExQixDQUFaLENBSHlDO0FBSTdDLGdCQUFJLGNBQWMsSUFBZCxFQUFvQjtBQUN0QiwwQkFBWSxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLFlBQTFCLENBQXVDLHVCQUF2QyxDQUFaLENBRHNCO2FBQXhCOztBQUlBLGdCQUFJLE9BQUssa0JBQUwsQ0FBd0IsTUFBeEIsR0FBaUMsQ0FBakMsSUFBc0MsU0FBdEMsRUFBaUQ7QUFHbkQscUJBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUI7QUFDdkIsMkJBQVcsU0FBWDtBQUNBLHFCQUFLLElBQUw7ZUFGRixFQUdHLE1BQU0sUUFBTixDQUhILENBSG1EOztBQVFuRCx5QkFBVyxPQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQVgsRUFSbUQ7O0FBVW5ELGtCQUFJLFVBQVUsT0FBSyxnQkFBTCxFQUFWLENBVitDOztBQVluRCxxQkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixPQUFLLGtCQUFMLENBQW5CLENBWm1EOztBQWNuRCxxQkFBSyxvQkFBTCxDQUEwQixPQUExQixFQWRtRDtBQWVuRCxxQkFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGdCQUFyQixHQWZtRDs7QUFrQm5ELHFCQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBQWdDLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUM1QyxvQkFBSSxPQUFLLGFBQUwsQ0FBbUIsT0FBSyxLQUFMLENBQW5CLEtBQW1DLEVBQUUsT0FBSyxLQUFMLENBQXJDLEVBQWtEO0FBQ3BELHlCQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FEb0Q7aUJBQXREO2VBRDhCLENBQWhDLENBbEJtRDthQUFyRDtXQVJzQixDQS9NZjs7QUEwUFQsc0JBQVksWUFBWixHQUEyQixVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsY0FBYixFQUFnQzs7QUFFekQsZ0JBQUksZ0JBQWdCLElBQWhCLENBRnFEO0FBR3pELGdCQUFJLFlBQVksTUFBTSxNQUFOLENBQWEsWUFBYixDQUEwQix1QkFBMUIsQ0FBWixDQUhxRDtBQUl6RCxnQkFBSSxXQUFXLE9BQUssV0FBTCxDQUFpQixhQUFqQixDQUErQixPQUEvQixDQUF1QyxTQUF2QyxJQUFvRCxLQUFwRCxHQUE0RCxJQUE1RCxDQUowQzs7QUFPekQsbUJBQUssU0FBTCxHQUFpQixHQUFqQixDQVB5RDs7QUFVekQsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxrQkFBTCxDQUF3QixHQUF4QixDQUF4QixDQVZ5RDs7QUFhekQsZ0JBQUksT0FBTyxPQUFLLGdCQUFMLENBYjhDO0FBY3pELGlCQUFLLElBQUksQ0FBSixJQUFTLElBQWQsRUFBb0I7QUFDbEIsa0JBQUksS0FBSyxjQUFMLENBQW9CLENBQXBCLENBQUosRUFBNEI7QUFDMUIsb0JBQUksT0FBSyxhQUFMLENBQW1CLENBQW5CLE1BQTBCLEtBQUssQ0FBTCxDQUExQixFQUFtQztBQUNyQyx5QkFBSyxhQUFMLENBQW1CLENBQW5CLElBQXdCLEtBQUssQ0FBTCxDQUF4QixDQURxQztBQUVyQyx5QkFBSyxzQkFBTCxDQUE0QixJQUE1QixDQUFpQyxDQUFqQyxFQUZxQztpQkFBdkM7ZUFERjthQURGOztBQVNBLGdCQUFJLGFBQUosRUFBbUI7QUFHakIsNkJBQWUsS0FBZixFQUFzQixRQUF0QixFQUFnQyxVQUFDLEdBQUQsRUFBUztBQUl2Qyx1QkFBSyxnQkFBTCxDQUFzQixJQUFJLFNBQUosQ0FBdEIsR0FBdUMsSUFBSSxLQUFKLENBSkE7QUFLdkMsdUJBQUssYUFBTCxDQUFtQixJQUFJLFNBQUosQ0FBbkIsR0FBb0MsSUFBSSxLQUFKLENBTEc7ZUFBVCxFQVM3QixVQUFDLEdBQUQsRUFBUztBQUlWLHVCQUFLLHNCQUFMLENBQTRCLElBQTVCLENBQWlDLElBQUksU0FBSixDQUFqQyxDQUpVOztBQU9WLHVCQUFLLGdCQUFMLENBQXNCLElBQUksU0FBSixDQUF0QixHQUF1QyxJQUFJLEtBQUosQ0FQN0I7QUFRVix1QkFBSyxhQUFMLENBQW1CLElBQUksU0FBSixDQUFuQixHQUFvQyxJQUFJLEtBQUosQ0FSMUI7ZUFBVCxDQVRILENBSGlCO2FBQW5CO1dBdkJ5QixDQTFQbEI7O0FBb1RULHNCQUFZLGVBQVosR0FBOEIsWUFBTTtBQUNsQyxnQkFBSSxZQUFZLFNBQVosRUFBdUI7QUFDekIscUJBQU8sT0FBSyxrQkFBTCxDQUF3QixNQUF4QixDQURrQjthQUEzQixNQUVPO0FBQ0wscUJBQU8sT0FBSyxVQUFMLENBQWdCLE1BQWhCLENBREY7YUFGUDtXQUQ0QixDQXBUckI7O0FBZ1VULGVBQUssV0FBTCxHQUFtQixXQUFuQixDQWhVUzs7QUFtVVQsZUFBSywyQkFBTCxHQW5VUztBQW9VVCxlQUFLLHNCQUFMLEdBcFVTO0FBcVVULGVBQUssMkJBQUwsR0FyVVM7O0FBNFVULGVBQUssV0FBTCxDQUFpQixHQUFqQixHQUF1QixJQUFJLGNBQUosQ0FBbUIsV0FBbkIsRUFBZ0MsS0FBSyxnQkFBTCxFQUF1QixLQUFLLE9BQUwsRUFBYyxLQUFLLE9BQUwsRUFBYyxhQUFuRixDQUF2QixDQTVVUzs7QUErVVQsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGdCQUFyQixHQUF3QyxZQUFNO0FBRTVDLG1CQUFPLE9BQUssZ0JBQUwsRUFBUCxDQUY0QztXQUFOLENBL1UvQjs7QUFxVlQsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLG9CQUFyQixHQUE0QyxVQUFDLENBQUQsRUFBTztBQUVqRCxtQkFBSyxvQkFBTCxDQUEwQixDQUExQixFQUZpRDtXQUFQLENBclZuQzs7QUEyVlQsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGdCQUFyQixHQUF3QyxZQUFNO0FBQzVDLG1CQUFLLGdCQUFMLEdBQXdCLElBQXhCLENBRDRDO1dBQU4sQ0EzVi9COzs7QUFqVkEsd0JBd3JCWCwrQkFBVztBQUNULGVBQUssNEJBQUwsR0FEUztBQUVULGVBQUssNEJBQUwsR0FGUztBQUdULGVBQUssdUJBQUwsR0FIUzs7O2VBeHJCQTttQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGVBQVYsRUFBMkIsV0FBM0IsRUFBd0MsU0FBeEMsRUFBbUQsZ0JBQW5ELHVGQUNmOzs7cUZBQ0E7Ozt3RkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
