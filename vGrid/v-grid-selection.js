/*****************************************************************************************************************
 *    vGridSelection
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSelection {


  selectionMode = "none";
  lastRowSelected = -1; //this ned to be reset when filtering
  lastKeyKodeUsed = "none"; //this ned to be reset when filtering
  selectedRows = 0;


  constructor(mode, vGrid) {

    this.vGrid = vGrid;
    this.vGridSel = "__vGridSel" + Math.floor((Math.random() * 1000) + 1);

    if (mode === false) {
      this.selectionMode = "single"
    }
    if (mode === true) {
      this.selectionMode = "multible"
    }

    this.selection = new Set([]);


  }


  setMode(mode) {
    this.selectionMode = "none";
    if (mode === false) {
      this.selectionMode = "single"
    }
    if (mode === true) {
      this.selectionMode = "multible"
    }

  }


  isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if(this.vGrid.vGridCollectionFiltered[row]){
        result =  this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  };




  deSelect(row){
    if(this.vGrid.vGridCollectionFiltered[row]) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
    }
  }


  select(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if(this.vGrid.vGridCollectionFiltered[row]) {
          this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multible":
        if (!addToSelection) {
          this.selection.clear();
          if(this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if(this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }
  };


  selectRange(start, end) {
    if (this.selectionMode === "multible") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
  };




  reset() {
    if (this.selectedRows > 0) {
      this.selection.clear()
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = 0;
  };

 


  getSelectedRows() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
        if (this.selection.has(x[this.vGrid.vGridRowKey]) === true) {
          array.push(index)
        }
      });
    }
    return array
  };



  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
    }
    this.selectedRows = 0;
    for (var i = 0; i < newRows.length; i++) {
      this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGridSel] = true;
      this.selectedRows++;
    }
  };



  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  setHightlight(e, currentRow, vGridGenerator) {

    var isSel;

    var currentselectedRows = this.getSelectedRows();

    if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

      if (currentRow <= (vGridGenerator.vGridConfig.getCollectionLength() - 1)) { //do I need to check this?

        if (this.selectionMode === "multible") { //if multiselect duh!

          var currentKeyKode = "";

          if (e.shiftKey) {
            currentKeyKode = "shift";
            currentselectedRows = this.getSelectedRows();
            if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
              this.lastRowSelected = currentselectedRows[0];
              this.lastKeyKodeUsed = "shift";
            }
          }

          if (e.ctrlKey) {
            currentKeyKode = "ctrl";
          }

          if (!e.ctrlKey && !e.shiftKey) {
            currentKeyKode = "none";
          }

          switch (true) {
            case currentKeyKode === "none":
              this.select(currentRow);
              break;
            case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;

            case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
              var oldSel = this.getSelectedRows();
              this.selectRange(this.lastRowSelected, currentRow);
              var newSel = this.getSelectedRows();
              this.setSelectedRows(oldSel.concat(newSel));

              break;

            case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;

            case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                this.deSelect(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;

            case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

              if (this.lastRowSelected > currentRow) {
                this.selectRange(currentRow, this.lastRowSelected);
              } else {
                this.selectRange(this.lastRowSelected, currentRow);
              }

              break;

            case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

              if (this.lastRowSelected !== -1) {
                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }
              } else {
                this.lastRowSelected = currentRow;
                this.select(currentRow);
              }
              break;
            default:
              console.log("error, this should not happend")
          }
        } else {
          this.select(currentRow);
        }
        this.lastKeyKodeUsed = currentKeyKode;

        //update selection on rows
        vGridGenerator.updateSelectionOnAllRows()
      }
    } else {
      //same row clicked again
      if (e.ctrlKey) {
        currentKeyKode = "ctrl";
      }

      //if ctrl button we wanto remove selection
      if (currentKeyKode === "ctrl") {
        this.lastKeyKodeUsed = currentKeyKode;
        isSel = this.isSelected(currentRow);
        if (isSel === true) {
          this.deSelect(currentRow);
        }
        this.lastRowSelected = currentRow
      } else {
        //else we just wanto make it current..
        isSel = this.isSelected(currentRow);
        this.select(currentRow);
      }
      //update selection on rows
      vGridGenerator.updateSelectionOnAllRows()
    }
  };


}
