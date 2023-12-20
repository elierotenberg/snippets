import type { DetailedHTMLFactory, HTMLAttributes, ReactHTML } from "react";

type AnyHtmlTag =
  | `a`
  | `abbr`
  | `address`
  | `area`
  | `article`
  | `aside`
  | `audio`
  | `b`
  | `bdi`
  | `bdo`
  | `blockquote`
  | `body`
  | `br`
  | `button`
  | `canvas`
  | `caption`
  | `cite`
  | `code`
  | `col`
  | `colgroup`
  | `datalist`
  | `dd`
  | `del`
  | `details`
  | `dfn`
  | `div`
  | `dl`
  | `dt`
  | `em`
  | `embed`
  | `fieldset`
  | `figcaption`
  | `figure`
  | `footer`
  | `form`
  | `h1`
  | `h2`
  | `h3`
  | `h4`
  | `h5`
  | `h6`
  | `header`
  | `hr`
  | `html`
  | `i`
  | `iframe`
  | `img`
  | `input`
  | `ins`
  | `kbd`
  | `keygen`
  | `label`
  | `legend`
  | `li`
  | `main`
  | `map`
  | `mark`
  | `menu`
  | `meter`
  | `nav`
  | `object`
  | `ol`
  | `optgroup`
  | `option`
  | `output`
  | `p`
  | `param`
  | `pre`
  | `progress`
  | `q`
  | `rp`
  | `rt`
  | `ruby`
  | `s`
  | `samp`
  | `section`
  | `select`
  | `small`
  | `source`
  | `span`
  | `strong`
  | `sub`
  | `summary`
  | `sup`
  | `table`
  | `tbody`
  | `td`
  | `textarea`
  | `tfoot`
  | `th`
  | `thead`
  | `time`
  | `tr`
  | `track`
  | `u`
  | `ul`
  | `var`
  | `video`
  | `wbr`;

type HtmlTagElement<HtmlTag extends AnyHtmlTag = AnyHtmlTag> =
  ReactHTML[HtmlTag] extends DetailedHTMLFactory<
    HTMLAttributes<unknown>,
    infer Element
  >
    ? Element
    : never;

export type { AnyHtmlTag, HtmlTagElement };
