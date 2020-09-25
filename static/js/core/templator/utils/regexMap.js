export var regexMap = {
    openLoopRegex: /{% ?for (?<variable>.*?) in (?<array>.*?) ?%}/gi,
    tag: /(<.*?>)/gi,
    closeLoopRegex: /{% ?endfor ?%}/gi,
    ifConditionRegex: /{% if(?<expression>.*?) %}/gi,
    elifConditionRegex: /{% elif(?<expression>.*?) %}/gi,
    elseConditionRegex: /{% else %}/gi,
    closeConditionRegex: /{% endif %}/gi,
    openTag: /(<(?<tag>[^>\/ ]+).*?>)/g,
    closingTag: /(<\/.*?>)/g,
    singleLineTag: /(<(?<tag>[^ \/]+).*? ?\/>)/g,
    attributes: /<(?:[^ ]*)|(?<attribute>[\w\-]+)=(?<value>(?:{{|"{1,2}).*?(?:"{1,2}|}}))+?/g,
    value: /{{(.*?)}}/g,
};
