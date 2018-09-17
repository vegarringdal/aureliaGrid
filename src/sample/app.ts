import { customElement } from '@aurelia/runtime';
// @ts-ignore
import view from './app.html';

@customElement({
    name: 'app',
    templateOrNode: view,
    build: {
        required: true,
        compiler: 'default'
    },
    instructions: []
})
export class App {
    public message = 'Hello World! again and again';
}
