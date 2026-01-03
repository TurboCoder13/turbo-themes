---
layout: default
title: Components
permalink: /components/
---

## Tabs

<div class="tabs is-toggle is-toggle-rounded is-fullwidth">
  <ul>
    <li class="is-active"><a href="#">Pictures</a></li>
    <li><a href="#">Music</a></li>
    <li><a href="#">Videos</a></li>
    <li><a href="#">Documents</a></li>
  </ul>
  </div>

### Breadcrumb

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="https://bulma.io">Bulma</a></li>
    <li><a href="https://bulma.io/documentation/">Documentation</a></li>
    <li><a href="https://bulma.io/documentation/components/">Components</a></li>
    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
  </ul>
</nav>

### Messages

<article class="message is-info">
  <div class="message-header">
    <p>Info</p>
  </div>
  <div class="message-body">
    A simple info message to show surface and border colors.
  </div>
  </article>

<article class="message is-warning">
  <div class="message-header">
    <p>Warning</p>
  </div>
  <div class="message-body">
    A warning message to exercise theme state tokens.
  </div>
</article>

### Table

<table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    <tr>
      <th>Name</th>
      <th>Job</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jane Doe</td>
      <td>Developer</td>
      <td>US</td>
    </tr>
    <tr>
      <td>John Smith</td>
      <td>Designer</td>
      <td>UK</td>
    </tr>
  </tbody>
</table>

### Horizontal rule

<hr />

### Panel

<nav class="panel">
  <p class="panel-heading">Repositories</p>
  <a class="panel-block is-active" href="#">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    turbo-themes
  </a>
  <a class="panel-block" href="#">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    bulma
  </a>
</nav>

### Code block

```js
const theme = {
  flavor: 'dracula',
  mode: 'dark',
};
```
