---
layout: default
title: Home
---

Welcome to the Bulma demo. Use the toggle to switch theme.

Text can be **bold**, _italic_, or ~~strikethrough~~. There should be whitespace between
paragraphs.

## Typography

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Paragraph text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed.

Blockquote:

> This is a blockquote following a header. When something is important enough, you do it
> even if the odds are not in your favor.

Inline code like `const x = 1` and a code block:

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l);
  return true;
};
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

### Horizontal rule

<hr />

### Lists

<div class="content">
  <ul>
    <li>Unordered list item</li>
    <li>Another item</li>
  </ul>
  <ol>
    <li>Ordered item</li>
    <li>Second item</li>
  </ol>
  <dl>
    <dt>Term</dt>
    <dd>Definition explaining the term.</dd>
  </dl>
</div>

### Nested list

<div class="content">
  <ul>
    <li>level 1 item
      <ul>
        <li>level 2 item</li>
        <li>level 2 item
          <ul>
            <li>level 3 item</li>
            <li>level 3 item</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>level 1 item
      <ul>
        <li>level 2 item</li>
        <li>level 2 item</li>
      </ul>
    </li>
  </ul>
</div>

### Table

<table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Typography</td>
      <td>Headings and body text</td>
      <td>Shown</td>
    </tr>
    <tr>
      <td>Lists</td>
      <td>Unordered, ordered, and definitions</td>
      <td>Shown</td>
    </tr>
    <tr>
      <td>Code blocks</td>
      <td>Rouge highlighting via theme</td>
      <td>Shown</td>
    </tr>
  </tbody>
</table>

### Long code line (horizontal scroll)

```text
ThisIsAnExcessivelyLongSingleLineCodeBlockThatShouldNotWrapAndInsteadScrollHorizontallyToDemonstrateOverflowBehaviorInTheHighlightContainer_ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_0123456789
```

### Buttons

<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
  <button class="button is-info">Info</button>
  <button class="button is-success">Success</button>
  <button class="button is-warning">Warning</button>
  <button class="button is-danger">Danger</button>
  <button class="button is-light">Light</button>
  <button class="button is-dark">Dark</button>
  <button class="button is-text">Text</button>
  <button class="button is-ghost">Ghost</button>
  <button class="button is-ghost is-primary">Ghost primary</button>
  <button class="button is-outlined">Outlined</button>
  <button class="button is-inverted">Inverted</button>
  <button class="button is-rounded">Rounded</button>
  <button class="button is-loading">Loading</button>
  <button class="button is-small">Small</button>
  <button class="button is-medium">Medium</button>
  <button class="button is-large">Large</button>
  <button class="button is-fullwidth">Fullwidth</button>
  <button class="button is-static">Static</button>
</div>

### Notifications

<div class="notification is-primary">A primary notification.</div>
<div class="notification is-info">An info notification.</div>
<div class="notification is-success">A success notification.</div>
<div class="notification is-warning">A warning notification.</div>
<div class="notification is-danger">A danger notification.</div>

### Lists

<div class="content">
  <ul>
    <li>Unordered list item</li>
    <li>Another item</li>
  </ul>
  <ol>
    <li>Ordered item</li>
    <li>Second item</li>
  </ol>
</div>

### Cards

<div class="columns">
  <div class="column is-one-third">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Card title</p>
      </header>
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-content">
        <div class="content">
          Another card.
        </div>
      </div>
    </div>
  </div>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-content">
        <div class="content">
          And one more.
        </div>
      </div>
    </div>
  </div>
</div>
