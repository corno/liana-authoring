export type Parameters = {
    'style':
    | ['concise', null]
    | ['verbose', null]
    'impact':
    | ['shallow with entities', null] //if the start value is a dictionary or a list, we convert the style of their entries/items
    | ['shallow without entities', null]
    | ['deep', null]
}