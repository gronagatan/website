/* eslint-env browser */
import { formatRelative, parse } from 'date-fns'
import sv from 'date-fns/locale/sv/index.js'
const getDate = (fromWpDate: string) => formatRelative(parse(fromWpDate, "yyyy-MM-dd'T'HH:mm:ss", new Date()), new Date(), { locale: sv })
const spans = document.querySelectorAll('.date-text')
spans.forEach((node) => {
  const tag = node as HTMLSpanElement
  const dataDate = tag.dataset?.date
  if (dataDate) {
    const formatedDate = getDate(dataDate)
    tag.innerText = formatedDate
  }
})
