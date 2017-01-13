import { inject, customAttribute} from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext} from '../../interfaces';

// todo: look at adding option to disable this ?

@customAttribute('v-onchange')
@inject(Element, VGrid)
export class VGridAttributesOnChange {
    private vGrid: VGrid;
    private element: HTMLElement;
    private bindingContext: BindingContext;
    private overrideContext: OverrideContext;

    constructor(element: HTMLElement, vGrid: VGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }

    public attached() {
        this.element.onchange = this.onChanged.bind(this);
    }

    public onChanged() {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    }

    public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    }
}