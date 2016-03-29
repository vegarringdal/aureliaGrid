import {dummyDataGenerator} from 'data/dummyDataGenerator'
import hljs from 'highlight.js';
import 'highlight.js/styles/ir-black.css!';

export class sample01 {
  static inject = [Element, dummyDataGenerator];


  myCollection = [];
  myCurrentEntity = {};
  myGrid = {
    onRowDraw: function (data) {
      if (data) {
        if (data.country === "Angola") {
          data.myCustomColor = "rgba(150,72,230, 0.3)"
        }
      }
    }
  };


  collectionLength= 0;

  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, dummyDataGenerator) {
    //get this element
    this.element = element;

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

  }



  /********************************************************************
   *  COLLECTION MOD BUTTONS
   ********************************************************************/

  replaceBtn(x) {
    //generate and add
    this.dummyDataGenerator.reset();
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    })
  }

  addBtn(x, scrollBottom) {
    //generate and add
    this.dummyDataGenerator.generateData(x, (data) => {
      data.forEach((x) => {
        this.myCollection.push(x)
      })
      if(scrollBottom){
        this.myGrid.ctx.scrollBottomNext();
      }

      this.collectionLength = this.myCollection.length;
    })
  }


  insertOneBtn(){
    try {
      this.dummyDataGenerator.generateData(1, (data) => {
        this.myCollection.splice(2, 0, data[0])
      });
    } catch (e){
      console.log(e)
    }
  }

  insertFiveBtn(){
    try {
      for(var i = 0; i < 5; i++){
        this.dummyDataGenerator.generateData(1, (data) => {
          this.myCollection.splice(2, 0, data[0])
        });
      }
    } catch (e){
      console.log(e)
    }
  }


  removeFirstBtn() {
    this.myCollection.splice(0, 1);
    this.collectionLength = this.myCollection.length;
  }

  removeLastBtn() {
    this.myCollection.pop();
    this.collectionLength = this.myCollection.length;
  }

  removeFirstxBtn(x) {
    this.myCollection.splice(0, x);
    this.collectionLength = this.myCollection.length;

  }


  removeLastxBtn(x) {
    this.myCollection.splice(this.myCollection.length - x, x);
    this.collectionLength = this.myCollection.length;

  }


  /********************************************************************
   * GRID-CONTEXT BUTTONS
   ********************************************************************/

  status = {
    header50: "lightgrey",
    row25: "lightgrey",
    footer0:"lightgrey",
    sortable1:"lightgrey",
    resize1 : "lightgrey",
    multiSelect: "lightgrey",
    locked0: "lightgrey",
    filter1: "lightgrey",
    filterAt0: "lightgrey",
    sort1:"lightgrey"



  };

  rowHeightBtn(x) {

    this.myGrid.ctx.setRowHeight(x);
    this.status.row25 = "";
    this.status.row50 = "";
    this.status.row75 = "";
    this.status.row100 = "";

    switch(x){
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
  }



  headerHeightBtn(x) {
    this.myGrid.ctx.setHeaderHeight(x)
    this.status.header0 = "";
    this.status.header25 = "";
    this.status.header50 = "";
    this.status.header75 = "";

    switch(x){
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
  }



  footerHeightBtn(x) {
    this.myGrid.ctx.setFooterHeight(x)
    this.status.footer0 = "";
    this.status.footer25 = "";
    this.status.footer50 = "";
    this.status.footer75 = "";

    switch(x){
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
  }




  selectionBtn(x){

    this.status.noSelect = "";
    this.status.singleSelect = "";
    this.status.multiSelect = "";

    switch(x){
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
  }

  sortableBtn(x){

    this.status.sortable0 = "";
    this.status.sortable1 = "";
    switch(x){
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
  }

  resizeBtn(x){
    this.status.resize0 = "";
    this.status.resize1 = "";
    this.status.resize2 = "";
    switch(x){
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
  }

  lockedBtn(x){
    this.status.locked0 = "";
    this.status.locked1 = "";
    this.status.locked2 = "";
    this.status.locked3 = "";
    switch(x){
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
  }

  setFilterBtn(x){

  this.status.filter0 = "";
  this.status.filter1 = "";
  switch(x){
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
}
  setFilterAtBtn(x){

    this.status.filterAt0 = "";
    this.status.filterAt1 = "";
    switch(x){
      case 0:
        this.myGrid.ctx.setHeaderFilterAtBottom();
        this.status.filterAt0 = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.setHeaderFilterAtTop();
        this.status.filterAt1 = "lightgrey";
        break;
    }
  }

  setSortBtn(x){

    this.status.sort0 = "";
    this.status.sort1 = "";
    switch(x){
      case 0:
        this.myGrid.ctx.disableHeaderSort();
        this.status.sort0 = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.enableHeaderSort();
        this.status.sort1 = "lightgrey";
        break;
    }
  }



  /********************************************************************
   * attached
   ********************************************************************/
  attached() {

    // var myCodeBlock = this.element.getElementsByTagName("TEXTAREA")[0]
    // var x = document.createElement("code");
    // x.classlist = myCodeBlock.classList;
    // x.style = myCodeBlock.style;
    // x.innerHTML = myCodeBlock.innerHTML;
    // myCodeBlock.parentNode.replaceChild(x, myCodeBlock);
    // hljs.highlightBlock(myCodeBlock);
  }




}
