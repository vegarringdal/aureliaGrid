export { WakClassMethod } from './wakClassMethod';
export { WakCollection } from './wakCollection';
export { WakCollectionMethod } from './wakCollectionMethod';
export { WakDataClass } from './wakDataClass';
export { WakDirectory } from './wakDirectory';
export { WakEntity } from './wakEntity';
export { WakEntityMethod } from './wakEntityMethod';
export { WakRestApi } from './wakRestApi';
export { WakRestUtil } from './wakRestUtil';
export { WakDataSource } from './wakDataSource';
export { WakGridConnector } from './wakGridConnector';
export { WakSelection } from './wakSelection';
import { WakSelection } from './wakSelection';
export interface RequestOptions {
    body: any;
    method: any;
}
export interface ControllerInterface {
    element: Element;
    setLoadingScreen(value: boolean, msg?: string, collectionLength?: number): Promise<void>;
    updateHeights(): void;
    collectionLength(): number;
    triggerScroll(position: number): void;
    rebindAllRows(): void;
    getColumnConfig(): Array<ColConfig>;
    setColumnConfig(colConfig: Array<ColConfig>): void;
}
export interface Entity {
    [key: string]: any;
    __group?: boolean;
    __groupID?: string;
    __groupName?: string;
    __groupLvl?: number;
    __groupTotal?: number;
    __groupChildren?: Array<Entity>;
    __groupExpanded?: boolean;
}
export interface FilterObject {
    [key: string]: any;
    operator: string;
    value: any;
    attribute: string;
}
export interface SortObject {
    [key: string]: any;
    attribute: string;
    asc: boolean;
    no?: number;
}
export interface BindingContext {
    [key: string]: any;
    rowRef: Entity;
    selection: WakSelection;
    row: number;
    selected: boolean;
    tempRef: Entity;
}
export interface SelectionInterface {
    getMode(): string;
    isSelected(row: number): boolean;
    deSelectAll(): void;
    deSelect(row: number): void;
    select(row: number, add?: boolean): void;
    selectRange(start: number, end: number): void;
    getSelectedRows(): Array<number>;
    setSelectedRows(newRows: Array<number>): void;
    reset(): void;
}
export interface GridConnectorInterface {
    getSelection(): SelectionInterface;
    connect(controller: ControllerInterface, create: Function): void;
    gridCreated(): void;
    select(row: number): void;
    getDatasourceLength(): number;
    getColConfig(): Array<ColConfig>;
    setColConfig(colconfig: Array<ColConfig>): void;
    getGrouping(): Array<string>;
    group(grouping: Array<string>, keepExpanded?: boolean): void;
    getElement(options: {
        row: number;
        isDown: boolean;
        callback: Function;
    }): void;
    query(a: Array<FilterObject>): void;
    orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
    getCurrentOrderBy(): Array<SortObject>;
    getCurrentFilter(): Array<FilterObject>;
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
}
export interface ColConfig {
    [key: string]: any;
    colWidth?: number;
    colRowTemplate?: string;
    colHeaderTemplate?: string;
    colField: string;
    colPinLeft?: boolean;
    colPinRight?: boolean;
    colHeaderName?: string;
    colAddLabelAttributes?: string;
    colAddFilterAttributes?: string;
    colAddRowAttributes?: string;
    colFilterMenu?: string;
    colLabelMenu?: string;
    colRowMenu?: string;
    colHidden?: boolean;
    colDragDrop?: string;
    colResizeable?: string;
    colSort?: string;
    colFilter?: string;
    colFilterTop?: boolean;
    colCss?: string;
    colType?: string;
    __colSortHelper?: number;
    __colHeaderTemplateGenerated?: string;
    __colRowTemplateGenerated?: string;
}