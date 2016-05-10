'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _createClass, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellContainer;

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
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('VGridCellContainer', VGridCellContainer = (_dec = customElement('v-grid-row-col'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid, Container), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellContainer(element, vGrid, container) {
          _classCallCheck(this, VGridCellContainer);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
          this.hidden = false;
          this.value;
          this.customStyle;
        }

        VGridCellContainer.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;

          if (this.viewSlot && this.bindingContext) {
            this.setValue(this.rawValue);
            this.customStyle = this.colStyle();

            if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
              if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
                this.setCss();
              }
            }
          }
        };

        VGridCellContainer.prototype.created = function created() {};

        VGridCellContainer.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();

          switch (this.colType()) {
            case "image":
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-image value.bind="value"><img css.bind="customStyle"></v-grid-image></template>', this.vGrid.resources);
              break;
            case "checkbox":
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-checkbox value.bind="value"><input css.bind="customStyle"></v-grid-checkbox></template>', this.vGrid.resources);
              break;
            default:
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-input  value.bind="value"><input css.bind="customStyle"></v-grid-input></template>', this.vGrid.resources);
          }

          var view = viewFactory.create(this.container);
          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this);
          this.viewSlot.attached();

          this.element.addEventListener("cellFocus", function (e) {
            this.setCss();
          }.bind(this));

          this.element.ondblclick = function (e) {}.bind(this);

          this.element.onclick = function (e) {}.bind(this);
        };

        VGridCellContainer.prototype.updateValue = function updateValue(value) {
          this.vGrid.vGridCellHelper.updateActual({
            attribute: this.attribute(),
            value: this.valueFormater ? this.valueFormater.fromView(value) : value
          });
        };

        VGridCellContainer.prototype.setValue = function setValue(value, setRawValue) {
          this.removeCssCell();
          if (setRawValue || this.editMode() && this.editRaw()) {
            this.value = this.rawValue;
          } else {
            this.value = this.valueFormater ? this.valueFormater.toView(value) : value;
          }
        };

        VGridCellContainer.prototype.getValue = function getValue(value) {
          return this.valueFormater ? this.valueFormater.fromView(value) : value;
        };

        VGridCellContainer.prototype.editMode = function editMode() {
          return this.vGrid.vGridConfig.editMode;
        };

        VGridCellContainer.prototype.setEditMode = function setEditMode(value) {
          this.vGrid.vGridConfig.editMode = value;
        };

        VGridCellContainer.prototype.editRaw = function editRaw() {
          return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
        };

        VGridCellContainer.prototype.attribute = function attribute() {
          return this.vGrid.vGridConfig.attributeArray[this.columnNo];
        };

        VGridCellContainer.prototype.readOnly = function readOnly() {
          return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
        };

        VGridCellContainer.prototype.colType = function colType() {
          return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
        };

        VGridCellContainer.prototype.colStyle = function colStyle() {
          if (this.vGrid) {
            if (this.vGrid.vGridConfig.colStyleArray[this.columnNo]) {
              return this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext);
            }
          }
        };

        VGridCellContainer.prototype.interpolate = function interpolate(str) {
          if (str) {
            return function interpolate(o) {
              return str.replace(/{{([^{}]*)}}/g, function (a, b) {
                var r = o[b];
                return r;
              });
            };
          } else {
            return function () {
              return "";
            };
          }
        };

        VGridCellContainer.prototype.getLastFocusElement = function getLastFocusElement() {
          return this.vGrid.vGridCellHelper.lastElement;
        };

        VGridCellContainer.prototype.setLastFocusElement = function setLastFocusElement(element) {
          this.vGrid.vGridCellHelper.lastElement = element;
        };

        VGridCellContainer.prototype.containsFocusClass = function containsFocusClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.addFocusClass = function addFocusClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeFocusClass = function removeFocusClass(element) {
          if (element) {
            element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.containsWriteClass = function containsWriteClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.addWriteClass = function addWriteClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeWriteClass = function removeWriteClass(element) {
          if (element) {

            element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeCssCell = function removeCssCell() {
          if (this.containsWriteClass(this.element)) {
            this.removeWriteClass(this.element);
          }
          if (this.containsFocusClass(this.element)) {
            this.removeFocusClass(this.element);
          }
        };

        VGridCellContainer.prototype.removeCssOldCell = function removeCssOldCell() {
          if (this.containsWriteClass(this.getLastFocusElement())) {
            this.removeWriteClass(this.getLastFocusElement());
          }
          if (this.containsFocusClass(this.getLastFocusElement())) {
            this.removeFocusClass(this.getLastFocusElement());
          }
        };

        VGridCellContainer.prototype.setCss = function setCss() {
          if (!this.containsFocusClass(this.element)) {
            this.removeCssOldCell();
            this.addFocusClass(this.element);
            this.setLastFocusElement(this.element);
          }

          if (this.editMode() && !this.readOnly()) {
            if (!this.containsWriteClass(this.element)) {
              this.removeFocusClass(this.element);
              this.addWriteClass(this.element);
            }
          }
        };

        VGridCellContainer.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          var css = this.vGrid.vGridConfig.css;
          var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.columnNo] + 'px';
          this.element.classList.add(css.rowCell);
          this.element.classList.add(css.rowColumn + this.columnNo);
          this.element.classList.add(css.gridColumn + this.columnNo);
          this.element.setAttribute("style", cellStyle);
        };

        _createClass(VGridCellContainer, [{
          key: 'valueFormater',
          get: function get() {
            return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
          }
        }, {
          key: 'rawValue',
          get: function get() {
            return this.bindingContext[this.attribute()];
          }
        }]);

        return VGridCellContainer;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellContainer', VGridCellContainer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLG9CLHFCQUFBLGM7QUFBZ0IsZSxxQkFBQSxTO0FBQVcsYyxxQkFBQSxRO0FBQVUsYyxxQkFBQSxROztBQUNwRSxXLFVBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQVVLLGtCLFdBSFosY0FBYyxnQkFBZCxDLFVBQ0EsZUFBZSxLQUFmLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsQyxFQUhBLE07QUFRQyxvQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLFNBQTVCLEVBQXVDO0FBQUE7O0FBQUE7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGVBQUssS0FBTDtBQUNBLGVBQUssV0FBTDtBQUNEOztxQ0FHRCxJLGlCQUFLLGMsRUFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCOztBQUVBLGNBQUksS0FBSyxRQUFMLElBQWlCLEtBQUssY0FBMUIsRUFBMEM7QUFFeEMsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBbkI7QUFDQSxpQkFBSyxXQUFMLEdBQW1CLEtBQUssUUFBTCxFQUFuQjs7QUFHQSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxlQUFYLEtBQStCLFNBQVMsS0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixZQUF4QixDQUFxQyxLQUFyQyxDQUFULENBQW5DLEVBQTBGO0FBQ3hGLGtCQUFJLFNBQVMsS0FBSyxRQUFkLE1BQTRCLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsS0FBM0QsRUFB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TUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQWpDO0FBQ0EsY0FBSSx1QkFBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxRQUE3QyxDQUFyQixPQUFKO0FBQ0EsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLE9BQS9CO0FBQ0EsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFNBQUosR0FBZ0IsS0FBSyxRQUFoRDtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxVQUFKLEdBQWlCLEtBQUssUUFBakQ7QUFDQSxlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLFNBQW5DO0FBQ0QsUzs7Ozs4QkE3Sm1CO0FBQ2xCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBN0MsQ0FBUDtBQUNEOzs7OEJBRWM7QUFDYixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsS0FBSyxTQUFMLEVBQXBCLENBQVA7QUFDRDs7OztvRkFsSUEsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=