import React from 'react';
import ReactDOM from 'react-dom/client';
import './web.css'
import { marked } from 'marked';

const root = ReactDOM.createRoot(document.getElementById('root'));

marked.setOptions({
    breaks: true
});
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown: placeholder
        }
    }

    handleChange = (e) => {
        this.setState({
            markdown: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Editor</h1>
                <Editor onChange={this.handleChange} markdown={this.state.markdown} />
                <h1>Preview</h1>
                <Preview markdown={this.state.markdown} />
            </div>
        )
    }
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const Editor = (props) => {
    return (
        <textarea
            id='editor'
            onChange={props.onChange}
            value={props.markdown}
        />
    )
}

const Preview = (props) => {
    return (
        <div className='preview' dangerouslySetInnerHTML={{
            __html: marked(props.markdown, { renderer: renderer })
        }}
            id="preview" />
    )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Image](https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png)
`;