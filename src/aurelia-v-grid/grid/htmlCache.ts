import {RowCache, HeaderCache  } from '../interfaces';



export class HtmlCache {
  public element: Element;
  public avg_top_panel: Element;
  public avg_header_left: Element;
  public avg_header: Element;
  public avg_header_main: Element;
  public avg_header_main_scroll: Element;
  public avg_header_right: Element;
  public avg_content: Element;
  public avg_content_left: Element;
  public avg_content_left_scroll: Element;
  public avg_content_main: Element;
  public avg_content_main_scroll: Element;
  public avg_content_right: Element;
  public avg_content_right_scroll: Element;
  public avg_footer: Element;
  public avg_content_group: Element;
  public avg_content_group_scroll: Element;
  public avg_content_vhandle: Element;
  public avg_content_vhandle_scroll: Element;
  public avg_content_hhandle: Element;
  public avg_content_hhandle_scroll: Element;
  public avg_left_rows: NodeListOf<any>;
  public avg_main_rows: NodeListOf<any>;
  public avg_right_rows: NodeListOf<any>;
  public avg_group_rows: NodeListOf<any>;
  public rowCache: Array<RowCache>;
  public headerCache: HeaderCache;


  constructor(element) {

    this.element = element;
    this.avg_top_panel = null;

    this.avg_header = null;

    this.avg_header_left = null;
    this.avg_header_main = null;
    this.avg_header_main_scroll = null;
    this.avg_header_right = null;

    this.avg_content = null;
    this.avg_content_left = null;
    this.avg_content_left_scroll = null;
    this.avg_content_main = null;
    this.avg_content_main_scroll = null;
    this.avg_content_right = null;
    this.avg_content_right_scroll = null;

    this.avg_footer = null;

    this.avg_content_group = null;
    this.avg_content_group_scroll = null;
    this.avg_content_vhandle = null;
    this.avg_content_vhandle_scroll = null;
    this.avg_content_hhandle = null;
    this.avg_content_hhandle_scroll = null;


    this.avg_left_rows = null;
    this.avg_main_rows = null;
    this.avg_right_rows = null;
    this.avg_group_rows = null;

    this.rowCache = [];
    this.headerCache = {
      left: null,
      main: null,
      right: null,
      group: null,
      bindingContext: null,
      overrideContext: null,
      leftRowViewSlot: null,
      mainRowViewSlot: null,
      rightRowViewSlot: null,
      groupRowViewSlot: null
    };

  }


  public updateRowsMarkup(): void {
    this.avg_left_rows = this.avg_content_left_scroll.getElementsByTagName('avg-row');
    this.avg_main_rows = this.avg_content_main_scroll.getElementsByTagName('avg-row');
    this.avg_right_rows = this.avg_content_right_scroll.getElementsByTagName('avg-row');
    this.avg_group_rows = this.avg_content_group_scroll.getElementsByTagName('avg-row');
  }


  public updateMainMarkup(): void {
    this.avg_top_panel = this.element.getElementsByTagName('avg-top-panel')[0];

    this.avg_header = this.element.getElementsByTagName('avg-header')[0];

    this.avg_header_left = this.element.getElementsByTagName('avg-header-left')[0];

    this.avg_header_main = this.element.getElementsByTagName('avg-header-main')[0];
    this.avg_header_main_scroll = this.element.getElementsByTagName('avg-header-main-scroll')[0];

    this.avg_header_right = this.element.getElementsByTagName('avg-header-right')[0];

    this.avg_content = this.element.getElementsByTagName('avg-content')[0];

    this.avg_content_left = this.element.getElementsByTagName('avg-content-left')[0];
    this.avg_content_left_scroll = this.element.getElementsByTagName('avg-content-left-scroll')[0];

    this.avg_content_main = this.element.getElementsByTagName('avg-content-main')[0];
    this.avg_content_main_scroll = this.element.getElementsByTagName('avg-content-main-scroll')[0];

    this.avg_content_right = this.element.getElementsByTagName('avg-content-right')[0];
    this.avg_content_right_scroll = this.element.getElementsByTagName('avg-content-right-scroll')[0];

    this.avg_footer = this.element.getElementsByTagName('avg-footer')[0];

    this.avg_content_group = this.element.getElementsByTagName('avg-content-group')[0];
    this.avg_content_group_scroll = this.element.getElementsByTagName('avg-content-group-scroll')[0];

    this.avg_content_vhandle = this.element.getElementsByTagName('avg-content-vhandle')[0];
    this.avg_content_vhandle_scroll = this.element.getElementsByTagName('avg-content-vhandle-scroll')[0];

    this.avg_content_hhandle = this.element.getElementsByTagName('avg-content-hhandle')[0];
    this.avg_content_hhandle_scroll = this.element.getElementsByTagName('avg-content-hhandle-scroll')[0];

  }


}