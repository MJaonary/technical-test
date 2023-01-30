---
title: Sticky Element (HTML/CSS)
position: Frontend, Fullstack
file: src/app/sticky-element/page.tsx
difficulty: easy
---

# Sticky Element

---

Difficulty: **Medium**

Tags: **Frontend**, **Fullstack**, **HTML/CSS**, **Javascript**

---

As you might notice, the current page you are reading is not really UI/UX friendly. Especially when content doesn't fit the entire height of the window, note when you scroll down the sidebar follow entire content. We want you to setup this sidebar to stick to its initial position (~120px from top), **this behavior is only valid on desktop**.

To complete this challenge you have 2 options, **choose the one you are most comfortable with**

## Options 1: Use HTML/CSS only

Make the necessary re-adjustment to the HTML/CSS to achieve the goal, you can find the relevant page markup at:
- `src/components/Sidebar/Sidebar.tsx`: HTML markups, we already added a class `sticky` that you can work on in CSS side
- `src/components/Sidebar/sidebar.css`: CSS specifications.

We recommand you get familiar with the CSS property [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky)


## Options 2: Use direct DOM handling

If you decide to go with this method, please go to `src/components/hooks/useStickyElement.ts`. Some basic of react would be helpful for you, but the core of what you are asked to do is rather pure DOM handling, you may need to bring changes to DOM directly. We have already prepared all the requirements to allow you to change directly the hook above, you don't have to carry anymore about referencing the element.

![](https://img001.prntscr.com/file/img001/uq8ltLAcRL2EVwKYlH6hrw.png)

> **DON'T MIND ABOUT THIS HIGHLIGHTED CONTENT**

> *It's a simple lorem to fill the screen with some content*

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit sed vulputate mi sit amet. Ut sem nulla pharetra diam sit amet nisl. Senectus et netus et malesuada fames ac turpis egestas. Faucibus nisl tincidunt eget nullam non nisi est. In eu mi bibendum neque egestas congue. Arcu bibendum at varius vel pharetra vel. Nunc faucibus a pellentesque sit amet porttitor eget. Vitae ultricies leo integer malesuada nunc vel. Egestas sed tempus urna et pharetra pharetra massa. Ac tortor vitae purus faucibus ornare suspendisse. Eget dolor morbi non arcu risus. Malesuada fames ac turpis egestas integer eget aliquet nibh. Et malesuada fames ac turpis egestas maecenas pharetra convallis.

> Sem fringilla ut morbi tincidunt augue interdum velit. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Nec dui nunc mattis enim ut tellus elementum. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. In fermentum posuere urna nec tincidunt. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Adipiscing diam donec adipiscing tristique risus nec feugiat. Rhoncus urna neque viverra justo nec ultrices dui. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Risus feugiat in ante metus dictum. Scelerisque viverra mauris in aliquam sem fringilla. Urna condimentum mattis pellentesque id nibh tortor id. Lacinia quis vel eros donec ac odio tempor orci. Sit amet nisl suscipit adipiscing. Amet nulla facilisi morbi tempus iaculis urna. Senectus et netus et malesuada fames ac turpis.

> Enim tortor at auctor urna nunc id cursus. Turpis egestas integer eget aliquet nibh praesent tristique. Sed adipiscing diam donec adipiscing tristique risus nec. Quis risus sed vulputate odio ut enim blandit. Pellentesque elit eget gravida cum sociis natoque. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Non sodales neque sodales ut. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Vel elit scelerisque mauris pellentesque. A condimentum vitae sapien pellentesque habitant.t