# ng2-medium-editor
Medium Editor component for Angular 2 (https://yabwe.github.io/medium-editor/)

## Install

`npm install --save ng2-meditor`

## How to use

Include Medium Editor script and style in index.html. Read from `https://yabwe.github.io/medium-editor/`

In your component:

```typescript
...
import { MediumEditorComponent } from 'ng2-meditor';

@Component({
    selector: 'my-app',
    directives: [ MediumEditorComponent ],
    template: `
    <form ngForm="form">
        <medium-editor
            name="content"
            [(ngModel)]="content"
            placeholder="Replace your placeholder"></medium-editor>
    </form>
    `
})

export class AppComponent {
    content = '<h1>This is example!</h1>';
}

...
```